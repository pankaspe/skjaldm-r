<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';
	import { Input, Label } from 'flowbite-svelte';
	import { Button } from 'flowbite-svelte';

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


<div class="py-9 lg:w-2/3">
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

		</div>
