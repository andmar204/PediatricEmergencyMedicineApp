import { Platform } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
import CatContentScreen from '../screens/CatContentScreen';
import ChatroomScreen from '../screens/ChatroomScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CMEScreen from '../screens/CMEScreen';
import Colors from '../constants/Colors';

const PemNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen
  },
  SubCategories: {
    screen: SubCategoriesScreen
  },
  CatContent: {
    screen: CatContentScreen
  },
  Chatroom: {
    screen: ChatroomScreen
  },
  CME: {
    screen: CMEScreen
  },
  Login: {
    screen: LoginScreen
  },
  SignUp: {
    screen: SignUpScreen
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
      headerTitle: 'A Screen'
    }
  }
);


export default createAppContainer(PemNavigator);