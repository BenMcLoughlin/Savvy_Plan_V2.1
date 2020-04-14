import React from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import {Close, PlusIcon} from "style/Icons"
import {delete_action} from "redux/actions"
import DisplayTile from "pages/netWorth1/components/DisplayTile"


const DisplayBox = ({category, registration, setAddFormSubCategory, subCategory, main_reducer, delete_action,  setId}) => {                   //Box wrapping the items being added

    const arrayOfitems = registration === "TFSA" ?  Object.values(main_reducer).filter(d => d.registration === "TFSA") 
                                             :  registration === "RRSP" ?  Object.values(main_reducer).filter(d => d.registration === "RRSP") 
                                             : Object.values(main_reducer).filter(d => d.subCategory === subCategory)                                   //Pulls out all the items added and turns them into an array
    
    const totalValue = arrayOfitems.length > 0 ? arrayOfitems.map(d => d.value.financialValue).reduce((acc, num) => acc + num) : 0     //Sums the value of the category

    const title = registration ? `Current ${registration.toUpperCase()} Holdings` : (_.startCase(subCategory))
return (
        <Wrapper>               
          <Header subCategory={subCategory}>                                                                                                      {/*The header passes subCategory to Styled-components so the color can change*/}                                                                    
                <h2>{title}</h2> 
                <h2>{totalValue/1000}k</h2>                                                                                                       {/*Shows the total value for that subCategory */}     
            </Header>
          
            <Container> 
            {
              arrayOfitems.map(item => {  
                     return  <DisplayTile                                                                                                         //Maps through the items showing each one
                                       item={item}                                                                                                //Passes all props it has recived as "item" which is used to remove it or set the id when clicked
                                       key={item.id}                                                                                               
                                       delete_action={delete_action}
                                       value={item.value.financialValue}
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
    main_reducer: state.main_reducer,
})

export default connect(mapStateToProps,{delete_action})(DisplayBox )


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
    justify-content: space-around;
    padding: .5rem 2rem 0.5rem 2rem;

`

const Wrapper = styled.div`
    min-width: 35rem;
    min-height: 28rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    background: ${props => props.theme.color.ice};
`
const Item = styled.div`
   
    margin: 0.5rem 1rem 0.5rem 1rem;
    padding: .8rem 4.5rem .8rem 4rem;
    width: 29rem;
    display: flex;
    position: relative;
    height: ${props => props.label.length > 24 ? "7rem" : "4rem"};
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