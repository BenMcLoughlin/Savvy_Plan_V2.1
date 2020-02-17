import React, { Component } from 'react'
import { connect } from 'react-redux'
import Section from "./Section"
import styled from "styled-components"

 class NetWorthUserInterface extends Component {

    renderSections = (state) => {
        return Object.values(state).slice(4).map((section, index) => <Section key={index} sectionProps={section}/>)
    }

    render() {
        return (
            <UserInterfaceWrapper>
                <NetWorthTotal>
                    $ {(this.props.netWorthState.netWorthTotal()).toLocaleString()}
                    <span>Net Worth</span>
                </NetWorthTotal>
                <SectionsWrapper>
                    <SectionWrapper>
                        <CatagoryTotal>
                            $ {(this.props.netWorthState.assets.assetsTotal()).toLocaleString()}
                            <span>Total Assets</span>
                            <p>What you own</p>
                        </CatagoryTotal>
                        {this.renderSections(this.props.netWorthState.assets)}
                        cashAssetsTotal = {this.props.netWorthState.assets.cashAssetsTotal()}
                    </SectionWrapper>
                    <SectionWrapper>
                        <CatagoryTotal>
                            $ {(this.props.netWorthState.liabilities.liabilitiesTotal()).toLocaleString()}
                            <span>Total Liabilities</span>
                            <p>What you owe</p>
                        </CatagoryTotal>
                        {this.renderSections(this.props.netWorthState.liabilities)}
                    </SectionWrapper>
                </SectionsWrapper>
            </UserInterfaceWrapper>

        )
    }
}

const mapStateToProps = (state) => {

    return {
        netWorthState: state.netWorthState
    }
}

export default connect(mapStateToProps)(NetWorthUserInterface)

//-----------------------------------------------STYLES-----------------------------------------------//

const UserInterfaceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`
const SectionsWrapper = styled.div`
    margin: 0rem auto;
    width: 100rem;
    display: flex;

`
const SectionWrapper = styled.div`
    margin-left: 2rem;
    width: 49%;
`
const NetWorthTotal = styled.div`
    font-size: ${props => props.theme.fontSize.largest};
    color: ${props => props.theme.color.text2};
    font-weight: 300;
    display: flex;
    flex-direction: column;
    & span {
        font-size: ${props => props.theme.fontSize.medium}
    }

`
const CatagoryTotal = styled(NetWorthTotal)`
    font-size: ${props => props.theme.fontSize.large};
    padding: 3rem;
    & p {
        font-size: ${props => props.theme.fontSize.small};
    }
`