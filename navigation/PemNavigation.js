import {Platform} from 'react-native';

import {createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
import CatContentScreen from '../screens/CatContentScreen';
import ChatroomScreen from '../screens/ChatroomScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpSreen';
import SearchScreen from '../screens/searchScreen';

import Colors from '../constants/Colors';


 const PemNavigator = createStackNavigator ({
    Categories: {
      screen: CategoriesScreen
    },
    SubCategories: {
      screen: SubCategoriesScreen
    },
    CatContent: {
      screen: CatContentScreen
    },
    Chatroom:{
      screen: ChatroomScreen
    },
    Login:{
      screen: LoginScreen
    },
    SignUp:{
      screen: SignUpScreen
    },
    Search:{
      screen: SearchScreen
    }
    
  },
  {
    // initialRouteName: 'Categories',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
      },
      headerTintColor:
        Platform.OS === 'android' ? 'white' : Colors.primaryColor,
      
    }
  }
);


export default createAppContainer( PemNavigator);