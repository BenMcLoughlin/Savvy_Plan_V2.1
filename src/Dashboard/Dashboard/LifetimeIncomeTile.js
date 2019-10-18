import React, { Component } from 'react'
import styled from "styled-components"
import {setFlex} from "../../Styles/Themes"



export default class LifetimeIncomeTile extends Component {
    render() {
        return (
            <Output>
            <Left>
            
               <subHeading></subHeading> 
            </Left>
            <Right>
               <value></value>
               <heading></heading>
            
            </Right>             
          </Output>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//


const LifetimeIncomeTileWrapper  = styled.div`
    grid-area: j;
    background-color: ${props => props.theme.color.background2};
    color: ${props => props.theme.color.contrastText1};
    height: 100%;
    width: 100%;
    border-radius: 3px;
    overflow: hidden;
    /* box-shadow: ${props => props.theme.boxShadow.small}; */
    transition: all .2s ease-in-out;
    position: relative;
    opacity: 0.9;
    font-weight: 300;
    text-align: center;

    &:hover {
        box-shadow: ${props => props.theme.boxShadow.lifted};
        transform: translateY(-.01rem) scale(1.0007);

        &::after {
            content: "";
            height: 4rem;
            width: 100%;
            background: ${props => props.theme.color.dullSteelBlue};
            position: absolute;
            bottom: 0rem;
            left: 0rem;
            clip-path: polygon(0 78%, 0% 100%, 100% 100%);
             }
         }

        value {
            font-weight: 300;
            font-size: ${props => props.theme.fontSize.mediumLarge}; 
            padding: .5rem;
            display: block;
            text-transform: uppercase;
        }

        heading {
                text-transform: uppercase;
                font-size: ${props => props.theme.fontSize.smallMedium};
        }
        subHeading {
            font-size: ${props => props.theme.fontSize.small};
            font-weight: 700;
        }
`
//-----OUTPUT CONTAINER

const Output = styled.div `
    width: 100%;
    margin-top: 1rem;
    display: flex;
    ${setFlex({align: "center", justify: "space-around"})};
`

//-----PIE AND BAR CHARTS

const Left = styled.div `
     ${setFlex({})};
    flex-direction: column;
`
const Right = styled(Left) `

`