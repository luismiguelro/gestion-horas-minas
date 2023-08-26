/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import COLORS from '../../assets/constants/colors';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import IMAGES from '../../assets/constants/images';

const Signup = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);

  // Manejadores de prensa para los botones de Facebook y Google
  const handleFacebookPress = () => {
    console.log('pressed facebook');
  };

  const handleGooglePress = () => {
    console.log('pressed google');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Título */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Crea un Cuenta</Text>
          <Text style={styles.subtitle}>Comienza a gestionar tus permisos!</Text>
        </View>

        <View style={styles.inputContainer}>
          {/* Campo de número de identificacion */}
          <Text style={styles.inputLabel}>Cedula de Ciudadania</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Digita tu cedula"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              style={styles.textInput}
            />
          </View>
        </View>

        {/* Campo de correo electrónico */}
        <Text style={styles.inputLabel}>Correo Electrónico</Text>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Entra tu correo electronico"
              placeholderTextColor={COLORS.grey}
              keyboardType="email-address"
              style={styles.textInput}
            />
          </View>

        {/* Campos de contraseña */}
        <View style={styles.passwordContainer}>
          <InputPassword headerText="Password" placeholderText="Escribe tu contraseña" />

        </View>

        {/* Checkbox de acuerdo a términos y condiciones */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={styles.checkboxText}>I agree to the terms and conditions.</Text>
        </View>

        {/* Botón de registro */}
        <Button title="Sign up" filled style={styles.signupButton} />

        {/* Separador "O Sign up with" */}
        <View style={styles.orDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or Sign up with</Text>
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
          <Text style={styles.loginText}>Already have an account</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </Pressable>
        </View>
      </View>
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
    marginBottom: 12,
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
