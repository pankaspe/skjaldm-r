<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import type { PageData } from './$types';
	import { DarkMode } from 'flowbite-svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Skjaldmær v.1</title>
</svelte:head>
	<div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
		<div class="bg-white dark:bg-white p-10 w-96 rounded-md drop-shadow-md text-center">
			<h2 class="text-xl">Login on Skjaldmær v. 1</h2>
			{data.url}
			<Auth
				supabaseClient={data.supabase}
				redirectTo={`${data.url}`}
				appearance={{ 
					theme: ThemeSupa, 
					style: { 
						button: 'background: #0d9488; border-color: #134e4a',
					} 
				}}
				showLinks={false}
			/>
			<DarkMode  />

		</div>
	</div>

