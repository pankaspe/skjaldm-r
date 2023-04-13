import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: categories } = await supabase
		.from('category')
		.select(`id, name, description, value`)
		.eq('id', params.slug)
		.eq('profile_id', session.user.id)
		.single();

	return { 
		session, 
		categories
	};

}) satisfies PageServerLoad;


export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const id = formData.get('id') as string;
		const name = formData.get('name') as string;
		const value = formData.get('value') as string;
		const description = formData.get('description') as string;

		const session = await getSession();

		const { error } = await supabase.from('category').upsert({
			id,
            profile_id: session?.user.id,
			name,
			value,
			description,
		});

		if (error) {
			return fail(500, {
				name,
				description,
				value,
                id,
			});
		}

		return {
			name,
			description,
			value,
            id,
		};
	},

	delete: async ({ params, locals: { supabase } }) => {

		const { error } = await supabase.from('category')
			.delete()
			.eq("id", params.slug);

		if(error){
			return fail(500)
		} else {
			throw redirect(303, '/user/category');
		}

	}
} satisfies Actions;