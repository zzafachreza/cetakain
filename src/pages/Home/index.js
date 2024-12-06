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
  Dimensions
} from 'react-native';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { MyDimensi, colors, fonts, windowHeight, windowWidth, Color } from '../../utils';
import { MYAPP, apiURL, api_token, getData, storeData } from '../../utils/localStorage';
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




  const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/7c41a959edafcc559e649bf0c179f99d24a61016.png", "id_gambar": "1", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Home" }, { "file_gambar": "datafoto/5f42f5cab19fc5a22dfe3ad4ce0ca6333820e57b.png", "id_gambar": "5", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Hijab", "posisi": "Home" }, { "file_gambar": "datafoto/d96af713df1f8089899474fe6d34d744f6b94eb0.png", "id_gambar": "9", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Jersey", "posisi": "Home" }])
  const __getGambar = () => {
    axios.post(apiURL + 'gambar_home').then(res => {
      console.log('data_gambar_home', res.data);
      setGambar(res.data)
    })
  }

  useEffect(() => {
    __getGambar();
    __getUser();
  }, []);


  const slides = [
    { id: 1, image: require('../../assets/sliderhomesatu.png') },
    { id: 2, image: require('../../assets/sliderhomedua.png') },
    { id: 3, image: require('../../assets/sliderhometiga.png') },
    { id: 4, image: require('../../assets/sliderhomeempat.png') },
  
  ];

  
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#EEEEEE',
      padding:0,
      margin:0

    }}>

      <ScrollView>
        {/* JHEADER */}
        <View style={{
          padding:0,
          marginTop:10
        
          
        }}>

          {/* KALAU BISA WIDTH NYA LEBARNYA MENGIKUTI NAMA USERNAME USER */}
          <View style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent:'space-between',
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
                fontFamily: fonts.primary[600],fontSize:12,
              }}>{currentDate}</Text>
            </View>

            <View>
              <Icon name='notifications-outline' type='ionicon'/>
            </View>
          </View>



        </View>
        {/* END HEADER */}


<View style={{
  margin:10,
  flexDirection:"row",
  justifyContent:'center',
  alignItems:"center",
  textAlign:"center",
}}>

{/* SLIDER */}
<ScrollView 
horizontal
pagingEnabled
showsVerticalScrollIndicator={false}
style={{
  flex:1,
}}
>
{slides.map((slide) => {
  console.log(slide)
  return (
    <View key={slide.id} style={{width: 301, height: 200, justifyContent:"center", alignItems:'center'}}>
    <Image source={slide.image} style={{
     width:'97%',
     height:'100%',
     resizeMode: 'contain'
    }}/>
  </View>
  )
  
})}

</ScrollView>
</View>

{/* end slider */}


{/* category */}



<View>
<Text style={{
  padding:10,
  fontFamily:fonts.primary[600],
  color:colors.subjududlmenu,
}}>Category</Text>
  <View style={{
    padding:5,
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row"
  }}>

  <View>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintKainRoll')}>
      <View style={{
     
      }}>
        <Image style={{
          width:160,
          height:160,
          borderWidth:2,
          borderColor:'white'
        }} source={require('../../assets/printkainroll_menu.png')}/>
        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:15,

          }}>PRINT KAIN ROLL</Text>

        <Text style={{
          fontFamily:fonts.primary[500],
          fontSize:10,
          
          }}>Harga mulai dari 10.000/y</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>

  <View>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintHijab')}>
      <View>
        <Image style={{
          width:160,
          height:160,
          borderWidth:2,
          borderColor:'white'
        }} source={require('../../assets/printhijab_menu.png')}/>

        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:15,

          }}>PRINT HIJAB</Text>

        <Text style={{
          fontFamily:fonts.primary[500],
          fontSize:10,
          
          }}>Harga mulai dari 33.000/Pcs</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>

  </View>



  <View style={{
    padding:5,
    justifyContent:"space-around",
    alignItems:"center",
    flexDirection:"row"
  }}>

  <View>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintJersey')}>
      <View style={{
     
      }}>
        <Image style={{
          width:160,
          height:160,
          borderWidth:2,
          borderColor:'white'
        }} source={require('../../assets/printjersey_menu.png')}/>
        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:15,

          }}>PRINT JERSEY</Text>

        <Text style={{
          fontFamily:fonts.primary[500],
          fontSize:10,
          
          }}>Harga mulai dari 45.000/Pcs</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>

  <View>
    <TouchableWithoutFeedback onPress={() => navigation.navigate('SamplePrint')}>
      <View>
        <Image style={{
          width:160,
          height:160,
          borderWidth:2,
          borderColor:'white'
        }} source={require('../../assets/samplepirnt_menu.png')}/>

        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:15,

          }}>SAMPLE PRINT</Text>

        <Text style={{
          fontFamily:fonts.primary[500],
          fontSize:10,
          
          }}>Free ( S&K Berlaku )</Text>
      </View>
    </TouchableWithoutFeedback>
  </View>

  </View>
</View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})