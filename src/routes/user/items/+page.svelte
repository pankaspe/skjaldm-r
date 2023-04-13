<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  	import { Timeline, TimelineItem, Button, Alert, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let searchTerm = '';

    let { items } : any = data;
	$: ({ items } = data);

	$: filteredItems = items.filter(
    	(item: { title: string; }) => item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

</script>

<!-- component -->
<section class="mx-auto max-w-7xl">
	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>List of yours</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-teal-400 to-teal-600 lg:inline">
			items
		</span> 
	</h1>
</section>

<div class="mx-auto max-w-7xl py-6">
	<Button 
		href="/user/items/create"
		class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
	>
		Create item
	</Button>
</div>

<section class="mx-auto max-w-7xl bg-white dark:bg-gray-600 p-10 rounded-lg drop-shadow-md">
	
	{#await items}
    	<p class="text-white">...waiting</p>
	{:then items}
		{#if items.length == 0}
			<Alert color="none" class='dark:bg-gray-800 bg-gray-50 text-gray-800 dark:text-gray-100'>
				<span slot="icon">
					<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
					</svg>
				</span>
				<span class="font-medium">Heya!</span> it-s empty... create your first project
			</Alert>
		{:else}
			<Table striped={true}>
				<TableSearch placeholder="Search by name" bind:inputValue={searchTerm}>
					<TableHead>
					<TableHeadCell>Name</TableHeadCell>
					<TableHeadCell>Description</TableHeadCell>
					<TableHeadCell>Category</TableHeadCell>
					<TableHeadCell>Action</TableHeadCell>
					</TableHead>

					<TableBody>
						{#each filteredItems as val}
							<TableBodyRow>
								<TableBodyCell>{val.title}</TableBodyCell>
								<TableBodyCell>{val.description}</TableBodyCell>
								<TableBodyCell>
									{#if val.category}
										{val.category.name}
									{:else}
										-
									{/if}
								</TableBodyCell>
								<TableBodyCell>
									<Button color="green" href="/user/items/{val.id}">edit</Button>
								</TableBodyCell>
							</TableBodyRow>
						{/each}
					</TableBody>
				</TableSearch>
			</Table>
		{/if}
	{:catch error}
		<p>An error occurred!</p>
	{/await}




</section>
