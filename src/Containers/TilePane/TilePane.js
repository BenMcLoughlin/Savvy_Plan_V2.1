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
 import TaxMiniChart from "../../assets/images/TaxMiniChart.png"
 import NetWorthMiniChart from "../../assets/images/NetWorthMiniChart.png"
 import SquareTile from "../Tiles/SquareTile/SquareTile"
 import TinyTile from "../Tiles/TinyTile/TinyTile"

export default function TilePane() {
    return (
        <TilePaneStyled>
          <TilePaneFirstHeaderStyled>Personal Finance Key Indicators</TilePaneFirstHeaderStyled>

        <Link to="/TaxPopop" style={{ textDecoration: 'none', gridArea: "t"}}>
                  <SquareTile
                    heading="Tax tile"
                    mainValue="40%"
                    subHeading="Marginal tax Rate%"
                    chart={TaxMiniChart}
                  />
          </Link>
          <Link to="/NetWorth" style={{ textDecoration: 'none', gridArea: "n"}}>
          <NetWorthTileStyled>
            <SquareTile
                    heading="Net Worth"
                    mainValue="$182,000"
                    subHeading="Total Value of what you own"
                    chart={NetWorthMiniChart}
            />
         </NetWorthTileStyled>
         </Link>
          <Link to="/CashFlow" style={{ textDecoration: 'none', gridArea: "s"}}>
          <NetWorthTileStyled>
            <SquareTile
                    heading="CashFlow"
                    mainValue="$13,000"
                    subHeading="Hard Limit"
                    chart={NetWorthMiniChart}
            />
         </NetWorthTileStyled>
         </Link>
          <Link to="/NetWorth" style={{ textDecoration: 'none', gridArea: "g"}}>
          <NetWorthTileStyled>
            <TinyTile
                    mainValue="73%"
                    subHeading="Personal Finance Score"
                    chart={NetWorthMiniChart}
            />
         </NetWorthTileStyled>
         </Link>
          <Link to="/Insurance" style={{ textDecoration: 'none', gridArea: "c"}}>
          <NetWorthTileStyled>
            <TinyTile
                    mainValue="$400,000"
                    subHeading="Minimum Reccomended Life Insurance"
            />
         </NetWorthTileStyled>
         </Link>
            <TilePaneSecondHeaderStyled>Long Term Financial Plan</TilePaneSecondHeaderStyled>

        <Link to="/SavingsPlan" style={{ textDecoration: 'none', gridArea: "p"}}>
            <SavingsPlanTileStyled>Savings Plan</SavingsPlanTileStyled>
        </Link>
        <Link to="/RetirementIncome" style={{ textDecoration: 'none', gridArea: "r"}}>
            <RetirementIncomeTileStyled>RetirementIncome</RetirementIncomeTileStyled>
        </Link>
        <Link to="/LifeTimeIncome" style={{ textDecoration: 'none', gridArea: "l"}}>
        <LifetimeIncomeTileStyled>LifetimeIncome</LifetimeIncomeTileStyled>
        </Link>
            

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