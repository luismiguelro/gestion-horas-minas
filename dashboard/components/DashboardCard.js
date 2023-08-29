/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DashboardCard = ({ cardTitle, cardHour, dateText, icon, onPressIngreso, onPressSalida,onPressConsulta,onPressNovedades }) => {
    const navigation = useNavigation();
    // Ejecucion del icono
    const handleIconPress = () => {
        // decidir que funcion ejecutar
        if(onPressIngreso){
            onPressIngreso();
            return;
        }
        if(onPressSalida){
            onPressSalida();
            return;
        }
        if(onPressConsulta){
            navigation.navigate('FormScreen');
            return;
        }
        if(onPressNovedades){
          navigation.navigate('Novedades');
          return;
      }
      };
      
    return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardHour}>{cardHour}</Text>
          <Text style={styles.dateText}>{dateText}</Text>
        </View>
        <View style={styles.iconContainer}>
        <Pressable
            onPress={handleIconPress}>
            <Ionicons name={icon} size={60} color={'#EFE3C8'}/>
        </Pressable>
            </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#201520',
    borderColor: '#70434170',
    borderWidth: 1.5,
    borderRadius: 8,
    minHeight: 150,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cardTitle: {
    color: '#EFE3C8',
    fontSize: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    paddingTop: 20,
  },
  cardHour: {
    color: '#EFE3C880',
    fontSize: 24,
    marginBottom: 20,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default DashboardCard;
