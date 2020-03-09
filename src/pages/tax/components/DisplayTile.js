import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {Close} from "style/Icons"
import {deleteIncome_action} from "redux/income/income_actions"
import {income_selector} from "redux/income/income_selectors"
import {rrspMinWithdrawal_selector} from "redux/savings/savings_selectors"


const DisplayTile = ({deleteIncome_action, credit, color, setId, category, setCategory}) => {                                    //Individual category that is added
  

    const setCategoryAndId = (category) => {                                                                                //this enables the user to click the tile and bring up the categroy and the instance of income from that category
        const id = credit.id                                                                                                //we're just grabbing the first random instance id in the array from that category, instance is the earning time period and category is the income stream
         setCategory(category)  
         setId(id)
         
     }
    return (
        <Item label={credit.label} color={color} >
            <Text onClick={() => setCategoryAndId(category)}>                                                              {/*When the category is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{credit.label}</H2>
                <H2>{100}K</H2>
            </Text>
            <Exit onClick={() => null}/>                                                                           {/*  If the x is clicked the category is removed */}
        </Item>
    )
}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
    rrspMinWithdrawal_selector: rrspMinWithdrawal_selector(state)
})

export default connect(mapStateToProps,{deleteIncome_action})(DisplayTile )


//-----------------------------------------------STYLES-----------------------------------------------//



const Item = styled.div`
   
    margin: 0.5rem 1rem 0.5rem 1rem;
    padding: .8rem 4.5rem .8rem 4rem;
    width: 28rem;
    display: flex;
    position: relative;
    height: ${props => props.label.length > 20 ? "7rem" : "4rem"};
    background:${props =>  props.color};
    border-radius: 5px;
    color: white
    border: ${props => props.theme.border.primary};
    cursor: pointer;


`

const H2 = styled.h2`
font-size: 1.4rem
font-weight: 700;
`
const Text = styled.div`
    width: 25rem;
    display: flex;
    height: 3rem;
    justify-content: space-between;
    z-index: 200;
`


const Exit = styled(Close)`
    width: 1.3rem;
    height: 1.3rem;
    color: white;
    display: flex;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 500;
`