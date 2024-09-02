import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { resizeImage } from '@starter-kit/utils/image';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { ToggleTheme } from './toggle-theme';

type NavbarItemWithUrl = PublicationNavbarItem & { url: string };

const isNavbarItemWithUrl = (item: PublicationNavbarItem): item is NavbarItemWithUrl =>
	!!item.url && item.url.length > 0;

const NavItem = ({ item }: { item: NavbarItemWithUrl }) => (
	<li key={item.url}>
		<a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
			{item.label}
		</a>
	</li>
);

const MoreDropdown = ({ items }: { items: NavbarItemWithUrl[] }) => (
	<li>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button>More</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="flex flex-col items-stretch gap-1 rounded-lg border bg-white text-xs font-semibold uppercase tracking-tight text-neutral-600 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
					sideOffset={5}
					align="end"
				>
					{items.map((item) => (
						<DropdownMenu.Item asChild key={item.url}>
							<a
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								className="block w-full p-2 hover:underline"
							>
								{item.label}
							</a>
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</li>
);

const NavList = ({ items }: { items: NavbarItemWithUrl[] }) => {
	const visibleItems = items.slice(0, 2);
	const hiddenItems = items.slice(2);

	return (
		<ul className="flex list-none flex-row items-center gap-4 text-xs font-semibold uppercase tracking-tight text-neutral-600 dark:text-neutral-300">
			{visibleItems.map((item) => (
				<NavItem key={item.url} item={item} />
			))}
			{hiddenItems.length > 0 && <MoreDropdown items={hiddenItems} />}
		</ul>
	);
};

export const PersonalHeader = () => {
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(isNavbarItemWithUrl);

	return (
		<header className="grid grid-cols-2 items-center gap-5">
			<div className="col-span-full md:col-span-1">
				<div className="flex justify-between">
					<h1>
						<Link
							className="flex flex-row items-center gap-2 text-lg font-bold leading-tight tracking-tight text-black dark:text-white"
							href="/"
							aria-label={`${publication.author.name}'s blog home page`}
						>
							{publication.author.profilePicture && (
								<Image
									className="rounded-full"
									alt={publication.author.name}
									src={resizeImage(publication.author.profilePicture, {
										w: 128,
										h: 128,
										c: 'face',
									})}
									width={64}
									height={64}
								/>
							)}
							{publication.title}
						</Link>
					</h1>
					<ToggleTheme className="md:hidden" />
				</div>
			</div>
			<div className="col-span-full flex flex-row items-center justify-between gap-4 md:col-span-1 md:justify-end">
				<nav>
					<NavList items={navbarItems} />
				</nav>
				<ToggleTheme className="hidden md:block" />
			</div>
		</header>
	);
};
