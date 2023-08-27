/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */

import { View, Text,StyleSheet,useWindowDimensions } from 'react-native';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import COLORS from '../../assets/constants/colors';

// proprs: para mostrar o esconder el modal
const Loader = ({visible = false}) => {
    const {height, width} = useWindowDimensions();
  return (
    visible && <View style={[styles.container,{height,width}]}>
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={COLORS.primary}/>
            <Text style={styles.textLoader}>Cargando...</Text>
        </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex:10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
    },
    loader:{
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
    },
    textLoader:{
        marginRight:20,
        fontSize:16,
        color:COLORS.black,
    },
});
export default Loader;
