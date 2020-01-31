import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../screens/Home.js'
import Login from '../screens/Login.js'
import CreateAccount from '../screens/CreateAccount.js'

const screens = {
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    CreateAccount: {
        screen: CreateAccount
    }
}

const NavStack = createStackNavigator(screens)

export default createAppContainer(NavStack)