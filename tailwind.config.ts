
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Apple HIG Color System
				'system-blue': '#007AFF',
				'system-green': '#34C759',
				'system-indigo': '#5856D6',
				'system-orange': '#FF9500',
				'system-pink': '#FF2D92',
				'system-purple': '#AF52DE',
				'system-red': '#FF3B30',
				'system-teal': '#5AC8FA',
				'system-yellow': '#FFCC00',
				
				// Apple Gray Scale
				'system-gray': '#8E8E93',
				'system-gray-2': '#AEAEB2',
				'system-gray-3': '#C7C7CC',
				'system-gray-4': '#D1D1D6',
				'system-gray-5': '#E5E5EA',
				'system-gray-6': '#F2F2F7',
				
				// Apple Label Colors
				'label-primary': '#000000',
				'label-secondary': '#3C3C43',
				'label-tertiary': '#3C3C43',
				'label-quaternary': '#2C2C2E',
				
				// Apple Fill Colors
				'fill-primary': '#787880',
				'fill-secondary': '#78788033',
				'fill-tertiary': '#7676801F',
				'fill-quaternary': '#74748014',
				
				// Apple Background Colors
				'background-primary': '#FFFFFF',
				'background-secondary': '#F2F2F7',
				'background-tertiary': '#FFFFFF',
				
				// Apple Separator Colors
				'separator-opaque': '#C6C6C8',
				'separator-non-opaque': '#3C3C4329'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// Apple-specific radius values
				'apple-xs': '4px',
				'apple-sm': '6px',
				'apple-md': '8px',
				'apple-lg': '12px',
				'apple-xl': '16px',
				'apple-2xl': '20px',
				'apple-3xl': '24px'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-2px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite'
			},
			fontFamily: {
				'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Arial', 'sans-serif'],
				'sf-mono': ['SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', 'monospace']
			},
			fontSize: {
				// Apple Typography Scale
				'apple-large-title': ['34px', { lineHeight: '41px', fontWeight: '400' }],
				'apple-title-1': ['28px', { lineHeight: '34px', fontWeight: '400' }],
				'apple-title-2': ['22px', { lineHeight: '28px', fontWeight: '400' }],
				'apple-title-3': ['20px', { lineHeight: '25px', fontWeight: '400' }],
				'apple-headline': ['17px', { lineHeight: '22px', fontWeight: '600' }],
				'apple-body': ['17px', { lineHeight: '22px', fontWeight: '400' }],
				'apple-callout': ['16px', { lineHeight: '21px', fontWeight: '400' }],
				'apple-subhead': ['15px', { lineHeight: '20px', fontWeight: '400' }],
				'apple-footnote': ['13px', { lineHeight: '18px', fontWeight: '400' }],
				'apple-caption-1': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'apple-caption-2': ['11px', { lineHeight: '13px', fontWeight: '400' }]
			},
			boxShadow: {
				// Apple-style shadows
				'apple-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'apple-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'apple-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'apple-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'apple-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'apple-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
			},
			backdropBlur: {
				'apple': '20px',
				'apple-sm': '8px',
				'apple-md': '12px',
				'apple-lg': '24px',
				'apple-xl': '40px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
