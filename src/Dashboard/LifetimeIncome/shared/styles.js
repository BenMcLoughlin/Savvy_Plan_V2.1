import {createGlobalStyle} from "styled-components"


 export const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css?family=Lato:100,300,400,700&display=swap');
 *{
     margin: 0;
     padding: 0;
     box-sizing: border-box;
 }
body {
    font-size: 100%;
    background: #fff;
    font-family: 'Lato', sans-serif;
}
html {
    @media (min-width: 0px) {
        font-size: 32.5%;
    }
    @media (min-width: 200px) {
        font-size: 42.5%;
    }
    @media (min-width: 400px) {
        font-size: 47.5%;
    }
    @media (min-width: 600px) {
        font-size: 52.5%;
    }
    @media (min-width: 1000px) {
        font-size: 57.5%;
    }
    @media (min-width: 1200px) {
        font-size: 62.5%;
    }
    @media (min-width: 1400px) {
        font-size: 67.5%;
    }
    @media (min-width: 1500px) {
        font-size: 72.5%%;
    }
    @media (min-width: 1700px) {
        font-size: 77.5%;
    }
}
`

export const darkTheme = {
    color: {
        background1: "#292f32",
        background2: "#d4d4d4",
        background3: "#586975",
        background4: "#f4f3f2",
        contrastBackground1: "#33363F",
        contrastBackground2: "#1E202A",
        accent-salmon: '#66d9e8',
        dullSteelBlue: '#77919A',
        dullSteelBlue: '#7DA4B7',
        sandy: '#D9BB73',
        sandy: '#ffd152',
        salmon: '#ef6c67',
        dullSteelBlue: '#55869d',
        contrastText1: '#f4f3f2',
        text2: '#93979d',
        text3: '#1E202A',
    },
    fontSize: {
        smallest: "1.2rem",
        small: "1.4rem",
        smallMedium: "1.8rem",
        medium: '2.2rem',
        mediumLarge: '3.5rem',
        large: '4.5rem',
        largest: '9rem',
    },
    flexContent: {
        center: '{display: flex; align-items: center; justify-content:center}'
    },
    boxShadow: {
        small: "9px 9px 10px -7px rgba(102,99,102,1);",
        lifted: "11px 11px 22px -7px rgba(102,99,102,1);",
    },
    linearGradient: {
        primary: "-webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(29,37,41,1)), color-stop(100%, rgba(0,110,110,1)))",
    }
}

export const setFlex = ({align="center",justify="center"}) => {
    return `
        display:flex;
        align-items:${align};
        justify-content:${justify}
    `
}

