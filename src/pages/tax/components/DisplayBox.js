import React, {useState} from "react"
import styled from "styled-components"
import {connect} from "react-redux"
import _ from "lodash"
import * as selector from "redux/tax/tax_selectors"
import DisplayTile from "pages/tax/components/DisplayTile"
import SelectorButtonHorizontal from "UI/buttons/SelectorButtonHorizontal"


const DisplayBox = ({deduction_selector, fixedCredit_selector, variableCredit_selector, type}) => {                                     //shows a list of all the credits or deductions          

    const [creditType, setCreditType] = useState(false)                                                                                 //the user can chose between fixed or variable credits, false is variable true shows fixed
                                                                     
    const selector =  type === "deductions" ? deduction_selector :                                                                      //decides which selector to show
                      creditType ? fixedCredit_selector  :  
                      variableCredit_selector  
return (
        <Wrapper>           
            <Header>                                                                                                                                                         
            <h2>{_.startCase(type)}</h2>        
            {
                type === "credits" ? 
                <Right>
                <TitleWrapper onClick={() => setCreditType(!creditType)}>
                         <H3 creditType={creditType}>Fixed</H3>
                         <H3 creditType={!creditType}>Variable</H3>
                     </TitleWrapper>
                     <SelectorWrapper>
                          <SelectorButtonHorizontal visible={creditType} onClick={() => setCreditType(!creditType)}/>
                     </SelectorWrapper>
                </Right>
                : null
            }
            </Header>    
            <Container> 
            {
                    selector.map(d => <DisplayTile                                                                                                 //this selector contains an array of the income streams, seperated by if they contribute to CPP or not, eg employment, business or retirement
                                                 key={d}
                                                 stream={d}
                                                 />)
                }
            </Container>
        </Wrapper>

       
    )

}

const mapStateToProps = (state) => ({
    deduction_selector: selector.deduction_selector(state),
    fixedCredit_selector: selector.fixedCredit_selector(state),
    variableCredit_selector: selector.variableCredit_selector(state),
})

export default connect(mapStateToProps,{})(DisplayBox )


//-----------------------------------------------STYLES-----------------------------------------------//

const Header = styled.div`
    width: 100%;
    height: 4rem;
    color: ${props => props.theme.color.drab};
    border-bottom:  ${props => props.theme.border.primary};
    display: flex;
    justify-content: space-between;
    padding: .5rem 2rem 0.5rem 2rem;
    position: relative;
`

const Wrapper = styled.div`
    width: 35rem;
    margin: 1rem;
    min-height: 28rem;;
    border-radius: 5px;
    border: ${props => props.theme.border.primary};
    overflow: hidden;
    margin-bottom: 1rem;
    background: ${props => props.theme.color.ice};
`

const Container = styled.div`
    min-height: 10rem;
    max-height: 50rem;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    justify-content: flex-start;
    overflow: scroll;
`
const TitleWrapper = styled.div`
    width: 15rem;
    margin-left: 1rem;
    display: flex;
    justify-content: space-between;
`
const Right = styled.div`
    width: 18rem;
    display: flex;
`
const SelectorWrapper = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
`

const H3 = styled.h3`
    cursor: pointer;
    font-weight: ${props => props.creditType ? 700 : null};

`