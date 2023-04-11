<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Skjaldmær v.1</title>
</svelte:head>

<section class="min-h-screen flex items-stretch text-white ">
	<div class="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style="background-image: url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);">
		<div class="absolute bg-black opacity-60 inset-0 z-0"></div>
		<div class="w-full px-24 z-10">
			<h1 class="text-5xl font-bold text-left tracking-wide">Skjaldmær</h1>
			<p class="text-3xl my-4">Extreme fast front-end boilerplate built with Sveltekit & Supabase</p>
		</div>
	</div>
	<div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-zinc-900">
		<div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style="background-image: url(https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);">
			<div class="absolute bg-black opacity-60 inset-0 z-0"></div>
		</div>
		<div class="w-full py-6 z-20">
			<h1 class="my-6">
				Login on Skjaldmær
			</h1>
			<p class="text-gray-100">
				We will send you a magic link via email, just click on it and you will be redirected to your page.
			</p>

			<Auth
				supabaseClient={data.supabase}
				redirectTo={`${data.url}/logging-in?redirect=/`}
				appearance={{ 
					theme: ThemeSupa, 
					style: { 
						button: 'background: linear-gradient(to bottom right, rgba(251, 146, 60, 1.0), rgba(219, 40, 120, 1.0)); border-color: rgb(219 39 119)',
						input: 'color: #fff' 
					} 
				}}
				showLinks={false}
			/>
			
		</div>
	</div>
</section>