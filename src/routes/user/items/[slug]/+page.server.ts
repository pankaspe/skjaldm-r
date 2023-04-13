import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: item } = await supabase
		.from('item')
		.select(`id, category_id, title, description`)
        .eq('id', params.slug)
		.eq('profile_id', session.user.id)
		.single();

	const { data: categories } = await supabase
		.from('category')
		.select(`
			name, 
			value
		`)
		.eq('profile_id', session.user.id);

	return { 
		session, 
		item, 
		categories: categories ?? []
	};

}) satisfies PageServerLoad;


export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const category_id = formData.get('category_id') as string;

		const session = await getSession();

		const { error } = await supabase.from('item').upsert({
			id: id,
            profile_id: session?.user.id,
			title,
			category_id,
			description,
			update_at: new Date()
		});

		if (error) {
			return fail(500, {
				title,
				description,
				category_id,
                id,
			});
		}

		return {
			title,
			description,
			category_id,
            id,
		};
	},

	delete: async ({ params, locals: { supabase } }) => {

		const { error } = await supabase.from('item')
			.delete()
			.eq("id", params.slug);

		if(error){
			return fail(500)
		} else {
			throw redirect(303, '/user/items');
		}

	}
} satisfies Actions;