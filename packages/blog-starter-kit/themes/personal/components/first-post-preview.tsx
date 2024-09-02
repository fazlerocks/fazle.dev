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

export const FirstPostPreview = ({ title, date, slug, commentCount, brief }: Props) => {
	const postURL = `/${slug}`;

	return (
		<article className="grid grid-cols-2 items-center gap-5 rounded-lg bg-white p-5 shadow transition-colors duration-100 dark:bg-stone-800 md:gap-10 md:p-12">
			<div className="col-span-full flex flex-col gap-2 md:col-span-1">
				<h2 className="text-2xl font-semibold text-stone-950 dark:text-stone-50">
					<Link href={postURL}>{title}</Link>
				</h2>
				<p className="font-heading flex flex-row items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
					<Link href={postURL}>
						<DateFormatter dateString={date} />
					</Link>
					{commentCount > 2 && (
						<>
							<span>&middot;</span>
							<Link href={postURL}>{commentCount} comments</Link>
						</>
					)}
				</p>
			</div>
			<div className="col-span-full flex flex-col gap-2 md:col-span-1">
				<Link href={postURL} className="text-base leading-snug text-stone-600 dark:text-stone-400">
					{brief}
				</Link>
			</div>
		</article>
	);
};
