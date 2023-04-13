<script lang="ts">
    import { onMount } from 'svelte';
	import {
        Navbar,
		NavBrand,
		NavHamburger,
		DarkMode,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarBrand,
		Drawer,
		CloseButton,
		Button,
	} from 'flowbite-svelte';
    import {
        QuestionMarkCircle,
		Ticket,
		User,
    } from "svelte-heros-v2";
	import { sineIn } from 'svelte/easing';
    import { page } from '$app/stores';

    let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let breakPoint: number = 1024;
	let width: number;
	let backdrop: boolean = false;
	let activateClickOutside = true;
	let drawerHidden: boolean = false;

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});

	const toggleSide = () => {
		if (width < breakPoint) {
			drawerHidden = !drawerHidden;
		}
	};

	const toggleDrawer = () => {
		drawerHidden = false;
	};
    
    $: activeUrl = $page.url.pathname;
	let btnClass = 'text-gray-300 dark:text-gray-300 hover:bg-teal-600 dark:hover:bg-teal-800 rounded-lg text-xl p-2';

	let site = {
    name: 'Skjaldmær',
    href: '/',
    img: 'https://www.svgrepo.com/show/254091/rune.svg',
  };
</script>

<svelte:head>
	<title>Skjaldmær v.1 @ backend</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />


<Navbar class="text-white bg-white dark:bg-gray-800 text-zinc-900 dark:text-zinc-100">
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden text-gray-300 dark:text-gray-300 hover:bg-teal-800 dark:hover:bg-teal-800 rounded-lg text-xl p-2" />
    <NavBrand href="/" class="lg:ml-64">
		<span class="text-md dark:text-white pl-4">
			Admin dashboard v. 1
		</span>
	</NavBrand>
    <div class="flex items-center">
        <DarkMode {btnClass} />
    </div>
</Navbar>


<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	bind:hidden={drawerHidden}
	bind:activateClickOutside
	width="w-64"
	class="overflow-scroll pb-32 bg-gradient-to-b from-teal-400 to-teal-600 drop-shadow-xl"
	id="sidebar"
>
	<div class="flex items-center">
		<CloseButton on:click={() => (drawerHidden = true)} class="mb-4 dark:text-white lg:hidden" />
	</div>
	<Sidebar asideClass="w-54">
		<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded">
			<SidebarGroup>
				<SidebarBrand {site} class="pb-8"/>
				<SidebarItem
					label="Profile"
					href={`/user/profile`}
					on:click={toggleSide}
					active={activeUrl === `/user/profile`}
					class="hover:bg-teal-500 dark:hover:bg-teal-500 text-white"
					activeClass="flex items-center p-2 text-base font-normal text-white bg-teal-700 dark:bg-teal-700 rounded-lg dark:text-white"
				>
                <svelte:fragment slot="icon">
                    <User class="text-teal-100 dark:text-teal-100" />
                </svelte:fragment>
                </SidebarItem>

				<SidebarItem
					label="My items"
					href={`/user/items`}
					on:click={toggleSide}
					active={activeUrl === `/user/items`}
					class="hover:bg-teal-500 dark:hover:bg-teal-500 text-white"
					activeClass="flex items-center p-2 text-base font-normal text-white bg-teal-700 dark:bg-teal-700 rounded-lg dark:text-white"
				>
				<svelte:fragment slot="icon">
					<Ticket class="text-teal-100 dark:text-teal-100" />
				</svelte:fragment>
				</SidebarItem>

				<SidebarItem
					label="Categories"
					href={`/user/categories`}
					on:click={toggleSide}
					active={activeUrl === `/user/categories`}
					class="hover:bg-teal-500 dark:hover:bg-teal-500 text-white"
					activeClass="flex items-center p-2 text-base font-normal text-white bg-teal-700 dark:bg-teal-700 rounded-lg dark:text-white"
				>
				<svelte:fragment slot="icon">
					<Ticket class="text-teal-100 dark:text-teal-100" />
				</svelte:fragment>
				</SidebarItem>
                
                <SidebarItem
                    label="Help"
                    href={`/user/help`}
                    on:click={toggleSide}
                    active={activeUrl === `/user/help`}
					class="hover:bg-teal-500 dark:hover:bg-teal-500 text-white"
					activeClass="flex items-center p-2 text-base font-normal text-white bg-teal-700 dark:bg-teal-700 rounded-lg dark:text-white"
                >
                <svelte:fragment slot="icon">
                    <QuestionMarkCircle class="text-teal-100 dark:text-teal-100" />
                </svelte:fragment>
                </SidebarItem>

				<form class="pt-14 w-full" method="post" action="/user/profile?/signout" >
					<Button color="dark" type="submit" class="w-full">
						logout
					</Button>
				</form>
				

			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<!-- component -->
<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto py-10">
		<slot />
	</main>
</div>