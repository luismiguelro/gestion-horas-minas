/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import COLORS from '../../assets/constants/colors';

const Button = (props) => {
    // Determinar el color de fondo y el color de texto en función de las propiedades
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{ backgroundColor: bgColor }, // Establecer el color de fondo
                ...props.style, // Aplicar estilos personalizados si los hay
            }}
            onPress={props.onPress}
        >
            <Text style={{ fontSize: 18, ...{ color: textColor } }}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Button;
