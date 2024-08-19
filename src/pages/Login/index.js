import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { MyButton, MyGap, MyInput, MyInputLogin } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';

export default function Login({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  const img = new Animated.Value(0.8);
  const card = new Animated.Value(50);
  const toast = useToast();
  const masuk = () => {
    if (kirim.username.length == 0 && kirim.length == 0) {
      toast.show('Username dan kata sandi tidak boleh kosong', { type: 'warning' })

    } else if (kirim.username.length == 0) {
      toast.show('Username tidak boleh kosong', { type: 'warning' })
    } else if (kirim.password.length == 0) {
      toast.show('Kata sandi tidak boleh kosong', { type: 'warning' })
    } else {
      setLoading(true);
      console.log(kirim);
      axios.post(apiURL + 'login', kirim)
        .then(res => {
          setLoading(false);
          console.log(res.data);
          if (res.data.status == 404) {
            toast.show(res.data.message, { type: 'danger' })
          } else {
            storeData('user', res.data.data);
            navigation.replace('MainApp')
          }
        });
    }
  }

  const [kirim, setKirim] = useState({
    api_token: api_token,
    username: '',
    password: '',
  })

  const [comp, setComp] = useState({})

  useEffect(() => {

    Animated.timing(img, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    Animated.timing(card, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }).start();
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    })
  }, []);

  return (
    <SafeAreaView source={require('../../assets/bglogin.png')} style={{
      flex: 1,
      width:'100%',
      height:'100%', 
      padding:0,
      margin:0
    
    }}
    >
    <ImageBackground source={require("../../assets/bgsplash.png")} style={{
      flex:1,
      width:'100%',
      height:"100%",
      margin:0,
      padding:0
    }}>
    <ScrollView style={{position:"relative"}} showsVerticalScrollIndicator={false}>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: windowHeight / 2,
          }}>
            <Animated.Image source={require('../../assets/logo.png')} style={{
              width: windowHeight / 3,
              height: windowHeight / 5.6,
              transform: [{ scale: img }],
              marginTop:-30
            }} />
          </View>


       
   
          <View style={{
            borderRadius: 13,
            margin: 0,
            padding: 0,
            marginTop:-90,
       
            height: 490
           

            
 
          }}>

          <View style={{
          borderTopLeftRadius:50,
          borderTopRightRadius:50,
          padding:20,
          backgroundColor:colors.primary,
          height:"100%"
         

          }}>

          <Text style={{
            fontFamily:fonts.primary[400],
            textAlign:'center',
            color:colors.white,
            fontSize:MyDimensi / 2
          }}>Masuk</Text>

            <MyInputLogin label="Username" onChangeText={x => {
              setKirim({
                ...kirim,
                username: x
              })
            }} iconname="person-outline" placeholder="Ketikan username" />
            <MyGap jarak={20} />
            <MyInputLogin label="Kata Sandi" onChangeText={x => {
              setKirim({
                ...kirim,
                password: x
              })
            }} iconname="lock-closed-outline" placeholder="Ketikan kata sandi" secureTextEntry={true} />
            <TouchableOpacity onPress={() => {
              let urlWA = 'https://wa.me/' + comp.tlp + `?text=Hallo admin saya lupa kata sandi . . .`;
              Linking.openURL(urlWA)
            }} style={{ marginTop: 0 }}>
              <Text style={{
                textAlign: 'right',
                ...fonts.headline5,
                marginTop: 10,
                color: colors.white,
              }}>Lupa kata sandi ?</Text>
            </TouchableOpacity>

            <MyGap jarak={40} />
            {loading && <MyLoading />}
            {!loading &&
              <MyButton
                warna={colors.tertiary}
                onPress={masuk}
                title="Masuk"
                Icons="log-in-outline"
                
              />

              
          
            }

            <MyGap jarak={10}/>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={{
                                    ...fonts.body3,
                                    color: colors.white,
                                    textAlign: 'center'
                                }}>
                                    Belum memiliki akun? Silahkan <Text style={{
                                        ...fonts.headline5,
                                        color: colors.secondary,
                                        textAlign: 'center'
                                    }}>
                                        Daftar
                                    </Text>
                                </Text>
                            </TouchableOpacity>
          </View>
            <MyGap jarak={50} />


          </View>


        </ScrollView>
    </ImageBackground>
     
  
    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({});
