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
	let spanClass = 'pl-2 self-center text-md text-rose-900 whitespace-nowrap dark:text-white';
	let btnClass = 'text-gray-300 dark:text-gray-300 hover:bg-rose-800 dark:hover:bg-rose-800 rounded-lg text-xl p-2';

	let site = {
    name: 'Skjaldmær',
    href: '/',
    img: 'https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg'
  };
</script>

<svelte:head>
	<title>Skjaldmær v.1 @ backend</title>
</svelte:head>

<svelte:window bind:innerWidth={width} />


<Navbar class="text-white bg-gradient-to-r from-orange-400 to-pink-600">
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden text-gray-300 dark:text-gray-300 hover:bg-rose-800 dark:hover:bg-rose-800 rounded-lg text-xl p-2" />
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
	class="overflow-scroll pb-32 bg-white dark:bg-gray-900 drop-shadow-xl"
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
					label="Profilo"
					href={`/user/profile`}
					{spanClass}
					on:click={toggleSide}
					active={activeUrl === `/user/profile`}
				>
                <svelte:fragment slot="icon">
                    <User class="text-rose-500 dark:text-rose-500" />
                </svelte:fragment>
                </SidebarItem>

				<SidebarItem
					label="I miei menu"
					href={`/user/items-list`}
					{spanClass}
					on:click={toggleSide}
					active={activeUrl === `/user/items-list`}
				>
				<svelte:fragment slot="icon">
					<Ticket class="text-rose-500 dark:text-rose-500" />
				</svelte:fragment>
				</SidebarItem>
                
                <SidebarItem
                    label="Help"
                    href={`/user/help`}
                    {spanClass}
                    on:click={toggleSide}
                    active={activeUrl === `/user/help`}
                >
                <svelte:fragment slot="icon">
                    <QuestionMarkCircle class="text-rose-500 dark:text-rose-500" />
                </svelte:fragment>
                </SidebarItem>

				<form class="py-10 w-full" method="post" action="/user/profile?/signout" >
					<Button color="alternative" type="submit" class="w-full">
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