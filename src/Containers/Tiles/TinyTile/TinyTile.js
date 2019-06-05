import React from 'react'
import { TinyTileStyled, TileMainStyled, TileSubHeadingStyled, TileChartStyled } from "./TinyTileStyles"
import TaxMiniChart from "../../../assets/images/TaxMiniChart.png"

export default function TinyTile(props) {
    return (
        <TinyTileStyled>
            <TileMainStyled>
                {props.mainValue}
            <TileSubHeadingStyled>
                 {props.subHeading}
            </TileSubHeadingStyled>
            </TileMainStyled>
            
        </TinyTileStyled>
    )
}