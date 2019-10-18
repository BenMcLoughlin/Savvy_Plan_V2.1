import React, { Component } from 'react'
import styled from "styled-components"


const Tile = (props) => (
    <StyledTile>
         <StyledTitle>
            
        </StyledTitle> 
        <Output>
        <Left>
     
        </Left>
        <Right>
      
        </Right>             
</Output> 
    </StyledTile>

)

export default class TileDisplay extends Component {
    render() {
        return (
            <TileDisplayWrapper>
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
            </TileDisplayWrapper>
        )
    }
}

//-----------------------------------------------STYLES-----------------------------------------------//

const TileDisplayWrapper = styled.div`
    grid-area: t;
    display: flex;
    justify-content: space-around;
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
        SubHeading {
            font-size: ${props => props.theme.fontSize.small};
            font-weight: 700;
        }
`
//-----OUTPUT CONTAINER

const Output = styled.div `
    width: 100%;
    margin-top: 1rem;
    display: flex;
`
const Left = styled.div `
    display: flex;
    flex-direction: column;
`
const Right = styled(Left) `


`


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
// 