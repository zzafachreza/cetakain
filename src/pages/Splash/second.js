import { View, Text, SafeAreaView, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedbackComponent } from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');


const images = [
  { id: '1', source: require('../../assets/background_splashsatu.png') }, // Ganti dengan path gambar Anda
  { id: '2', source: require('../../assets/background_splashdua.png') },
]
 
export default function SecondPlash() {
  const navigation = useNavigation();
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentIndex(index);
  };

  // Function to handle the click event
  const handleClick = () => {
    navigation.navigate('Login'); // Make sure 'Login' is the correct route name
  };

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.source}
      style={{
        width:'100%',
        height:'100%',
      }}
      resizeMode="cover">
      <View style={styles.overlay}>
        <Text style={styles.text}>Slide {item.id}</Text>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
    <ImageBackground style={{
      flex:1,
      width:"100%",
      height:'100%',
    }} source={require('../../assets/background_splashsatu.png')}>
      <View style={{
      
        height:"100%"

      }}>

      <View style={{
        position:'absolute',
        padding:10,
        backgroundColor:colors.white,
        bottom:0,
        left:0,
        right:0,
        borderTopLeftRadius:50,
        borderTopRightRadius:50

      }}>

        <View style={{
          alignItems:'center',
          paddingBottom:10,
          paddingTop:10
        }}>
        <Image style={{
          width:97,
          height:20
        }} source={require('../../assets/logo.png')}/>
      </View>

      <View style={{
        padding:10,
        marginLeft:10
      }}>
        <Text style={{
          fontFamily:fonts.primary[600],
          fontSize:12,

        }}>Kereasikan Ide Kamu Dengan Printing Kain Dan
        Ciptakan Produk Kamu Sendiri.</Text>
      </View>


      <View style={{
        padding:10,

      }}>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
        <View style={{
          padding:10,
          backgroundColor:colors.secondary,
          borderRadius:10
        }}>

        <Text style={{
          fontFamily:fonts.primary[600],
          textAlign:"center",
          fontSize:22,
          color:colors.white
        }}>Masuk</Text>

        </View>
      </TouchableWithoutFeedback>

      <Text style={{
        fontFamily:fonts.primary[600],
        fontSize:15,
        textAlign:"center",
        marginTop:10,

      }}>Atau</Text>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
        <View style={{
          marginTop:10
        }}>
          <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.primary,
            textAlign:'center',
          }}>Daftar Akun</Text>
        </View>
      </TouchableWithoutFeedback>
      </View>
      </View>
      </View>
    </ImageBackground>

    </SafeAreaView>
  );
}
