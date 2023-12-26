/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "m-normal": "#18212d",
      },
      fontFamily: {
        "tencent": "Tencent"
      },
      height: {
        "150": "37.5rem"
      },
      width: {
        "180": "45rem"
      }
    },
  },
  plugins: [],
}

