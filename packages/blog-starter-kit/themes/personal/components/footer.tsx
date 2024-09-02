import { useAppContext } from './contexts/appContext';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer className="font-heading mx-auto max-w-screen-lg text-center text-sm text-stone-600 dark:text-stone-400">
			<p>
				&copy; {new Date().getFullYear()} &middot; {publication.title}
			</p>
		</footer>
	);
};
