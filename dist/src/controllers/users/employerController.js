import {} from "hono";
import { prisma } from "../../db.js";
// GET /api/employer/:userId
export const getEmployerByUserId = async (c) => {
    const userId = Number(c.req.param('userId'));
    if (!userId) {
        return c.json({ success: false, error: 'Missing userId' }, 400);
    }
    const employer = await prisma.employer.findUnique({ where: { user_id: userId } });
    if (!employer) {
        return c.json({ success: false, error: 'Employer not found for this user' }, 404);
    }
    return c.json({ success: true, employer });
};
// PUT /api/employer/:userId
export const updateEmployerByUserId = async (c) => {
    const userId = Number(c.req.param('userId'));
    if (!userId) {
        return c.json({ success: false, error: 'Missing userId' }, 400);
    }
    const body = await c.req.json();
    try {
        const updated = await prisma.employer.update({
            where: { user_id: userId },
            data: {
                company_name: body.company_name,
                contact_person: body.contact_person,
                industry: body.industry,
                company_size: body.company_size,
                website_url: body.website_url,
                founded_year: body.founded_year,
                address: body.address,
                company_description: body.company_description,
            },
        });
        return c.json({ success: true, employer: updated });
    }
    catch (error) {
        if (error.code === 'P2025') {
            return c.json({ success: false, error: 'Employer not found for this user' }, 404);
        }
        console.error('Update employer error:', error);
        return c.json({ success: false, error: 'Failed to update employer' }, 500);
    }
};
