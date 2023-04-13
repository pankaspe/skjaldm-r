import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categories } = await supabase
		.from('category')
		.select(`
            name,
			description,
			id
        `)
		.eq('profile_id', session.user.id);

	return { 
		session: session,
		categories: categories ?? [],
	};
}) satisfies PageServerLoad;