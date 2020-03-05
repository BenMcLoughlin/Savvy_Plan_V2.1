import React, {useState, useEffect} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"
import {removeItem_action} from "redux/netWorth/netWorth_actions"


//displays the items the users have added, such as "car" or "checking account"

const ItemDisplay = ({value, removeItem_action, item, setId}) => {                                                                        //Individual item that is added
 const {label, subCategory, id} = item
    const removeItem = () => {                                                                                                           
        removeItem_action(item)                                                                                                                //This removes the item from the reducer 
    }
    return (
        <Item label={label} subCategory={subCategory}>
            <Text onClick={() => setId(id)}>                                                                                                {/*When the item is clicked the id is set which fills out the edit form with the items details */} 
                <H2>{label}</H2>
                <H2>{value/1000}K</H2>
            </Text>
            <Exit onClick={() => removeItem()}/>                                                                                                {/*If the x is clicked the item is removed */}
        </Item>
    )
}


const DisplayBox = ({category, account, setAddFormSubCategory, subCategory, netWorth_reducer, removeItem_action,  setId}) => {                   //Box wrapping the items being added

    const arrayOfitems = account === "tfsa" ?  Object.values(netWorth_reducer[category]).filter(d => d.subCategory === subCategory).filter(d => d.registration === "tfsa") 
                                             : Object.values(netWorth_reducer[category]).filter(d => d.subCategory === subCategory)                                   //Pulls out all the items added and turns them into an array
    
    const totalValue = arrayOfitems.length > 0 ? arrayOfitems.map(d => d.currentValue.financialValue).reduce((acc, num) => acc + num) : 0     //Sums the value of the category

    const title = account === "tfsa" ? "Current TFSA Holdings"  : (_.startCase(subCategory))
return (
        <Wrapper>               
          <Header subCategory={subCategory}>                                                                                                      {/*The header passes subCategory to Styled-components so the color can change*/}                                                                    
                <h2>{title}</h2> 
                <h2>{totalValue/1000}k</h2>                                                                                                       {/*Shows the total value for that subCategory */}     
            </Header>
          
            <Container> 
            {
              arrayOfitems.map(item => {  
                     return  <ItemDisplay                                                                                                         //Maps through the items showing each one
                                       item={item}                                                                                                //Passes all props it has recived as "item" which is used to remove it or set the id when clicked
                                       key={item.id}                                                                                               
                                       removeItem_action={removeItem_action}
                                       value={item.currentValue.financialValue}
                                       setId={setId}
                                      
                            />
              })
          }
    
          <DarkAdd onClick={() => setAddFormSubCategory(subCategory)}/>
            </Container>
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer,
})

export default connect(mapStateToProps,{removeItem_action})(DisplayBox )


//-----------------------------------------------STYLES-----------------------------------------------//

const Header = styled.div`
    width: 100%;
    background: ${props => props.subCategory === "cashAssets" ? props.theme.color.blue : 
                  props => props.subCategory === "investmentAssets" ? props.theme.color.steelBlue : 
                  props => props.subCategory === "propertyAssets" ? props.theme.color.green : 
                  props => props.subCategory === "unsecuredDebt" ? props.theme.color.salmon : 
                  props => props.subCategory === "securedDebt" ? props.theme.color.darkSalmon : 
    null};
    height: 4rem;
    color: ${props => props.theme.color.ice};
    border-bottom:  ${props => props.theme.border.primary};
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem 0.5rem 2rem;

`

const Wrapper = styled.div`
    width: 100%;
    min-height: 30rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    margin-bottom: 1rem;
    background: ${props => props.theme.color.ice};
`
const Item = styled.div`
   
    margin: 0.5rem 1rem 0.5rem 1rem;
    padding: .8rem 4.5rem .8rem 4rem;
    min-width: 20rem;
    display: flex;
    position: relative;
    height: ${props => props.label.length > 20 ? "7rem" : "4rem"};
    background:${props => props.subCategory === "cashAssets" ? props.theme.color.blue : 
    props => props.subCategory === "investmentAssets" ? props.theme.color.steelBlue : 
    props => props.subCategory === "propertyAssets" ? props.theme.color.green : 
    props => props.subCategory === "unsecuredDebt" ? props.theme.color.salmon : 
    props => props.subCategory === "securedDebt" ? props.theme.color.darkSalmon : 
null};
    border-radius: 5px;
    color: white
    border: ${props => props.theme.border.primary};
    cursor: pointer;


`
const Container = styled.div`
    min-height: 13rem;
    max-height: 50rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    justify-content: flex-start;
    overflow: scroll;
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
    color: ${props => props.theme.color.grey};
    display: flex;
    position: absolute;
    top: .2rem;
    right: .2rem;
    z-index: 200;
`
const Add = styled(PlusIcon)`
    width: 4rem;
    color: grey;
    display: flex;
    position: absolute;
    top: .8rem;
    left: 0rem;
`
const DarkAdd = styled(Add)`
    width: 4rem;
    color: white;
    display: flex;
    margin-top: -1rem;
    position: relative;
    color: grey;
    cursor: pointer;
`