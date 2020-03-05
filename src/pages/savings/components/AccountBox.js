import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {removeItem_action} from "redux/netWorth/netWorth_actions"
import DisplayBox from "pages/netWorth/components/DisplayBox"
import EditForm from "pages/netWorth/components/EditForm"
import AddForm from "pages/netWorth/components/AddForm"
import {netWorthWizard_data} from "pages/netWorth/data/netWorth_data"

const ControlPanel = ({setCount, display, netWorth_reducer}) => {    

    const [id, setId] = useState()                                                                              //If the user wants to change something this sets the id of the item they want to change
  
    const [addFormSubCategory, setAddFormSubCategory] = useState()                                              //If wants to add something this sets the category of the item theyd like to add
    const addFormDetails = netWorthWizard_data.find(d => d.subCategory === addFormSubCategory)                  //Provides the add form with the details to render

    const category = display                                                                                    //Display is either assets or liabilities and is used to show either of those
    const subCategory = id ? netWorth_reducer[category][id].subCategory : "cashAssets"                          //if we have an id we get the subCategory from the reducer, otherwise we set it to CashAssets

    return (
        <Wrapper>   
            <Sections>
           { 
                    id ? 
                    <EditForm
                        id={id}                                                                        //Clicking add takes the id of the item being added and sets it in the local state
                        category={category}
                        subCategory={subCategory}
                        setId={setId}
                    />
                    :
                    addFormSubCategory ? 
                    <AddForm                                                                                   //if the user wants to add a new item this is shown and depends on if a subCategory is in local state
                        category={addFormDetails.category}
                        subCategory={addFormDetails.subCategory}
                        accountTypeArray={addFormDetails.accountTypeArray}
                        bookValueLabel={addFormDetails.bookValueLabel}
                        currentValueLabel={addFormDetails.currentValueLabel}
                        interestRateLabel={addFormDetails.interestRateLabel}
                        setAddFormSubCategory={setAddFormSubCategory}
                    />
                    :
                    <>
                    {
                                                    //if neither add or edit forms are clicked then it renders out the item display

                            <Section  key={netWorthWizard_data[1].subCategory}>
                            <DisplayBox                                                                  //Displays all the assets or liabilities they have added
                                category={netWorthWizard_data[1].category}
                                item={netWorthWizard_data[1]}
                                subCategory={netWorthWizard_data[1].subCategory}
                                setCount={setCount}
                                setId={setId}
                                setAddFormSubCategory={setAddFormSubCategory}
                                account={"tfsa"}
                                />
                            </Section> 

                    }
                </>
                 }
            </Sections>            
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer,
})

export default connect(mapStateToProps,{removeItem_action})(ControlPanel)


//-----------------------------------------------STYLES-----------------------------------------------//


const Wrapper = styled.div`
    width: 30%;
    border-radius: 5px;
    height: 100%;
`
const Sections = styled.div`
    display: flex;
    padding: 1rem;
    position: relative;
    justify-content: center;
`
const Section = styled.div`
    width: 100%;
    margin: 1rem;
`
