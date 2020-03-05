import React, { Button } from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home.js'
import Login from '../screens/Login.js'
import CreateAccount from '../screens/CreateAccount.js'
import Chatroom from '../screens/Chatroom.js'

const screens = {
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    CreateAccount: {
        screen: CreateAccount
    },
    Chatroom: {
        screen: Chatroom,
        navigationOptions: {
            headerLeft: null
        }
    }
}

const NavStack = createStackNavigator(screens)

export default createAppContainer(NavStack)