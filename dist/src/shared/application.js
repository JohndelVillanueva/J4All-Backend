import { z } from 'zod';
export const applicationSchema = z.object({
    job_listing_id: z.number().int().positive(),
    cover_letter: z.string().min(1, "Cover letter is required").max(5000, "Cover letter too long"),
    resume_url: z.string().url("Invalid resume URL").min(1, "Resume URL is required"),
    applicant_id: z.number().int().positive(),
    answers: z.array(z.object({
        question_id: z.number().int().positive(),
        answer: z.string().min(1, "Answer is required")
    })).optional()
});
