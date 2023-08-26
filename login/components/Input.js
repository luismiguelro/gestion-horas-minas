/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import COLORS from '../../assets/constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input = ({ 
  label,
  icon,
  placeholder,
  keyboardType,
  secureTextEntry = false,
  maxLength,
  password,
  error,
  onFocus = ()=>{},
  ...props
 }) => {
  const [isFocused,setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={{...styles.inputView,
          borderColor: error
          ? COLORS.red
          : isFocused
          ? COLORS.primary
          : COLORS.black}}>
            <Ionicons name={icon} size={20} style={{color:COLORS.grey,  padding:10}}/>
          <TextInput
            secureTextEntry={hidePassword}
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor={COLORS.grey}
            keyboardType={keyboardType}
            maxLength={maxLength}
            style={{...styles.textInput, color:COLORS.primary, flex:1}}
            {...props}
            onFocus={()=>{
              onFocus();
            }}
            onBlur={()=> setIsFocused(false)}
          />
          {password && (
                  <TouchableOpacity
                  onPress={()=>setHidePassword(!hidePassword)}
                  style={{
                   position: 'absolute',
                   right:12,
                 }}>
                   {
                     hidePassword === true ? (<Ionicons name="eye-off" size={24} color={COLORS.primary}/>) : (<Ionicons name="eye" size={24} color={COLORS.primary}/>)
                   }
                 </TouchableOpacity>
          )}
        </View>
        {error && <Text style={{color:COLORS.red, fontSize:12, marginTop:5}}>{error}</Text>}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      marginBottom: 5,
    },
    inputContainer: {
      marginBottom: 0,
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
      marginBottom: 0,
    },
    textInput: {
      flex: 1,
      color: COLORS.black,
    },
  });

  export default Input;
