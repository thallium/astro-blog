/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
const defaultTheme = require("tailwindcss/defaultTheme");


export default {
	darkMode: ["class"],
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		'./astro.config.mjs'
	],
	blocklist: [
		'collapse'
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "oklch(var(--border))",
				input: "oklch(var(--input))",
				ring: "oklch(var(--ring))",
				background: "oklch(var(--background))",
				foreground: {
					DEFAULT: "oklch(var(--foreground))",
					200: "oklch(var(--foreground-200))",
				},
				primary: {
					DEFAULT: "oklch(var(--primary))",
					foreground: "oklch(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "oklch(var(--secondary))",
					foreground: "oklch(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "oklch(var(--destructive))",
					foreground: "oklch(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "oklch(var(--muted))",
					foreground: "oklch(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "oklch(var(--accent))",
					foreground: "oklch(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "oklch(var(--popover))",
					foreground: "oklch(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "oklch(var(--card))",
					foreground: "oklch(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			fontFamily: {
				sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
				mono: ["Fira Code Variable", ...defaultTheme.fontFamily.mono],
			},
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-body': 'oklch(var(--foreground))',
						'--tw-prose-bold': 'oklch(var(--foreground))',
						'--tw-prose-headings': 'oklch(var(--foreground))',
						'--tw-prose-links': 'oklch(var(--foreground))',
						'--tw-prose-code': 'oklch(var(--foreground))',
						'--tw-prose-quote-borders': 'oklch(var(--foreground))',

						'--tw-prose-quotes': 'oklch(var(--foreground-200))',
						'--tw-prose-captions': 'oklch(var(--foreground-200))',
						'--tw-prose-bullets': 'oklch(var(--muted-foreground))',
						'--tw-prose-counters': 'oklch(var(--muted-foreground))',
					}
				}
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
	],
}
