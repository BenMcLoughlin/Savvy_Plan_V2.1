import React from "react"
import UserInterface from "./Containers/UserInterface"
import {ThemeProvider} from "styled-components"
import {lightTheme} from "../../Styles/Themes"
import styled from "styled-components"

const NetWorthApp = () => {    

    return (
       
        <ThemeProvider theme={lightTheme}> 
            <NetWorthAppContainer>
                <UserInterface/>
            </NetWorthAppContainer>
        </ThemeProvider>
       
    )

}

const NetWorthAppContainer = styled.div `
margin: auto;
grid-area: m;
`

export default  NetWorthApp

    //-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
    // This is the app page of the Net Worth App that brings everything together and compiles it into one simple component. 
    // it currently has its own theme but that will have to change. 