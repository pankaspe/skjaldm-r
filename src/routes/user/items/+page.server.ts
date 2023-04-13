import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: items } = await supabase
		.from('item')
		.select(`
            title,
			slug,
			id,
			description,
			created_at,
			category(
				name
			)
        `)
		.eq('profile_id', session.user.id);

	return { 
		items: items ?? [],
		session: session,
	};
}) satisfies PageServerLoad;