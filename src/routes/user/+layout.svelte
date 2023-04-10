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
		Breadcrumb, 
		BreadcrumbItem
	} from 'flowbite-svelte';
    import {
        HomeModern,
        Cog
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
	$: getUrl =  $page.url;
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
    <NavHamburger on:click={toggleDrawer} btnClass="ml-3 lg:hidden" />
    <NavBrand href="/" class="lg:ml-24">
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
	class="overflow-scroll pb-32 bg-zinc-white dark:bg-zinc-900 drop-shadow-xl"
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
					label="Home"
					href={`/user`}
					{spanClass}
					on:click={toggleSide}
					active={activeUrl === `/pages/dashboard`}
				>
                <svelte:fragment slot="icon">
                    <HomeModern class="text-rose-500 dark:text-rose-500" />
                </svelte:fragment>
                </SidebarItem>
                
                <SidebarItem
                    label="Account"
                    href={`/user/account`}
                    {spanClass}
                    on:click={toggleSide}
                    active={activeUrl === `/user/account`}
                >
                <svelte:fragment slot="icon">
                    <Cog class="text-rose-500 dark:text-rose-500" />
                </svelte:fragment>
                </SidebarItem>

				<form class="py-10 w-full" method="post" action="/user/account?/signout" >
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