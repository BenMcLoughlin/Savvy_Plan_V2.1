import React, {useState, useEffect} from 'react'
import Layout from "./layout/Layout"
import {BrowserRouter} from "react-router-dom"
import { GlobalStyles } from "./styles/Themes"
import {auth, createUserProfileDocument} from "./firebase/firebaseUtils"
import {setUserDetails_action} from "redux/user/user_actions"
import {connect} from "react-redux"

 function App({setUserDetails_action}) {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
                if(userAuth) {
                    const userRef = await createUserProfileDocument(userAuth)
                    userRef.onSnapshot(snapshot => {
                        setCurrentUser({
                            currentUser: {
                                id: snapshot.id, 
                                ...snapshot.data()
                            }
                        })
                        setUserDetails_action(snapshot.id, snapshot.data());
                    })
                }
                else {
                    setCurrentUser(null)
                }
            })
        }, [])


    return (
        <>
          <GlobalStyles />
          <BrowserRouter>
              <Layout currentUser={currentUser}/>
         </BrowserRouter>   
        </>
    )
}


export default connect(null,{setUserDetails_action} )(App)


//
//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
// Here the Global styles are inserted and passed to all children in the app. Browser Router is 
//also initiated to enable routing between pages. 