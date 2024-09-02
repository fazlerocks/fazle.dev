import Link from 'next/link';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name'>;

type Props = {
	title: string;
	date: string;
	author: Author;
	slug: string;
	commentCount: number;
	brief: string;
};

export const MinimalPostPreview = ({ title, date, slug, commentCount, brief }: Props) => {
	const postURL = `/${slug}`;

	return (
		<section className="mx-auto flex w-full max-w-screen-md flex-col items-start gap-2 px-5">
			<h2 className="text-xl font-semibold text-stone-950 dark:text-stone-50">
				<Link href={postURL}>{title}</Link>
			</h2>
			<Link
				href={postURL}
				className="text-balance text-base leading-snug text-stone-500 dark:text-stone-400"
			>
				{brief}
			</Link>
			<p className="font-heading flex flex-row items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
				<Link href={postURL} className="text-sm">
					<DateFormatter dateString={date} />
				</Link>
				{commentCount > 2 && (
					<>
						<span>&middot;</span>
						<Link href={postURL} className="text-sm">
							{commentCount} comments
						</Link>
					</>
				)}
			</p>
		</section>
	);
};
