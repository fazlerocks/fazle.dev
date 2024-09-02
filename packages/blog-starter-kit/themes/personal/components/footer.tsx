import { useAppContext } from './contexts/appContext';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<footer className="border-t pt-10 text-sm text-stone-500 dark:border-stone-800 dark:text-stone-400">
			&copy; {new Date().getFullYear()} {publication.title}
		</footer>
	);
};
