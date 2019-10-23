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


export const BackgroundLight = `background-color: #f9f8f6`;
export const BackgroundDark = `background-color: #18212b`;
export const BackgroundSlateGrey = `background-color: #31393e`;


export const FontColorLight = `color: #f9f8f6`;
export const FontColorDark = `color: #18212b`;

export const subtleBoxShadow = `box-shadow: 4px 4px 8px 1px rgba(194,190,194,1)`
export const liftedBoxShadow = `box-shadow: 6px 7px 9px 2px rgba(194,190,194,0.9)`

export const fontColorGreen = `color: #03A9F4`;
export const fontColorWhite = `color: white`;

export const greenBoxShadow = `box-shadow: 0px 0px 4px 2px #757575`;
export const redBoxShadow = `box-shadow: 0px 0px 2px 2px #757575`;


export const fontSizeSmallest = 'font-size: 1.2rem;';
export const fontSizeSmall = 'font-size: 1.4rem';
export const fontSizeMedium = 'font-size: 1.6rem';
export const fontSizeLarge = 'font-size: 2.4rem';
export const fontSizeLargest = 'font-size: 5rem';

//FONT COLORS

// export const darkTheme = {
//     color: "green",
// }
export const lightTheme = {
    color: {
        background1: "white",
        background2: "#FCFCFC",
        background3: "#536D7A",
        contrastBackground1: "#536D7A",
        contrastBackground2: "#72929B",
        contrastBackground3: "#556976",
        sandy: '#ffd152',
        salmon: '#F29278',
        dullSteelBlue: '#55869d',
        brightPopBlue: "#4BB9D0",
        fadedGreyBlue: "#B0CFE3",
        text1: '#F7F7F5',
        text2: '#FFFFFF',
        contrastText1: '#72929B',
        contrastText2: '#536D7A',
    },
    fontSize: {
        smallest: "1rem",
        small: "1.4rem",
        smallMedium: "1.8rem",
        medium: '2.2rem',
        mediumLarge: '3.5rem',
        large: '4.5rem',
        large2: '6.5rem',
        largest: '9rem',
    },
    border: {
        primary: ".2px solid #DCDCDC",
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

export const darkTheme = {
    color: {
        background1: "#e8eaf0",
        background2: "#f9f8f6",
        background3: "#c6c7c7",
        background4: "#f4f3f2",
        contrastBackground1: "#33363F",
        contrastBackground2: "#556976",
        sandy: '#D9BB73',
        salmon: '#ef6c67',
        dullSteelBlue: '#55869d',
        contrastText1: '#828F98',
        text2: '#33363F',
        text3: '#F7F7F5',
    },
    fontSize: {
        small: "1.4rem",
        smallMedium: "1.8rem",
        medium: '2.2rem',
        mediumLarge: '3.5rem',
        large: '4.5rem',
        large2: '7.5rem',
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

export const boxShadow = {
   subtle: `box-shadow: 4px 4px 8px 1px rgba(194,190,194,1)`,
   lifted: `box-shadow: 6px 7px 9px 2px rgba(194,190,194,0.9)`,
}
export const fontSize = {
    smallest: 'font-size: 1.2rem;',
    small: 'font-size: 1.4rem',
    medium: 'font-size: 1.6rem',
    large: 'font-size: 2.4rem',
    largest: 'font-size: 8rem',
}

export const color = {
    salmonRed: 'color: #ef6c67',
    sandyBrown: 'color: #eab462',
    aquaBlue: 'color: #70bdc2',
    brightBlue: 'color: #039be5',
    greyLight: 'color: #f5f5f5',
    slateBlueGrey: 'color: #6B8290',
}
export const backgroundColor = {
    primaryDark1: 'background-color: #33363F',
    primaryDark2: 'background-color: #1E202A',
    salmon: 'background-color: #66d9e8',
    dullSteelBlue: 'background-color: #77919A',
    sandyBrown: 'background-color: #eab462',
    navyDark: 'background-color: #18212b',
    greyLight: 'background-color: #f5f5f5',
    salmonRed: `background-color: #ef6c67`,
    blueGrey: `background-color: #F8FDFB`,
    darkerLightBlueGrey: `background-color: #D6E2EC`,
    linen: `background-color: #f7ebe1`,
    goldenRod: `background-color: #f7b032`,
    turquise: `background-color: #50aacb`,
    steelBlue: `background-color: #35888b`,
}



//---------FLEX COMMANDS---------------//

export const flexContent = {
    center: '{display: flex; align-items: center; justify-content:center}',
}

//THEME COLORS

export const colorSalmonRed = 'color: #ef6c67'
export const colorSandyBrown = 'color: #eab462'
export const colorAquaBlue = 'color: #70bdc2'
export const colorBrightBlue = 'color: #039be5'
export const colorGreyLight = 'color: #f5f5f5'
export const colorSlateBlueGrey = 'color: #6B8290'

//Background COLORS

export const BackgroundColorSandyBrown = 'background-color: #eab462'
export const BackgroundColorNavyDark = 'background-color: #18212b'
export const BackgroundColorGreyLight = 'background-color: #f5f5f5'
export const BackgroundSalmonRed = `background-color: #ef6c67`
export const BackgroundLightBlueGrey = `background-color: #F8FDFB`
export const BackgroundDarkerLightBlueGrey = `background-color: #D6E2EC`
export const BackgroundLinen = `background-color: #f7ebe1`
export const BackgroundGoldenRod = `background-color: #f7b032`

//Shadow & Border themes

export const ShadowLight = 'box-shadow: 4px 4px 8px 1px rgba(194,190,194,1)'
export const ShadowLifted = 'box-shadow: 6px 7px 9px 2px rgba(194,190,194,0.9)'
export const border = `border-bottom: 1px solid #e0e0e0;`


