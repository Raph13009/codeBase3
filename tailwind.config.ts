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
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '100%',
						color: 'hsl(var(--foreground))',
						p: {
							marginTop: '1.5em',
							marginBottom: '1.5em',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'none',
							fontWeight: '500',
							'&:hover': {
								textDecoration: 'underline',
							},
						},
						h2: {
							marginTop: '2em',
							marginBottom: '1em',
							color: 'hsl(var(--foreground))',
							fontWeight: '700',
							fontSize: '1.75em',
							lineHeight: '1.3',
							'&:first-child': {
								marginTop: '0',
							},
						},
						h3: {
							marginTop: '1.6em',
							marginBottom: '0.8em',
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							fontSize: '1.5em',
							lineHeight: '1.3',
						},
						h4: {
							marginTop: '1.5em',
							marginBottom: '0.7em',
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							fontSize: '1.25em',
						},
						blockquote: {
							fontStyle: 'italic',
							color: 'hsl(var(--foreground))',
							borderLeftWidth: '4px',
							borderLeftColor: 'hsl(var(--primary) / 0.5)',
							backgroundColor: 'hsl(var(--primary) / 0.05)',
							padding: '1rem 1.5rem',
							marginTop: '2em',
							marginBottom: '2em',
							borderRadius: '0 0.375rem 0.375rem 0',
						},
						ul: {
							marginTop: '1.5em',
							marginBottom: '1.5em',
							paddingLeft: '1.625em',
							li: {
								marginTop: '0.5em',
								marginBottom: '0.5em',
							},
						},
						ol: {
							marginTop: '1.5em',
							marginBottom: '1.5em',
							paddingLeft: '1.625em',
							li: {
								marginTop: '0.5em',
								marginBottom: '0.5em',
							},
						},
						code: {
							color: 'hsl(var(--primary))',
							backgroundColor: 'hsl(var(--muted))',
							borderRadius: '0.25rem',
							padding: '0.2em 0.4em',
							fontWeight: '500',
							fontSize: '0.875em',
						},
						pre: {
							backgroundColor: 'hsl(var(--card))',
							borderRadius: '0.375rem',
							padding: '1rem',
							overflowX: 'auto',
							border: '1px solid hsl(var(--border))',
						},
						img: {
							marginTop: '2em',
							marginBottom: '2em',
							borderRadius: '0.5rem',
							boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
						},
						figure: {
							marginTop: '2em',
							marginBottom: '2em',
							img: {
								marginTop: '0',
								marginBottom: '0.5em',
							},
							figcaption: {
								color: 'hsl(var(--muted-foreground))',
								fontSize: '0.875em',
								textAlign: 'center',
							},
						},
						hr: {
							marginTop: '3em',
							marginBottom: '3em',
							borderTopWidth: '1px',
							borderColor: 'hsl(var(--border))',
						},
						table: {
							width: '100%',
							marginTop: '2em',
							marginBottom: '2em',
							borderCollapse: 'collapse',
							fontSize: '0.875em',
							lineHeight: '1.5',
							thead: {
								borderBottomWidth: '2px',
								borderBottomColor: 'hsl(var(--border))',
							},
							th: {
								color: 'hsl(var(--foreground))',
								fontWeight: '600',
								padding: '0.75em',
								textAlign: 'left',
							},
							td: {
								padding: '0.75em',
								borderBottomWidth: '1px',
								borderBottomColor: 'hsl(var(--border))',
							},
						},
					},
				},
			},
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'scale-out': {
					from: { transform: 'scale(1)', opacity: '1' },
					to: { transform: 'scale(0.95)', opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'pulse': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'bounce-light': {
					'0%, 100%': { 
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': { 
						transform: 'translateY(-15%)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'typing': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'blink': {
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'currentColor' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'marquee': {
					'from': { transform: 'translateX(0%)' },
					'to': { transform: 'translateX(-50%)' }
				},
				'shine': {
					'0%': { 'background-position': '100%' },
					'100%': { 'background-position': '-100%' }
				},
				'shine-slow': {
					'0%': { 'background-position': '200%' },
					'100%': { 'background-position': '-200%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'scale-out': 'scale-out 0.2s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-out': 'slide-out 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'slide-down': 'slide-down 0.3s ease-out',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-light': 'bounce-light 2s infinite',
				'typing': 'typing 3.5s steps(40, end)',
				'blink-caret': 'blink 0.75s step-end infinite',
				'float': 'float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite linear',
				'marquee': 'marquee 15s linear infinite',
				'shine': 'shine 5s linear infinite',
				'shine-slow': 'shine-slow 8s linear infinite'
			},
			fontFamily: {
				sans: ['var(--font-sans)', 'sans-serif'],
				display: ['var(--font-display)', 'sans-serif']
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px'
			},
			transitionDuration: {
				'2000': '2000ms',
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	],
} satisfies Config;
