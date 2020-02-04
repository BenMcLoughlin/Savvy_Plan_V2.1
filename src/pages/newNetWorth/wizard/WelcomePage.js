import React, {useState} from "react"
import styled from "styled-components"
import ControlPanel from "pages/netWorth/components/ControlPanel"
import Header from "pages/netWorth/components/Header"
import {connect} from "react-redux"

const Welcome = () => {    

    return (
        <Page> 
          <h1>We’ll begin our plan by Calculating your Net Worth. </h1>
          <H2>Your net worth is the value of everything you own and
serves as our measuring stick in building your financial plan. </H2>
<h1>Lets Get Started</h1>
        </Page>
       
    )

}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {})(Welcome )


//-----------------------------------------------STYLES-----------------------------------------------//


const Page = styled.div`
    width: 100%;
    height: 60rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`


 const H2 = styled.h2`
    width: 45rem;
 `