import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {PlusIcon} from "style/Icons"
import {setKeyValue_action} from "redux/actions"
import {employment_selector, business_selector, retirement_selector} from "redux/income/income_selectors"
import DisplayTile from "pages/income/components/DisplayTile"
import {incomeStream_data, colorArray_data} from "pages/income/data/income_data"


const DisplayBox = ({ reg, instanceArray, createNewItem, setStream, progress_reducer, setKeyValue_action,setId, employment_selector, business_selector, retirement_selector}) => {                  

    const age1 =  reg === "retirementIncome" ? 65 : 18                                                                                      //these are the ages for the dual range bar
    const age2 =  reg === "retirementIncome" ? 95 : 25                                                                                        //We want the dual range bar to be pre set to higher ages if the user is inputting retrement income                                                                                

    const [color, setColor] = useState(progress_reducer.incomeColor)                                                                            //to keep the color the same as the chart we store the color on the instance object
    const newState = incomeStream_data(colorArray_data[color], age1, reg, " ", age2, 0)                                                     //initial State is found in data 
                                    
    const selector =  reg === "employmentIncome" ? employment_selector
                    : reg === "businessIncome" ? business_selector
                    : retirement_selector 


    const addNewCategory = (reg) => {                                                                                                                  //Creates a new item 
        createNewItem(newState)                                                                                                                  //Passes in the local new state
        setKeyValue_action("incomeColor", "progress_reducer", (color + 1))                                                                                           //to keep the colors different we store it in the progress reducer             
    }
return (
        <Wrapper>               
          <Header>                                                                                                                                                         
                <h2>{_.startCase(reg)}</h2>     
            </Header>
            
            <Container> 
                {
                    selector.map(d => <DisplayTile                                                                                                 //this selector contains an array of the income streams, seperated by if they contribute to CPP or not, eg employment, business or retirement
                                                         key={d}
                                                         stream={d}
                                                         />)
                }
    
          <DarkAdd onClick={() => addNewCategory()}/>
            </Container>
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    income_reducer2: state.income_reducer2,
    progress_reducer: state.progress_reducer,
    employment_selector: employment_selector(state),
    business_selector: business_selector(state),
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