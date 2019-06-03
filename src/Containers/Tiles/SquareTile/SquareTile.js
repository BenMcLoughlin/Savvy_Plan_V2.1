import React from 'react'
import { SquareTileStyled, TileHeadingStyled, TileMainStyled, TileSubHeadingStyled, TileChartStyled } from "./SquareTileStyles"
import TaxMiniChart from "../../../assets/images/TaxMiniChart.png"

export default function SquareTile() {
    return (
        <SquareTileStyled>
            <TileHeadingStyled>
            Tax Position
            </TileHeadingStyled>
            <TileMainStyled>
            40%
            <TileSubHeadingStyled>Marginal Tax Rate</TileSubHeadingStyled>
            </TileMainStyled>
            <TileChartStyled> 
             <img src={TaxMiniChart} style={{height: "4rem", width: "80%"}}alt=""/>
            </TileChartStyled>
        </SquareTileStyled>
    )
}