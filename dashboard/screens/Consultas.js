/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */

import React, { useState, Keyboard } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, FlatList } from 'react-native';
import COLORS from '../../assets/constants/colors';
import Button from '../../login/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage desde el paquete correcto
import Input from '../../login/components/Input';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ajusta la importación según la biblioteca de iconos que estés usando

// Definición del componente Consultas
const Consultas = ({navigation}) => {
  // Declaración de estados
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [records, setRecords] = useState([]);
  const [showTable, setShowTable] = useState(false);


  // Función para realizar una búsqueda
  const handleSearch = async () => {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Error', 'Por favor ingresa fechas válidas (dd/MM/yyyy).');
      return;
    }

    // Obtener datos del usuario desde AsyncStorage
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      console.log(userData);
      const ingresos = userData.ingresos || {};
      const salidas = userData.salidas || {};

      const filteredRecords = [];

      for (const date in ingresos) {
        if (
          date >= startDate &&
          date <= endDate &&
          ingresos[date] &&
          salidas[date]
        ) {
          const hours = userData.horasTrabajadas?.[date] || 'N/A';
          filteredRecords.push({ date, hours });
        }
      }

      if (filteredRecords.length === 0) {
        Alert.alert(
          'Sin registros',
          'No se encontraron registros para las fechas ingresadas.'
        );
        return;
      }

      setRecords(filteredRecords);
      setShowTable(true); // Mostrar la tabla después de la búsqueda
    }
  };

  // Función para validar el formato de fecha
  const isValidDate = (dateString) => {
    const pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return pattern.test(dateString);
  };

  // Renderizado del componente
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="arrow-left" size={24} color={COLORS.primary} onPress={() => navigation.navigate('Dashboard')} />
        <Text style={{ ...styles.cardTitle, marginLeft: 10 }}>Consulta de Horas Trabajadas</Text>
      </View>
      <View style={{ marginBottom: 12 }}>
        <Input
          placeholder="01/1/2020"
          label="Fecha Inicio (DD/M/YYYY)"
          onChangeText={setStartDate}
          value={startDate}
        />
      </View>
      <View style={{ marginBottom: 12 }}>
        <Input
          placeholder="01/1/2020"
          label="Fecha Fin (DD/M/YYYY)"
          onChangeText={setEndDate}
          value={endDate}
        />
      </View>
      <Button
        title="Buscar"
        filled
        style={{ marginTop: 18, marginBottom: 4 }}
        onPress={handleSearch}
      />

      {/* Mostrar tabla si showTable es verdadero */}
      {showTable && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.cardTitle}>Registros encontrados:</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Fecha</Text>
            <Text style={styles.columnHeader}>Horas</Text>
          </View>
          <FlatList
            data={records}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.cardHour}>{item.hours}</Text>
              </View>
            )}
          />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.black,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: COLORS.black,
  },
  input: {
    width: '100%',
    color: COLORS.black,
  },
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
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom: 5,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444444',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  dateText: {
    fontSize: 14,
    color: '#555555',
  },
  cardHour: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Consultas;
