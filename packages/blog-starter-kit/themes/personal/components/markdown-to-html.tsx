import { useEmbeds } from '@starter-kit/utils/renderer/hooks/useEmbeds';
import { markdownToHtml } from '@starter-kit/utils/renderer/markdownToHtml';
import { memo } from 'react';

type Props = {
	contentMarkdown: string;
};

const _MarkdownToHtml = ({ contentMarkdown }: Props) => {
	const content = markdownToHtml(contentMarkdown);
	useEmbeds({ enabled: true });

	return (
		<div
			className="prose prose-base prose-stone hover:prose-a:underline dark:prose-invert prose-a:no-underline prose-a:text-blue-600 prose-headings:font-normal prose-headings:text-balance mx-auto"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
};

export const MarkdownToHtml = memo(_MarkdownToHtml);
