/* eslint-disable prettier/prettier */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import COLORS from '../../assets/constants/colors';
import Button from '../components/Button';
import IMAGES from '../../assets/constants/images';
import Input from '../components/Input';
import Loader from '../components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  // check terminos y condiciones
  const [isChecked, setIsChecked] = useState(false);

  //validar inputs
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  //Validar errores
  const [loading, setLoading] = useState(false);
  const validate = () => {
    //traer lo que copie el usuario
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Ingresa un correo :)', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Please input password', 'password');
      valid = false;
    }
    if (valid) {
      login();
    }
  };
  // estado para el loader
  const [errors, setErrors] = useState({});

  // Registrarse
  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      //obtener datos del usuario
      let userData = await AsyncStorage.getItem('user');
      // validar el usuario
      if (userData) {
        userData = JSON.parse(userData);
        //validar los campos escritos y datos registrados
        if (
          inputs.email === userData.email &&
          inputs.password === userData.password
        ) {
          {/*Actualizar la informacion y añadiendo validacion de inicio de sesion y a su vez llevando a la pantall principal*/ }
          AsyncStorage.setItem('user', JSON.stringify({ ...userData, loggedIn: true }),
          );
          navigation.navigate('Dashboard');
        } else {
          Alert.alert('Error', 'Correo o contraseña incorrectos');
        }
      } else {
        Alert.alert('Error', 'Usuario no existe');
      }
    }, 3000);
  };

  //actualizar estado input con lo ingresado
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  //mostrar errores
  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({ ...prevState, [input]: errorMessage }));
  };
  console.log(inputs);

  // Manejadores de prensa para los botones de Facebook y Google
  const handleFacebookPress = () => {
    Alert.alert('NOTIFICATION', 'pressed facebook',);
  };

  const handleGooglePress = () => {
    Alert.alert('NOTIFICATION', 'pressed google');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView>
        <View style={styles.contentContainer}>
          {/* Título */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Inicia Sesión</Text>
            <Text style={styles.subtitle}>Hey! Bienvenido, ya te extrañabamos.</Text>
          </View>

          <View style={styles.container}>

            {/* Campo de correo electrónico */}
            <Input
              placeholder="Entra tu correo electronico"
              keyboardType="email-address"
              icon="mail"
              label="Correo Electrónico"
              error={errors.email}
              onFocus={() => {
                {/* Campo de número de identificacion */ }
                handleError(null, 'email');
              }}
              onChangeText={text => handleOnchange(text, 'email')}
            />
            {/* Campo de contraseña */}
            <Input
              placeholder="Entra tu contraseña"
              icon="mail"
              keyboardType="default"
              password
              label="Contraseña"
              maxLength={8}
              error={errors.password}
              onFocus={() => {
                {/* Resetear error*/ }
                handleError(null, 'password');
              }}
              onChangeText={text => handleOnchange(text, 'password')}
            />
          </View>

          {/* Checkbox de acuerdo a términos y condiciones */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />
            <Text style={styles.checkboxText}>Recuerdame.</Text>
          </View>

          {/* Botón de registro */}
          <Button title="Iniciar Sesión" filled style={styles.signupButton} onPress={validate} />

          {/* Separador "O Sign up with" */}
          <View style={styles.orDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O inicia sesión con:</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Botones de registro social */}
          <View style={styles.socialSignupContainer}>
            <TouchableOpacity onPress={handleFacebookPress} style={styles.socialSignupButton}>
              <Image source={IMAGES.signUp.facebook} style={styles.socialImage} resizeMode="contain" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGooglePress} style={styles.socialSignupButton}>
              <Image source={IMAGES.signUp.google} style={styles.socialImage} resizeMode="contain" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Enlace de inicio de sesión */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>¿No tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.loginLink}>Registrate</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 22,
  },
  titleContainer: {
    marginVertical: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: COLORS.black,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    color: COLORS.black,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxText: {
    color: COLORS.black,
  },
  signupButton: {
    marginTop: 18,
    marginBottom: 4,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grey,
    marginHorizontal: 10,
  },
  dividerText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  socialSignupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialSignupButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.grey,
    marginRight: 4,
    borderRadius: 10,
  },
  socialImage: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  socialButtonText: {
    color: COLORS.black,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 22,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.black,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default Login;
