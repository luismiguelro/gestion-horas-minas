/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */

import { View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import DashboardCard from '../components/DashboardCard';
import COLORS from '../../assets/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import based on your chosen icon library

const Dashboard = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState();
  const [ingresoTime, setIngresoTime] = useState('');
  const [salidaTime, setSalidaTime] = useState('');

    // Cargar los detalles del usuario al montar el componente
    useEffect(() => {
      getUserData();
      loadTimes();
    }, []);
  
    // Obtener los detalles del usuario desde AsyncStorage
    const getUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUserDetails(JSON.parse(userData));
      }
    };

    // Cargar las horas de ingreso y salida si existen
    const loadTimes = async () => {
      const today = new Date().toLocaleDateString();
      const ingresoToday = userDetails?.ingresos?.[today];
      const salidaToday = userDetails?.salidas?.[today];
      if (ingresoToday) {
        setIngresoTime(ingresoToday);
      }

      if (salidaToday) {
        setSalidaTime(salidaToday);
      }
    };

    // Guardar la hora de ingreso o salida en AsyncStorage
    const saveTime = async (type) => {
      const today = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const existingIngreso = userDetails?.ingresos?.[today];
      const existingSalida = userDetails?.salidas?.[today];

      // Verificar si ya existe un registro para el día actual
      if ((type === 'ingreso' && existingIngreso) || (type === 'salida' && existingSalida)) {
        Alert.alert('Alerta', 'Ya has registrado la hora para hoy.', [{ text: 'Aceptar' }]);
        return;
      }

      if (type === 'ingreso') {
        userDetails.ingresos = {
          ...(userDetails.ingresos || {}),
          [today]: currentTime,
        };
        setIngresoTime(currentTime);
      } else if (type === 'salida') {
        userDetails.salidas = {
          ...(userDetails.salidas || {}),
          [today]: currentTime,
        };
        setSalidaTime(currentTime);
      }
    
      // Actualizar los detalles del usuario en AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userDetails));
  
      // Calcular y almacenar las horas trabajadas
      const workedHours = calculateAndStoreWorkHours(today, userDetails.ingresos[today], userDetails.salidas[today]);
  
      // Mostrar alerta con las horas trabajadas al registrar la salida
      if (type === 'salida') {
        Alert.alert('Horas trabajadas', `Has trabajado ${workedHours.toFixed(2)} horas hoy.`, [{ text: 'Aceptar' }]);
      }
    };

    // Calcular y almacenar las horas trabajadas para un día
    const calculateAndStoreWorkHours = (date, ingreso, salida) => {
      if (ingreso && salida) {
        const ingresoTime = new Date(ingreso);
        const salidaTime = new Date(salida);
  
        const timeDiffMilliseconds = salidaTime - ingresoTime;
        const hoursWorked = timeDiffMilliseconds / (1000 * 60 * 60); // Convertir milisegundos a horas
  
        userDetails.horasTrabajadas = {
          ...(userDetails.horasTrabajadas || {}),
          [date]: hoursWorked.toFixed(2), // Redondear a 2 decimales
        };
  
        // Almacenar los detalles del usuario actualizados en AsyncStorage
        AsyncStorage.setItem('user', JSON.stringify(userDetails));
  
        // Mostrar en consola las horas trabajadas calculadas
        console.log(`Horas trabajadas el ${date}: ${hoursWorked.toFixed(2)} horas`);
  
        return hoursWorked;
      }
    };
  
    // Función para cerrar sesión
    const logout = () => {
      AsyncStorage.setItem(
        'user',
        JSON.stringify({ ...userDetails, loggedIn: false })
      );
      navigation.navigate('Login');
    };
  return (
    <SafeAreaView style={styles.container  }>
      <View style={styles.dashboardHeader}>
          <View style={styles.headerIcons}>
            <Text style={{ color: COLORS.white, fontSize: 15 }}>Menú Principal</Text>
          </View>
          <View style={styles.exitIcon}>
            <Icon name="sign-out" size={24} color={COLORS.white} onPress={logout}  />
          </View>
      </View>
      <View style={styles.background} />
      <Text style={styles.greeting}>Hello, {userDetails?.fullname}</Text>
      
      <DashboardCard
        cardTitle="Hora de ingreso"
        cardHour={ingresoTime || 'Registrar'}
        dateText={new Date().toLocaleDateString()}
        icon="clock"
        onPressIngreso={() => saveTime('ingreso')}
      />

      <DashboardCard
        cardTitle="Hora Salida"
        cardHour={salidaTime || 'Registrar'}
        dateText={new Date().toLocaleDateString()}
        icon="clock"
        onPressSalida={() => saveTime('salida')}
      />


      <DashboardCard
        cardTitle="Consulta"
        cardHour={'18:00 PM'}
        dateText="07-08-2022"
        icon="clock"
       
      />

      <DashboardCard
        cardTitle="Novedades"
        cardHour={'18:00 PM'}
        dateText="07-08-2022"
        icon="clock"
        onPressNovedades
      />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    height: 55,
    zIndex: 20,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
  },
  userIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  background: {
    width: '100%',
    height: '30%',
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    position: 'absolute',
    zIndex: -1,
  },
  greeting: {
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
  },
};


export default Dashboard;

