import React from "react"; import styled from "styled-components"; import {connect} from "react-redux"
import InstanceNav from "pages/tax/components/InstanceNav"
import FormInput  from "UI/forms/Input"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar1/RangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import CreditSelector from "pages/tax/components/CreditSelector"
import {setValue_action, setNestedKeyValue_action, deleteInstance} from "redux/actions"
import _ from "lodash"
import {taxCredit_data} from "pages/tax/data/tax_data"
import {cpp_selector} from "redux/income/income_selectors"
import CreditBarChart from "charts/tax/CreditBarChart"
import {setAge} from "services/ui/ui_functions"


const EditCredit = ({stream, instanceArray, setNestedKeyValue_action, createNewItem, id, setId,  setStream}) => {    

const instance = instanceArray.find(d => d.id === id)       
const setDualRangeBar = (name, value) => {                                                                                       //sets the age, as well as the surrounding ages in the array of instances
   if(instance.reg === "RRSP") {
       setAge(id, instanceArray, name, setNestedKeyValue_action, "savings_reducer", value)}
       setAge(id, instanceArray, name, setNestedKeyValue_action, "tax_reducer", value)
    }

    const addSection = () =>  {createNewItem(taxCredit_data(instance.eligible, (+endAge), instance.stream, (+endAge + 5), instance.type, instance.value))}
    
                                                                                                                                //we're only provided with the id, not the entire instance, this grabs the entire instance details

    const endAge = instanceArray[instanceArray.length -1].age2                                                                //grabs the age2 of the next instance in the array, used for if we create a new instance and the age is then automatically set to be higher
    return (
        <Wrapper>
            {
                instance &&
                <>
                <Header>
                <h2>{_.startCase(stream)}</h2> 
                </Header>
                <InstanceNav color={"blue"}
                                itemList={instanceArray}
                                setId={setId}
                                id={id}
                                onClick={() => deleteInstance(id, instance, instanceArray, "tax_reducer", setStream, setId)}
                                addSection={addSection}
                                 addSection={addSection}
                            />
 
                <BarChartPlaceHolder>
                    <CreditBarChart/>
                </BarChartPlaceHolder>
                {instance.type !== "fixed"      ?
                <Container >          
                             <Left>                                                                                                         {/* Choose one is used to select the account type */}
                                      <RangeBar 
                                      setNestedKeyValue_action={setNestedKeyValue_action}                                                                             //Every Add instance has a range bar to set its value
                                      reducer="tax_reducer"
                                      instance={instance}       
                                  /> 
                              </Left>
                                                               
        
                            <Right>
                            <YearsSelectorWrapper> 
                                <SelectorTitleWrapper>
                                    <div>From Age</div>    
                                    <div>To Age</div>    
                                </SelectorTitleWrapper>
                                <DualRangeBar
                                    bottom={instance.age1}                                                                                     //age1 sets the from Age, eg. age 18 in 18-45
                                    top={instance.age2}                                                                                          //age2 sets the to Age, eg. age 45 in 18-45
                                    setValue={setDualRangeBar}                                                                                         //reaches into reducer to set the values
                                /> 
                        </YearsSelectorWrapper>
                                <ButtonWrapper>
                                        <ButtonLight 
                                            text={"Add"}
                                            onClick={() => setStream(false)}
                                        />
                                </ButtonWrapper>
                            </Right>
                  
    
                </Container>
                : null   
            }  
                <ButtonLeftWrapper>
                                <ButtonLight 
                                    text={"Back"}
                                    onClick={() => setStream(false)}
                                />
                        </ButtonLeftWrapper>
                </>
            }
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    cpp_selector: cpp_selector(state),
})

export default connect(mapStateToProps, {setValue_action, setNestedKeyValue_action,})(EditCredit )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width: 90rem;
    height: 33rem;
    margin: 0 auto;
    border-radius: 5px;
    overflow: hidden;
    border: ${props => props.theme.border.primary};
    grid-area: c;
`

const Left = styled.div`  
    width:  50%;
    height: 100%;
    padding: 2rem;
    margin-left: 2rem;
`
const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 2rem;
    right: 2rem;
`
const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 13rem;
    left: 13rem;
`
const Right = styled.div`
    width:  50%;
    padding: 2rem;
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


const YearsSelectorWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`


const SelectorTitleWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: .5rem;
    font-size: ${props =>props.theme.fontSize.small};
    color: ${props => props.theme.color.slate};
`

const Header = styled.div`
    width: 100%;
    background: #55869d;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.ice};
`

const BarChartPlaceHolder = styled.div`
    height: 7rem;
    width: 100%;
    position: relative;
    background: ${props => props.theme.color.ice};
`
