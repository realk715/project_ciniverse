import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        fluid:"repeat(auto-fit,minmax(16rem,2fr))",
      },
      fontFamily: {
        Kanit: ["Kanit", "sans-serif"],
       },
       variants: {
        fill: ['hover', 'focus'], // this line does the trick
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      scale: {
        '150': '1.5',
      },
    },
  },

  plugins: [],
}
export default config
