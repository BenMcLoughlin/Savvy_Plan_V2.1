import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { NavLink} from "react-router-dom"
import {connect} from "react-redux"
import ProgressIndicator from "UI/progressIndicator/ProgressIndicator"
import {ArrowLeft, NavIcon} from "style/Icons"

const LeftNavBar = ({progress_reducer}) => {

    const [open, toggleOpen] = useState((false))


    return (
        <>
        {
            open || progress_reducer.dashboard === 1 ? 
            <Wrapper progress_reducer={progress_reducer}>
            <Header>Progress Tracker</Header>
            <Arrow onClick={() => toggleOpen(false)}/>
            <PageSelect to="/NetWorth"> NetWorth</PageSelect>
            <ProgressIndicator 
                    complete={progress_reducer.netWorth} 
                    totalSteps={5}
                    />
            <PageSelect to="/NetWorth"> Spending Patterns</PageSelect>
            <ProgressIndicator 
                    complete={0} 
                    totalSteps={3}
                    />
            <PageSelect to="/income"> Income</PageSelect>
            <ProgressIndicator 
                    complete={0} 
                    totalSteps={3}
                    />
            <PageSelect to="/savings"> Savings Plan</PageSelect>
            <ProgressIndicator 
                    complete={0} 
                    totalSteps={3}
                    />
            <PageSelect to="/tax"> Tax Position</PageSelect>
            <ProgressIndicator 
                    complete={0} 
                    totalSteps={3}
                    />
        </Wrapper>
        :
          <Nav onClick={() => toggleOpen(true)}/>
        }
        </>
    )
}

const mapStateToProps = (state) => ({
    progress_reducer: state.progress_reducer
})

export default connect(mapStateToProps)(LeftNavBar)


const Header = styled.div`
    height: 4rem;
    width: 100%;
    font-size: ${props => props.theme.fontSize.medium};
    color: ${props => props.theme.color.ice};
    margin-top: 3rem;
    text-align: center;
    border-bottom: ${props => props.theme.border.primary}
`
const Wrapper = styled.div`
    position: absolute;
    top: 7rem;
    height: 54rem;
    width: 20rem;
    background: ${props => props.theme.color.slate};
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    z-index: ${props => props.progress_reducer.dashboard === 1 ? 900 : 600}
`

export const PageSelect = styled(NavLink)`
       padding: 1rem;
       margin: 1rem;
       font-size: ${props => props.theme.fontSize.smallMedium};
       ${props => props.theme.flexContent.center};
       height: 6rem;
       cursor: pointer;
       position: relative
       border-radius: 1px;
       transition: all .1s ease-in;
       &:hover {
           background: ${props => props.theme.color.ice};
           color:  ${props => props.theme.color.slate};
       }
       text-decoration: none;
       color: white;
  } 
`
const Arrow = styled( ArrowLeft)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: ${props => props.theme.color.ice};
  cursor: pointer;
`
const Nav = styled(NavIcon)`
  position: absolute;
  top: 7rem;
  left: 2rem;
  color: red;
  cursor: pointer;
  color:  ${props => props.theme.color.slate};
`