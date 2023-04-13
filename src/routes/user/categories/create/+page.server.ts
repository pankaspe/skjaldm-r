import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
 
export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

}) satisfies PageServerLoad;


export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const session = await getSession();

		const { error } = await supabase.from('category').insert({
            profile_id: session?.user.id,
			name,
			description,
		});

		if (error) {
			return fail(500, {
				name,
				description,
			});
		} else {
			throw redirect(303, '/user/categories');
		}
	},
} satisfies Actions;