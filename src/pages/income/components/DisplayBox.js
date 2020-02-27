import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"
import {setProgress_action} from "redux/progress/progress_actions"
import {employment_selector, business_selector, retirement_selector} from "redux/income/income_selectors"
import DisplayTile from "pages/income/components/DisplayTile"
import {incomeStream_data, colorArray_data} from "pages/income/data/income_data"


const DisplayBox = ({income_reducer2, incomeType, instanceArray, contributeToCPP, createNewItem, setCategory, progress_reducer, setProgress_action,setId, employment_selector, business_selector, retirement_selector}) => {                  
   
    const fromAge =  incomeType === "retirement" ? 65 : 18                                                                                      //these are the ages for the dual range bar
    const toAge =  incomeType === "retirement" ? 95 : 25                                                                                        //We want the dual range bar to be pre set to higher ages if the user is inputting retrement income                                                                                

    const [color, setColor] = useState(progress_reducer.incomeColor)                                                                            //to keep the color the same as the chart we store the color on the instance object
    const newState = incomeStream_data(" ", fromAge, toAge, 10000, 50, colorArray_data[color], contributeToCPP)                                 //initial State is found in data 
     
    const selector =  incomeType === "employment" ? employment_selector : incomeType === "retirement" ? retirement_selector :  business_selector  //the selector has seperated out the different types of income according to if they contribute to CPP
 
    const handleClick = () => {                                                                                                                  //Creates a new item 
        createNewItem(newState)                                                                                                                  //Passes in the local new state
        setProgress_action("incomeColor", (color + 1))                                                                                           //to keep the colors different we store it in the progress reducer             
    }

return (
        <Wrapper>               
          <Header>                                                                                                                                                         
                <h2>{incomeType}</h2>     
            </Header>
            
            <Container> 
                {
                    selector.map(d => <DisplayTile                                                                                                 //this selector contains an array of the income streams, seperated by if they contribute to CPP or not, eg employment, business or retirement
                                                         key={d}
                                                         category={d}
                                                         setCategory={setCategory} 
                                                         setId={setId}
                                                         income_reducer2={income_reducer2}
                                                         instanceArray={instanceArray}
                                                         />)
                }
    
          <DarkAdd onClick={() => handleClick()}/>
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

export default connect(mapStateToProps,{ setProgress_action})(DisplayBox )


//-----------------------------------------------STYLES-----------------------------------------------//

const Header = styled.div`
    width: 100%;
    background: grey;
    height: 4rem;
    color: ${props => props.theme.color.ice};
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