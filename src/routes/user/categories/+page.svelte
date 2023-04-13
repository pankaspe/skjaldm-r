<script lang="ts">
    import { Timeline, TimelineItem, Alert, Button, AccordionItem, Accordion} from 'flowbite-svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let { categories } = data;
    $: ({ categories } = data);

</script>

<section class="mx-auto max-w-7xl">
	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>List of yours</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-teal-400 to-teal-600 lg:inline">
			Categories
		</span> 
	</h1>
</section>

<div class="mx-auto max-w-7xl py-6">
	<Button 
		href="/user/categories/create"
		class="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800"
	>
		Create category
	</Button>
</div>

<section class="mx-auto max-w-7xl bg-white dark:bg-gray-600 p-10 rounded-lg drop-shadow-md">
	
	{#if categories.length == 0}
	<Alert color="none" class='dark:bg-gray-800 bg-gray-50 text-gray-800 dark:text-gray-100'>
		<span slot="icon">
			<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
			</svg>
		</span>
		<span class="font-medium">Heya!</span> it-s empty... create yours categories
	  </Alert>
	{:else}
		<Accordion 
			activeClasses="bg-teal-600 dark:bg-teal-600 text-white dark:text-white"
			inactiveClasses="bg-gray-100 dark:bg-gray-800"
		>
			{#each categories as val}
				<AccordionItem>
					<span slot="header">{val.name}</span>
					<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
						{val.description}
					</p>
					<Button color="dark" href="/user/categories/{val.id}">edit</Button>
				</AccordionItem>
			{/each}
			</Accordion>
	{/if}

</section>