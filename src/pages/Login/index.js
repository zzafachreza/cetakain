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
      <ImageBackground source={require("../../assets/bglogin.png")} style={{
        flex: 1,
        width: '100%',
        height: "100%",
        margin: 0,
        padding: 0
      }}>


        <ScrollView style={{ position: "relative" }} showsVerticalScrollIndicator={false}>

          <View style={{
            padding: 10,
            backgroundColor: colors.secondary,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            height: 142,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 2,
            borderRightWidth: 2,
            borderLeftWidth: 2,
            borderColor: '#D6D6D6'




          }}>

            <Image style={{
              width: 370,
              height: '100%',


            }} source={require('../../assets/logo.png')} />

          </View>


          <View style={{
            padding: 20,
          }}>

            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 25,
              textAlign: "center",
              color: colors.primary,
            }}>Sign In to Your Account</Text>

            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 18,
              padding: 12,
              color: '#5B5B5B'


            }}>
              Welcome
            </Text>

            <View style={{
              padding: 10,
            }}>

              <MyInput onChangeText={x => setKirim({
                ...kirim,
                username: x
              })} styleLabel={{ color: 'black' }} label="Email atau Nomor Telepon" placeholder="Isi email atau nomor telepon" />

              <MyGap jarak={0} />

              <MyInput onChangeText={x => setKirim({
                ...kirim,
                password: x
              })} styleLabel={{ color: 'black' }} label="Password" placeholder="Isi Password" secureTextEntry={true} />

              <View style={{ flexDirection: 'row', justifyContent: "flex-end" }}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={{ fontFamily: fonts.primary[400], marginTop: 10, fontSize: 13, }}>Lupa Password?</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              {!loading &&

                <View style={{ marginTop: 20 }}>
                  <MyButton onPress={masuk} borderSize={1} borderColor={Color.blueGray[400]} title="Masuk" />
                </View>
              }

              {loading && <MyLoading />}


              <View style={{ alignItems: "center", marginTop: '25%' }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontFamily: fonts.primary[400] }}>Belum memiliki akun? Silakan </Text>
                    <Text style={{ fontFamily: fonts.primary[600], color: colors.primary }}>Daftar</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>





            </View>

          </View>



        </ScrollView>
      </ImageBackground>


    </ SafeAreaView>
  );
}

const styles = StyleSheet.create({});
