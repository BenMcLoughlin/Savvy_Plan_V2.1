import React from 'react' 
import {Link} from "react-router-dom"
import {
TilePaneStyled,
 TilePaneFirstHeaderStyled,
 TilePaneSecondHeaderStyled,
 TaxTileStyled,
 NetWorthTileStyled,
 SavingsTileStyled,
 CashflowTileStyled,
 RetirementIncomeTileStyled,
 LifetimeIncomeTileStyled,
 SavingsPlanTileStyled} 
 from "./TilePaneStyles"

 import SquareTile from "../Tiles/SquareTile/SquareTile"

export default function TilePane() {
    return (
        <TilePaneStyled>
          <TilePaneFirstHeaderStyled></TilePaneFirstHeaderStyled>

          <Link to="/TaxPopop" style={{ textDecoration: 'none', gridArea: "t"}}>
            <TaxTileStyled>
                  <SquareTile/>
            </TaxTileStyled>
          </Link>

          <NetWorthTileStyled><SquareTile/></NetWorthTileStyled>
            <SavingsTileStyled><SquareTile/></SavingsTileStyled>
            <CashflowTileStyled><SquareTile/></CashflowTileStyled>
            <TilePaneSecondHeaderStyled>SecondHeader</TilePaneSecondHeaderStyled>
            <RetirementIncomeTileStyled>RetirementIncome</RetirementIncomeTileStyled>
            <LifetimeIncomeTileStyled>LifetimeIncome</LifetimeIncomeTileStyled>
            <SavingsPlanTileStyled>Savings Plan</SavingsPlanTileStyled>
        </TilePaneStyled>
    )
}
// <TilePaneStyled>
// <TilePaneFirstHeaderStyled></TilePaneFirstHeaderStyled>

// <Link to="/TaxPopop" style={{ textDecoration: 'none', gridArea: "t"}}>
//   <TaxTileStyled>
//         <SquareTile/>
//   </TaxTileStyled>
// </Link>

// <NetWorthTileStyled><SquareTile/></NetWorthTileStyled>
//   <SavingsTileStyled><SquareTile/></SavingsTileStyled>
//   <CashflowTileStyled><SquareTile/></CashflowTileStyled>
//   <TilePaneSecondHeaderStyled>SecondHeader</TilePaneSecondHeaderStyled>
//   <RetirementIncomeTileStyled>RetirementIncome</RetirementIncomeTileStyled>
//   <LifetimeIncomeTileStyled>LifetimeIncome</LifetimeIncomeTileStyled>
//   <SavingsPlanTileStyled>Savings Plan</SavingsPlanTileStyled>
// </TilePaneStyled>