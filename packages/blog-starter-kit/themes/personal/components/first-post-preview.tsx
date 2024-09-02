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
		<article className="grid grid-cols-2 items-center gap-10">
			<div className="col-span-1">
				<h2 className="text-4xl font-medium leading-tight text-stone-950">
					<Link href={postURL}>{title}</Link>
				</h2>
			</div>
			<div className="col-span-1 flex flex-col gap-2">
				<Link href={postURL} className="text-base leading-snug text-stone-600">
					{brief}
				</Link>
				<p className="font-heading flex flex-row items-center gap-2 text-sm text-stone-500">
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
		</article>
	);
};
