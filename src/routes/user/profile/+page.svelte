<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { Button, P, Input, Label } from 'flowbite-svelte';

	export let data: PageData;
	export let form: ActionData;

	let { session, profile } = data;

  	let profileForm: any;
	let loading = false;
	let fullName: string = profile?.full_name;
	let username: string = profile?.username;
	let website: string = profile?.website;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}
</script>


<section class="mx-auto max-w-7xl">
	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>Modifica il tuo</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-pink-600 to-orange-400 lg:inline">
			Profilo
		</span> 
	</h1>

	<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
		<div class="grid gap-6 mb-6 grid-cols-1">
			<div>
				<Label for="first_name" class="mb-2">Email</Label>
				<Input id="email" type="text" value={session.user.email} disabled  />
			</div>
			<div>
				<Label for="fullName" class="mb-2">Full name</Label>
				<Input id="fullName" name="fullName" type="text" value={form?.fullName ?? fullName} />
			</div>
			<div>
				<Label for="username" class="mb-2">Username</Label>
				<Input id="username" name="username" type="text" value={form?.username ?? username} />
			</div>
			<div>
				<Label for="website" class="mb-2">Website</Label>
				<Input id="website" name="website" type="website" value={form?.website ?? website} />
			</div>
		</div>

		<div>
			<Button  gradient color="pinkToOrange" type="submit" value={loading ? 'Loading...' : 'Update'} disabled={loading}>
				Update
			</Button>
		</div>
	</form>
</section>
