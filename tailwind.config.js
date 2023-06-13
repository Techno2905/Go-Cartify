/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          "./pages/**/*.{js,ts,jsx,tsx}",
          "./components/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
          extend: {
               colors: {
                    bg: "#e0aaff",
                    primary: "#7b2cbf",
                    graay: "#e0e0e0",
               },
          },
     },
     plugins: [require("tailwind-scrollbar-hide")],
};
