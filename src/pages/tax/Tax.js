import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import ButtonLight from "UI/buttons/ButtonLight"
import  Header from "pages/tax/components/Header"
import EditCredit from "pages/tax/components/EditCredit"
import DisplayBox from "pages/tax/components/DisplayBox"
import {setUserDetail_action} from "redux/user/user_actions"
import {taxCredit_data} from "pages/tax/data/tax_data"
import {taxCredits_selector, taxBrackets_selector} from "redux/taxCredits/taxCredits_selectors"
import TaxBarChart from "charts/tax2/TaxBarChart"

const Tax = ({setUserDetail_action, taxCredits_selector, taxBrackets_selector}) => {    

    const exists = Object.values(taxCredits_selector).length > 0   
    const [category, setCategory] = useState()                                                                                       //This refers to the tax Credit, such as medical Expense, and is used to open the edit box
    const [id, setId] = useState()                                                                                                   // Id refers to the income object, such as "Wal Mart Employment" from age 22-27, we will call this and instance
 
    const createNewItem = () => null
    const instanceArray = exists ?  taxCredits_selector.filter(d => d.category === category).sort((a, b) => a.fromAge - b.fromAge) : ["1"]//here we take the category, eg Wal Mart Income, and make an array of all the instances of that incoem
    console.log(taxBrackets_selector);

    return (
        <Wrapper>
             < Header color={"#3B7B8E"} >
              
            </Header>
            <Charts >
                <BarChartPlaceHolder>
                    <TaxBarChart/>
                </BarChartPlaceHolder>
            </Charts>

            <ButtonLeftWrapper>
                    <ButtonLight 
                                onClick={() =>  setUserDetail_action("taxAge", false)}
                                text={"Back"}
                            />
                            {
                                category ? 
                                        <EditCredit
                                                id={id} 
                                                setCategory={setCategory}
                                                category={category} 
                                                setId={setId} 
                                                instanceArray={instanceArray}
                                                createNewItem={createNewItem}/>
                                : 
                            
                                    <ControlPanel>
                                        {taxCredit_data.map(d => <DisplayBox setCategory={setCategory}                                              //This is the box showing the names of all the tax credits
                                                                                setId={setId}                                                       //this enables the user to set the id of the income instance they want to see
                                                                                id={id}
                                                                                creditType={d.creditType}
                                                                                category={category}                                                 //this is the income stream, such as Wal Mart Income, and contains many income instances
                                                                                createNewItem={createNewItem} 
                                                                                instanceArray={instanceArray}
                                                                        
                                                                                />
                                        )}
                                    </ControlPanel>
                                
            
                                  
                            }
                    </ButtonLeftWrapper>
        </Wrapper>
    )
}

const mapStateToProps = (state) => ({
    taxCredits_selector: taxCredits_selector(state),
    taxBrackets_selector: taxBrackets_selector(state)
})

export default connect(mapStateToProps, {setUserDetail_action})(Tax )


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    width:  115rem;
    height: 80rem;
    padding: 1rem;
    margin: 0 auto;
    position: absolute;
    background: white;
    top: 6.5rem;
    left: 20rem;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    display: grid;
    grid-template-rows: 10rem 22rem 40rem 4rem;
    grid-template-areas:
    'a a a'
    'b b b'
    'c c c'
    'd d d'
`
    //background: white;
    const ButtonLeftWrapper = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 2rem;
`

const ControlPanel = styled.div`
    width:  100%;
    border-radius: 5px;
    height: 100%;                 
    padding: 1rem;                                
    display: flex;
    justify-content: space-around;
    grid-area: c;
`
const Bottom = styled.div`
    width: 100%;
    grid-area: d;
`

const Charts = styled.div`
    grid-area: b;
    width: 90%;
    margin-left: 4%;
    height: 100%;
`
const ChartPlaceHolder = styled.div`
    margin-left: 4%;
    height: 60%;
`
const BarChartPlaceHolder = styled.div`
    height: 20rem;
    width: 60rem;
`

