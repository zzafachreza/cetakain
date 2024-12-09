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
  ScrollView,
  Linking
} from 'react-native';
import { MyButton, MyGap, MyHeader, MyInput, MyInputLogin } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import MyLoading from '../../components/MyLoading';
import { useToast } from 'react-native-toast-notifications';
import { Icon } from 'react-native-elements';

export default function Login({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  const img = new Animated.Value(0.8);
  const card = new Animated.Value(50);
  const toast = useToast();
  const masuk = () => {
    if (kirim.username.length == 0 && kirim.length == 0) {
      toast.show('Email / Telepon dan kata sandi tidak boleh kosong', { type: 'warning' })

    } else if (kirim.username.length == 0) {
      toast.show('Email / Telepon tidak boleh kosong', { type: 'warning' })
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
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      height: '100%',
      padding: 0,
      margin: 0

    }}
    >
      


        <ScrollView style={{ position: "relative" }} showsVerticalScrollIndicator={false}>


        <ImageBackground source={require('../../assets/bglogin.png')} style={{
          flex:1,
          width:'100%',
          height:'100%'
        }}>
        <View style={{
            padding: 20,
          }}>
          
          <View style={{
            marginTop:-0,
           
            flexDirection:"row",
            justifyContent:'flex-start'
          }}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <View>
                <Icon name='arrow-back-outline' type='ionicon' size={30} color={colors.white}/>
              </View>

            </TouchableWithoutFeedback>
          </View>

          <View style={{
            padding:10,
            marginLeft:0,
            marginTop:85
          }}>
            <Text style={{
              fontFamily:fonts.primary[600],
              fontSize:20,
              color:colors.white,
              top:-30
            }}>Masuk</Text>
          </View>
       

            <View style={{
              padding: 10,
              marginTop:'40%'
            }}>

              <MyInput onChangeText={x => setKirim({
                ...kirim,
                username: x,

              })} styleLabel={{ color: 'black' }} label="Email / Nomor Telepon" placeholder="Isi email atau nomor telepon" />

              <MyGap jarak={0} />

              <MyInput onChangeText={x => setKirim({
                ...kirim,
                password: x
              })} styleLabel={{ color: 'black' }} label="Password" placeholder="Isi Password" secureTextEntry={true}/>

              {!loading &&

                <View style={{ marginTop: 20 }}>
                  <MyButton onPress={masuk}  colorText='white' title="Masuk" />
                </View>
              }

              {loading && <MyLoading />}

              
              <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://wa.me/' + comp.tlp + '?text=Hallo Admin saya lupa password')}>
                  <View>
                    <Text style={{ fontFamily: fonts.primary[500], marginTop: 10, fontSize: 13, color:colors.primary}}>Lupa Password ?</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>


{/* 
              <View style={{ alignItems: "center", marginTop: '25%' }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: fonts.primary[400] }}>Belum memiliki akun? Silakan </Text>
                    <Text style={{ fontFamily: fonts.primary[600], color: colors.primary }}>Daftar</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View> */}





            </View>

          </View>

        </ImageBackground>
         


        </ScrollView>
  


    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({});
