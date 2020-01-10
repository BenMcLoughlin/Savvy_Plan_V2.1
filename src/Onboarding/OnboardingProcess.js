import React, {useState} from 'react'
import styled from "styled-components"
import { NavLink} from "react-router-dom"
import ButtonLight from "../UI/Buttons/ButtonLight"

export default function OnBoardingProcess(props) {


    const [count, setCount] = useState(0);

        return (
                 <Wrapper>
                     {
                         count === 0 ? 
                           <div className="">Onboarding page</div>
                         :
                        <Buttons>
                            < ButtonLight backward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                            < ButtonLight forward onClick={() => setCount(count > 0 ? count - 1 : 0)}/>
                        </Buttons>
                     }
              


                </Wrapper>
        )
          
    }


//-----------------------------------------------STYLES-----------------------------------------------//

const Wrapper = styled.div`
    grid-area: m;
    display: grid;
    height: 100%;
    width: 100%;
    margin-letf: 5%;
`
const Buttons = styled.div`

`
