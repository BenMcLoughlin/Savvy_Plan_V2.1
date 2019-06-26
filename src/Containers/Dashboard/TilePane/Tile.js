import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import FontAwesome from "react-fontawesome"


const Tile = (props) => {
    return (
        <StyledLink to={props.link} gridArea={props.gridArea}>
        {
        props.tileType === "title" ? 
        <StyledTitle gridArea={props.gridArea}>
            {props.title}
        </StyledTitle>
        :
        props.tileType === "single" ? 
        <StyledSingleTile gridArea={props.gridArea}>
            <heading>
            <FontAwesomeStyled name={props.icon}/>
              {props.title}
            </heading>
            <value>{props.value1}</value>
            <subHeading>{props.subTitle1}</subHeading>
        </StyledSingleTile>

        : props.tileType === "dual" ?

        <StyledDualTile gridArea={props.gridArea}>
            <heading>
                <FontAwesomeStyled name={props.icon}/>
                {props.title}
            </heading>
            <outputContainer>
                <output>
                    <value>{props.value1}</value>
                    <subHeading>{props.subTitle1}</subHeading>           
                </output>
                <output>
                    <value>{props.value2}</value>
                    <subHeading>{props.subTitle2}</subHeading>           
                </output>
             </outputContainer>
         </StyledDualTile>

        : props.tileType === "triple" ?

        <StyledTripleTile gridArea={props.gridArea}>
            <heading>
                <FontAwesomeStyled name={props.icon}/>
                {props.title}
            </heading>
            <outputContainer>
                <output>
                    <value>{props.value1}</value>
                    <subHeading>{props.subTitle1}</subHeading>           
                </output>
                <output>
                    <value>{props.value2}</value>
                    <subHeading>{props.subTitle2}</subHeading>           
                </output>
                <output>
                    <value>{props.value3}</value>
                    <subHeading>{props.subTitle3}</subHeading>           
                </output>
             </outputContainer>
         </StyledTripleTile>
        : props.tileType === "chart" ?

        <StyledTripleTile gridArea={props.gridArea}>
            <heading>
                <FontAwesomeStyled name={props.icon}/>
                {props.title}
            </heading>
            <outputContainer>
                <output>
                    <value>{props.value1}</value>
                    <subHeading>{props.subTitle1}</subHeading>           
                </output>
                <chart>
                </chart>
             </outputContainer>
         </StyledTripleTile>
      : null
        }
        </StyledLink>
        
    )
}

const StyledLink = styled(Link)`
    grid-area: ${props => props.gridArea};
    text-decoration: none;
`

const FontAwesomeStyled = styled(FontAwesome)`
    font-size: 1.3rem;
    margin-right: 0.5rem;
    text-decoration: none;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    font-size: ${props => props.theme.fontSize.smallMedium};
    color: ${props => props.theme.color.text1};
`

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
const StyledSingleTile = styled(StyledTile)`

`
const StyledDualTile = styled(StyledTile)`

    & outputContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;

    }
`
const StyledTripleTile = styled(StyledTile)`

    & value {
        font-size: ${props => props.theme.fontSize.medium};
    }

    & outputContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
     

    }

    & chart {
        background-color: blue;
        & img {
            width: 40rem;
            height: 10rem;
        }
    }
`



export default Tile


