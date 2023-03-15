function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgba(var(${variableName}))`;
  };
}

module.exports = {
  content: [
    "./src/components/**/*.tsx",
    "./components/**/*.tsx",
    "./pages/**/*.tsx",
    "./src/**/*.{html,tsx}",
    "./node_modules/tw-elements/dist/tsx/**/*.tsx",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "800px",
      lg: "1100px",
      xl: "1440px",
      "2xl": "1920px",
      "3xl": "2200px",
      "4xl": "2800px",
    },

    extend: {
      keyframes: {
        sidenavLTR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0px)" },
        },
        sidenavRTL: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0px)" },
        },
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        dropDown: {
          "0%": { opacity: 0, transform: "scaleY(0)" },
          "100%": { opacity: 1, transform: "scaleY(1)" },
        },
      },
      animation: {
        sidenavLTREntering: "sidenavLTR 0.3s ease-in-out forwards",
        sidenavRTLEntering: "sidenavRTL 0.3s ease-in-out forwards",
        sidenavLTRExit: "sidenavLTR 0.3s ease-in-out reverse forwards",
        sidenavRTLExit: "sidenavRTL 0.3s ease-in-out reverse forwards",
        fadeEntering: "fade 0.3s forwards",
        fadeExit: "fade 0.3s reverse forwards",
        dropDown: "dropDown 0.3s forwards",
        dropDownExit: "dropDown 0.3s reverse forwards",
      },
      backgroundImage: {
        offersBG: "url('/images/carouselBox-bg/offersbg.webp')",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/images/banner5.jpg')",
      },

      sepia: {
        25: ".25",
        75: ".75",
      },

      blur: {
        xs: "1px",
      },
      transitionProperty: {
        left: "left",
      },
      backgroundColor: {
        palette: {
          fill: withOpacity("--color-bg"),
          card: withOpacity("--color-bg-side"),
          dark: withOpacity("--color-bg-dark"),
          digitalCategory: "var(--digital-category-bgc)",
          fashionCategory: "var(--fashion-category-bgc)",
          beautyCategory: "var( --beauty-category-bgc)",
          sportCategory: "var(--sport-category-bgc)",
          houseCategory: "var(--house-category-bgc)",
          toyCategory: "var(--toy-category-bgc)",
          stationeryCategory: "var(--stationery-category-bgc)",
        },
      },
      textColor: {
        palette: {
          base: withOpacity("--color-text-base"),
          mute: withOpacity("--color-text-muted"),
          side: withOpacity("--color-text-side"),
        },
      },
      colors: {
        palette: {
          primary: withOpacity("--color-primary"),
          secondary: withOpacity("--color-secondary"),
        },
        theme: {
          bg: "#EAEDED",
          white: "#FFFFFF",
          header: "#131921",
          subHead: "#232F3E",
          lowWhite: "#F8F8FF",
          boldText: "#0F1111",
          shop: "#529FAC",
        },
        blackout: {
          black: "#242121",
          saffron: "#f8c25c",
          white: "#f8f3e3",
          red: "#ff2047",
          red2: "#E71D37",
        },
        search: {
          button: "#052B4D",
        },
        pai: {
          logo: "#4CD6FD",
        },
        header: {
          color: "#00295B",
          text: "#EEEEEE",
        },
        navbar: {
          color: "#ffffff",
          text: "#000000",
        },
        brand: {
          yellow: "#FFC500",
          green: "#B4FE98",
          cyan: "#77E4D4",
          purple: "#998CEB",
          red: "#EF4F4F",
          cream: "#fff0f0",
        },
        wipro: {
          green: "#A4CE4F",
          blue: "#54BAB9",
          darkblue: "#053674",
          darkred: "#B4156E",
          darkyellow: "#FFC412",
          darkpurple: "#301157",
          platinblue: "#000333",
          cream: "#F7ECDE",
        },
        pallet1: {
          pink: "#FF0075",
          navy: "#172774",
          green: "#77D970",
          silver: "#EEEEEE",
        },
        pallet2: {
          cyan: "#00EAD3",
          cream: "#FFF5B7",
          pink: "#FF449F",
          navy: "#005F99",
        },
        ino: {
          white: "#ffffff",
          lwhite: "#F5F5F7",
          lgray: "#313131",
          hgray: "#1D1D1F",
          gray: "#6D6C71",
          primary: "#EB0750",
          secondary: "#FB84A6",
          dark: "#990E3E",
          darker: "#4C0010",
          black: "#0F0F0F",
          green: "#76B900",
        },
      },
      spacing: {
        "11px": "11px",
        "500px": "500px",
        100: "25rem",

        128: "32rem",
        140: "38rem",
      },
      // fontFamily:{
      // 	'Vazir' :['Vazir'],
      // 	'Vazir-Bold' : ['Vazir-Bold'],
      // 	'Vazir-Light' :['Vazir-Light'],
      // 	'Vazir-Medium' : ['Vazir-Medium'],
      // 	'Vazir-Thin' : ['Vazir-Thin'],
      fontFamily: {
        Vazir: ["Vazir"],
        "Vazir-Bold": ["Vazir-Bold"],
        "Vazir-Light": ["Vazir-Light"],
        "Vazir-Medium": ["Vazir-Medium"],
        "Vazir-Thin": ["Vazir-Thin"],
      },

      // },
      fontSize: {
        "8px": "8px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "19px": "19px",
        "20px": "20px",
        "21px": "21px",
        "22px": "22px",
        "23px": "23px",
        "24px": "24px",
        "25px": "25px",
        "26px": "26px",
        "27px": "27px",
        "28px": "28px",
        "30px": "30px",
        "32px": "32px",
        "34px": "34px",
        "36px": "36px",
        "40px": "40px",
        "42px": "42px",
      },
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  variants: {},
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss"),
  ],
};
