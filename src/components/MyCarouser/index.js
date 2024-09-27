import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity, // Untuk tombol panah
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

  // Array gambar lokal (hanya ada 2 gambar)
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
      <View style={styles.imageContainer}>
        <Image
          source={imageSLIDE[index % imageSLIDE.length]} // Mengambil gambar lokal sesuai index
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  // Fungsi untuk berpindah slide ke kiri (terbatas untuk 2 gambar)
  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1); // Hanya geser jika bukan di slide pertama
    }
  };

  // Fungsi untuk berpindah slide ke kanan (terbatas untuk 2 gambar)
  const handleNextSlide = () => {
    if (activeSlide < imageSLIDE.length - 1) {
      setActiveSlide(activeSlide + 1); // Hanya geser jika bukan di slide terakhir
    }
  };

  return (
    <View style={styles.carouselContainer}>
      {/* Tombol Panah Kiri */}
      <TouchableOpacity
        style={[styles.arrowLeft, activeSlide === 0 && { opacity: 0.3 }]} // Menurunkan opacity jika di slide pertama
        onPress={handlePrevSlide}
        disabled={activeSlide === 0} // Nonaktifkan tombol jika di slide pertama
      >
        <Image
          source={require('../../assets/left-arrow.png')} // Gambar panah kiri
          style={styles.arrowImage} // Styling untuk gambar panah
        />
      </TouchableOpacity>

      <Carousel
        data={data} // Pastikan data yang dipakai untuk carousel
        renderItem={renderCarouselItem}
        sliderWidth={windowWidth}
        itemWidth={300}
        itemHeight={800}
        removeClippedSubviews={false}
        firstItem={activeSlide} // Mengatur slide aktif
        onSnapToItem={index => setActiveSlide(index)} // Update indeks aktif saat geser manual
      />

      {/* Tombol Panah Kanan */}
      <TouchableOpacity
        style={[styles.arrowRight, activeSlide === imageSLIDE.length - 1 && { opacity: 0.3 }]} // Menurunkan opacity jika di slide terakhir
        onPress={handleNextSlide}
        disabled={activeSlide === imageSLIDE.length - 1} // Nonaktifkan tombol jika di slide terakhir
      >
        <Image
          source={require('../../assets/right-arrow.png')} // Gambar panah kanan
          style={styles.arrowImage} // Styling untuk gambar panah
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent:"center",
    left:-10
  },
  imageContainer: {
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: 300,
    resizeMode: 'cover',
  },
  arrowLeft: {
    position: 'absolute',
    left: -20,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: -42,
    zIndex: 1,
  },
  arrowImage: {
    width: 100, // Lebar gambar panah
    height: 100, // Tinggi gambar panah
    resizeMode: 'contain', // Menyesuaikan ukuran gambar
  },
});
