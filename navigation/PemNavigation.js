import {Platform} from 'react-native';

import {createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import SubCategoriesScreen from '../screens/SubCategoriesScreen';
import CatContentScreen from '../screens/CatContentScreen';

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


export default createAppContainer( PemNavigator);