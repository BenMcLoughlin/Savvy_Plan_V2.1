import React, {useState} from "react"
import {property_selector, cash_selector, investments_selector} from "redux/netWorth/netWorth_selectors"
import {connect} from "react-redux"
import styled from "styled-components"
import {createStructuredSelector} from "reselect"
import RangeBar from "UI/rangeBar/RangeBar"
import {setItemValue_action, changeLabel_action, removeItem_action} from "redux/netWorth/netWorth_actions"
import AddAsset from "pages/newNetWorth/components/AddItems/AddAsset"

const AssetsInput = ({ property_selector, cash_selector, investments_selector, setItemValue_action, changeLabel_action, removeItem_action}) => {

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
                < H2>Cash Assets</ H2>
                {renderRangeBars(cash_selector)} 
           </Section>
            <Section>
                < H2>Investment Assets</ H2>
               {renderRangeBars(investments_selector)} 
            </Section>
            <Section>
                < H2>Property and Hard Assets</ H2>
                {renderRangeBars(property_selector)}                                                                                    
            </Section>
            <AddAsset/>   
        </Sections>
</Wrapper>
    )
}



const mapStateToProps = createStructuredSelector({
    property_selector,
    cash_selector,
    investments_selector,

})
export default connect(mapStateToProps, {setItemValue_action, changeLabel_action, removeItem_action})(AssetsInput)

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