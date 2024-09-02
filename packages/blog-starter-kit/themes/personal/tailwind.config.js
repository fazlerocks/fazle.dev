const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./components/**/*.tsx', './pages/**/*.tsx'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				heading: ['Platypi', 'sans-serif'],
			},
			colors: {
				primary: colors.blue,
			},
			typography: {
				DEFAULT: {
					css: {
						'div[data-node-type="callout"]': {
							display: 'flex',
							'justify-content': 'flex-start',
							'align-items': 'flex-start',
							'background-color': '#F8FAFC',
							border: '1px solid #E2E8F0',
							padding: '1rem 1.5rem',
							gap: '0.5rem',
							'border-radius': '0.5rem',
							margin: '1rem 0',
							'word-break': 'break-word',
						},
						'div[data-node-type="callout-emoji"]': {
							background: '#E2E8F0',
							'border-radius': '0.5rem',
							minWidth: '1.75rem',
							width: '1.75rem',
							height: '1.5rem',
							display: 'flex',
							'margin-top': '0.3rem',
							'justify-content': 'center',
							'align-items': 'center',
							'font-size': '1rem',
						},
					},
				},
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		function ({ addBase, theme }) {
			addBase({
				'h1, h2, h3, h4, h5, h6': { fontFamily: theme('fontFamily.heading') },
			})
		},
	],
};