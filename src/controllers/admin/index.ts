import type { Context } from "hono";
import { prisma } from "../../db.js";

export const getAdminStatsController = async (c: Context): Promise<Response> => {
	try {
		const [employers, general, pwd, jobSeekers] = await Promise.all([
			prisma.user.count({ where: { user_type: 'employer' } }),
			prisma.user.count({ where: { user_type: 'general' } }),
			prisma.user.count({ where: { user_type: 'pwd' } }),
			prisma.jobSeeker.count(),
		]);

		const users = general + pwd; // Only non-employer accounts (excluding indigenous)

		return c.json({
			success: true,
			data: {
				totals: {
					users,
					employers,
				},
				breakdown: {
					jobseekers: jobSeekers,
					general,
					pwd,
				},
			},
		});
	} catch (error) {
		console.error('[ADMIN] Stats fetch failed:', error);
		return c.json({ success: false, message: 'Failed to fetch admin stats' }, 500);
	}
};

export const getAdminUsersListController = async (c: Context): Promise<Response> => {
	try {
		const url = new URL(c.req.url);
		const type = (url.searchParams.get('type') || 'all').toLowerCase();
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get('pageSize') || '10')));
		const skip = (page - 1) * pageSize;

		const allowedTypes = ['general', 'pwd'];
		const where: any = type === 'all'
			? { user_type: { in: allowedTypes } }
			: allowedTypes.includes(type)
				? { user_type: type }
				: { user_type: { in: allowedTypes } };

		const [total, records] = await Promise.all([
			prisma.user.count({ where }),
			prisma.user.findMany({
				where,
				select: {
					id: true,
					username: true,
					email: true,
					first_name: true,
					last_name: true,
					user_type: true,
					created_at: true,
				},
				orderBy: { created_at: 'desc' },
				skip,
				take: pageSize,
			})
		]);

		return c.json({
			success: true,
			data: {
				total,
				page,
				pageSize,
				records,
			}
		});
	} catch (error) {
		console.error('[ADMIN] Users list fetch failed:', error);
		return c.json({ success: false, message: 'Failed to fetch users list' }, 500);
	}
};

export const getAdminEmployersListController = async (c: Context): Promise<Response> => {
	try {
		const url = new URL(c.req.url);
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get('pageSize') || '10')));
		const skip = (page - 1) * pageSize;

		const [total, employers] = await Promise.all([
			prisma.employer.count(),
			prisma.employer.findMany({
				include: {
					user: {
						select: {
							id: true,
							email: true,
							username: true,
							first_name: true,
							last_name: true,
							created_at: true,
						}
					}
				},
				orderBy: { id: 'desc' },
				skip,
				take: pageSize,
			})
		]);

		// Flatten employer + user
		const records = employers.map((e: any) => ({
			id: e.id,
			company_name: e.company_name,
			industry: e.industry,
			company_size: e.company_size,
			website_url: e.website_url,
			contact_person: e.contact_person,
			address: e.address,
			user_id: e.user?.id,
			user_email: e.user?.email,
			user_username: e.user?.username,
			user_first_name: e.user?.first_name,
			user_last_name: e.user?.last_name,
			user_created_at: e.user?.created_at,
		}));

		return c.json({
			success: true,
			data: {
				total,
				page,
				pageSize,
				records,
			}
		});
	} catch (error) {
		console.error('[ADMIN] Employers list fetch failed:', error);
		return c.json({ success: false, message: 'Failed to fetch employers list' }, 500);
	}
};

export const getAdminAnalyticsController = async (c: Context): Promise<Response> => {
	try {
		const now = new Date();
		const monthsBack = 12;
		const startDate = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1), 1);

		const [users, jobListings, distEmployer, distGeneral, distPwd] = await Promise.all([
			prisma.user.findMany({
				where: { created_at: { gte: startDate } },
				select: { created_at: true, user_type: true },
				orderBy: { created_at: 'asc' },
			}),
			prisma.jobListing.groupBy({
				by: ['work_mode'],
				_count: { work_mode: true },
			}),
			prisma.user.count({ where: { user_type: 'employer' } }),
			prisma.user.count({ where: { user_type: 'general' } }),
			prisma.user.count({ where: { user_type: 'pwd' } }),
		]);

		// Users over time (by month)
		const buckets: Record<string, { month: string; total: number; employer: number; general: number; pwd: number }> = {};
		for (let i = 0; i < monthsBack; i++) {
			const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
			buckets[k] = { month: k, total: 0, employer: 0, general: 0, pwd: 0 };
		}
		users.forEach(u => {
			const d = new Date(u.created_at);
			const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
			if (buckets[k]) {
				buckets[k].total += 1;
				if (u.user_type === 'employer') buckets[k].employer += 1;
				if (u.user_type === 'general') buckets[k].general += 1;
				if (u.user_type === 'pwd') buckets[k].pwd += 1;
			}
		});
		const usersOverTime = Object.values(buckets).sort((a, b) => a.month.localeCompare(b.month));

		// Jobs by work mode
		const jobsByWorkMode = jobListings.map(j => ({ work_mode: j.work_mode, count: j._count.work_mode }));

		// Users distribution
		const usersDistribution = [
			{ type: 'Employer', count: distEmployer },
			{ type: 'General', count: distGeneral },
			{ type: 'PWD', count: distPwd },
		];

		return c.json({
			success: true,
			data: {
				usersOverTime,
				jobsByWorkMode,
				usersDistribution,
			}
		});
	} catch (error) {
		console.error('[ADMIN] Analytics fetch failed:', error);
		return c.json({ success: false, message: 'Failed to fetch analytics' }, 500);
	}
};

export const getAdminActivitiesController = async (c: Context): Promise<Response> => {
	try {
		const url = new URL(c.req.url);
		const page = Math.max(1, Number(url.searchParams.get('page') || '1'));
		const pageSize = Math.max(1, Math.min(100, Number(url.searchParams.get('pageSize') || '20')));
		const sinceDays = Math.max(1, Math.min(365, Number(url.searchParams.get('days') || '90')));
		const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);

		// Pull enough records to paginate after merging (cap to 1000 each to avoid heavy loads)
		const TAKE_CAP = 1000;

		// Recent messages
		const recentMessages = await prisma.message.findMany({
			where: { created_at: { gte: since } },
			select: {
				id: true,
				conversation_id: true,
				sender_id: true,
				receiver_id: true,
				content: true,
				created_at: true,
			},
			orderBy: { created_at: 'desc' },
			take: TAKE_CAP,
		});

		// Recent job applications with job title and employer user
		const recentApplications = await prisma.jobApplication.findMany({
			where: { application_date: { gte: since } },
			select: {
				id: true,
				job_id: true,
				seeker_id: true,
				employer_id: true,
				application_date: true,
				status: true,
				job_listing: { select: { job_title: true } },
				employer: { select: { user_id: true, user: { select: { id: true, username: true, first_name: true, last_name: true, email: true } } } },
			},
			orderBy: { application_date: 'desc' },
			take: TAKE_CAP,
		});

		// Recent interviews
		const recentInterviews = await prisma.interview.findMany({
			where: { createdAt: { gte: since } },
			orderBy: { createdAt: 'desc' },
			take: TAKE_CAP,
		});

		// Enrich messages with user names
		const userIds = Array.from(new Set(recentMessages.flatMap(m => [m.sender_id, m.receiver_id])));
		const users = await prisma.user.findMany({ where: { id: { in: userIds } }, select: { id: true, username: true, first_name: true, last_name: true, email: true } });
		const idToUser: Record<number, string> = Object.fromEntries(users.map(u => [u.id, (u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : (u.username || u.email || String(u.id)))]));

		const activities: Array<{ type: string; title: string; description: string; timestamp: Date; status?: string }> = [];

		recentMessages.forEach(m => {
			activities.push({
				type: 'message',
				title: `${idToUser[m.sender_id] ?? m.sender_id} messaged ${idToUser[m.receiver_id] ?? m.receiver_id}`,
				description: (m.content || '').slice(0, 120),
				timestamp: m.created_at,
			});
		});

		// Map job seeker ids to user names
		const seekerIds = Array.from(new Set(recentApplications.map(a => a.seeker_id)));
		let seekerUserNames: Record<number, string> = {};
		if (seekerIds.length) {
			const seekers = await prisma.jobSeeker.findMany({ where: { id: { in: seekerIds } }, select: { id: true, user_id: true } });
			const seekerUserIds = seekers.map(s => s.user_id);
			const seekerUsers = await prisma.user.findMany({ where: { id: { in: seekerUserIds } }, select: { id: true, username: true, first_name: true, last_name: true, email: true } });
			const idToUserName = Object.fromEntries(seekerUsers.map(u => [u.id, (u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : (u.username || u.email || String(u.id)))]));
			seekerUserNames = Object.fromEntries(seekers.map(s => [s.id, idToUserName[s.user_id] || `User#${s.user_id}`]));
		}

		const mapStatus = (s?: string) => {
			const val = (s || '').toUpperCase();
			if (val === 'HIRED' || val === 'APPROVED' || val === 'ACCEPTED') return 'approved';
			if (val === 'REJECTED' || val === 'DECLINED') return 'declined';
			return 'applied';
		};

		recentApplications.forEach(a => {
			const seekerName = seekerUserNames[a.seeker_id] || `Seeker#${a.seeker_id}`;
			const jobTitle = a.job_listing?.job_title || `Job#${a.job_id}`;
			const employerName = a.employer?.user ? (a.employer.user.first_name && a.employer.user.last_name ? `${a.employer.user.first_name} ${a.employer.user.last_name}` : (a.employer.user.username || a.employer.user.email || `Employer#${a.employer_id}`)) : `Employer#${a.employer_id}`;
			const status = mapStatus(a.status);
			const verb = status === 'approved' ? 'approved' : status === 'declined' ? 'declined' : 'applied to';
			activities.push({
				type: 'application',
				title: `${seekerName} ${verb} ${jobTitle}`,
				description: `Employer: ${employerName}`,
				timestamp: a.application_date,
				status,
			});
		});

		recentInterviews.forEach(i => {
			activities.push({
				type: 'interview',
				title: `Interview scheduled`,
				description: `Employer ${i.employerId} ↔ Seeker ${i.seekerId} on ${new Date(i.date).toLocaleDateString()} ${i.time}`,
				timestamp: i.createdAt,
			});
		});

		// Sort and paginate
		activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
		const total = activities.length;
		const start = (page - 1) * pageSize;
		const pageRecords = activities.slice(start, start + pageSize);

		// Interactions: conversations with bidirectional messaging (same as before)
		const grouped = await prisma.message.groupBy({
			by: ['conversation_id', 'sender_id'],
			where: { created_at: { gte: since } },
			_count: { _all: true },
		});
		const conversationIds = Array.from(new Set(grouped.map(g => g.conversation_id)));
		const conversations = await prisma.conversation.findMany({
			where: { id: { in: conversationIds } },
			select: { id: true, participant1_id: true, participant2_id: true }
		});
		const convMap = new Map<number, { p1: number; p2: number }>();
		conversations.forEach(cvr => convMap.set(cvr.id, { p1: cvr.participant1_id, p2: cvr.participant2_id }));

		const convToSenders = new Map<number, Map<number, number>>();
		grouped.forEach(g => {
			if (!convToSenders.has(g.conversation_id)) convToSenders.set(g.conversation_id, new Map());
			convToSenders.get(g.conversation_id)!.set(g.sender_id, g._count._all);
		});

		const mutual: Array<{ aId: number; bId: number; aName: string; bName: string; totalMessages: number; lastMessageAt: Date }>
			= [];

		for (const [convId, senderMap] of convToSenders.entries()) {
			const conv = convMap.get(convId);
			if (!conv) continue;
			const p1Count = senderMap.get(conv.p1) || 0;
			const p2Count = senderMap.get(conv.p2) || 0;
			if (p1Count > 0 && p2Count > 0) {
				const last = recentMessages.find(m => m.conversation_id === convId)?.created_at || since;
				const aName = idToUser[conv.p1] ?? String(conv.p1);
				const bName = idToUser[conv.p2] ?? String(conv.p2);
				mutual.push({ aId: conv.p1, bId: conv.p2, aName, bName, totalMessages: p1Count + p2Count, lastMessageAt: last });
			}
		}

		mutual.sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime());


		return c.json({
			success: true,
			data: {
				interactionsCount: mutual.length,
				interactions: mutual.slice(0, 50),
				activities: pageRecords,
				page,
				pageSize,
				total,
			}
		});
	} catch (error) {
		console.error('[ADMIN] Activities fetch failed:', error);
		return c.json({ success: false, message: 'Failed to fetch activities' }, 500);
	}
}; 