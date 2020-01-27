import React from "react"
import {setUserDetail_action} from "redux/user/user_actions"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import NewEvent from "pages/onboarding/components/NewEvent"
import {lifeEvents} from "redux/lifeEvents/lifeEvents_selectors"
import HorizontalTimeline from "charts/assumptions/HorizontalTimeline"
import {Title} from "pages/onboarding/components/FirstName"

const LifeEvents = ({ lifeEvents } ) => {

console.log(lifeEvents);
return (
    <Wrapper>
                <Title>Add Events you would need to draw from Savings for</Title>
     <ChartWrapper>
              <HorizontalTimeline/> 
      </ChartWrapper>
      <Section>
           <NewEvent/>
    </Section>

    </Wrapper>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    lifeEvents_reducer: state.lifeEvents_reducer,
    lifeEvents: lifeEvents(state)
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