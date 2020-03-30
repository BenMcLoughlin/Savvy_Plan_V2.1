import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {PlusIcon} from "style/Icons"
import {setKeyValue_action} from "redux/actions"
import * as selector from "redux/tax/tax_selectors"
import DisplayTile from "pages/tax/components/DisplayTile"
import {taxCredit_data, colorArray_data} from "pages/tax/data/tax_data"
import {employment_selector, business_selector, retirement_selector} from "redux/income/income_selectors"

const DisplayBox = ({instanceArray, createNewItem, setStream, progress_reducer, setKeyValue_action, setId, deduction_selector, fixedCredit_selector, variableCredit_selector, type, employment_selector}) => {                  

    const [color, setColor] = useState(progress_reducer.incomeColor)                                                                            //to keep the color the same as the chart we store the color on the instance object
    const newState = taxCredit_data(" ", 18, 24, 10000, 50, colorArray_data[color], type)                                 //initial State is found in data 

    const selector =  type === "deduction" ? deduction_selector :  type === "fixed" ? fixedCredit_selector  :  variableCredit_selector  

    const addNewCategory = () => {                                                                                                                  //Creates a new item 
        createNewItem(newState)                                                                                                                  //Passes in the local new state
        setKeyValue_action("incomeColor", "progress_reducer", (color + 1))                                                                                           //to keep the colors different we store it in the progress reducer             
    }
return (
        <Wrapper>               
          <Header>                                                                                                                                                         
                <h2>{_.startCase(type)}</h2>     
            </Header>
            
            <Container> 
            {
                    selector.map(d => <DisplayTile                                                                                                 //this selector contains an array of the income streams, seperated by if they contribute to CPP or not, eg employment, business or retirement
                                                        key={d}
                                                        stream={d}
                                                        setStream={setStream} 
                                                        setId={setId}
                                                        instanceArray={instanceArray}
                                                        color={"pink"}
                                                        />)
                }
    
          <DarkAdd onClick={() => addNewCategory()}/>
            </Container>
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    deduction_selector: selector.deduction_selector(state),
    fixedCredit_selector: selector.fixedCredit_selector(state),
    variableCredit_selector: selector.variableCredit_selector(state),
    progress_reducer: state.progress_reducer,
    employment_selector: employment_selector(state)
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