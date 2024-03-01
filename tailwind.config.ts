import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        myBrand: '#2196F3', // Primary Color
        mySoftBrand: 'rgba(33, 150, 243, 0.2)',
        mySoftGreen: 'rgba(165, 214, 167, 0.2)',
        myHeartColor: '#4CAF50',
        myTextSlateGray: '#727272',

        myLightGrey: '#D3D3D3', // Neutrals Group
        mySilver: '#C0C0C0', // Neutrals Group
        myTurquoise: '#40E0D0', // Highlight Group
        myDarkBlue: '#1565C0', // Main Colors
        myRoyalBlue: '#4169E1', // Main Colors
        myIndigo: '#4B0082', // Creative Group
        myNavyBlue: '#000080', // Depth Group
        myStripe: '#F4F2FF', // Backgrounds
        myLightTheme: '#F9F9FC', // Backgrounds
        // Add other colors here
        myDarkColor: '#2F2F2F',
        myNonImportantText: '#A0ABC0',
        myTealBlue: '#009688',
        myContent: '#EEEE',
        myLogin: '#D18742',
        myDanger: '#DC6803',
      },
      margin: {
        'sidebar-expanded': '300px',
        'sidebar-collapsed': '62px',
      },
      width: {
        'sidebar-expanded': '300px',
        'sidebar-collapsed': '62px',
      },
    },
  },
  plugins: [nextui()],
  darkMode: "class",
};
export default config;
