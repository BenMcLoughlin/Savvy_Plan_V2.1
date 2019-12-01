import {createGlobalStyle} from "styled-components"



export const lightTheme = {
    color: {
        ice: "#FCFCFC",
        slate: "#536D7A",
        turquoise: "#4BB9D0",
        drab: "#324755",
        sandy: '#ffd152',
        onyx: '#485056',
        salmon: '#F29278',
    },
    fontSize: {
        smallest: "1rem",
        small: "1.3rem",
        smallMedium: "1.6rem",
        medium: '2rem',
        mediumLarge: '3.2rem',
        large: '4.2rem',
        large2: '6.2rem',
        largest: '8.8rem',
    },
    border: {
        primary: "1px solid #DCDCDC",
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
       font-size: 12.5%;
   }
   @media (min-width: 200px) {
       font-size: 32.5%;
   }
   @media (min-width: 400px) {
       font-size: 37.5%;
   }
   @media (min-width: 600px) {
       font-size: 42.5%;
   }
   @media (min-width: 1000px) {
       font-size: 47.5%;
   }
   @media (min-width: 1200px) {
       font-size: 52.5%;
   }
   @media (min-width: 1400px) {
       font-size: 62.5%;
   }
   @media (min-width: 1500px) {
       font-size: 67.5%;
   }
   @media (min-width: 1700px) {
       font-size: 72.5%;
   }
}
`
