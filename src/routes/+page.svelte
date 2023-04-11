<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	import {
		DarkMode,
	} from 'flowbite-svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Skjaldmær v.1</title>
</svelte:head>
	<div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
		<div class="bg-white dark:bg-white p-10 w-96 rounded-md drop-shadow-md text-center">
			<h2>Login on Skjaldmær v. 1</h2>
			<Auth
				supabaseClient={data.supabase}
				redirectTo={`${data.url}/logging-in?redirect=/`}
				appearance={{ 
					theme: ThemeSupa, 
					style: { 
						button: 'background: linear-gradient(to bottom right, rgba(251, 146, 60, 1.0), rgba(219, 40, 120, 1.0)); border-color: rgb(219 39 119)',
					} 
				}}
				showLinks={false}
			/>
			<DarkMode  />

		</div>
	</div>

