/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { Login, Signup, Welcome } from './login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from './dashboard';
import { FormScreen } from './dashboard';
import { Novedades } from './dashboard';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './login/components/Loader';
const Stack = createNativeStackNavigator();
export default function App() {
  // autenticacion del usuario
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        const userDataObj = JSON.parse(userData);
        if (userDataObj?.loggedIn) {
          setInitialRouteName('Dashboard');
        } else {
          setInitialRouteName('Login');
        }
      } else {
        setInitialRouteName('Welcome');
      }
    } catch (error) {
      setInitialRouteName('Welcome');
    }
  };

  //Navegacion entre pantallas
  return (
    <NavigationContainer>
      {initialRouteName === '' ? <Loader visible={true} /> : <>
        <Stack.Navigator
          initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="FormScreen"
            component={FormScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Novedades"
            component={Novedades}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </>}
    </NavigationContainer>
  );
}
