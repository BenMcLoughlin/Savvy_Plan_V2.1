import React, {useState,  useEffect} from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"
import {createTaxInstance} from "services/tax/tax_functions"
import {deleteInstance} from "services/ui/ui_functions"
import {taxCredit_data} from "pages/tax/data/tax_data"
import {setKeyValue_action, delete_action} from "redux/actions"

const InstanceNav =({delete_action, instanceArray, instance, setKeyValue_action}) => {

    const {eligible, age2, id, stream, type, value}  = instance  

    const state = taxCredit_data(eligible, age2, stream, (age2 + 5), type, value)                                        //creating a new income instance requires us to fire this new state

    const [selected, select] = useState(id)
    const handleSelect = (id) => {
        setKeyValue_action("id", "ui_reducer", id)                                                                      //when they select an item in the array we set the id in the ui_reducer and it will be highlighted
        select(id)    
    }
  
    useEffect(()=> {select(id) }, [id])                                                                                 //when the user adds a new instance we want it to auto highlight, useEffect listens for changes and sets the local state in that case

    return (
        <Container>
            <SelectWrapper>
                {instanceArray.map((d, i) =>  <SelectValue                                                               //we map through the instance array showing a little tab for each year range
                                                           key={d.id}                                          
                                                           selected={selected === d.id}                                  //this is where a booleon is passed to the styles to determine if it shoul dbe highlighted
                                               >
                                                        <TextAndValueWrapper>
                                                            <Text onClick={() => handleSelect(d.id)}                      //clicking the text selects the id and sets it in the ui_reducer 
                                                                                selected={selected === d.id}              //sets it locally for the highlight
                                                        >
                                                                {`Ages ${d.age1} to ${d.age2}`}
                                                            </Text>
                                                        </TextAndValueWrapper>
                                                        {i > 0 && type === "variable" ? <Delete onClick={() =>  deleteInstance(delete_action, d.id, selected, instanceArray, "tax_reducer", setKeyValue_action)}/> : null}
                                                                                                                            //(delete_action, id, reducer, reg, setKeyValue_action)
                                              </SelectValue>)              
                }
                                              <Add onClick={() => createTaxInstance(setKeyValue_action, state)} />
            </SelectWrapper>
        </Container>
    )
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {setKeyValue_action,  delete_action})(InstanceNav )


//-----------------------------------------------style-----------------------------------------------//

const Container = styled.div`
    width: 100%;
    height: 4rem;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    border-radius: 5px;


`
const SelectWrapper = styled.div`
    height: 4rem;
    width: 100%;
    background: white;
    font-size: 1.4rem;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;

`
const TextAndValueWrapper = styled.div`
    display: flex;
    height: 4rem;
    flex-direction: column;

`

const Text = styled.label`
    font-size: 1.6rem;
    font-weight: normal;
    color: ${props => props.theme.color.slate}
    text-align: center;
    cursor: pointer;
`

const SelectValue = styled.div`
    padding: 1rem;
    margin: 0.7rem;
    height: 4rem;
    max-width: 15rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: ${props => props.selected ?  null : props.theme.border.primary};
    width: 100%;
    color: ${props => props.theme.color.slate}
    font-size: 1.6rem;
    border-radius: 5px;
    background: ${props => props.selected ? props.theme.color.ice : "white"}
    text-align: center;
`

const Delete = styled(Close)`
    width: 1.3rem;
    height: 4.3rem;
    color: ${props => props.theme.color.grey};
    display: flex;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 500;
    cursor: pointer;
`
const Add = styled(PlusIcon)`
    width: 4rem;
    margin-top: 1.2rem;
    color: white;
    display: flex;
    position: relative;
    color: grey;
    cursor: pointer;
`