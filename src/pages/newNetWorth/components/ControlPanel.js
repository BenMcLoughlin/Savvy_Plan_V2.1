import React, {useState} from "react"
import {property_selector, cash_selector, investments_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"
import styled from "styled-components"
import RangeBar from "UI/rangeBar/RangeBar"
import {setItemValue_action, changeLabel_action, removeItem_action} from "redux/netWorth/netWorth_actions"
import Popup from "pages/newNetWorth/components/Popup"
import {transaction_action} from "redux/savings/savings_actions"
import {savings_reducer} from "redux/savings/savings_reducer"
import {renderSavings} from "services/savings/savings_functions"
import DateInput from "UI/forms/DateInput"



const ControlPanel = ({ category, savings_reducer, subCategory3, subCategory1, subCategory2, setItemValue_action, changeLabel_action, removeItem_action, transaction_action}) => {

    const setValueInAssetsAndSavings = (logValue, rangeBarValue, rangeBarProps) => {
        renderSavings(32, 33, "tfsa", logValue, rangeBarValue, "contribute", savings_reducer, 65, .02, 0.02, transaction_action, 65)
        setItemValue_action(logValue, rangeBarValue, rangeBarProps)
    }
    const renderRangeBars = (selector) =>  selector.map( item => 
                                                <RangeBar                                                                                    //Checks the count to determine if the rangebars should be shown                                                
                                                key={item.name}
                                                rangeBarProps={item}
                                                setValue={setValueInAssetsAndSavings}
                                                handleChangeLabel = {changeLabel_action}
                                                handleRemoveItem={removeItem_action}
                                                close={true}
                                                editable={true}
                                                />)
    return (
< Wrapper>
        <Sections>
            <Section>
                < H2>{category === "asset" ? "Cash asset" : "Short Term Debts"}</ H2>
                {renderRangeBars(subCategory1)} 
                <Popup 
                    category= {category} 
                    subCategory={category === "asset" ? "cash" : "shortTerm"}
                />  
           </Section>
            <Section>
                < H2>{category === "asset" ? "Investment asset" : "Other Debts"}</ H2>
               {renderRangeBars(subCategory2)} 
               <Popup
                      category= {category} 
                      subCategory={category === "asset" ? "investments" : "other"}
                />  
            </Section>
            <Section>
                < H2>{category === "asset" ? "Property and Hard asset" : "Long Term Debts"}</ H2>
                {renderRangeBars(subCategory3)}  
                <Popup 
                    category= {category} 
                    subCategory={category === "asset" ? "property" : "longTerm"}
                />          
                                                                                     
            </Section>
        </Sections>
</Wrapper>
    )
}



const mapStateToProps = (state) => ({
    savings_reducer: state.savings_reducer,
    property_selector: property_selector(state),
    cash_selector: cash_selector(state),
    investments_selector: investments_selector(state),

})

export default connect(mapStateToProps, {setItemValue_action, changeLabel_action, removeItem_action, transaction_action})(ControlPanel)


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    grid-area: d;
    width: 100%;
    border-top: .7px solid ${props => props.theme.color.lightGrey};

`
const Sections = styled.div`
    display: flex;
    width: 100%;
`
const Section = styled.div`
    flex: 1;
    margin-top: 2rem;
    height: 40rem;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: left
`
const H2 = styled.h2`
    padding: 2rem;
    text-align: center;
    width: 100%;
`
