import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { colors } from '../../utils';
import { MyHeader } from '../../components';
import { fonts } from '../../utils';
import { Icon } from 'react-native-elements';

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
      modul: 'bahanroll',

    },
    {
      title: 'Pricelist Hijab',
      modul: 'bahanhijab',

    },
    {
      title: 'Pricelist Jersey',
      modul: 'bahanjersey',

    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader onPress={() => navigation.goBack()} title="Katalog Harga" />
      <ScrollView>
        <View style={styles.container}>
          {images.map((item, index) => (
            <TouchableOpacity onPress={() => navigation.navigate('WebKatalog', item)} style={{
              borderWidth: 1,
              padding: 10,
              marginVertical: 8,
              borderRadius: 10,
              borderColor: colors.primary,
              flexDirection: 'row'
            }}>
              <Text style={{
                flex: 1,
                ...fonts.headline2,
                color: colors.primary
              }}>{item.title}</Text>
              <View style={{
                backgroundColor: colors.secondary,
                width: 40,
                height: 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Icon type='ionicon' name='search' color={colors.primary} />
              </View>
            </TouchableOpacity>
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
    fontFamily: fonts.primary[600],
    color: colors.primary,


  },
  image: {
    width: '100%', // Mengatur lebar gambar agar sesuai dengan lebar layar
    height: 200, // Mengatur tinggi gambar sesuai kebutuhan
    marginBottom: 10,
    borderRadius: 5,
  },
});
