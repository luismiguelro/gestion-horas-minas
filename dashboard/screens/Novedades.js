/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import COLORS from '../../assets/constants/colors';
import Button from '../../login/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
/*Estilos*/
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 12,
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
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 8,
  },
  selectedRadioOption: {
    backgroundColor: COLORS.primary, // Color de fondo cuando esté seleccionado
  },
  radioLabel: {
    marginLeft: 8,
    color: COLORS.black, // Color del texto
  },
  selectedRadioButton: {
    color: 'white', // Color del radio button cuando esté seleccionado
  },
});

// componente para las fechas
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

        />
      </View>
    </View>
  );
};
// componente de radio option
const RadioOption = ({ label, value, selected, onSelect }) => (
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

//componente para los datos extra de licencia

const ValidatedTimeInput = ({ placeholder, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.ViewInput}
      placeholder={placeholder}
      placeholderTextColor={COLORS.grey}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const Novedades = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [calculatedDays, setCalculatedDays] = useState(0);
  const [calculatedHours, setCalculatedHours] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  // Limpiar el mensaje de error cuando se cambie la selección de tipo
  React.useEffect(() => {
    setErrorMessage('');
    setProcessingMessage('');
    setEndDate('');
    setStartDate('');
  }, [selectedType]);

  const isValidDate = (dateString) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(dateString);
  };

  const isValidateHour = (hour) => {
    const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return pattern.test(hour);
  };

  function showAlert(titulo, mensaje) {
    Alert.alert(
      titulo,
      mensaje,
      [{ text: 'OK' }],
      { cancelable: false }
    );
  }



  const handleCalculateDays = () => {
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      setErrorMessage('Por favor ingresa fechas válidas para calcular los días.');
      return;
    }


    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const differenceInMilliseconds = endDateObj - startDateObj;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    console.log({ startDateObj, endDateObj, differenceInDays, differenceInMilliseconds });

    setCalculatedDays(differenceInDays);
  };

  const handleSave = async () => {


    if (!selectedType) {
      setErrorMessage('Debes seleccionar un tipo de novedad.');
      return;
    }

    // Validación y conversión de Licencias a Vacaciones
    if (selectedType === 'Licencia') {
      if (!isValidateHour(startHour) && !isValidateHour(endHour)) {
        setErrorMessage('Ingresa horas validad');
        return;
      }
      const startHourMinutes = parseInt(startHour.split(':')[0]) * 60 + parseInt(startHour.split(':')[1]);
      const endHourMinutes = parseInt(endHour.split(':')[0]) * 60 + parseInt(endHour.split(':')[1]);

      if (endHourMinutes - startHourMinutes <= 480) { // 480 minutos = 8 horas
        // Calcular las horas
        const hours = (endHourMinutes - startHourMinutes) / 60;
        setCalculatedHours(hours);

        // Mostrar alerta de cálculo de horas
        showAlert('Cálculo de Horas', `Se calcularon ${hours} horas de licencia.`);

      } else {
        setCalculatedHours(null);
        showAlert('Notificacion',
          'La Licencia ha sido convertida a Vacaciones debido a que excede 8 horas.');
        setSelectedType('Vacaciones');
        return;
      }

    }


    // Validación de Incapacidades
    if (selectedType === 'Incapacidad') {
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        setErrorMessage('Por favor ingresa fechas válidas...');
        return;
      }
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const differenceInDays = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

      if (differenceInDays < 1) {
        showAlert('Notificacion', 'La incapacidad debe ser de al menos 1 día.');
        return;
      }
      if (selectedType === 'Incapacidad') {
        showAlert('Días calculados',
          `La incapacidad es de ${differenceInDays} días.`);
      }
    }
    // Validación de Vacaciones
    if (selectedType === 'Vacaciones') {
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        setErrorMessage('Por favor ingresa fechas válidas...');
        return;
      }
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const differenceInDays = Math.floor((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));

      if (differenceInDays < 1 || differenceInDays > 15) {
        showAlert('Notificación', 'Las vacaciones deben ser mínimo 1 día y máximo 15 días.')
        return;
      }
      // Mostrar alerta con la duración de las vacaciones
      showAlert('Duración de las Vacaciones', `Las vacaciones durarán ${differenceInDays} días.`)

    }
    // Guardar novedad en AsyncStorage
    try {
      let newNovedad = {
        type: selectedType,
        startDate: startDate,
        endDate: endDate,
      };

      if (selectedType === 'Licencia') {
        newNovedad = {
          ...newNovedad,
          startHour: startHour,
          endHour: endHour,
        };
      }

      const userJSON = await AsyncStorage.getItem('user');
      const user = JSON.parse(userJSON) || { novedades: [] };

      if (!user.novedades) {
        user.novedades = [];
      }

      user.novedades.push(newNovedad);

      await AsyncStorage.setItem('user', JSON.stringify(user));

      setProcessingMessage('La novedad ha sido guardada con éxito.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novedades</Text>
      {selectedType !== 'Licencia' && (
        <View>
          {/* Fechas inicio y fin */}
          <DateInputComponent
            label="Fecha Inicio (DD/M/YYYY)"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
          />
          <DateInputComponent
            label="Fecha Fin  (DD/M/YYYY)"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
          />
          {/* Validación de errores: opciones y fechas */}
          {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
      )}




      {/* Opciones */}
      <View>
        <Text style={styles.title}>Selecciona tipo de novedad</Text>
        <RadioButton.Group>
          <RadioOption
            label="Incapacidad"
            value="Incapacidad"
            selected={selectedType}
            onSelect={setSelectedType}
          />
          <RadioOption
            label="Vacaciones"
            value="Vacaciones"
            selected={selectedType}
            onSelect={setSelectedType}
          />
          <RadioOption
            label="Licencia"
            value="Licencia"
            selected={selectedType}
            onSelect={setSelectedType}
          />
        </RadioButton.Group>
      </View>

      {/* Desplegar opciones de hora, para la opción de licencia */}

      {selectedType === 'Licencia' && (
        <View>
          <View style={{ marginBottom: 8 }}>
            <ValidatedTimeInput
              placeholder="Hora de inicio (HH:MM)"
              value={startHour}
              onChangeText={setStartHour}
            />
          </View>
          <View>
            <ValidatedTimeInput
              placeholder="Hora de fin (HH:MM)"
              value={endHour}
              onChangeText={setEndHour}
            />
          </View>
          {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
      )}
      {/* Mostrar mensaje de procesamiento */}
      {processingMessage !== '' && <Text style={styles.processingMessage}>{processingMessage}</Text>}

      <Button
        title={selectedType !== 'Licencia' ? 'Calcular días' : 'Calcular horas'}
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={() => {
          handleCalculateDays();
          handleSave();
        }}
      />

      <Button
        title="Guardar"
        filled
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
        onPress={() => {
          handleSave();
        }}
      />
    </View>
  );
};

export default Novedades;
