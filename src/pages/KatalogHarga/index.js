import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../../utils';
import { MyHeader } from '../../components';
import { fonts } from '../../utils';

export default function KatalogHarga({ navigation }) {
  const [expanded, setExpanded] = useState(null);
  const [animation] = useState(new Animated.Value(0));

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
    Animated.timing(animation, {
      toValue: expanded === index ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Data gambar berdasarkan menu
  const images = [
    {
      title: 'Pricelist Kain Roll',
      source: require('../../assets/dummcy_pricelist.png'), // Ganti dengan path gambar yang sesuai
      width: 332, // Sesuaikan ukuran lebar gambar
      height: 85, // Sesuaikan ukuran tinggi gambar
    },
    {
      title: 'Pricelist Hijab',
      source: require('../../assets/pricelist_hijab.png'), // Ganti dengan path gambar yang sesuai
      width: 332, // Sesuaikan ukuran lebar gambar
      height: 315, // Sesuaikan ukuran tinggi gambar
    },
    {
      title: 'Pricelist Jersey',
      source: require('../../assets/pricelist_jersey.png'), // Ganti dengan path gambar yang sesuai
      width: 332, // Sesuaikan ukuran lebar gambar
      height: 137, // Sesuaikan ukuran tinggi gambar
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader onPress={() => navigation.goBack()} title="Katalog Harga" />
      <ScrollView>
        <View style={styles.container}>
          {images.map((item, index) => (
            <View key={index}>
              <TouchableOpacity style={styles.menuItem} onPress={() => toggleExpand(index)}>
                <Text style={styles.menuText}>{item.title}</Text>
              </TouchableOpacity>
              {expanded === index && (
                <Animated.View style={{ opacity: animation }}>
                  <Image source={item.source} style={{width: item.width, height: item.height}} resizeMode="contain" />
                </Animated.View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  menuItem: {
    backgroundColor: colors.lightpink,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
    fontFamily:fonts.primary[600],
    color:colors.primary,
    
  
  },
  image: {
    width: '100%', // Mengatur lebar gambar agar sesuai dengan lebar layar
    height: 200, // Mengatur tinggi gambar sesuai kebutuhan
    marginBottom: 10,
    borderRadius: 5,
  },
});
