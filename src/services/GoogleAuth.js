import React, { Component } from 'react'
import styled from "styled-components"
import {connect} from "react-redux"
import {signIn, signOut} from "../actions"

class GoogleAuth extends Component {


    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: "886563506137-piijcvcuc6v83gpc91cta7eomcdbn885.apps.googleusercontent.com",
                scope: "email"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            } )
        })
    }

    onAuthChange = (isSignedIn) => {
        isSignedIn ? signIn() : signOut()
    }

    onSignInClick = () => {
        this.auth.signIn(this.auth.currentUser.get().getId())
    }
    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton = () => {
        return (
            this.props.isSignedIn === null ? null :
            this.props.isSignedIn ? 
            <Button onClick={this.onSignOutClick}>Sign Out</Button> :
            !this.props.isSignedIn ?
            <Button onClick={this.onSignInClick}>Sign In</Button>  : null
           ) 
    }


    render() {
        return (
            <div>
            {this.renderAuthButton()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}


export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)


//--------------------STYLES----------------------------------------------------//
export const Button = styled.div`
        width: 12rem;
        height: 3rem;
        font-size: ${props => props.theme.fontSize.small};
        border: 1px solid ${props => props.theme.color.dullSteelBlue};
        background-color: ${props => props.theme.color.primaryDaBackgroundrk1};
        border-radius: 3px;
        margin: 1rem;
        ${props => props.theme.flexContent.center};
        cursor: pointer;
        color: white;
`