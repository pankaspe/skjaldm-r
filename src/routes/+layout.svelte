<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import "../app.css";
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import type { LayoutData } from './$types'
	import { DarkMode } from 'flowbite-svelte';
	
	export let data: LayoutData

	$: ({ supabase, session } = data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>Skjaldmær</title>
</svelte:head>

<slot />
