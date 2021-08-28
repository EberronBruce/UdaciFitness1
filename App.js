import React from 'react';
import { View, Platform, Text, StatusBar, SafeAreaView } from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer} from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { purple, white } from './utils/colors';
import Constants from 'expo-constants';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <SafeAreaView style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  )
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content"/>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let icon
                  if (route.name === 'Add Entry') {
                    icon = (
                      <FontAwesome name='plus-square' size={30} color={color} />
                    )
                  } else if (route.name === 'History') {
                    icon = (
                      <Ionicons name="bookmarks" size={30} color={color} />
                    )
                  }
                  return icon
                },
                tabBarActiveTintColor: Platform.OS === 'ios' ? purple : white,
                tabBarIndicatorStyle: {
                  backgroundColor: 'yellow'
                },
                tabBarStyle: {
                  backgroundColor: Platform.OS === 'ios' ? white : purple,
                }
              })}
            >
              <Tab.Screen name="History" component={History} />
              <Tab.Screen name="Add Entry" component={AddEntry} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}
