import { type Context } from 'hono';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const scheduleInterviewController = async (c: Context): Promise<Response> => {
  try {
    const body = await c.req.json();
    console.log('Received body:', body);

    // Extract and validate fields
    const { applicationId, employerId, seekerId, date, time, notes, location } = body;
    if (!applicationId || !employerId || !seekerId || !date || !time || !location) {
      console.error('Missing required fields:', { applicationId, employerId, seekerId, date, time, location });
      return c.json({ success: false, error: 'Missing required fields: applicationId, employerId, seekerId, date, time, or location.' }, 400);
    }

    // Check if employer exists
    const employer = await prisma.employer.findUnique({ where: { id: Number(employerId) } });
    if (!employer) {
      return c.json({ success: false, error: 'Employer not found.' }, 404);
    }
    // Check if seeker exists
    const seeker = await prisma.jobSeeker.findUnique({ where: { id: Number(seekerId) } });
    if (!seeker) {
      return c.json({ success: false, error: 'Seeker not found.' }, 404);
    }
    // Check if application exists
    const application = await prisma.jobApplication.findUnique({ where: { id: Number(applicationId) } });
    if (!application) {
      return c.json({ success: false, error: 'Application not found.' }, 404);
    }

    // Attempt to create the interview
    let interview;
    try {
      interview = await prisma.interview.create({
        data: {
          applicationId: Number(applicationId),
          employerId: Number(employerId),
          seekerId: Number(seekerId),
          date: new Date(date),
          time,
          notes: notes || null,
          location,
        },
      });
      // Update the job application status to 'interview'
      await prisma.jobApplication.update({
        where: { id: Number(applicationId) },
        data: { status: 'interview' },
      });

      // Log activity (best-effort)
      try {
        await (prisma as any).activity?.create({
          data: {
            type: 'interview',
            application_id: Number(applicationId),
            employer_id: Number(employerId),
            seeker_id: Number(seekerId),
            title: 'Interview scheduled',
            description: `Date: ${new Date(date).toISOString()} Time: ${time} Location: ${location}`,
          }
        });
      } catch {}

      // Create a notification for the job seeker
      // Fetch job seeker info
      const jobSeeker = await prisma.jobSeeker.findUnique({
        where: { id: Number(seekerId) },
      });
      if (jobSeeker) {
        await prisma.notification.create({
          data: {
            user_id: Number(jobSeeker.user_id), // correct field name
            type: 'interview',
            title: 'Interview Scheduled',
            message: `You have been scheduled for an interview for your application (ID: ${applicationId}).`,
            is_read: false,
            created_at: new Date(),
          },
        });

        // Send an email to the job seeker
        const user = await prisma.user.findUnique({
          where: { id: jobSeeker.user_id },
        });
        if (user) {
          const { email, first_name, last_name } = user;
          const userName = first_name ? `${first_name} ${last_name || ''}`.trim() : email;
          const { emailService } = await import('../../services/emailService.js');
          // Use sendVerificationEmail as a generic sender for now
          await emailService.sendVerificationEmail(
            email,
            userName,
            'interview-scheduled-token' // Not used, but required by the method signature
          );
        }

        // --- NEW: Send a chat message to the job seeker ---
        // Find employer and seeker user records
        const employerUser = await prisma.user.findUnique({ where: { id: employer.user_id } });
        const seekerUser = await prisma.user.findUnique({ where: { id: seeker.user_id } });
        if (employerUser && seekerUser) {
          // Find or create conversation
          let conversation = await prisma.conversation.findFirst({
            where: {
              OR: [
                { participant1_id: employerUser.id, participant2_id: seekerUser.id },
                { participant1_id: seekerUser.id, participant2_id: employerUser.id }
              ]
            }
          });
          if (!conversation) {
            conversation = await prisma.conversation.create({
              data: {
                participant1_id: employerUser.id,
                participant2_id: seekerUser.id
              }
            });
          }
          // Fetch the job listing to get the job title
          const jobListing = await prisma.jobListing.findUnique({ where: { id: application.job_id } });
          const jobTitle = jobListing ? jobListing.job_title : 'the position';
          // Format the date nicely
          const interviewDate = new Date(date);
          const formattedDate = interviewDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
          const formattedTime = time; // If time is already a string like "14:00" or "2:00 PM"
          // Create a message in the conversation
          await prisma.message.create({
            data: {
              conversation_id: conversation.id,
              sender_id: employerUser.id,
              receiver_id: seekerUser.id,
              content: `You have been scheduled for an interview for the position: ${jobTitle}.\nDate: ${formattedDate}\nTime: ${formattedTime}\nLocation: ${location}`
            }
          });
        }
      }
    } catch (prismaError: any) {
      console.error('Prisma error when creating interview:', prismaError);
      return c.json({ success: false, error: 'Database error: ' + (prismaError.message || prismaError) }, 500);
    }

    console.log('Interview created:', interview);
    return c.json({ success: true, interview });
  } catch (error: any) {
    console.error('General error in scheduleInterviewController:', error);
    return c.json({ success: false, error: 'Server error: ' + (error.message || error) }, 500);
  }
}; 