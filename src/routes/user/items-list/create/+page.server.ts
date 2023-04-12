import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return { session };

}) satisfies PageServerLoad;


export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;

		const session = await getSession();

		const { error } = await supabase.from('projects').insert({
            user_id: session?.user.id,
            profile_id: session?.user.id,
			title,
            slug,
			description,
			created_at: new Date()
		});

		if (error) {
			return fail(500, {
				title,
				description,
                slug
			});
		} else {
			throw redirect(303, '/user/items-list');
		}
	},
} satisfies Actions;