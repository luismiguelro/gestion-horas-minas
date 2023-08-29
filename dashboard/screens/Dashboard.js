/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { Pressable, View, Text, SafeAreaView, Alert } from 'react-native';
import React, {useState,useEffect} from 'react';
import DashboardCard from '../components/DashboardCard';
import COLORS from '../../assets/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import based on your chosen icon library

const Dashboard = ({navigation}) => {
  // estados para la hora de ingreso
const [userData, setUserData] = useState({
  activities: [''], // Initialize with an empty array
});

// verificar si ya se ha hecho el registro de entrada en el dia
const isTodayRegistered = () => {
  const today = new Date().toLocaleDateString();

  // se busca alguna coinicidencia con la fecha de hoy y la guardada
  return userData.activities.some(activity => activity.date === today);
};

// actualizar hora en la card
const updateCurrentTime = async () => {
  
    const newTime = new Date();
    await saveActivity(newTime);
 
  
};

// guardar la hora de ingreso pasandola al formato hh:mm
const saveActivity = async (time) => {
  const signInTime = {
    date: time.toLocaleDateString(),
    signInTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
  const signOutTime = {
    date: time.toLocaleDateString(),
    signOutTime: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };


  try {
    const  updatedUserData = {
      ...userData,
      activities: [...userData.activities, signInTime,signOutTime], // realizar copia de las actividades y añadir la nueva
    };

    setUserData( updatedUserData);
    console.log( updatedUserData);
    await AsyncStorage.setItem('user', JSON.stringify( updatedUserData)); // guardar en el localstorage
  } catch (error) {
    console.error('Error guardando la informacion:', error);
  }
};

useEffect(() => {
  const loadStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('user');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error al cargar la informacion:', error);
    }
  };

  loadStoredData();
}, []);
  // cerrar sesion
  const logout = () => {
    AsyncStorage.setItem(
      'user',
      JSON.stringify({...userDetails, loggedIn: false}),
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
      <Text style={styles.greeting}>Hello, {userData?.fullname}</Text>
      
        <DashboardCard
          cardTitle="Hora de ingreso"
          cardHour={userData.activities.length > 0 ? userData.activities[userData.activities.length - 2].signInTime : ''}
          dateText={userData.activities.length > 0 ? userData.activities[userData.activities.length - 2].date : ''}
          icon="clock"
          onPressIngreso={updateCurrentTime}
        />


      <DashboardCard
        cardTitle="Hora Salida"
        cardHour={userData.activities.length > 0 ? userData.activities[userData.activities.length - 1].signOutTime : ''}
        dateText={userData.activities.length > 0 ? userData.activities[userData.activities.length - 1].date : ''}
        icon="clock"
         onPressSalida={console.log('hola')}
      />

      <DashboardCard
        cardTitle="Consulta"
        cardHour={'18:00 PM'}
        dateText="07-08-2022"
        icon="clock"
        onPressConsulta
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

