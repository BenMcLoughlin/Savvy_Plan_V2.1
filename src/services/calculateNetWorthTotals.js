import React, { Component } from 'react'
import styled from "styled-components"
import { connect } from 'react-redux'

const sumClassTypes = obj => Object.values(obj).map(a => Number(a.financialValue)).reduce((acc, num) => acc + num)
 
 class SectionHeader extends Component {
    state = {
        sectionVisible: false,
    }
    toggleState = ()=> {
        const show = this.state.labelAsInput
        this.setState({
            labelAsInput: !show
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.setState({
                labelAsInput: false,
            })
        }
      }

    render() {
        return (
            <Header
            onClick={() => this.props.toggleState()}
            >
                {this.props.allTitleProps.label}
                <CatagoryTotal onClick={(event) => this.toggleItem(event)}>${sumClassTypes(this.props.netWorthState.assets.cashAssets).toLocaleString()}</CatagoryTotal>
            </Header>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        netWorthState: state.netWorthState
    }
}

export default connect(mapStateToProps)(SectionHeader)


//-----------------------------------------------style-----------------------------------------------//

const RangeBarWrapper = styled.div`
    margin-top: 1rem;
    position: relative;
    padding-left: 1rem;
    width: 25rem;
`
const Delete = styled(CloseIcon)`
    position: absolute;
    top: .5rem;
    right: -11.2rem;
    cursor: pointer;
`