/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#ffd60a",
                  
          "secondary": "#333333",
                  
          "accent": "#001d3d",
                  
          "neutral": "#25222A",
                  
          "base-100": "#000814",
                  
          "info": "#7AC1F0",
                  
          "success": "#179271",
                  
          "warning": "#ffc300",
                  
          "error": "#F24A6E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}