/** @type {import('tailwindcss').Config} */

//можно удалить, просто настройки цветов, которые уже не требуются
export default {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#232323',
        'secondary': '#3b3b3b',
        'button': '#2092ff',
        'buttontext': '#001b4e',
        'buttondisabled': '#213c56',
        'buttontextdisdabled': '#13263a',
      }
    },
  },
  plugins: [],
}

