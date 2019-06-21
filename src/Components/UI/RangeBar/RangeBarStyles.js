import styled, {css} from "styled-components"
import { fontSize, color, backgroundColor,
} from "../../../Shared/Styles"




export const RangebarContainerStyled = styled.div `
    display: flex;
    margin-top: 2rem;
    position: relative;
    align-content: center;
    justify-content: space-around;
    padding-left: 1rem;
    width: 35rem;
` 


export const RangeBarStyled = styled.input`

height: 2.8rem;
-webkit-appearance: none;
outline: none;
background-color: transparent;
transition: all .3s;
-webkit-appearance: none;
width: 18rem;
&:active + &__value {
    box-sizing: border-box;
    border-bottom: 4px solid ${color.salmonRed};
    z-index: 1;
}


&::-webkit-slider-runnable-track{

    ${backgroundColor.sandyBrown}
    height: 3px; //track width
    border-radius: 4px;
    z-index: 2;
}

&:active::-webkit-slider-runnable-track {
    ${backgroundColor.salmonRed}
    z-index: 2;
}

&::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${backgroundColor.sandyBrown}
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 50%;
    margin-top: -1rem; //thumbheight
    cursor: pointer;
    border: 2px solid #fff;
    transition: .3s;
    z-index: 2;
}
&:active::-webkit-slider-thumb  {
    ${backgroundColor.salmonRed}
    z-index: 2;;
}

`

export const RangeBarValueStyled = styled.div`
        position: absolute;
        top: -2rem;
        left: 21rem;
        border-radius: 1px;
        ${backgroundColor.navyDark};
        padding: .8rem;
        height: 3rem;
       ${fontSize.medium};
        width: 6rem;
        align-content: center;
        text-align: center;
        right: 4rem;
        ${color.greyLight};
        z-index: 1;

`

export const RangeBarLabelStyled = styled.label`
        color: grey;
        ${fontSize.medium};
        position: absolute;
        top: -1.2rem;
        left: 3rem;
`

export const QuestionBoxStyled = styled.div`
        position: absolute;
        top: -.5rem;
        right: 4rem;
        height: 2rem;
        width: 2rem;
        ${backgroundColor.greyLight};
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        ${fontSize.medium};
`

export const QuestionExplanationStyled = styled.div`
        display: none;
        height: 15rem;
        width: 32rem;
        border-radius: 4px;
        ${backgroundColor.greyLight};
        ${backgroundColor.navyDark};
        position: absolute;
        ${fontSize.medium};
        z-index: 1000;
        padding: 2rem;
        text-align: left;
        top: 4rem;
        right: -2.8rem;
        line-height: 1.9rem;



        &:after {
            content: "";
            ${backgroundColor.greyLight};
            position: absolute;
            width: 2rem;
            height: 2rem;
            right: 3rem;
            top: -1rem;
            transform: rotate(45deg);
            z-index: -1;
        }
`