<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';
	import { Input, Label, Button, Alert } from 'flowbite-svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	
</script>

<svelte:head>
	<title>Skjaldmær v.1</title>
</svelte:head>
	<div class="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
		<div class="bg-white dark:bg-gray-800 p-10 w-96 rounded-md drop-shadow-md">
			<div class="pb-12">
				<h2 class="text-xl text-center text-black dark:text-white">Login on Skjaldmær v. 1</h2>
			</div>
			{#if form?.credentials}
				<div class="pb-12">
					<Alert color='none' class='bg-red-500 text-white' dismissable>
						<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
						</span>
						<span class="font-medium">Error!</span> Invalid credentials.
					</Alert>
			</div>
			{/if}
			<form method="POST" action="?/login">
				<div class="py-2">
					<Label for="email" class="mb-2">Email</Label>
					<Input  name="email" type="email" required  />
				</div>
				<div class="py-2">
					<Label for="password" class="mb-2">Password</Label>
					<Input name="password" type="password" required  />
				</div>
				<div class="py-8 w-full">
					<Button type="submit" color="light" class="w-full">Log in</Button>
				</div>
			</form>
			<DarkMode  />

		</div>
	</div>

