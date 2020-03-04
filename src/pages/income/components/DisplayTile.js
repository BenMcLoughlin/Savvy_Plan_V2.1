import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"
import {delete_action} from "redux/income/income_actions"
import {income_selector} from "redux/income/income_selectors"


const DisplayTile = ({delete_action, income_selector, setId, category, setCategory}) => {                                    //Individual category that is added
  
    const categoryArray =  Object.values(income_selector)
                                 .filter(d => d.category === category)
                                 .sort((a,b) => a.startAge - b.startAge)                                                    //here we take the category, eg Wal Mart Income, and make an array of all the instances of that incoem

    const removeItem = () => {                                                                                               //enables us to delete the entire income stream
        const categoryIdArray =  categoryArray.map(d => d.id)                                                                //if someone want to delete Wal Mart Income, they have to delete all instances of that as well                                                                                                  
        for (let i = 0; i < categoryArray.length; i++) {                                                                     //this mapes through and removes all instances
        delete_action(categoryIdArray[i])   
        }                                                   
                                                                                      
    }

    const setCategoryAndId = (category) => {                                                                                //this enables the user to click the tile and bring up the categroy and the instance of income from that category
        const id = categoryArray[0].id                                                                                      //we're just grabbing the first random instance id in the array from that category, instance is the earning time period and category is the income stream
         setCategory(category)  
         setId(id)
         
     }
    const color =  Object.values(income_selector).filter(d => d.category === category)[0].color                            //Grabs a new color to assign
    const maxIncome = Math.max(...Object.values(income_selector).filter(d => d.category === category).map(d => d.value.financialValue))
    return (
        <Item label={category} color={color} >
            <Text onClick={() => setCategoryAndId(category)}>                                                              {/*When the category is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{category}</H2>
                <H2>{maxIncome/1000}K</H2>
            </Text>
            <Exit onClick={() => removeItem()}/>                                                                           {/*  If the x is clicked the category is removed */}
        </Item>
    )
}

const mapStateToProps = (state) => ({
    income_selector: income_selector(state),
})

export default connect(mapStateToProps,{delete_action})(DisplayTile )


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