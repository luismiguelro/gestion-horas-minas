/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import { View, Text, SafeAreaView } from 'react-native';
import React, {useState,useEffect} from 'react';
import DashboardCard from '../components/DashboardCard';
import COLORS from '../../assets/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package
import Icon from 'react-native-vector-icons/FontAwesome'; // Adjust the import based on your chosen icon library

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState('');

  //Obtener los datos del usuario del AsyncStorage al cargar la pantalla.
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const userObj = JSON.parse(userData);
        setUser(userObj.fullname);
      } catch (error) {
        console.error('Error al traer la informacion del usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const logout = ()=>{
    // eslint-disable-next-line no-undef
    AsyncStorage.setItem('user',JSON.stringify({...user,loggedIn:false}));
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
      <Text style={styles.greeting}>Hello, {user}</Text>
      <DashboardCard
        cardTitle="Hora de ingreso"
        cardHour={'08:00 AM'}
        dateText="07-08-2022"
        icon="clock"
        onPressIngreso={() => {
          console.log('Icono presionado en hora de ingreso');
        }}
      />

      <DashboardCard
        cardTitle="Hora Salida"
        cardHour={'18:00 PM'}
        dateText="07-08-2022"
        icon="clock"
        onPressSalida={() => {
          console.log('Icono presionado en hora de salida');
        }}
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

