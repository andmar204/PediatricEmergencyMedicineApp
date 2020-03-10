import  React, { useState } from 'react';
import {YellowBox} from 'react-native'
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { createStackNavigator} from 'react-navigation-stack';

//import MealsNavigator from './navigation/MealsNavigation';
import PemNavigation from './navigation/PemNavigation';
import {enableScreens} from 'react-native-screens';

YellowBox.ignoreWarnings(['Setting a timer', 'Deprecation in'])
enableScreens();//not necesary for this app

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return <PemNavigation/>;
}
