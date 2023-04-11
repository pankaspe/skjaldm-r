<!-- src/routes/account/+page.svelte -->
<script lang="ts">
  	import { Timeline, TimelineItem, Button, Alert } from 'flowbite-svelte';
	import type { PageData, ActionData } from './$types';

	export let data: PageData;

    let { items_list } = data;
    $: ({ items_list } = data);


</script>

<!-- component -->
<section class="mx-auto max-w-7xl">

	<h1 class="my-12 text-4xl font-extrabold leading-none tracking-normal text-gray-700 dark:text-gray-200 md:text-6xl md:tracking-tight">
		<span>Ecco i tuoi</span>
		<span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-pink-600 to-orange-400 lg:inline">
			Menu
		</span> 
	</h1>
	
	{#if items_list.length == 0}
		<Alert color="none" class='dark:bg-gray-900 bg-gray-50 text-gray-800 dark:text-gray-100'>
		<span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
		</span>
		<span class="font-medium">Heya!</span> Sembra che tu non abbia creato ancora un menu...
	  </Alert>
	{:else}

	<Timeline>
		{#each items_list as val}
			<TimelineItem title={val.title} date={val.created_at}>
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
				{val.description}
				</p>
				<Button gradient color="pinkToOrange">edit</Button>
		  	</TimelineItem>
		{/each}
	  </Timeline>
	{/if}
</section>
