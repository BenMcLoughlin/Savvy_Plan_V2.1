import React, {useState} from "react"
import {setKeyValue_action, setNestedKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import styled from "styled-components"
import RangeBar from "UI/rangeBar1/RangeBar"

const Accounts = ({netWorth_reducer, main_reducer, count, setNestedKeyValue_action}) => {

     const [accounts, setAccount] = useState({
         TFSA: false, 
         RRSP: false, 
     })



     const {TFSA, RRSP} = netWorth_reducer
     const {TFSAcontribution, RRSPcontribution} = main_reducer

return (
   <Wrapper className="ACCOUNTS">

           <Title> <h1>Do you have savings? </h1> </Title>
           <Box>
               <Column>
                    <Select>
                    <h2>I have... </h2>
                            {Object.keys(accounts).map(d => <Circle selected={accounts[d]} onClick={() => setAccount({...accounts, [d]: !accounts[d]})}>{d}</Circle>)  }
                    </Select>

                    {
                        count === 1 ?  Object.keys(accounts).filter(d => accounts[d] === true).map(d => {
                            const instance = d === "TFSA" ? TFSA : RRSP 
                            console.log(instance);
                            return (
                          
                 
                            <Select>
                                        <RangeBar
                                                style={{marginLeft: "-12rem"}}
                                                setNestedKeyValue_action={setNestedKeyValue_action}                                                                   //this allows the user to change the value of the income stream
                                                reducer="netWorth_reducer"
                                                label={`${d} Current Value`}
                                                instance={instance}     
                                            />
                             </Select>
  
                               )})
                       :  count === 2  ? Object.keys(accounts).filter(d => accounts[d] === true).map(d => {
                        const instance = d === "TFSA" ? TFSAcontribution : RRSPcontribution
                        return (
                  
                                    <Select>
                                    <RangeBar
                                            setNestedKeyValue_action={setNestedKeyValue_action}                                                                   //this allows the user to change the value of the income stream
                                            reducer="main_reducer"
                                            label={`${d} Annual Contributions`}
                                            instance={instance}     
                                        />
                                    </Select>
                       
                           )})
                           : null
                   }                          
                 </Column> 
          </Box>

   </Wrapper> 

)
}

const mapStateToProps = (state) => ({
    netWorth_reducer: state.netWorth_reducer,
    main_reducer: state.main_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action, setNestedKeyValue_action})(Accounts)

const Wrapper = styled.div`
    width: 60rem;
    height: auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
`
const Title = styled.h1`
    width: 40rem;
    height: auto;
    padding: 1rem;
    margin-top: 2rem;
    font-weight: bold

`

const Box = styled.div`
    height: auto;
    width: 50rem;
    border-radius: 3rem;
    display: flex;

    
`

const Column = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    align-content: center;
`
const Select = styled.div`
    width: 40rem;
    min-height: 12rem;
    height: auto;
    display: flex; 
    border-radius: 5px;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
    padding: 1rem;
    border: ${props => props.theme.border.primary};
    background: ${[props => props.theme.color.ice]};
`
const  Circle = styled.div`
width: ${props => props.selected ? "7.9rem" : "7.5rem;"};
height: ${props => props.selected ? "7.9rem" : "7.5rem;"};
   border-radius: 50%;
   background: ${props => props.selected ? props.theme.color.steelBlue: props.theme.color.green};
   transition: all .2s ease-in;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1.6rem;
   color: white;
   cursor: pointer;
`


const StyledGrid = styled.div`

  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }

  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }

  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }

  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
`;


//-----------------------------------------------style-----------------------------------------------//

