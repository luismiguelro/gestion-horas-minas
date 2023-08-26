/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import COLORS from '../../assets/constants/colors';
import Button from '../../login/components/Button';

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
            style={{
              width: '100%',
              color: COLORS.black,
            }}
            keyboardType="numeric"
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

  const TimeInput = ({ placeholder, value, onChangeText }) => {
    const validateHour = (hour) => {
        const pattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return pattern.test(hour);
      };
    return (
      <TextInput
        style={{...styles.ViewInput, }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        value={value}
        onChangeText={(text) => {
          if (validateHour(text) || text === '') {
            onChangeText(text);
          }
        }}
        keyboardType="numeric"
      />
    );
  }

const Novedades = () => {
    //Estados para las fechas
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // estado para el radiobutton y las opciones
  const [selectedType, setSelectedType] = useState(null);

  // estado para notificar errores
  const [errorMessage, setErrorMessage] = useState('');

  //estados para validar la  hora en la licencia
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');


  const handleCalculateDays = () => {
    // Lógica para calcular días
  };

    //Validar el ingreso de fechas
const isValidDate = (dateString) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
        return pattern.test(dateString);
      };

      // validar campos en blancos y formato de hora
const handleSave = () => {
    if (!selectedType) {
        setErrorMessage('Debes seleccionar un tipo de novedad.');
        return;
    }
    if (!isValidDate(startDate) || !isValidDate(endDate)) {
        setErrorMessage('Por favor ingresa fechas válidas');
        return;
    }

        // Lógica para guardar novedad según el tipo seleccionado
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novedades</Text>

      {/*Fechas inicio y fin*/}
      <View>
        <DateInputComponent
            label="Fecha Inicio (YYYY-MM-DD)"
            value={startDate}
            onChangeText={(text) => setStartDate(text)}
        />
        <DateInputComponent
            label="Fecha Fin (YYYY-MM-DD)"
            value={endDate}
            onChangeText={(text) => setEndDate(text)}
        />
    </View>
        {/*Validacion de los errores: opcion y fecha*/}
        {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        {/*Opciones*/}
      <View style={{  alignItems: 'center', marginBottom: 20, marginTop:15 }}>
        <Text style={{...styles.title,marginBottom:15, fontSize: 15,}}>Selecciona tipo de novedad</Text>
        <RadioButton.Group >
            <RadioOption label="Incapacidad" value="Incapacidad" selected={selectedType} onSelect={setSelectedType} />
            <RadioOption label="Vacaciones" value="Vacaciones" selected={selectedType} onSelect={setSelectedType} />
            <RadioOption label="Licencia" value="Licencia" selected={selectedType} onSelect={setSelectedType} />
        </RadioButton.Group>
      </View>

{/*Desplegar opciones de hora, para la opcion de licencia*/}
      {selectedType === 'Licencia' && (
        <View>
            <View style={{ marginBottom: 8 }}>
                <TimeInput
                placeholder="Hora de inicio (HH:MM)"
                value={startHour}
                onChangeText={setStartHour}
                />
        </View>
        <View>
            <TimeInput
            placeholder="Hora de fin (HH:MM)"
            value={endHour}
            onChangeText={setEndHour}
            />
        </View>
      </View>
      )}

      <Button title="Calcular días"
          filled
          style={{
            marginTop:18,
            marginBottom:4,
        }}
        onPress={() => {
            handleCalculateDays();
            handleSave();
          }}
        />

      <Button title="Guardar"
          filled
          style={{
            marginTop:18,
            marginBottom:4,
        }} onPress={() => { handleSave()}} />

    </View>
  );
};

export default Novedades;