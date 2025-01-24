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
  Dimensions,
  FlatList
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData, webURL } from '../../utils/localStorage';
import { BackgroundImage } from 'react-native-elements/dist/config';
import { color } from 'react-native-reanimated';
import axios from 'axios';
import moment from 'moment';
import { useToast } from 'react-native-toast-notifications';
import MyLoading from '../../components/MyLoading';
import MyCarouser from '../../components/MyCarouser';
import { Icon } from 'react-native-elements';


const MyMenu = ({ onPress, img, label, backgroundColor, desc }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth / 4,
        height: windowWidth / 4,
      }}>
        <View style={{
          backgroundColor: backgroundColor,
          borderRadius: 12,
          width: windowWidth / 4,
          height: windowWidth / 4,
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center'

        }}>
          <Image source={img} style={{
            width: windowWidth / 5, height: windowWidth / 5,
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          color: colors.black,
          ...fonts.caption,
          textAlign: 'center',
          maxWidth: '85%'
        }}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

// Fungsi untuk mendapatkan nama bulan
const getMonthName = (monthNumber) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  return months[monthNumber];
};


export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Dapatkan tanggal sekarang
    const date = new Date();
    const day = date.getDate();
    const month = getMonthName(date.getMonth());
    const today = `Today ${day} ${month}`;
    setCurrentDate(today);
  }, []);

  const __getUser = () => {
    getData('user').then(u => {
      setUser(u)
    })
  }




  const [gambar, setGambar] = useState([])
  const __getGambar = () => {
    axios.post(apiURL + 'banner_home').then(res => {

      setGambar(res.data)
    })
  }

  const [category, setCategory] = useState([
    { gambar: 'https://zavalabs.com/nogambar.jpg' },
    { gambar: 'https://zavalabs.com/nogambar.jpg' },
    { gambar: 'https://zavalabs.com/nogambar.jpg' },
    { gambar: 'https://zavalabs.com/nogambar.jpg' },
  ])
  const __getCategory = () => {
    axios.post(apiURL + 'category').then(res => {
      console.log('category', res.data);
      setCategory(res.data)
    })
  }

  useEffect(() => {
    __getGambar();
    __getCategory();
    __getUser();
  }, []);




  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#EEEEEE',
      padding: 0,
      margin: 0

    }}>

      <ScrollView>
        {/* JHEADER */}
        <View style={{
          padding: 0,
          marginTop: 10


        }}>

          {/* KALAU BISA WIDTH NYA LEBARNYA MENGIKUTI NAMA USERNAME USER */}
          <View style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: 'space-between',
          }}>

            <View style={{}}>
              {/* PROFILE PENGGUNA */}
              <Image style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }} source={{
                uri: user.file_pengguna
              }} />
            </View>



            <View style={{
              alignItems: 'center',
              left: 5,
            }}>
              {/* SAMBUTAN DAN NAMA USER */}

              <Text style={{
                fontFamily: fonts.primary[600], fontSize: 12, color: colors.primary,
              }}>Hai, {user.nama_lengkap}</Text>
              <Text style={{
                fontFamily: fonts.primary[600], fontSize: 12,
              }}>{currentDate}</Text>
            </View>

            <View>
              <Icon name='notifications-outline' type='ionicon' />
            </View>
          </View>



        </View>
        {/* END HEADER */}


        <View style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: "center",
          textAlign: "center",
        }}>

          {/* SLIDER */}
          <ScrollView
            horizontal
            pagingEnabled
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
            }}
          >
            {gambar.map((slide) => {
              console.log(slide)
              return (
                <View key={slide.id} style={{ width: 300, height: 200, justifyContent: "center", alignItems: 'center' }}>
                  <Image source={{
                    uri: webURL + slide.gambar
                  }} style={{
                    width: '98%',
                    height: '100%',
                    resizeMode: 'contain'
                  }} />
                </View>
              )

            })}

          </ScrollView>
        </View>

        {/* end slider */}


        {/* category */}



        <View style={{
          padding: 10,
        }}>
          <Text style={{
            padding: 10,
            fontFamily: fonts.primary[600],
            color: colors.subjududlmenu,
          }}>Category</Text>
          <FlatList numColumns={2} data={category} renderItem={({ item, index }) => {
            return (
              <View>
                <TouchableWithoutFeedback onPress={() => {
                  if (index == 0) {
                    navigation.navigate('PrintKainRoll')
                  } else if (index == 1) {
                    navigation.navigate('PrintHijab')
                  } else if (index == 2) {
                    navigation.navigate('PrintJersey')
                  } else if (index == 3) {
                    navigation.navigate('SamplePrint')
                  }
                }}>
                  <View style={{
                    marginVertical: 8,
                    width: windowWidth / 2,
                  }}>
                    <Image style={{
                      width: windowWidth / 2.2,
                      height: windowWidth / 2.2,
                      borderWidth: 2,
                      borderColor: 'white'
                    }} source={{
                      uri: webURL + item.gambar
                    }} />
                    <Text style={{
                      fontFamily: fonts.primary[600],
                      fontSize: 15,

                    }}>{item.judul}</Text>

                    <Text style={{
                      fontFamily: fonts.primary[500],
                      fontSize: 10,

                    }}>{item.keterangan}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )
          }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})