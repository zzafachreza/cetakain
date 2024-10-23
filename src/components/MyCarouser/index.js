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

export default function MyCarousel({ data_gambar = [] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  // Array gambar lokal (hanya ada 2 gambar)
  const imageSLIDE = data_gambar;
  console.log(data_gambar);

  const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Mengambil data dari API
  //   axios.get(apiURL + 'banner').then(res => {
  //     console.log('slider', res.data);
  //     setData(res.data);
  //   });
  // }, []);

  const renderCarouselItem = ({ item, index }) => (
    <Image
      source={{
        uri: item.image
      }} // Mengambil gambar lokal sesuai index
      style={styles.image}
    />
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
        loop={true}
        layout="default"
        layoutCardOffset={18}
        itemWidth={300} // Sesuaikan lebar item agar lebih sesuai di layar
        data={imageSLIDE} // Pastikan data yang dipakai untuk carousel
        renderItem={renderCarouselItem}
        sliderWidth={windowWidth}
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
    marginTop: 10,
    alignItems: 'center',  // Menjajarkan slider di tengah secara horizontal
    justifyContent: 'center',  // Menjajarkan secara vertikal
    height: 200,  // Sesuaikan tinggi container carousel agar sesuai dengan elemen di atas dan bawah
  },
  imageContainer: {
    width: 300,
    borderRadius: 10,
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 10,
    // resizeMode: 'contain',
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  arrowImage: {
    width: 100, // Lebar gambar panah
    height: 100, // Tinggi gambar panah
    resizeMode: 'contain', // Menyesuaikan ukuran gambar
  },
});
