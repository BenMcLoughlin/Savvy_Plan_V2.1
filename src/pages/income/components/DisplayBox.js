import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {PlusIcon} from "style/Icons"
import {setKeyValue_action} from "redux/actions"
import {employment_selector, otherIncome_selector, retirement_selector} from "redux/main/income_selectors"
import DisplayTile from "pages/income/components/DisplayTile"
import {newIncomeInstance, colorArray_data} from "pages/income/data/income_data"
import {createInstance} from "services/ui/ui_functions"

const DisplayBox = ({ incomeType,  setKeyValue_action, user_reducer, employment_selector, otherIncome_selector, retirement_selector, ui_reducer}) => {                  

    const {currentAge} = user_reducer
    const age1 =  incomeType === "retirementIncome" ? 65 : currentAge                                                                                         //these are the ages for the dual range bar before the user has changed anything
    const age2 =  incomeType === "retirementIncome" ? 95 : currentAge + 5                                                                                     //We want the dual range bar to be pre set to higher ages if the user is inputting retrement income                                                                                

    const {changeColor: color} = ui_reducer                                                                                                            //to keep the color the same as the chart we store the color on the instance object                                      
    const newInstance = newIncomeInstance(colorArray_data[color], age1, null, " ", incomeType, age2, true, 0)                                                                   //initial State is found in data, this is the empty state used to create a new object
                              
    const selector =  incomeType === "employmentIncome" ? employment_selector
                    : incomeType === "otherIncome" ? otherIncome_selector
                    : incomeType === "retirementIncome" ? retirement_selector 
                    : "none"
return (
        <Wrapper>               
          <Header>                                                                                                                                                         
                <h2>{_.startCase(incomeType)}</h2>     
            </Header>
            
            <Container> 
                {
                  selector.map(d => <DisplayTile  key={d}                                                                                             //this selector contains an array of the income streams, seperated by if they contribute to CPP or not, eg employment, business or retirement
                                                    color={color}
                                                    stream={d}
                                                         />)
                }
    
          <DarkAdd onClick={() => {
                                    createInstance(newInstance, setKeyValue_action)                                                                      //clicking this button creates a new instance and opens the edit box
                                    setKeyValue_action("changeColor", "ui_reducer", (color + 1))                                                         // changes the color number in the reducer so the color is always a different one
          }}/>
            </Container>
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer,
    progress_reducer: state.progress_reducer,
    user_reducer: state.user_reducer,
    employment_selector: employment_selector(state),
    otherIncome_selector: otherIncome_selector(state),
    retirement_selector: retirement_selector(state),
})

export default connect(mapStateToProps,{ setKeyValue_action})(DisplayBox )


//-----------------------------------------------STYLES-----------------------------------------------//

const Header = styled.div`
    width: 100%;
    height: 4rem;
    color: ${props => props.theme.color.drab};
    border-bottom:  ${props => props.theme.border.primary};
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem 0.5rem 2rem;

`

const Wrapper = styled.div`
    width: 35rem;
    margin: 1rem;
    min-height: 30rem;;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    margin-bottom: 1rem;
    background: ${props => props.theme.color.ice};
`

const Container = styled.div`
    min-height: 10rem;
    max-height: 50rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    justify-content: flex-start;
    overflow: scroll;
`
const Add = styled(PlusIcon)`
    width: 4rem;
    color: grey;
    display: flex;
    position: absolute;
    top: .8rem;
    left: 0rem;
`
const DarkAdd = styled(Add)`
    width: 4rem;
    color: white;
    display: flex;
    position: relative;
    color: grey;
    cursor: pointer;
`