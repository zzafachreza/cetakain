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

export default function Home({ navigation, route }) {
  const [user, setUser] = useState({});

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
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#F4F4F4',

    }}>

      <ScrollView>
        {/* JHEADER */}
        <View style={{
          padding: 10,
          backgroundColor: colors.white

        }}>

          {/* KALAU BISA WIDTH NYA LEBARNYA MENGIKUTI NAMA USERNAME USER */}
          <View style={{
            flexDirection: "row",
            padding: 10,
            backgroundColor: colors.secondary,
            borderRadius: 50,
            alignItems: "center"
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
            </View>
          </View>



        </View>
        {/* END HEADER */}



        {/* BG MENU PERTAMA (PRINT KAIN ROLL)  */}

        <View>
          <ImageBackground style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight / 4,
          }} source={{
            uri: gambar.filter(i => i.menu == 'Kain Roll')[0].image
          }}>
            <View style={{
              padding: 20,

              width: '50%',
              marginTop: 10
            }}>
              <View>
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 20,
                }}>
                  Print Kain Roll
                </Text>

                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 15,

                }}>
                  Print Kain Roll
                </Text>


                <View style={{
                  marginTop: 70
                }}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintKainRoll')}>
                    <View style={{
                      backgroundColor: colors.secondary,
                      padding: 10,
                      borderRadius: 10,
                      height: 40,
                      width: 80,
                      top: -30
                    }}>
                      <Text style={{
                        fontFamily: fonts.primary[600],
                        color: colors.primary,
                        textAlign: 'center',
                        fontSize: 15,
                      }}>PRINT</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* END MENU KAIN ROLL */}



        {/* BG MENU KEDUA (PRINT HIJAB)  */}

        <View>
          <ImageBackground style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight / 4,
            flexDirection: "row",
            justifyContent: "flex-end"
          }} source={{
            uri: gambar.filter(i => i.menu == 'Hijab')[0].image
          }}>
            <View style={{
              padding: 20,
              width: '42%',
              marginTop: 0,
              left: -20
            }}>
              <View>
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 20,
                }}>
                  Print Hijab
                </Text>

                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 15,

                }}>
                  Print Hijab
                </Text>


                <View style={{
                  marginTop: 70
                }}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintHijab')}>
                    <View style={{
                      backgroundColor: colors.secondary,
                      padding: 10,
                      borderRadius: 10,
                      height: 40,
                      width: 80,
                      top: -30
                    }}>
                      <Text style={{
                        fontFamily: fonts.primary[600],
                        color: colors.primary,
                        textAlign: 'center',
                        fontSize: 15,
                      }}>PRINT</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* END MENU PRINT HIJAB */}



        {/* BG MENU PERTAMA (PRINT KAIN ROLL)  */}

        <View>
          <ImageBackground style={{
            flex: 1,
            width: windowWidth,
            height: windowHeight / 4,
          }} source={{
            uri: gambar.filter(i => i.menu == 'Jersey')[0].image
          }}>
            <View style={{
              padding: 20,

              width: '50%',
              marginTop: 10
            }}>
              <View>
                <Text style={{
                  fontFamily: fonts.primary[600],
                  fontSize: 20,
                }}>
                  Print Jersey
                </Text>

                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 15,

                }}>
                  Print Jersey
                </Text>


                <View style={{
                  marginTop: 70
                }}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintJersey')}>
                    <View style={{
                      backgroundColor: colors.secondary,
                      padding: 10,
                      borderRadius: 10,
                      height: 40,
                      width: 80,
                      top: -30
                    }}>
                      <Text style={{
                        fontFamily: fonts.primary[600],
                        color: colors.primary,
                        textAlign: 'center',
                        fontSize: 15,
                      }}>PRINT</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        {/* END MENU KAIN ROLL */}



      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})