/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import { Login,Signup, Welcome } from './login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard } from './dashboard';
const Stack = createNativeStackNavigator();
export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{
                        headerShown:false,
                    }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{
                        headerShown:false,
                    }}
                />
            </Stack.Navigator>
      </NavigationContainer>
    );
}
