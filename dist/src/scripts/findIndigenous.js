import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
function formatUser(u) {
    const name = [u.first_name, u.last_name].filter(Boolean).join(' ').trim() || '(no name)';
    const created = u.created_at ? new Date(u.created_at).toISOString().slice(0, 19).replace('T', ' ') : 'unknown';
    return `#${u.id} | ${name} | ${u.email} | active=${u.is_active} | created=${created}`;
}
async function main() {
    try {
        const [arg] = process.argv.slice(2);
        const where = { user_type: 'indigenous' };
        if (arg) {
            if (/^\d+$/.test(arg)) {
                where.id = parseInt(arg, 10);
            }
            else if (arg.includes('@')) {
                where.email = arg.toLowerCase();
            }
            else {
                where.OR = [
                    { first_name: { contains: arg, mode: 'insensitive' } },
                    { last_name: { contains: arg, mode: 'insensitive' } },
                ];
            }
        }
        const users = await prisma.user.findMany({
            where,
            orderBy: { id: 'asc' },
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                user_type: true,
                is_active: true,
                created_at: true,
            },
        });
        if (users.length === 0) {
            console.log(arg ? `No indigenous users matched filter: ${arg}` : 'No indigenous users found.');
            return;
        }
        console.log(`Found ${users.length} indigenous user(s):`);
        for (const u of users) {
            console.log(formatUser(u));
        }
    }
    catch (err) {
        console.error('Error fetching indigenous users:', err instanceof Error ? err.message : err);
        process.exitCode = 1;
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
