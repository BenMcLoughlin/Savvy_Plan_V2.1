import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {Close} from "style/Icons"
import { delete_action, setKeyValue_action} from "redux/actions"
import {income_selector} from "redux/income/income_selectors"
import {tax_selector} from "redux/tax/tax_selectors"
import {setAge} from "services/ui/ui_functions"

const DisplayTile = ({ delete_action, tax_selector, color,  setId, stream, setStream, setKeyValue_action}) => {                                    //Individual stream that is added


    const setCategoryAndId = (stream) => {                                                                                //this enables the user to click the tile and bring up the categroy and the instance of income from that stream
        setStream(stream)  
        const instanceArray =  tax_selector.filter(d => d.stream === stream).sort((a, b) => a.age1 - b.age1) 
         setId(instanceArray[0].id)
         setKeyValue_action("credit", "ui_reducer", stream)                                                  //this sets the selectedCredit, eg "medicalExpense" which then fills out the chart for that credit in the display box
     }

    return (
        <Item label={stream} color={"#485056"} >
            <Text onClick={() => setCategoryAndId(stream)}>                                                              {/*When the stream is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{stream}</H2>
                <H2>{100}K</H2>
            </Text>
            <Delete onClick={() => delete_action("credit.id", "tax_reducer")}/>                                                                           {/*  If the x is clicked the stream is removed */}
        </Item>
    )
}

const mapStateToProps = (state) => ({
    tax_selector: tax_selector(state),

})

export default connect(mapStateToProps,{ delete_action, setKeyValue_action})(DisplayTile )


//-----------------------------------------------STYLES-----------------------------------------------//



const Item = styled.div`
   
    margin: 0.5rem 1rem 0.5rem 1rem;
    padding: .8rem 4.5rem .8rem 4rem;
    width: 30rem;
    display: flex;
    position: relative;
    height: ${props => props.label.length > 27 ? "7rem" : "4rem"};
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