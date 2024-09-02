import { PostFragment } from '../generated/graphql';
import { FirstPostPreview } from './first-post-preview';
import { MinimalPostPreview } from './minimal-post-preview';

type Props = {
	posts: PostFragment[];
	context: 'home' | 'series' | 'tag';
};

export const MinimalPosts = ({ posts }: Props) => {
	return (
		<section className="text-balance flex w-full flex-col items-stretch gap-12">
			{posts.length > 0 && (
				<FirstPostPreview
					title={posts[0].title}
					date={posts[0].publishedAt}
					author={{
						name: posts[0].author.name,
					}}
					slug={posts[0].slug}
					commentCount={posts[0].comments?.totalDocuments || 0}
					brief={posts[0].brief}
				/>
			)}
			{posts.slice(1).map((post) => (
				<MinimalPostPreview
					key={post.id}
					title={post.title}
					date={post.publishedAt}
					author={{
						name: post.author.name,
					}}
					slug={post.slug}
					commentCount={post.comments?.totalDocuments || 0}
					brief={posts[0].brief}
				/>
			))}
		</section>
	);
};
