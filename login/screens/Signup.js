/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,Image,Pressable} from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../assets/constants/colors';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import IMAGES from '../../assets/constants/images';


const Signup = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
      <View style={{flex:1, marginHorizontal:22}}>
        {/*Title */}
        <View style={{
          marginVertical:22,
        }}>
          <Text style={{
            fontSize:22,
            fontWeight:'bold',
            marginVertical:12,
            color: COLORS.black,
            }}>
              Create Account
          </Text>
          <Text style={{
              fontSize:16,
              color:COLORS.black,
            }}>Connect whith your friend today!
          </Text>
        </View>
        {/*Email*/}
        <View style={{marginBottom:12}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: COLORS.black,
          }}>Email address</Text>

          <View style={styles.ViewEmail}>
            <TextInput
            placeholder="Enter your email addres"
            placeholderTextColor={COLORS.grey}
            keyboardType="email-address"
            style={{
              width:'100%',
              color: COLORS.black,
            }}
            />
          </View>

        </View>
        {/*Phone number*/}
        <View style={{marginBottom:12}}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
            color: COLORS.black,
          }}>Phone Number</Text>

          <View style={styles.ViewPhone}>
            <TextInput
            placeholder="+57"
            placeholderTextColor={COLORS.black}
            keyboardType="numeric"
            style={{
              width:'12%',
              borderRightWidth:1,
              borderLeftColor:COLORS.grey,
              height: '100%',
              color: COLORS.black,
            }}
            />
            <TextInput
            placeholder="Enter your phone number"
            placeholderTextColor={COLORS.grey}
            keyboardType="numeric"
            style={{
              width:'80%',
              color: COLORS.black,
            }}/>
          </View>

        </View>
        {/*password */}
        <View>
          <InputPassword headerText="Password" placeholderText="Enter your password"/>

          <InputPassword headerText="Confirm Password" placeholderText="Confirm your password"/>
        </View>

        <View style={{flexDirection:'row', marginVertical:6}}>
          <Checkbox
            style={{marginRight:8}}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text style={{color:COLORS.black}}>I agree to the terms ad conditions.</Text>
        </View>
        <Button
          title="Sign up"
          filled
          style={{
            marginTop:18,
            marginBottom:4,
          }}
        />
        <View style={{flexDirection:'row', alignItems:'center',marginVertical:20}}>
          <View
          style={styles.line}/>
          <Text style={{color:COLORS.grey, fontSize:14}}>Or Sign up with</Text>
          <View
          style={styles.line}/>
        </View>

        <View style={{flexDirection:'row', justifyContent:'center'}}>
        <TouchableOpacity
          onPress={()=>console.log('pressed facebook')}
          style={styles.otherSignup}
        >
        <Image
          source={IMAGES.signUp.facebook}
          style={styles.image}
          resizeMode="contains"
        />
        <Text style={{color:COLORS.black}}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>console.log('pressed google')}
          style={styles.otherSignup}
        >
        <Image
          source={IMAGES.signUp.google}
          style={styles.image}
          resizeMode="contains"
        />
        <Text style={{color:COLORS.black}}>Google</Text>
        </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 22,
          }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}>
              <Text style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
                }}>Login
              </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

/*other Signup styles*/
const styles = StyleSheet.create({
  ViewEmail:{
    width:'100%',
    height:48,
    borderColor: COLORS.black,
    borderWidth:1,
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:22,
  },
  ViewPhone:{
    width:'100%',
    height:48,
    borderColor: COLORS.black,
    borderWidth:1,
    borderRadius:8,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:22,
  },
  otherSignup: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    height:52,
    borderWidth:1,
    borderColor:COLORS.grey,
    marginRight:4,
    borderRadius:10,
  },
  image:{
    height:36,
    width:36,
    marginRight:8,
  },
  line:{
    flex:1,
    height:1,
    backgroundColor:COLORS.grey,
    marginHorizontal:10,
  },
});


export default Signup;
