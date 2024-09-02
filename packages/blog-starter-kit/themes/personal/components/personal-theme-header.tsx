import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { resizeImage } from '@starter-kit/utils/image';
import Image from 'next/image';
import Link from 'next/link';
import { PublicationNavbarItem } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';
import { LinkedinSVG, XSVG } from './icons';
import { ToggleTheme } from './toggle-theme';

type NavbarItemWithUrl = PublicationNavbarItem & { url: string };

const isNavbarItemWithUrl = (item: PublicationNavbarItem): item is NavbarItemWithUrl =>
	!!item.url && item.url.length > 0;

const NavItem = ({ item }: { item: NavbarItemWithUrl }) => (
	<li key={item.url}>
		<a href={item.url} target="_blank" rel="noopener noreferrer" className="">
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
					className="flex flex-col items-stretch gap-1 rounded-lg border bg-white text-xs font-semibold uppercase tracking-tight text-stone-600 shadow-xl dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300"
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
		<ul className="">
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
		<header className="mx-auto grid w-full max-w-screen-lg grid-cols-3 items-center gap-5">
			<div className="col-span-full md:col-span-2">
				<div className="flex justify-between">
					<h1>
						<Link
							className="flex flex-row items-center gap-3"
							href="/"
							aria-label={`${publication.author.name}'s blog home page`}
						>
							{publication.author.profilePicture && (
								<Image
									className="rounded-full dark:border-stone-300"
									alt={publication.author.name}
									src={resizeImage(publication.author.profilePicture, {
										w: 128,
										h: 128,
										c: 'face',
									})}
									width={46}
									height={46}
								/>
							)}
							<div className="flex flex-col leading-snug">
								<span className="text-xl font-semibold text-stone-950 dark:text-stone-50">
									{publication.title}
								</span>
								<span className="font-sans text-sm font-normal text-stone-600 dark:text-stone-400">
									Co-founder, Hashnode &middot; Web experience architect
								</span>
							</div>
						</Link>
					</h1>
				</div>
			</div>
			<div className="col-span-full flex flex-row items-center justify-center gap-10 border-y border-stone-200 py-5 text-stone-600 dark:border-stone-800 dark:text-stone-400 md:col-span-1 md:justify-end md:border-y-0 md:py-0">
				<nav>
					<NavList items={navbarItems} />
				</nav>
				<div className="flex flex-row items-center gap-4">
					<Link
						href="https://x.com/fazlerocks"
						aria-label="Follow on X"
						target="_Blank"
						rel="noopenner"
					>
						<XSVG className="h-6 w-6 stroke-current" />
					</Link>
					<Link
						href="https://linkedin.com/fazlerocks"
						aria-label="Follow on Linkedin"
						target="_Blank"
						rel="noopenner"
					>
						<LinkedinSVG className="h-6 w-6 stroke-current" />
					</Link>
					<ToggleTheme />
				</div>
			</div>
		</header>
	);
};
