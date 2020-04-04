import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import {Close} from "style/Icons"
import { delete_action, setKeyValue_action} from "redux/actions"
import {tax_selector} from "redux/tax/tax_selectors"

const DisplayTile = ({tax_selector, stream, setKeyValue_action}) => {                                    //Individual stream that is added

    const instanceArray =  tax_selector.filter(d => d.stream === stream).sort((a, b) => a.age1 - b.age1) 
    
    const {id, value} = instanceArray[0]

    return (
        <Item label={stream} color={"#485056"} >
            <Text onClick={() => {
                                    setKeyValue_action("stream", "ui_reducer", stream)  
                                    setKeyValue_action("id", "ui_reducer", id)  
                                }}>                                                                     {/*When the stream is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{stream}</H2>
                <H2>{Math.round(value/1000)}K</H2>
            </Text>
                                 
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
