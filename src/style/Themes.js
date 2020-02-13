import {createGlobalStyle} from "styled-components"


//like #1995AD
export const lightTheme = {
    color: {
        ice: "#FCFCFC",
        blue: "#63bbcf",
        lightGrey: "#cbcbcb",
        darkGrey: "#7f7f7f",
        slate: "#536D7A",
        turquoise: "#4BB9D0",
        drab: "#324755",
        sandy: '#ffd152',
        green: '#8CB8B7',
        steelBlue: '#3B7B8E',
        onyx: '#485056',
        salmon: '#F29278',
        darkSalmon: '#F07655',
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
    text: {
        primaryHeading: `
            font-size: 3rem,
            color: red
        `
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
    },
    pageBaseStyles: `{
        margin-top: 5rem;
        display: grid;
        padding: 1rem;
        margin: 0 auto;
        height: 80rem;
        width:  120rem;
        background: white;
    }`

}

export const setFlex = ({align="center",justify="center"}) => {
    return `
        display:flex;
        align-items:${align};
        justify-content:${justify}
    `
}

export const buttonStyles = `
    padding: 1rem 2rem 1rem 2rem;
    min-width: 12rem;
    width: auto;
    height: 5rem;
    margin: 1rem;
    cursor: pointer;
    outline: none;
    border-radius: 5rem;
    text-transform: uppercase;
    position: relative;
    font-size: 1.4rem;
`

export const pageBaseStyles = `
grid-area: 
margin-top: 5rem;
display: grid;
margin: 0 auto;
height: 90vh;
width:  80vw;
background: white;
`
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
   font-family: 'Muli', sans-serif;
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
       font-size: 57.5%;
   }
   @media (min-width: 1500px) {
       font-size: 67.5%;
   }
   @media (min-width: 1700px) {
       font-size: 72.5%;
   }
}
`
