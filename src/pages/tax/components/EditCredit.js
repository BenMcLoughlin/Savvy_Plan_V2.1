import React from "react"; import styled from "styled-components"; import {connect} from "react-redux"
import InstanceNav from "pages/tax/components/InstanceNav"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import _ from "lodash"
import {rrspSavings_selector, rrspCost_selector} from "redux/tax/tax_selectors"
import {income_selector} from "redux/income/income_selectors"
import CreditBarChart from "charts/tax/CreditBarChart"
import {setAge, hideStream} from "services/ui/ui_functions"
import {creditTaxSavings} from "services/tax/tax_functions"
import {ArrowLeft} from "style/Icons"

const EditCredit = ({setNestedKeyValue_action, setKeyValue_action, rrspSavings_selector, rrspCost_selector, tax_reducer, income_selector, ui_reducer }) => {      //after clicking a crdit this box pops up and allows the user to edit the amount they are claiming

    const {stream, id, taxAge} = ui_reducer                                                                                           //figures out which credit to show based on what is now in the ui_reducer
    
    const {[id]: instance} = tax_reducer                                                                                      //links the credit shown with the data in the tax_reducer
    
    const instanceArray =  Object.values(tax_reducer).filter(d => d.stream === stream).sort((a,b) => a.age1 - b.age1)         //creats an array of all instances of that credit, for instance if the credit is rrsp contributions they may have an array of many different times they contributed    
      
    const setDualRangeBar = (name, value) => {                                                                                //sets the age, as well as the surrounding ages in the array of instances
    if(instance.reg === "RRSP") {
        setAge(id, instanceArray, name, setNestedKeyValue_action, "savings_reducer", value)}                                  //If they are editing rrsp that also has to change in the savings_reducer                                 
        setAge(id, instanceArray, name, setNestedKeyValue_action, "tax_reducer", value)
        }                                                                                                                       
             
        const savings = creditTaxSavings(taxAge, instance, income_selector)
    return (
        <Wrapper>
                <Header color={instance.color}>
                <BackArrow  onClick={() => {
                    console.log("hi");
                    hideStream(setKeyValue_action)}}/>
                <h3>{`Annual Taxes Saved ${(Math.round(savings/100)*100) /1000}k`}</h3>
                      <h2>{_.startCase(stream)}</h2> 
                      {
                          instance.reg === "RRSP" ?
                          <h3>{`Extra Taxes Paid ${Math.round(rrspCost_selector/1000)}k`}</h3>
                          : <div style={{width: "15rem"}}></div>
                      }
                
                </Header>
                <InstanceNav   
                           instanceArray={instanceArray}
                           instance={ instance}
                />
                <BarChartPlaceHolder>
                    <CreditBarChart/>
                </BarChartPlaceHolder>
                {instance.type !== "fixed"      ?
                <Container >          
                             <Left>                                                                                         
                                      <RangeBar 
                                               setNestedKeyValue_action={setNestedKeyValue_action}                              //The range bar is used to change the value of the credit
                                               reducer="tax_reducer"
                                               second_reducer={instance.reg === "RRSP" ? "savings_reducer" : null}   
                                               instance={instance}       
                                       /> 
                              </Left>
                              <Right>
                                    <DualRangeBar
                                                bottom={instance.age1}                                                                                  
                                                top={instance.age2}                                                                                         
                                                setValue={setDualRangeBar}                                                                           
                                    /> 
                             </Right>
                </Container>
                : null   
            }  

        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    rrspSavings_selector: rrspSavings_selector(state),
    ui_reducer: state.ui_reducer, 
    tax_reducer: state.tax_reducer,
    income_selector: income_selector(state),
    rrspCost_selector: rrspCost_selector(state)
})

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action,})(EditCredit )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 90rem;
    height: 28rem;
    margin:1rem auto;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    grid-area: c;
    z-index: 1000;
`

const Left = styled.div`  
    width:  50%;
    height: 100%;
    padding: 2rem;
    margin-left: 4rem;
    margin-top: -2rem;
`

const Right = styled.div`
    width:  50%;
    padding: 2rem;
    margin-left: 2rem;
    margin-top: -5rem;
`

const Container = styled.div`
    width: 90rem;
    height: 20rem;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    display: flex;
    background: ${props => props.theme.color.ice};
`



const Header = styled.div`
    width: 100%;
    background: #55869d;
    height: 4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: ${props => props.theme.color.ice};
    position: relative;
`

const BarChartPlaceHolder = styled.div`
    height: 7rem;
    width: 100%;
    position: relative;
    background: ${props => props.theme.color.ice};
`
const BackArrow = styled(ArrowLeft)`
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    color: ${props => props.theme.color.ice};
    top: 0rem;
    left: 1rem;
    cursor: pointer;
`