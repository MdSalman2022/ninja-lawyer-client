/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#FFFFFF",
                  
          "secondary": "#9999a1",
                  
          "accent": "#ef233c",
                  
          "neutral": "#25222A",
                  
          "base-100": "#000000",
                  
          "info": "#7AC1F0",
                  
          "success": "#179271",
                  
          "warning": "#ffd60a",
                  
          "error": "#F24A6E",
        },
      },
      "light"
    ],
  },
  plugins: [require("daisyui")],
}