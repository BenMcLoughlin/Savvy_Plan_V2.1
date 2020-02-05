import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import WelcomePage from "pages/newNetWorth/wizard/WelcomePage"
import ButtonLight from "UI/buttons/ButtonLight"
import ShortTermAssets from "pages/newNetWorth/wizard/ShortTermAssets"
import InvestmentAssets from "pages/newNetWorth/wizard/InvestmentAssets"
import PropertyAssets from "pages/newNetWorth/wizard/PropertyAssets"
import UnsecuredDebt from "pages/newNetWorth/wizard/UnsecuredDebt"
import SecuredDebt from "pages/newNetWorth/wizard/SecuredDebt"
import AddForm from "pages/newNetWorth/wizard/AddForm"

const Wizard = () => {    

    const [count, setCount] = useState(1)                                                              // toggles display between asset and liability, true shows asset, false shows liability

    return (
        <Page> 
          {
              count === 0 ? 
              <WelcomePage />
              : count === 1 ? 

                <AddForm
                  category={"assets"}
                  subCategory={"cashAssets"}
                  currentValueLabel={"Cash Value"}
                  interestRateLabel={"Interest Rate"}
                  accountTypeArray = {["checking Account", "savings account", "garaunteed investment certificates"]}
                />

              : count === 2 ? 

                 <AddForm
                  category={"assets"}
                  subCategory={"investmentAssets"}
                  currentValueLabel={"Current Value"}
                  bookValueLabel={"Book Value"}
                  interestRateLabel={"Rate of Return"}
                  accountTypeArray = {["TFSA", "RRSP", "RESP","Non-Registered Savings", "LIRA" ]}
                />

              : count === 3 ? 

                  <AddForm
                  category={"assets"}
                  subCategory={"propertyAssets"}
                  currentValueLabel={"Market Value"}
                  bookValueLabel={"Purchase Price"}
                  interestRateLabel={"Appreciation Rate"}
                  accountTypeArray = {["Primary Residence", "Rental Property", "Vacation Home","Vehicle", "Other" ]}
                />
              : count === 4 ? 
                  <AddForm
                  category={"liabilities"}
                  subCategory={"unsecuredDebt"}
                  currentValueLabel={"Current Debt Value"}
                  interestRateLabel={"Interest Rate"}
                  accountTypeArray = {["Credit Cards", "Line of Credit", "Student Loan","Other"]}
                />
              : count === 5 ? 

                  <AddForm
                  category={"liabilities"}
                  subCategory={"securedDebt"}
                  currentValueLabel={"Current Debt Value"}
                  bookValueLabel={"Mortgage Starting Balance"}
                  interestRateLabel={"Interest Rate"}
                  accountTypeArray = {["Credit Cards", "Line of Credit", "Student Loan","Other"]}
                />
            
               : 
              null
          }
            <Buttons>
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                                < ButtonLight forward onClick={() => setCount(count + 1)}/>
             </Buttons>
        </Page>
       
    )

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(Wizard )


//-----------------------------------------------STYLES-----------------------------------------------//


const Page = styled.div`
    grid-area: b;
    width: 100%;
    height: 40rem;
    display: grid;
    text-align: center;
`

const Header = styled.div`
   grid-area: a;
   width: 100%;
   height: 10rem;
   display: flex;
`
const Left = styled.div`
  width: 20rem;

`
const Right = styled.div`
  width: 45rem
  display: flex;
  flex-direction: column;
  margin-left: 15rem;
  padding: 2rem;
`


const Buttons = styled.div`
    position: absolute;
    top: 64rem;
    left: 38%;
    width: 15rem;
    display: flex;
    justify-content: center;
    margin-top: 7rem;
    margin-left: 11rem;
`
const H3 = styled.h3`
   font-style: italic;
   padding: 1rem;
   
`





 