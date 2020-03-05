import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import InstanceNav from "pages/income/components/InstanceNav"
import FormInput  from "UI/forms/Input"
import DualRangeBar from "UI/dualRangeBar/DualRangeBar"
import RangeBar  from "UI/rangeBar/RangeBar"
import MiniRangeBar  from "UI/miniRangeBar/MiniRangeBar"
import ButtonLight from "UI/buttons/ButtonLight"
import {changeLabel_action, incomeValue_action, deleteIncome_action, incomeAge_action} from "redux/income/income_actions"
import _ from "lodash"
import {incomeStream_data} from "pages/income/data/income_data"
import {cpp_selector} from "redux/income/income_selectors"
import {setAge} from "services/income/actionWrapper_functions"

const EditIncome = ({category, instanceArray, incomeValue_action, createNewItem, id, setId, changeLabel_action, incomeAge_action, setCategory, deleteIncome_action}) => {    

    const setValue = (logValue, rangeBarValue, rangeBarProps) => {                                                             //receives numbers from range bar and sets them in state
        incomeValue_action(id, logValue, rangeBarValue, rangeBarProps)                                                        //setting the income value in the reducer
    }

                                                     
    const changeLabel = (e) => {                                                                                               //enables the user to change the label which changes all income stream labels of that category
        const {value} = e.target                                                                                               //destructure out the value from the target event
        if(value.length === 0) return                                                                                          //when the text is 0 we don't want it to change the categoruy because the box will close as its seen as a false value
        for (let i = 0; i < instanceArray.length; i++) {                                                                       //we loop through and change the label for every income stream in the category
            changeLabel_action(instanceArray[i].id, "label", e)                                                                //changes the label
            if(value.length > 0) {                                                                                             // if the lenth is greater then 0 it changes the category, the category is determining what is visible
                changeLabel_action(instanceArray[i].id, "category", e)
            }
           }
            setCategory(e.target.value)                                                                                        //sets the category

    }

    const setDualRangeBar = (name, value) => {                                                                                          //sets the age, as well as the surrounding ages in the array of instances
        setAge(incomeAge_action, id, instanceArray, name, value)
    }

    const deleteInstance = (instance) => {                                                                                     //deletes the instance
        if (instance.id === id) {                                                                                              //checks if the instance being deleted and the one currently being displayed are the same
            if (instanceArray.length > 0) {                                                                                    // if the array is greater then one it wil delete the instance and change the id of the instance being displayed
                setId(instanceArray[0].id)                                                                                     // sets the id to the first id in the instance array, this prevents errors, otherwise it wants to display an instance that no longer exists
                deleteIncome_action(instance.id)                                                                                     //removes the instance
            }
            setCategory()                                                                                                      //if its the last item in the array it brings the user back to the main page by setting category and id to false
            setId()
        }
        else {
            deleteIncome_action(instance.id)                                                                                         //if they click to delete an instance that isn't the one being display it won't cause an issue and can just be deleted
        }
    }

    const item = instanceArray.find(d => d.id === id)                                                                          //we're only provided with the id, not the entire instance, this grabs the entire instance details
    const endAge = instanceArray[instanceArray.length -1].toAge                                                                //grabs the toAge of the next instance in the array, used for if we create a new instance and the age is then automatically set to be higher

    return (
        <Wrapper>
            <Header color={item.color}>
            <h2>{_.startCase(category)}</h2> 
            </Header>
            <InstanceNav color={item.color}
                            itemList={instanceArray}
                            setId={setId}
                            id={id}
                            deleteInstance={deleteInstance}
                            addSection={() => createNewItem(incomeStream_data(category, (+endAge), (+endAge + 5), item.value.financialValue , item.value.rangeBarValue, item.color ))}
                        />
            <Container >                                                                      
     
                <Left>                                                                                                         {/* Choose one is used to select the account type */}
                <FormInput
                        label="Income name"
                        value={item.label}                                                                                        //because the category also set if the item is shown we need this ternary to prevent it from exiting when the text is empty
                        type={"text"}  
                        handleChange={(e) => changeLabel(e)}                                                                      //sets the state in the local state
                    />
                                    <RangeBar 
                        rangeBarProps={item.value}                                                                               //Every Add item has a range bar to set its value
                        setValue={setValue}                 
                    /> 

                </Left>

                <Right>
                <YearsSelectorWrapper> 
                    <Label>
                    Earning Years Selector
                    </Label>
                    <SelectorTitleWrapper>
                        <div>From Age</div>    
                        <div>To Age</div>    
                    </SelectorTitleWrapper>
                    <DualRangeBar
                        bottom={item.fromAge}                                                                                     //fromAge sets the from Age, eg. age 18 in 18-45
                        top={item.toAge}                                                                                          //toAge sets the to Age, eg. age 45 in 18-45
                        setValue={setDualRangeBar}                                                                                         //reaches into reducer to set the values
                    />
            </YearsSelectorWrapper> 


                    <ButtonWrapper>
                            <ButtonLight 
                                text={"Add"}
                                onClick={() => setCategory(false)}
                            />
                    </ButtonWrapper>
                    <ButtonLeftWrapper>
                            <ButtonLight 
                                text={"Back"}
                                onClick={() => setCategory(false)}
                            />
                    </ButtonLeftWrapper>
                </Right>
            </Container>
        
        </Wrapper>
       
    )

}

const mapStateToProps = (state) => ({
    cpp_selector: cpp_selector(state),
})

export default connect(mapStateToProps, {changeLabel_action, incomeValue_action, deleteIncome_action, incomeAge_action})(EditIncome )


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
    bottom: 2rem;
    left: 2rem;
`
const Right = styled.div`
    width:  50%;
    padding: 2rem;
`
const Label = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.darkGrey};
    width: 25rem;
    height: 4rem;
    padding: 1rem;
    font-weight: 700;
    text-align: left;
`

const Container = styled.div`
    width: 90rem;
    height: 25rem;
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
    background: ${props => props.color};
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.ice};
`