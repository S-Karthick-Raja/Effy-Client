/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Background
        Body: "#F2F5F7",

        // ScrollBar
        scrollThumb: "#B7B7B7",
        scrollBar: "#F4F4F4",

        // Main Colors
        primary: "#00A1FF",
        secondary: "#0081CC",

        // Fonts Shades
        fontDark: "#212121",
        fontGrey1: "#4D4D4D",
        fontGrey2: "#7A7A7A",
        fontActive: "#00A1FF",
        fontError: "#D86161",

        // Elements Shades
        cardBorder: "#E6E6E6",
        headingBackground: "#E2E2E2",
        enableIcon: "#4D4D4D",
        disabledIcon: "#7A7A7A",

        // Button Shades Primary
        primaryActive: "#00A1FF",
        primaryHover: "#0081CC",
        primaryClick: "#006199",
        primaryFocus: "#006199",
        primaryDisable: "#D8D8D8",
        primaryLoading: "#339AD6",

        // Button Shades Secondary
        secondaryActive: "#FFFFFF",
        secondaryHover: "#E6F6FF",
        secondaryClick: "#B3E3FF",
        secondaryFocus: "#CCECFF",
        secondaryDisable: "#FFFFFF",
        secondaryLoading: "#FFFFFF",
        secondaryStock1: "#00A1FF",
        secondaryStock2: "#7A7A7A",
        secondaryStock3: "#339AD6",

        // Button Shades Tertiary
        tertiaryBG: "#FFFFFF",
        tertiaryActive1: "#4D4D4D",
        tertiaryActive2: "#00A1FF",
        tertiaryHover: "#0081CC",
        tertiaryFocus: "#4D4D4D",
      },
      fontSize: {
        xs: [
          "12px",
          {
            lineHeight: "16px",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "20px",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        lg: [
          "18px",
          {
            lineHeight: "28px",
          },
        ],
        xl: [
          "20px",
          {
            lineHeight: "28px",
          },
        ],
        "2xl": [
          "24px",
          {
            lineHeight: "32px",
          },
        ],
        "3xl": [
          "30px",
          {
            lineHeight: "30px",
          },
        ],
        "4xl": [
          "36px",
          {
            lineHeight: "36px",
          },
        ],
        "5xl": [
          "48px",
          {
            lineHeight: "48px",
          },
        ],
        "6xl": [
          "60px",
          {
            lineHeight: "60px",
          },
        ],
        "7xl": [
          "72px",
          {
            lineHeight: "72px",
          },
        ],
        "8xl": [
          "96px",
          {
            lineHeight: "96px",
          },
        ],
        "9xl": [
          "128px",
          {
            lineHeight: "128px",
          },
        ],
      },
      fontWeight: {
        light: 300,
        base: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderRadius: {
        none: "0px",
        sm: "5px",
        base: "10px",
        lg: "15px",
        xl: "20px",
        "2xl": "25px",
        "3xl": "30px",
      },
      padding: {
        none: "0px",
        sm: "5px",
        base: "10px",
        lg: "15px",
        xl: "20px",
        "2xl": "25px",
        "3xl": "30px",
        btnXsPx: "12px",
        btnXsPy: "6px",
        btnSmPx: "12px",
        btnSmPy: "6px",
        btnBasePx: "16px",
        btnBasePy: "8px",
        btnLgPx: "16px",
        btnLgPy: "8px",
        btnXlPx: "24px",
        btnXlPy: "12px",
      },
      margin: {
        none: "0px",
        sm: "5px",
        base: "10px",
        lg: "15px",
        xl: "20px",
        "2xl": "25px",
        "3xl": "30px",
      },
      gap: {
        none: "0px",
        labelBase: "4px",
        sm: "5px",
        base: "10px",
        lg: "15px",
        base1: "16px",
        xl: "20px",
        "2xl": "25px",
        "3xl": "30px",
      },
      borderWidth: {
        base: "1px",
        0: "0",
        focus: "1.5px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
      },
      ringWidth: {
        base: "1px",
        0.5: "0.5px",
        xs: "1.5px",
      },
      screens: {
        md: "769px",
        lg: "1024px",
        xl: "1366px",
        "2xl": "1440px",
        base: "1920px",
      },
      width: {
        zillowV1: "220px",
      },
      opacity: {
        45: 45,
        79: 79,
      },
      strokeWidth: {
        2: "2px",
      },
    },
  },

  variants: {
    scrollbar: ["rounded"],
  },
};
