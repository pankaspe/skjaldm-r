<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
    import { error } from '@sveltejs/kit';
	import type { ActionData, PageData } from './$types';
	import { Button, Spinner, Input, Label, Textarea, Select } from 'flowbite-svelte';
  
	export let data: PageData;
	export let form: ActionData;

	let { categories } = data;

	let categoryForm: any;
	let loading = false;

	let id: string = categories?.id;
	let name: string = categories?.name;
	let value: string = categories?.value;
	let description: string = categories?.description;

	function handleSubmit() {
		loading = true;
		return async () => {
			loading = false;
		};
	}

	function handleDelete() {
		loading = true;
		return async () => {
			loading = false;
			goto('/user/categories');
		};
	}

  </script>

<section class="mx-auto max-w-7xl">
	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>Edit</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-teal-400 to-teal-600 lg:inline">
			{name}
		</span> 
	</h1>
</section>

<div class="mx-auto max-w-7xl py-6">
	<form method="post" action="?/delete" use:enhance={handleDelete}>
		{#if loading }
		<Button disabled color="red">
			<Spinner class="mr-3" size="4" color="white" />Deleting ...
		</Button>
		{:else}
		<Button color="red" type="submit">
			Delete this item
		</Button>
		{/if}
	</form>
</div>

<section class="mx-auto max-w-7xl bg-white dark:bg-gray-600 p-10 rounded-lg drop-shadow-md">
	
	<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={categoryForm}>
		<div class="grid gap-6 mb-6 grid-cols-1">
			<div class=hidden>
				<Label for="id" class="mb-2">ID</Label>
				<Input id="id" name="id" type="text" value={form?.id ?? id}  />
			</div>
			<div class=hidden>
				<Label for="value" class="mb-2">value</Label>
				<Input id="value" name="value" type="text" value={form?.value ?? value}  />
			</div>
			<div>
				<Label for="name" class="mb-2">Name</Label>
				<Input id="name" name="name" type="text" value={form?.name ?? name} size="lg" required />
			</div>
			<div>
				<Label for="description" class="mb-2">Description</Label>
				<Textarea id="description" name="description" rows="4" value={form?.description ?? description}/>
			</div>
		</div>

		<div>
			{#if loading }
			<Button disabled color="teal">
				<Spinner class="mr-3" size="4" color="white" />Loading ...
			</Button>
			{:else}
			<Button color="dark" type="submit">
				Update
			</Button>
			{/if}
		</div>
	</form>
</section>
