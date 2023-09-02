/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */


import { View, Text,RadioButton } from 'react-native';
import React from 'react';
import COLORS from '../../assets/constants/colors';

const styles = {
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    selectedRadioOption: {
      backgroundColor: COLORS.selectedBackgroundColor,
      borderRadius: 5,
      padding: 10,
    },
    radioLabel: {
      marginLeft: 10,
    },
  };

export default function RadioOption() {
  return (
    <View style={[styles.radioOption, selected === value && styles.selectedRadioOption]}>
    <RadioButton
      value={value}
      status={selected === value ? 'checked' : 'unchecked'}
      onPress={() => onSelect(value)}
      color={selected === value ? 'white' : COLORS.selectedColor} // Color del radio button cuando esté seleccionado
    />
    <Text style={[styles.radioLabel, selected === value && { color: 'white' }]}>
      {label}
    </Text>
  </View>
  );
}
