/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        animation: {
          blob: "blob 7s infinite",
          float: "float 3s ease-in-out infinite",
          'spin-slow': "spin 3s linear infinite",
          'fade-in': "fadeIn 1s ease-in",
          'fade-in-up': "fadeInUp 1s ease-out",
        },
        keyframes: {
          blob: {
            "0%": {
              transform: "translate(0px, 0px) scale(1)",
            },
            "33%": {
              transform: "translate(30px, -50px) scale(1.1)",
            },
            "66%": {
              transform: "translate(-20px, 20px) scale(0.9)",
            },
            "100%": {
              transform: "translate(0px, 0px) scale(1)",
            },
          },
          float: {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-20px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },
        },
      },
    },
    plugins: [],
  };
  