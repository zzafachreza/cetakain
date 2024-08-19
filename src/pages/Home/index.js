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

  useEffect(() => {
    __getUser();
  }, [])
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
    
    <ScrollView>


    {/* HEADER */}
    <View style={{padding:20, backgroundColor:colors.tertiary, borderBottomLeftRadius:50, borderBottomRightRadius:50,
      flexDirection:"row", justifyContent:'space-between', height:200
      }}>

          <View style={{justifyContent:"center", marginTop: -80}}>
              <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:
              MyDimensi / 4, }}>Selamat Datang!</Text>

              <Image style={{width:206, height:43}} source={require("../../assets/logohome.png")}/>
          </View>

         
    </View>
    {/* END HEADERS */}

                <View style={{padding:10, }}>
                  {/* Sldier */}
                  
                  <View style={{alignItems:"center"}}>
                    <Image style={{
                      width:316,
                      height:202,
                      borderRadius:10, 
                      borderWidth:1,
                      borderColor: '#e1e1e1',
                      marginTop: -100

                    }} source={require("../../assets/slider_1.png")}/>
                  </View>

                  <MyGap jarak={5}/>

                    <View style={{alignItems:"center", marginTop:'5%'}}>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-around',
                  padding:0, width:'96%'}}>



                    {/* Print Kain Roll */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("PrintKainRoll")}>
                      <View style={{}}>
                      <View style={{padding:10, backgroundColor:colors.primary, borderRadius:50, width:123,
                      alignItems:'center', height:123, flexDirection:"row", justifyContent:"center"}}>
                        <Image style={{width:83, height:83, }} source={require("../../assets/icon_printkainroll.png")}/>
                      </View>

                      <View  style={{marginTop:10, alignItems:"center"}}>
                        <Text style={{
                          fontFamily:fonts.primary[600],
                          textAlign:'center',
                          fontSize:16, 
                          color:colors.primary
                        }}>Print Kain Roll</Text>
                      </View>
                      </View>
                      
                    </TouchableWithoutFeedback>

                        

                        {/* Print Hijab */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate("PrintHijab")}>
                      <View>
                      <View style={{padding:10, backgroundColor:colors.primary, borderRadius:50, width:123,
                      alignItems:"center", height:123, flexDirection:"row", justifyContent:"center"}}>
                        <Image style={{width:83, height:83, }} source={require("../../assets/icon_printhijab.png")}/>
                      </View>

                      <View  style={{marginTop:10}}>
                        <Text style={{
                          fontFamily:fonts.primary[600],
                          textAlign:'center',
                          fontSize:16, 
                          color:colors.primary,
                        }}>Print Hijab</Text>
                      </View>
                      </View>
                      
                    </TouchableWithoutFeedback>

                       {/* Print Jersey */}
                       <TouchableWithoutFeedback onPress={() => navigation.navigate("PrintJersey")}>
                      <View style={{marginTop:20}}>
                      <View style={{padding:10, backgroundColor:colors.myicon, borderRadius:50, width:123,
                      alignItems:"center", height:123, flexDirection:"row", justifyContent:"center"}}>
                        <Image style={{width:82, height:82, }} source={require("../../assets/icon_printjersey.png")}/>
                      </View>

                      <View  style={{marginTop:10}}>
                        <Text style={{
                          fontFamily:fonts.primary[600],
                          textAlign:'center',
                          fontSize:16, 
                          color:colors.primary
                        }}>Print Jersey</Text>
                      </View>
                      </View>
                      
                    </TouchableWithoutFeedback>


                       {/* Cetak Sample */}
                       <TouchableWithoutFeedback onPress={() => navigation.navigate("CetakSample")}>
                      <View style={{marginTop:20}}>
                      <View style={{padding:10, backgroundColor:colors.myicon, borderRadius:50, width:123,
                      alignItems:"center", height:123, flexDirection:'row', justifyContent:"center"}}>
                        <Image style={{width:83, height:83, }} source={require("../../assets/icon_cetaksample.png")}/>
                      </View>

                      <View style={{marginTop:10}}>
                        <Text style={{
                          fontFamily:fonts.primary[600],
                          textAlign:'center',
                          fontSize:16,
                          color:colors.primary
                        }}>Cetak Sample</Text>
                      </View>
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