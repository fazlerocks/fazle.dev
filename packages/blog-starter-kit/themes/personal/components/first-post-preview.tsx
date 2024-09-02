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
		<article className="ne-50 grid grid-cols-2 items-center gap-10 rounded-lg bg-white p-12 shadow transition-colors duration-100 dark:bg-stone-800">
			<div className="col-span-1 flex flex-col gap-2">
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
			<div className="col-span-1 flex flex-col gap-2">
				<Link href={postURL} className="text-base leading-snug text-stone-600 dark:text-stone-400">
					{brief}
				</Link>
			</div>
		</article>
	);
};
