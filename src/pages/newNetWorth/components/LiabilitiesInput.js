import React, {useState} from "react"
import {longTerm_selector, shortTerm_selector, other_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"
import styled from "styled-components"
import {createStructuredSelector} from "reselect"
import RangeBar from "UI/rangeBar/RangeBar"
import {setItemValue_action, changeLabel_action, removeItem_action} from "redux/netWorth/netWorth_actions"
import AddLiability from "pages/newNetWorth/components/AddItems/AddLiability"

const LiabilitiesInput = ({ longTerm_selector, shortTerm_selector, other_selector, setItemValue_action, changeLabel_action, removeItem_action}) => {

    console.log(longTerm_selector)
    const renderRangeBars = (selector) =>  selector.map( asset => 
                                                <RangeBar                                                                                    //Checks the count to determine if the rangebars should be shown                                                
                                                key={asset.name}
                                                rangeBarProps={asset}
                                                setValue={setItemValue_action}
                                                handleChangeLabel = {changeLabel_action}
                                                handleRemoveItem={removeItem_action}
                                                close={true}
                                                editable={true}
                                                />)
    return (
< Wrapper>
        <Sections>
            <Section>
                < H2>Short Term Debts</ H2>
                {renderRangeBars(shortTerm_selector)} 
           </Section>
            <Section>
                < H2>Long Term Debts</ H2>
               {renderRangeBars(other_selector)} 
            </Section>
            <Section>
                < H2>Other Debts</ H2>
                {renderRangeBars(longTerm_selector)}                                                                                    
            </Section>
            <AddLiability/>   
        </Sections>
</Wrapper>
    )
}



const mapStateToProps = createStructuredSelector({
    longTerm_selector,
    shortTerm_selector,
    other_selector,

})
export default connect(mapStateToProps, {setItemValue_action, changeLabel_action, removeItem_action})(LiabilitiesInput)

const Wrapper = styled.div`
grid-area: c;
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
`
const H2 = styled.h2`
    padding: 2rem;
`
const RangeBarWrapper = styled.div`
  margin-top: 2rem;
  overflow: hidden;
  position: relative;
  text-align: center;
`