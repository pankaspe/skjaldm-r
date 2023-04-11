import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data } = await supabase
		.from('menu')
		.select(`
            title,
			id,
			description,
			created_at,
			profile_id(
				active
			)
        `)
		.eq('profile_id', session.user.id);

	return { 
		items_list: data ?? [],
		session: session
	};
}) satisfies PageServerLoad;