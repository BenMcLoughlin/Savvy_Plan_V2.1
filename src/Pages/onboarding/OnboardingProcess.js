import React, {useState} from 'react'
import styled from "styled-components"
import ButtonLight from "UI/Buttons/ButtonLight"
import {connect} from "react-redux"
import FirstName from "pages/onboarding/components/FirstName"
import BirthYear from "pages/onboarding/components/BirthYear"
import Province from "pages/onboarding/components/Province"


function OnboardingProcess(props) {

    const [count, setCount] = useState(1);
console.log(count);
        return (
                 <Wrapper>
                    <Form>
                       {
                            count === 0 ? 
                            <FirstName/>
                            :
                            count === 1 ? 
                            <BirthYear/>
                            :
                            count === 2 ? 
                            <Province/>
                            :
                            null
                        }
                    </Form>


                   <Buttons>
                                < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                                < ButtonLight forward onClick={() => setCount(count + 1)}/>
                    </Buttons>
                </Wrapper>
        )
          
    }


const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer
})   

export default connect(mapStateToProps)(OnboardingProcess)
//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    grid-area: m;
    display: grid;
    height: 100%;
    width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

`
const Form = styled.form`
    height: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20rem;
    margin: 0 auto;
`

const Buttons = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`
