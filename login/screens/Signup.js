/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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

const Signup = ({ navigation }) => {

  // check terminos y condiciones
  const [isChecked, setIsChecked] = useState(false);

  //validar inputs
  const [inputs, setInputs] = useState({
    // campo cedula
    id: '',
    fullname: '',
    email: '',
    password: '',
  });

  // estado para el loader
  const [loading, setLoading] = useState(false);

  //Validar errores
  const validate = async () => {
    //traer lo que copie el usuario
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Ingresa un correo :)', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Ingresa un correo valido :)', 'email');
      valid = false;
      // validar si
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/; //  verifica si la contraseña cumple con los criterios especificados.
    if (!inputs.password) {
      handleError('Ingresa una contraseña :)', 'password');
      valid = false;
    } else if (!passwordRegex.test(inputs.password)) {
      handleError('La contraseña debe cumplir los requisitos especificados.', 'password');
      valid = false;
    }


    // Validación del campo nombre
    if (!inputs.fullname) {
      handleError('Ingresa tu nombre :)', 'fullname');
      valid = false;
    }

    // Validación del campo de identificación
    const idRegex = /^\d+$/; // Expresión regular que permite solo números
    if (!inputs.id) {
      handleError('Ingresa tu CC', 'id');
      valid = false;
    } else if (!idRegex.test(inputs.id)) {
      handleError('Ingresa solo números :)', 'id');
      valid = false;
    }

    if (valid) {
      // Aquí agregamos la verificación de correo electrónico
      const emailExists = await checkEmailExists(inputs.email);
      if (emailExists) {
        handleError('El correo ya está registrado :)', 'email');
      } else {
        // Si el correo no está registrado, procedemos con el registro
        register();
        console.log(inputs);
      }
    }
  };


  const [errors, setErrors] = useState({});

  // Registrarse
  const register = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        setLoading(false);
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('Dashboard');
        //resetFields();
      } catch (error) {
        Alert.alert('Error', error.message);
        console.log(error);
      }
    }, 3000);
  };

  // validar si un correo existe
  const checkEmailExists = async (email) => {
    try {
      const users = await AsyncStorage.getItem('user'); // Suponiendo que 'users' es la clave de almacenamiento para los usuarios
      if (users) {
        const userList = JSON.parse(users);
        const existingUser = userList.find(user => user.email === email);
        if (existingUser) {
          return true; // El correo ya existe
        }
      }
      return false; // El correo no existe
    } catch (error) {
      Alert.alert('Error while checking email existence:', error.message);
      return false; // En caso de error, asumimos que el correo no existe para evitar problemas
    }
  };
  // vaciar los inputs
  const resetFields = () => {
    setInputs({
      id: '',
      fullname: '',
      email: '',
      password: '',
    });
    setErrors({});
    setIsChecked(false);
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
            <Text style={styles.title}>Crea una Cuenta</Text>
            <Text style={styles.subtitle}>Comienza a gestionar tus necesidades!</Text>
          </View>

          <View style={styles.container}>
            {/* Campo de número de identificacion */}
            <Input
              placeholder="Digita tu cedula"
              keyboardType="numeric"
              icon="id-card"
              maxLength={10}
              label="Cedula de Ciudadania"
              error={errors.id}
              onFocus={() => {
                {/* Resetear error */ }
                handleError(null, 'id');
              }}
              onChangeText={text => handleOnchange(text, 'id')}
            />
            {/* Campo de nombres */}
            <Input
              placeholder="Entra tu nombre completo"
              keyboardType="default"
              maxLength={30}
              icon="user"
              label="Nombre Completo"
              error={errors.fullname}
              onFocus={() => {
                {/* Resetear error*/ }
                handleError(null, 'fullname');
              }}
              onChangeText={text => handleOnchange(text, 'fullname')}
            />

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
            <Text style={styles.checkboxText}>Acepto los terminos y condiciones *.</Text>
          </View>

          {/* Botón de registro */}
          <Button title="Registrarse" filled style={styles.signupButton} onPress={validate} />

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
            <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Inicia Sesión</Text>
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
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    color: COLORS.black,
  },
  phoneCodeInput: {
    width: '12%',
    borderRightWidth: 1,
    borderLeftColor: COLORS.grey,
    paddingLeft: 8,
  },
  passwordContainer: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 6,
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

export default Signup;
