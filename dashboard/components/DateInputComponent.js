/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import COLORS from '../../assets/constants/colors';

const DateInputComponent = ({ label, value, onChangeText }) => {
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
          style={{color: COLORS.black}}
        />
      </View>
    </View>
  );
};
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

export default DateInputComponent;
