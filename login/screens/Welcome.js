/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text, Image, Pressable } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import COLORS from '../../assets/constants/colors';
import IMAGES from '../../assets/constants/images';
import React from 'react';
import Button from '../components/Button';

const Welcome = ({navigation}) => {
  return (
    <LinearGradient
      style={{flex:1}}
      colors={[COLORS.secondary,COLORS.primary]}
    >
      <View style={{flex:1}}>
        <View>
          <Image
            source={IMAGES.login.img4}
            style={{
              height:100,
              width:100,
              borderRadius:20,
              position: 'absolute',
              top:10,
              transform: [
                { translateX: 20},
                { translateY: 50 },
                { rotate: '-15deg'},
              ],
            }}
          />

          <Image
            source={IMAGES.login.img2}
            style={{
              height:100,
              width:100,
              borderRadius:20,
              position: 'absolute',
              top:-30,
              left:100,
              transform: [
                { translateX: 50},
                { translateY: 50 },
                { rotate: '-5deg'},
              ],
            }}
          />

          <Image
            source={IMAGES.login.img3}
            style={{
              height:100,
              width:100,
              borderRadius:20,
              position: 'absolute',
              top:130,
              left:-22,
              transform: [
                { translateX: 20},
                { translateY: 50 },
                { rotate: '15deg'},
              ],
            }}
          />

          <Image
            source={IMAGES.login.img1}
            style={{
              height:200,
              width:200,
              borderRadius:20,
              position: 'absolute',
              top:110,
              left:100,
              transform: [
                { translateX: 50},
                { translateY: 50 },
                { rotate: '-15deg'},
              ],
            }}
          />
          </View>

          {/*Content */}
          <View style={{
            paddingHorizontal: 22,
            position:'absolute',
            top: 435,
            width:'100%',
          }}>
            <Text style={{
              fontSize:50,
              fontWeight:800,
              color:COLORS.white,
            }}>
              Mineria S.A.S
            </Text>
            <View style={{
              marginVertical:15,
            }}>
            <Text style={{
              fontSize:16,
              color:COLORS.white,
              marginVertical:4,
            }}>Aquí podrás realizar el registro de tus horas trabajadas!</Text>
             <Text style={{
              fontSize:16,
              color:COLORS.white,
            }}>Al igual que consultar, solicitar vacaciones, entre otras...</Text>
            </View>

            <Button
            title="Registrate"
            onPress={()=>navigation.navigate('Signup')}
            style={{
              marginTop:22,
              with: '100%',
            }}
            />
            <View style={{
              flexDirection: 'row',
              marginTop:12,
              justifyContent:'center',
            }}>
              <Text style={{fontSize:16,color:COLORS.white}}>¿Ya tienes una cuenta?</Text>
              <Pressable onPress={()=>navigation.navigate('Login')}>
                <Text style={{fontSize:16,color:COLORS.white,fontWeight:'bold',marginLeft:4}}>Iniciar Sesión</Text>
              </Pressable>
            </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
