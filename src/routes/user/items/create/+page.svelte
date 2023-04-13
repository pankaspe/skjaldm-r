<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button, Spinner, Input, Label, Textarea, Select } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let loading = false
	let selected: string;
    
	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
			goto('/user/items');
		};
	}

  </script>

<section class="mx-auto max-w-7xl">
	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>Insert</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-teal-400 to-teal-600 lg:inline">
			Item
		</span> 
	</h1>
</section>

<section class="mx-auto max-w-7xl bg-white dark:bg-gray-600 p-10 rounded-lg drop-shadow-md">

	<form method="post" action="?/create" use:enhance={handleSubmit}>
		<div class="grid gap-6 mb-6 grid-cols-1">
			<div>
				<Label for="title" class="mb-2">Title</Label>
				<Input id="title" name="title" type="text" size="lg" required />
			</div>
			<div>
				<Label>Select category
					<Select class="mt-2" items={data.categories} bind:value={selected} name="category_id" />
				  </Label>
			</div>
			<div>
				<Label for="description" class="mb-2">Description</Label>
				<Textarea id="description" name="description" rows="4" />
			</div>
		</div>

		<div>
			{#if loading }
				<Button disabled color="teal">
					<Spinner class="mr-3" size="4" color="white" />Loading ...
				</Button>
			{:else}
				<Button color="dark" type="submit">
					Create
				</Button>
			{/if}
		</div>
	</form>
</section>
