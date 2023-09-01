/* eslint-disable prettier/prettier */
/* eslint-disable keyword-spacing */
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

const DashboardCard = ({ cardTitle, cardHour, dateText, cardType, icon, onPressIngreso, onPressSalida, onPressConsulta, onPressNovedades }) => {
  const navigation = useNavigation();

  const handleIconPress = () => {
    if (onPressIngreso) {
      onPressIngreso();
      return;
    }
    if (onPressSalida) {
      onPressSalida();
      return;
    }
    if (onPressConsulta) {
      navigation.navigate('FormScreen');
      return;
    }
    if (onPressNovedades) {
      navigation.navigate('Novedades');
      return;
    }
  };

  return (
    <View style={[styles.card, cardType === 'consulta' && styles.consultaCard]}>
      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={[styles.cardHour, cardType === 'consulta' && styles.cardOther]}>{cardHour}</Text>
          <Text style={styles.dateText}>{dateText}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Pressable
            onPress={handleIconPress}>
            <Ionicons name={icon} size={60} color={'#EFE3C8'} />
          </Pressable>
          {cardType !== 'consulta' && <Text style={styles.clickText}>Presiona para registrar</Text>}
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
  consultaCard: {
    backgroundColor: '#203B50', // Cambia esto al color deseado para la tarjeta de consulta
  },
  cardOther: {
    color: '#EFE3C8',
    fontSize: 24,
    marginBottom: 20,
  },
  clickText: {
    color: '#EFE3C8',
    fontSize: 10,
    marginTop: 8,
    textAlign: 'center', // Center the text horizontally
  },
});

export default DashboardCard;
