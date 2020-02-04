import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import WelcomePage from "pages/newNetWorth/wizard/WelcomePage"
import ButtonLight from "UI/buttons/ButtonLight"
import ShortTermAssets from "pages/newNetWorth/wizard/ShortTermAssets"
import InvestmentAssets from "pages/newNetWorth/wizard/InvestmentAssets"

const Wizard = () => {    

    const [count, setCount] = useState(2)                                                              // toggles display between asset and liability, true shows asset, false shows liability

    return (
        <Page> 
          {
              count === 0 ? 
              <WelcomePage />
              : count === 1 ? 
              <>
                < Header>
                        <Left>
                        <h1>Assets</h1>
                        </Left>
                        <Right>
                            <h2>Short Term</h2>
                            <H3>Assets that can be converted to Cash immediately.</H3>
                        </Right>
                </Header>
                <ShortTermAssets/>
              </>
              : count === 2 ? 
              <>
              < Header>
              <Left>
                        <h1>Assets</h1>
                        </Left>
                        <Right>
                            <h2>Investments</h2>
                            <H3>Savings for the long term.</H3>
                        </Right>
                </Header>
                <InvestmentAssets/>
              
                </>
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
   ${props => props.theme.pageBaseStyles}
    width: 100%;
    height: 80rem;
    display: grid;
    text-align: center;
    grid-template-rows: minmax(10rem, 12rem) minmax(30rem, 40rem);
    grid-template-areas: 
    "a a a"
    "b b b"

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
    top: 60rem;
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





 