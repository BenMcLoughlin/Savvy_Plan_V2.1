import React from "react"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rate1, rate2, investmentReturns_selector} from "redux/assumptions/assumptions_selectors"
import MiniRangeBar from "UI/miniRangeBar/MiniRangeBar"
import {setNestedKeyValue_action} from "redux/actions"
import {Title, Dialogue} from "pages/onboarding/components/FirstName"

const PreRetirementRate = ({count, user_reducer, setNestedKeyValue_action, investmentReturns_selector}) => {

    const setInvestmentFactor = (value, nothing, {name}) => {
        setNestedKeyValue_action("rangeBarValue", name, "assumptions_reducer", value) 
    }

    const position = count - 6
return (
    <>
        <Title>We need to make some assumptions.</Title>
                    {
            <MiniRangeBar
                                                        id={investmentReturns_selector[position].name}
                                                        key={investmentReturns_selector[position].name}
                                                        setValue={setInvestmentFactor}                                                        //Function Defined Above, sets the age in the reducer
                                                        rangeBarProps={investmentReturns_selector[position]}                                                                            //We pass in the entire object as rangeBarProps to have access to all it's properties throughout the cycle
                                />
                        }
                            {
                    count === 6 ? 
                          <Dialogue>
                              What rate of return would you like to use for your savings projections? 
                             <span> The Financial Planning Standards Council recccomends 6.4% </span> 
                          </Dialogue>

                    :
                    count === 7 ? 
                        <Dialogue>
                           After entering retirement, you’ll want to protect
                            your savings. You’ll do this by reducing risk which
                            can also reduce your return.   
                        <span> The Financial Planning Standards Council recccomends 5% </span> 
                        </Dialogue>
                    :
                    count === 8 ? 
                        <Dialogue>
                            You’re likely paying someone to manage 
                            your money. This expense also has to be reduced 
                            from your rate of return. 
                        <span> The average Canadian is paying around 2.1%. If you use a Robo-Advisor like Wealthsimple it can be closer to 0.5%. </span> 
                        </Dialogue>
                    :
                    count === 9 ? 
                        <Dialogue>
                            We’d like to keep all our future prediction numbers
                            in todays dollars. We do this by subtracting inflation
                            from the rate of return. 
                        <span> The Financial Planning Standards Council recccomends 2% </span> 
                        </Dialogue>
                    :
                    count === 10 ? 
                        <Dialogue>
                           The increase in property will impact your financial plan, historically it has increased at a higher rate than inflation.
                        <span> The Financial Planning Standards Council recccomends 3% </span> 
                        </Dialogue>
                    :
                    null
                }
             

        



    </>

)
}

const mapStateToProps = (state) => ({
    user_reducer: state.user_reducer,
    investmentReturns_selector: investmentReturns_selector(state),
})

export default connect(mapStateToProps, {setNestedKeyValue_action, })(PreRetirementRate)

//-----------------------------------------------style-----------------------------------------------//


