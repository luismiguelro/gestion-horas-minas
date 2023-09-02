/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from '../../assets/constants/colors';

// Componente DateInputComponent utilizado para mostrar un campo de entrada de fecha.
const DateInput = ({ label, value, onChangeText }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '400',
          marginVertical: 8,
          color: COLORS.black,
        }}
      >
        {label}
      </Text>
      <View style={styles.ViewInput}>
        <TextInput
          placeholder={`Ingrese ${label}`}
          placeholderTextColor={COLORS.grey}
          value={value}
          onChangeText={onChangeText}
          style={{ color: COLORS.black }}
        />
      </View>
    </View>
  );
};

// Estilos para el componente DateInputComponent.
const styles = StyleSheet.create({
  ViewInput: {
    width: '100%',
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
});

export default DateInput;
