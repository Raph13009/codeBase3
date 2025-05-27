import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        brand: {
          mint: "#00C896",
          purple: "#7A5FFF",
          coral: "#FF6B6B"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem"
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "pulse-gentle": "pulse-gentle 2s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-gentle": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "hsl(var(--foreground))",
            p: { marginTop: "1.5em", marginBottom: "1.5em" },
            a: {
              color: "hsl(var(--primary))",
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" }
            },
            h2: {
              marginTop: "2em",
              marginBottom: "1em",
              color: "hsl(var(--foreground))",
              fontWeight: "700",
              fontSize: "1.75em",
              lineHeight: "1.3",
              "&:first-child": { marginTop: "0" }
            },
            h3: {
              marginTop: "1.6em",
              marginBottom: "0.8em",
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.5em",
              lineHeight: "1.3"
            },
            h4: {
              marginTop: "1.5em",
              marginBottom: "0.7em",
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              fontSize: "1.25em"
            },
            blockquote: {
              fontStyle: "italic",
              color: "hsl(var(--foreground))",
              borderLeftWidth: "4px",
              borderLeftColor: "hsl(var(--primary) / 0.5)",
              backgroundColor: "hsl(var(--primary) / 0.05)",
              padding: "1rem 1.5rem",
              marginTop: "2em",
              marginBottom: "2em",
              borderRadius: "0 0.375rem 0.375rem 0"
            }
          }
        }
      }
    }
  },
  plugins: [animatePlugin, typography]
};

export default config;
