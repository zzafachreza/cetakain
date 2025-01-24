import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground, TouchableNativeFeedbackComponent, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';

const { width: screenWidth } = Dimensions.get('window');




export default function SecondPlash({ navigation, route }) {


  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('test')
    axios.post(apiURL + 'slider_getstarted').then(res => {
      console.log(res.data)
      setData(res.data);
    })
  }, [])



  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / windowWidth);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={{
      width: windowWidth,
      height: windowHeight / 1.7,
    }}>
      <Image style={{
        width: windowWidth,
        height: windowHeight,
        resizeMode: 'cover'
      }} source={{
        uri: webURL + item.gambar
      }} />
    </View>
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>




      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id_slider.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
        />
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={{
        flex: 0.3,
        backgroundColor: 'red'
      }}>
        <ImageBackground source={require('../../assets/bulat.png')} style={{
          marginTop: -100,
          width: windowWidth,
          height: windowWidth,
          padding: 10,

        }}>
          <Image source={require('../../assets/logo.png')} style={{
            marginTop: 10,
            width: 150,
            height: 60,
            alignSelf: 'center'
          }} />
          <Text style={{
            ...fonts.caption,
            color: colors.black
          }}>Kereasikan Ide Kamu Dengan Printing Kain Dan
            Ciptakan Produk Kamu Sendiri.</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: colors.secondary,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: fonts.primary[800],
              fontSize: 16,
              color: colors.white
            }}>Masuk</Text>
          </TouchableOpacity>
          <Text style={{
            marginTop: 10,
            textAlign: 'center',
            fontFamily: fonts.primary[600],
            fontSize: 16,
            color: colors.black
          }}>Atau</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
            <Text style={{
              marginTop: 10,
              textAlign: 'center',
              fontFamily: fonts.primary[600],
              fontSize: 16,
              color: colors.primary
            }}>Daftar Akun</Text>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </View>



    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  slide: {
    width: windowWidth,
    // height: windowHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
  dotsContainer: {
    marginTop: -100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 120,
    // backgroundColor: 'green'

  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#333',
  },
});