import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import FontAwesome from "react-fontawesome"

import SavingsPlanChart from "./Charts/SavingsPlanChart"
import LifetimeIncomeChart from "./Charts/LifetimeIncomeChart"

const Tile = (props) => {
    return (
        <StyledLink to={props.link} gridArea={props.gridArea}>
            {
                props.tileType === "title" ?
                <StyledTitle>
                    {props.title}
                </StyledTitle> : 
                <StyledTile>
                    <heading>
                        <FontAwesomeStyled name={props.icon}/>
                        {props.title}
                    </heading>
                    <OutputContainer tileType={props.tileType}>
                            <output>
                                <value>{props.value1}</value>
                                <subHeading>{props.subTitle1}</subHeading>           
                            </output>
                        {
                            props.tileType === "dual" ?
                            <output>
                                <value>{props.value2}</value>
                                <subHeading>{props.subTitle2}</subHeading>           
                            </output>
                        :
                            props.tileType === "triple" ?
                            <>
                            <output>
                                <value>{props.value2}</value>
                                <subHeading>{props.subTitle2}</subHeading>           
                            </output>
                            <output>
                                <value>{props.value3}</value>
                                <subHeading>{props.subTitle3}</subHeading>           
                            </output>
                            </>
                        :
                            props.tileType === "chart" ?
                            <output>
                               {
                                   props.chart === "LifeTimeIncome" ? 
                                   <LifetimeIncomeChart/> :
                                   <SavingsPlanChart/>    
                               }  
                            </output>
                        :
                         null
                        }
                 </OutputContainer>
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
    font-family: 'Lato', sans-serif;
    grid-area: ${props => props.gridArea};
    font-weight: 300;
    font-size: 30px;
    letter-spacing: .2rem;
    display: flex;
    align-items: center;
    color: ${props => props.theme.color.text3};
`
//-----STYLEDTILE
const StyledTile = styled.div`
    margin: 0;
    background-color: ${props => props.theme.color.background2};
    height: 100%;
    width: 100%;
    text-align: center;
    color: ${props => props.theme.color.text2};
    font-family: 'Lato', sans-serif;
    border-radius: 3px;
    overflow: hidden;
    grid-area: ${props => props.gridArea};
    box-shadow: ${props => props.theme.boxShadow.small};
    transition: all .2s ease-in-out;
    position: relative;
    opacity: 0.9;

    &:hover {
        box-shadow: ${props => props.theme.boxShadow.lifted};
        transform: translateY(-.03rem) scale(1.006);
    }


    value {
        font-weight: 400;
        font-size: ${props => props.theme.fontSize.mediumLarge};
        color: ${props => props.theme.color.text1};
        padding: .5rem;
        display: block;

    }
    heading {
        background-color: ${props => props.theme.color.background3};
        border-bottom: 1px solid white;
        font-size: ${props => props.theme.fontSize.medium};
        width: 100%;
        display: block;
        padding: .5rem;
        box-sizing: border-box;
    }
    subHeading {
        color: ${props => props.theme.color.accent2};
        display: block;
        font-size: ${props => props.theme.fontSize.small};

    }
    

`
//-----OUTPUT CONTAINER
const OutputContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.tileType === "triple" ? "column" : "row"};
`
    

//-----FONTAWESOMESTYLED
const FontAwesomeStyled = styled(FontAwesome)`
    font-size: 1.3rem;
    margin-right: 0.5rem;
    text-decoration: none;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: ${props => props.theme.fontSize.smallMedium};
    color: ${props => props.theme.color.tex};
`