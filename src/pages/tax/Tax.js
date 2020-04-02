import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import ButtonLight from "UI/buttons/ButtonLight"
import Header from "pages/tax/components/Header"
import EditCredit from "pages/tax/components/EditCredit"
import DisplayBox from "pages/tax/components/DisplayBox"
import {creditTypes_data} from "pages/tax/data/tax_data"
import { setKeyValue_action} from "redux/actions"
import TaxLifetimeBarChart from "charts/tax/TaxLifetimeBarChart"


const Tax = ({setKeyValue_action, ui_reducer}) => {                                                                     //shows two charts and a breakdown of the users taxes as well as lists all the credits and deductions

   const {stream, id} = ui_reducer                                                                                      // to show the edit box we need stream and id to be set in the ui_reducer

    return (
        <Wrapper>
            <Header/>
            <Chart>
                <ChartTitle>Lifetime Taxes Per Year</ChartTitle>
                <ChartPlaceHolder>
                    <TaxLifetimeBarChart/>
                </ChartPlaceHolder>
            </Chart>
            {
                stream ? 
                        <EditCredit                                                                                    // when the user clicks a credit a box pops up allowing them to edit it
                        />   
                :  
             <ControlPanel>
                {creditTypes_data.map(d => <DisplayBox  type={d.type}                                                   //the box either sdhows a list of deductions or credits
                                                        id={id}
                                                        stream={stream}  
                                                        />
                )}
            </ControlPanel>
            }
                            <Bottom>
                                <ButtonLeftWrapper>
                                <ButtonLight 
                                            onClick={() =>  setKeyValue_action("taxAge", "ui_reducer", false)}         //displaying taxes depends on if a tax age is set in the ui reducer, this sets it to false and hides it
                                            text={"Back"}
                                        />
                                </ButtonLeftWrapper>
                            </Bottom>

        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action})(Tax )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width:  115rem;
    height: 80rem;
    padding: 1rem;
    margin: 0 auto;
    position: absolute;
    background: white;
    top: 6.5rem;
    left: 20rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    display: grid;
    grid-template-rows: 22rem 13rem 26rem 4rem;
    grid-template-areas:
    'a a a a a a'
    'b b b b b b'
    'c c c c c c'
    'd d d d d d'
`

    const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 2rem;
`

const ControlPanel = styled.div`
    width: 70rem;
    border-radius: 5px;
    height: 100%;            
    margin: 0 auto;     
    padding: 1rem;                                
    display: flex;
    justify-content: space-around;
    grid-area: c;
`
const Bottom = styled.div`
    width: 100%;
`
const Chart = styled.div`
    grid-area: b;
    margin-top: 1rem;
    text-align:center;
    position: relative;

`
const ChartTitle = styled.div`
  font-size: ${props => props.theme.fontSize.small};
  font-weight: 500;
  position: absolute;
  top: 3rem;
  left: 12rem;
`
const ChartPlaceHolder = styled.div`
    margin-top: 4rem;
    height: 9rem;
    width: 95rem;
    margin-left: 8.7rem;
`


