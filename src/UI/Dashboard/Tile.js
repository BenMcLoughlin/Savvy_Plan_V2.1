import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"

import {PieChart} from "styled-icons/feather/PieChart"
import {BarChart} from "styled-icons/feather/BarChart"


import {setFlex} from "../../Styles/Themes"

// This component renders 4 different types of tile according to the type of data it is passed. It uses a ternary operator to 
// determine which type of tile it is rendering according to the "tileType" prop it is passed. 

const Tile = (props) => {
    return (
        <StyledLink to={props.link} gridArea={props.gridArea}>
            {
                props.tileType === "title" ?
                <StyledTitle>
                    {props.title}
                </StyledTitle> : 
                <StyledTile gridArea={props.gridArea}>
                       { props.tileType === "smallChartsTile" ?
                            <Output>
                              <Left>
                                <PieChart1/>
                                 <subHeading>{props.subTitle}</subHeading> 
                              </Left>
                              <Right>
                                 <value>{props.value}</value>
                                 <heading>{props.title}</heading>
                                 <BarChart1/>
                              </Right>             
                            </Output> :
                        
                            props.tileType === "largeTextTile" ?
                            <output>
                                    <LargeValue>
                                        {props.value}
                                        <value>{props.abbreviation}</value>
                                    </LargeValue>

                                <heading>{props.title}</heading>           
                            </output>
                        :
                            props.tileType === "triple" ?
                            <>
                            <output>
                                <value>{props.value}</value>
                                <subHeading>{props.subTitle}</subHeading>           
                            </output>
                            <output>
                                <value>{props.value}</value>
                                <subHeading>{props.subTitle}</subHeading>           
                            </output>
                            </>
                        :
                            props.tileType === "chart" ?
                            <output> 
                            </output>
                        :
                         null
                        }
                </StyledTile>
        }
        </StyledLink>
        
    )
}

export default Tile

//================================STYLES----------------------------------------------//

//-----LINK
const StyledLink = styled(Link)`
    grid-area: ${props => props.gridArea};
    text-decoration: none;
`

//-----TITLE

const StyledTitle = styled.div`
    font-weight: 400;
    font-size: 2.4rem;
    letter-spacing: .2rem;
    color: ${props => props.theme.color.contrastText1};
    height: 100%;
    display: flex;
    align-items: center;

`

//-----STYLEDTILE

const StyledTile = styled.div`
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

const PieChart1 = styled(PieChart)`
    height: 8rem;
    width: 8rem;
    color: ${props => props.theme.color.contrastText1};

`
const BarChart1 = styled(BarChart)`
    height: 2rem;
    width: 5rem;
    color: ${props => props.theme.color.contrastText1};

`
const Left = styled.div `
     ${setFlex({})};
    flex-direction: column;
`
const Right = styled(Left) `

`
const LargeValue = styled.div `
    font-size: ${props => props.theme.fontSize.largest};
    font-weight: 200;
    letter-spacing: 9px;
    ${setFlex({align: "baseline", justify: "center"})};
`

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // The tile component can render 4 different types of tile to the tilepane. It uses a switch statement to look at the 
    //data coming in and to determine which type of tile it needs to render. 