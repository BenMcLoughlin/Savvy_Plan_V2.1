import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {Close} from "style/Icons"
import {delete_action, setKeyValue_action} from "redux/actions"
import {income_selector} from "redux/main/income_selectors"
import {rrspMinWithdrawal_selector} from "redux/main/savings_selectors"


const DisplayTile = ({delete_action, rrspMinWithdrawal_selector, income_selector, stream, setKeyValue_action}) => {                   //A tile box showing the title of the stream, eg "Wal Mart Income"
  
    const instanceArray =  Object.values(income_selector).filter(d => d.stream === stream).sort((a,b) => a.age1 - b.age1)     //here we take the stream, Wal Mart Income, and make an array of all the instances of that incoem
    const {color, id, value} = instanceArray[0]

    const removeItem = () => {                                                                                                        //enables us to delete the entire income stream
        if(stream !== "Child Benefit") {
        const categoryIdArray =  instanceArray.map(d => d.id)                                                                         //if someone want to delete Wal Mart Income, they have to delete all instances of that as well                                                                                                  
        for (let i = 0; i < instanceArray.length; i++) {                                                                              //this mapes through and removes all instances
        delete_action(categoryIdArray[i], "main_reducer")   
        }                                                   
    }                                                                       
    }              
    const income = stream === "RRSP Withdrawals" ? (value + rrspMinWithdrawal_selector) : value
     
    const openEditIncome = () => {
        if (stream === "Child Benefit") {return}
        if (stream === "TFSA") {return}
        else {
              setKeyValue_action("stream", "ui_reducer", stream)  
              setKeyValue_action("id", "ui_reducer", id)  
        }

    }
;
    return (
        <Item label={stream} color={color} >
            <Text onClick={() => openEditIncome()}>                                                                                                 {/*When the stream is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{stream}</H2>
                <H2>{Math.round(income/1000)}K</H2>
            </Text>
            <Delete onClick={() => removeItem()}/>                                                                                   {/*  If the x is clicked the stream is removed */}
        </Item>
    )
}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
    rrspMinWithdrawal_selector: rrspMinWithdrawal_selector(state)
})

export default connect(mapStateToProps,{delete_action, setKeyValue_action})(DisplayTile )


//-----------------------------------------------STYLES-----------------------------------------------//


const Item = styled.div`
    margin: 0.5rem 1rem 0.5rem 1rem;
    padding: .8rem 4.5rem .8rem 4rem;
    width: 28rem;
    display: flex;
    position: relative;
    height: 4rem;
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


const Delete = styled(Close)`
    width: 1.3rem;
    height: 1.3rem;
    color: white;
    display: flex;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 500;
`