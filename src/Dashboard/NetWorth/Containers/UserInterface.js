import React, { Component } from 'react'
import { connect } from 'react-redux'
import Control from "./Control"
import styled from "styled-components"

 class NetWorthUserInterface extends Component {

    renderSections = (state) => {
        return Object.values(state).slice(4).map((section, index) => <Control key={index} sectionProps={section}/>)
    }
        /*
         Objective: map through state and receive props from state that render a unique section. This is done two times for each catagory.
         a catagory is "assets" or "liabilities" a section example is "cashAssets" or "unsecuredDebt"
        the first 4 items in the state array are methods totalling state so this function has to start 4 items deep, hence the .slice(4).
        */

    render() {
        return (
            <UserInterfaceWrapper>

                <NetWorthTotal>
                    $ {(this.props.netWorthState.netWorthTotal()).toLocaleString()}
                    <span>Net Worth</span>

                     {/* Renders the total net Worth to the user */}

                </NetWorthTotal>
                <SectionsWrapper>
                    <SectionWrapper>
                        <CatagoryTotal>
                            $ {(this.props.netWorthState.assets.assetsTotal()).toLocaleString()}

                            {/* Renders the total net Assets to the user */}

                            <span>Total Assets</span>
                            <p>What you own</p>
                        </CatagoryTotal>
                        {this.renderSections(this.props.netWorthState.assets)}

                        
                        {/* Builds the table that displays the sections: "cashAssets", "retirementAssets" and "propertyAssets" */}

                    </SectionWrapper>
                    <SectionWrapper>
                        <CatagoryTotal>
                            $ {(this.props.netWorthState.liabilities.liabilitiesTotal()).toLocaleString()}

                             {/* Renders the total net Liabilities to the user */}

                            <span>Total Liabilities</span>
                            <p>What you owe</p>
                        </CatagoryTotal>
                        {this.renderSections(this.props.netWorthState.liabilities)}

                        {/* Builds the table that displays the sections: "unsecuredDebt", "securedDebt" and "otherDebt"*/}
                       
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
    color: ${props => props.theme.color.contrastText1};
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

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // Renders the entire user interface  to the screen. This includes the total net worth, catagory sub total 
    // and the different sections where the user adds and removes data.