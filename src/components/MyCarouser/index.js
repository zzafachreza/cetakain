import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { apiURL } from '../../utils/localStorage';

export default function MyCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  
  // Array gambar lokal
  const imageSLIDE = [
    require('../../assets/your_design.png'),
    require('../../assets/jeysey_img.png'),
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    // Mengambil data dari API
    axios.get(apiURL + 'banner').then(res => {
      console.log('slider', res.data);
      setData(res.data);
    });
  }, []);

  const renderCarouselItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ArtikelDetail', item)}>
      <View style={{
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
        {/* Menggunakan gambar lokal berdasarkan index */}
        <Image
          source={imageSLIDE[index % imageSLIDE.length]} // Mengambil gambar lokal sesuai index
          style={{
            height: 200,
            width: 300,
            resizeMode: 'cover',
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Carousel
      
        data={data} // Pastikan data yang dipakai untuk carousel
        renderItem={renderCarouselItem}
        sliderWidth={windowWidth}
        itemWidth={300}
        itemHeight={800}
        removeClippedSubviews={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 10,
  },
});
