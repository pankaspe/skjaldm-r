import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: menu } = await supabase
		.from('projects')
		.select(`id, title, slug, description, created_at, user_id, profile_id`)
        .eq('slug', params.slug)
		.eq('user_id', session.user.id)
		.single();

	return { session, menu };

}) satisfies PageServerLoad;


export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const title = formData.get('title') as string;
        const slug = formData.get('slug') as string;
		const description = formData.get('description') as string;
		const id = formData.get('id') as string;

		const session = await getSession();

		const { error } = await supabase.from('projects').upsert({
			id: id,
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
                id,
                slug
			});
		}

		return {
			title,
			description,
            id,
            slug
		};
	},
} satisfies Actions;