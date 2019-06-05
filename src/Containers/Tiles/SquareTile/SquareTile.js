import React from 'react'
import { SquareTileStyled, TileHeadingStyled, TileMainStyled, TileSubHeadingStyled, TileChartStyled } from "./SquareTileStyles"
import TaxMiniChart from "../../../assets/images/TaxMiniChart.png"

export default function SquareTile(props) {
    return (
        <SquareTileStyled>
            <TileHeadingStyled>
                {props.heading}
            </TileHeadingStyled>
            <TileMainStyled>
                {props.mainValue}
            <TileSubHeadingStyled>
                 {props.subHeading}
            </TileSubHeadingStyled>
            </TileMainStyled>
            <TileChartStyled> 
             <img src={props.chart} style={{height: "4rem", width: "80%"}}alt=""/>
            </TileChartStyled>
        </SquareTileStyled>
    )
}