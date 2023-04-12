// src/routes/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

    // if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/user/profile');
	}

	return { url: url.origin, session: session };
};

export const actions = {
	login: async ({ request, locals: { supabase } }) => {

		const formData = await request.formData();
		const email = formData.get('email') as string;
        const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		  })

		if(error){
			return fail(400, { credentials: "credentials issue" })
		}

		return {data, error}

	},
} satisfies Actions;