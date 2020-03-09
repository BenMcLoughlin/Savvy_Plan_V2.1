import React from "react"
import {connect} from "react-redux"
import styled from "styled-components"
import NewEvent from "pages/onboarding/components/NewEvent"
import {Title} from "pages/onboarding/components/FirstName"

const LifeEvents = ( ) => {

return (
    <Wrapper>
                <Title>Add Events you would need to draw from Savings for</Title>
      <Section>
           <NewEvent/>
    </Section>

    </Wrapper>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,

})

export default connect(mapStateToProps,)(LifeEvents)

//-----------------------------------------------style-----------------------------------------------//

const Wrapper = styled.div`   
      display: flex;
      flex-direction: column;

`

const ChartWrapper = styled.div`
    height: 25rem;
    width: 120rem;
    margin-top: -5rem;

`

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: -5rem;
`