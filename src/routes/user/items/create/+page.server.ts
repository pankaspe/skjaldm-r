import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categories } = await supabase
		.from('category')
		.select(`name, value`)
		.eq('profile_id', session.user.id);


	return { 
		session: session,
		categories: categories ?? [],
	};


}) satisfies PageServerLoad;


export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const category_id = formData.get('category_id') as string;

		const session = await getSession();

		const { error } = await supabase.from('item').insert({
            profile_id: session?.user.id,
			title,
			description,
			category_id,
			created_at: new Date()
		});

		if (error) {
			return fail(500, {
				title,
				description,
			});
		} else {
			throw redirect(303, '/user/items');
		}
	},
} satisfies Actions;