/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet,FlatList } from 'react-native';
import { format } from 'date-fns'; // Importa la función format de date-fns
import COLORS from '../../assets/constants/colors';
import Button from '../../login/components/Button';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',  // Color de fondo de la pantalla
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',  // Color de fondo de los registros
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize:22,
    fontWeight:'bold',
    marginVertical:12,
    color: COLORS.black,
  },
  cardText: {
      // Color de fondo de los campos de entrada
    padding: 10,
    marginBottom: 10,
    width:'100%',
    color: COLORS.black,
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
  button:{
    paddingBottom:16,
    paddingVertical: 10,
    borderColor: COLORS.primary,
    borderWidth:2,
    borderRadius:12,
    alignItems:'center',
    justifyContent: 'center',

},
ViewInput:{
  width:'100%',
  height:48,
  borderColor: COLORS.black,
  borderWidth:1,
  borderRadius:8,
  alignItems:'center',
  justifyContent:'center',
  paddingLeft:22,
},
});
const FormScreen = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [records, setRecords] = useState([]);

  const handleSearch = () => {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      Alert.alert('Error', 'Por favor ingresa fechas válidas (YYYY-MM-DD).');
      return;
    }

    const formattedStartDate = format(new Date(startDate), 'dd/MM/yyyy');
    const formattedEndDate = format(new Date(endDate), 'dd/MM/yyyy');

    // Simulación de registros encontrados
    const dummyRecords = [
      { id: '1', date: formattedStartDate, hours: 8 },
      { id: '2', date: formattedEndDate, hours: 7 },
      // ... más registros aquí
    ];

    setRecords(dummyRecords.slice(0, 10)); // Limita a un máximo de 10 registros
  };

  const isValidDate = (dateString) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(dateString);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={styles.cardTitle}>Consulta de Horas Trabajadas</Text>

      <View style={{marginBottom:12}}>
          <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: COLORS.black,
            }}>Fecha Inicio (YYYY-MM-DD)</Text>
            <View style={styles.ViewInput}>
              <TextInput
              placeholder="2020-01-01"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              value={startDate}
              onChangeText={setStartDate}
              style={{
                width:'100%',
                color: COLORS.black,
              }}
            />
          </View>

      </View>

      <View style={{marginBottom:12}}>
          <Text style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
              color: COLORS.black,
            }}>Fecha Fin (YYYY-MM-DD)</Text>
            <View style={styles.ViewInput}>
              <TextInput
              placeholder="2020-01-03"
              placeholderTextColor={COLORS.grey}
              keyboardType="numeric"
              value={endDate}
              onChangeText={setEndDate}
              style={{
                width:'100%',
                color: COLORS.black,
              }}
            />
          </View>

      </View>
      <Button
          title="Buscar"
          filled
          style={{
            marginTop:18,
            marginBottom:4,
          }}
          onPress={handleSearch}
        />
      {/* Espacio para mostrar los registros en una tabla */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.cardTitle}>Registros encontrados:</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.columnHeader}>Fecha</Text>
          <Text style={styles.columnHeader}>Horas</Text>
        </View>
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.dateText}>{item.date}</Text>
              <Text style={styles.cardHour}>{item.hours} horas</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FormScreen;
