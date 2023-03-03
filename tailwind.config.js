/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#E54F34",
                  
          "secondary": "#333333",
                  
          "accent": "#d4e587",
                  
          "neutral": "#25222A",
                  
          "base-100": "#000000",
                  
          "info": "#7AC1F0",
                  
          "success": "#179271",
                  
          "warning": "#F7D426",
                  
          "error": "#F24A6E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}