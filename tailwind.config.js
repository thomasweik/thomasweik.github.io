/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif']
      },
      colors: {
        ink: '#20382a',
        body: '#405246',
        card: '#f1e7d4',
        line: '#89977d',
        forest: {
          base: '#e8dbc2',
          surface: '#f1e7d4',
          raised: '#dbcbaa',
          line: '#89977d',
          accent: '#24563b'
        },
        sky: {
          50: '#e2e9db',
          100: '#d1ddca',
          200: '#93a993',
          300: '#597b5f',
          400: '#3c704c',
          500: '#315f43',
          700: '#24563b'
        }
      },
      boxShadow: {
        soft: 'none',
        lift: 'none'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
