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
I've been getting an error ever since I ran npm `install react-native-dialog-input`.
First, it was saying it couldn't reslove firebase. Then it was saying it couldn't 
resolve react-native-gifted-chat. I fixed those two. Now, it's saying "ReferenceError:
Can't find variable: crypto". I got the following solution 
from https://github.com/expo/expo/issues/7507.

UPDATE ON 4/10/2020: The solution was downgrading Firebase to 7.9.0. 
*/

/*global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => {
  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = Math.floor(256 * Math.random()); 
  }
};

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = "_lt_" + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === "string" && id.startsWith("_lt_")) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}*/

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
