import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/buttons/ButtonLight"
import {wizardText_data} from "pages/dashboard/data/wizardText_data"

const Wizard = ({count, setCountAndProgress, progress_reducer}) =>  {

        return (
            <>
            {
                count < 7 ? 
                <Container count={progress_reducer.dashboard}>
                <Dialogue>
                    {
                        wizardText_data.map(d =>  d.count === count ? <h2>{d.text}</h2> : null
                        )
                    }
                </Dialogue>

                    <Buttons>                                                                             {/* Fixed plan buttons enabling the toggling back and forth*/}
                                < ButtonLight backward onClick={() => setCountAndProgress("dashboard", (count > 0 ? count - 1 : 0))}/>
                                < ButtonLight forward onClick={() => setCountAndProgress("dashboard", ( count < 6 ? count + 1 : 7))}/>                 

                </Buttons>
            </Container>
            :   < ButtonLight text={"Tutorial"} onClick={() => setCountAndProgress("dashboard", (0))}/>   
                
            }

            </>
        )
}

const mapStateToProps = (state) => {

}

export default Wizard

//-----------------style--------------------------------------------------//
const Container = styled.div`
    width: 60rem;
    border-radius: 5px;
    overflow: hidden;
    height: ${props => props.subCategory === "securedDebt" ? "33rem" : "30rem"};                                                    //mortgage requires more height because there are more inputs
    border: ${props => props.theme.border.primary};
    position: absolute;
    top:  ${props => props.count === 0 ? "30rem" :
            props => props.count === 1 ? "20rem" :
            props => props.count === 2 ? "8rem" : //NetWorth
            props => props.count === 3 ? "8rem" : //Spending
            props => props.count === 4 ? "57rem" : //Income
            props => props.count === 5 ? "25rem" :
            props => props.count === 6 ? "30rem" : //Tax
    "40rem"};
    left: ${props => props.count === 0 ? "49rem" :
            props => props.count === 1 ? "22rem" :
            props => props.count === 2 ? "52rem" : //NetWorth
            props => props.count === 3 ? "50rem" : //Spending
            props => props.count === 4 ? "50rem" : //Income
            props => props.count === 5 ? "50rem" :
            props => props.count === 6 ? "50rem" : //Tax
        "40rem"};
    display: flex;
    background: ${props => props.theme.color.ice};
    z-index: 500;
    flex-direction: column;
    align-items: center;
`
const Dialogue = styled.div`
    display: flex;
    justify-content: space-around;
    height: 15rem;
    width: 50rem;
    margin-bottom: 1rem;
    padding: 2rem;
    line-height: 3rem;
`
const Buttons = styled.div`
    width: 50rem;
    z-index: 100;
    display: flex;
    justify-content: space-around;
`

const Text = styled.div`
    flex: 1;
    font-size: 2.4rem;
    text-align: center;
    font-weight: 700;
    & span {
        margin-top: 1rem;
        font-size: 1.6rem;
        font-weight: 400;
        font-style: italic;
    }
`
