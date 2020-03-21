import React, { useState } from 'react';
import { YellowBox } from 'react-native'
import _ from 'lodash';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { createStackNavigator } from 'react-navigation-stack';

//import MealsNavigator from './navigation/MealsNavigation';
import PemNavigation from './navigation/PemNavigation';
import { enableScreens } from 'react-native-screens';

/*
There's this warning about "setting a timer" that shows up around every
two minutes or so, and it takes up like 20 lines in my terminal each time.
This leads to my terminal comprising of 98% timer warnings, meaning I have
to dig through all the warnings for my console.log statements that I use
to debug. As you can imagine, this is annoying. The following few lines of
code are what stop that warning from showing up, so I can debug more easily.
*/
YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Setting a timer', 'Deprecation in'])
const _console = _.clone(console);
console.ignoredYellowBox = ['Setting a timer'];
console.disableYellowBox = true
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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

  return <PemNavigation />;
}
