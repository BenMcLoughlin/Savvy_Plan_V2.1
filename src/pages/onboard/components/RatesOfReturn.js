import React from "react"
import Input from "UI/forms/Input"
import {connect} from "react-redux"
import styled from "styled-components"
import {rates_data} from "pages/onboard/data/onboard_data"
import MiniRangeBar from "UI/miniRangeBar1/MiniRangeBar"
import {setKeyValue_action} from "redux/actions"
import {Title, Dialogue} from "pages/onboard/components/FirstName"

const RatesOfReturn = ({count, user_reducer, setKeyValue_action}) => {

    const position = count - 6                                                                                                              //data is stored in an array, this takes the count number and converts it into an array position
console.log(user_reducer);
console.log(user_reducer[rates_data[position].name]);
    return (                                                                                                                                //as count increases the array object changes displaying a new rangebar with new data
    <>
        <Title>We need to make some assumptions.</Title>
                    {
            <MiniRangeBar
                        label={rates_data[position].label}
                        name={rates_data[position].name}
                        reducer={"user_reducer"}
                        setKeyValue_action={setKeyValue_action}                                                                      
                        step={rates_data[position].step}
                        value={user_reducer[rates_data[position].name]}
                        min={rates_data[position].min}
                        max={rates_data[position].max}
                        numberType={rates_data[position].numberType}
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
})

export default connect(mapStateToProps, {setKeyValue_action})(RatesOfReturn)

//-----------------------------------------------style-----------------------------------------------//


