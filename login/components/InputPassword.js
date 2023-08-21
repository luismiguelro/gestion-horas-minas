/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputPassword = ({headerText,placeholderText}) => {
  // password status
  const [isPasswordShown, setPasswordShown] = useState(false);
  return (
    <View style={{marginBottom:12}}>
    <Text style={{
      fontSize: 16,
      fontWeight: 400,
      marginVertical: 8,
      color: COLORS.black,
    }}>{headerText}</Text>

    <View style={{
      width:'100%',
      height:48,
      borderColor: COLORS.black,
      borderWidth:1,
      borderRadius:8,
      alignItems:'center',
      justifyContent:'center',
      paddingLeft:22,
    }}>
      <TextInput
      placeholder={placeholderText}
      placeholderTextColor={COLORS.grey}
      secureTextEntry ={isPasswordShown}
      style={{
        width:'100%',
        color: COLORS.black,
      }}
      />
      <TouchableOpacity
       onPress={()=>setPasswordShown(!isPasswordShown)}
       style={{
        position: 'absolute',
        right:12,
      }}>
        {
          isPasswordShown === true ? (<Ionicons name="eye-off" size={24} color={'red'}/>) : (<Ionicons name="eye" size={24} color={'red'}/>)
        }
      </TouchableOpacity>
    </View>

  </View>
  );
};

export default InputPassword;

