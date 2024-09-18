import { View, Text, SafeAreaView, ScrollView, StyleSheet, Alert, Linking, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import React, { useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components';

export default function PrintHijab({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [selectedKain, setSelectedKain] = useState(''); // State to track the selected fabric
  const [quantity, setQuantity] = useState(''); // Track user input for quantity
const navigateTo = (page) => {
  setCurrentPage(page);
};
// Function to handle radio selection
const handleRadioSelect = (kain) => {
setSelectedKain(kain);
};


// Fungsi untuk memproses pesanan di Halaman 2 (Quantity)
const handleOrderQuantity = () => {
  // Cek apakah jumlah kualitas valid
  if (!quantity || quantity === '0') {
    Alert.alert("Error", "Mohon masukkan jumlah yang valid.");
    return;
  }

  // Membuka WhatsApp dengan jumlah yang dipilih
  const message = `Halo, saya ingin memesan dengan jumlah kualitas: ${quantity} yard.`;
  const phoneNumber = '6282281121299'; // Ganti dengan nomor WhatsApp yang diinginkan
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "Gagal membuka WhatsApp.");
  });
};

// Fungsi untuk memproses pesanan di Halaman 3 (Kain)
const handleOrderKain = () => {
  // Cek apakah kain dipilih
  if (!selectedKain) {
    Alert.alert("Error", "Mohon pilih kain.");
    return;
  }

  // Membuka WhatsApp dengan kain yang dipilih
  const message = `Halo, saya ingin memesan kain: ${selectedKain}.`;
  const phoneNumber = '6282281121299'; // Ganti dengan nomor WhatsApp yang diinginkan
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  Linking.openURL(url).catch(() => {
    Alert.alert("Error", "Gagal membuka WhatsApp.");
  });
};
// Konten Halaman 2 (Print)
const PagePrint = () => (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    {/* Header with onPress to navigate back to page 1 */}
    <MyHeader onPress={() => navigateTo(1)} title="Print HIjab" />

    <ScrollView>
    <View style={{padding:10}}>
      <View style={{alignItems:"center", marginTop:10}}>
        <Image style={{width:145, height:145}} source={require('../../assets/upload_printhijab.png')}/>
      </View>


      <View style={{
        padding:10, backgroundColor:'red',
        flexDirection:"column",

      }}>

      {/* SELECT ATAS */}
      <View style={{ flexDirection:"row", justifyContent:"space-around"}}>
        <View>
      <MyPicker data={[
        {label:'Voal 45', value:'voal 45'},
        ]} width={153} label="Bahan"/>
        </View>

        <View>
      <MyPicker data={[
        {label:'110 X 110 CM', value:'110 x 110 cm'},
        {label:'115 X 115 CM', value:'115 x 115 cm'},
        {label:'120 X 120 CM', value:'120 x 120 cm'},
        ]} width={153} label="Ukuran"/>
        </View>
      </View>

      </View>
    </View>
    </ScrollView>
  </View>
);

// Konten Halaman 3 (Sample)
const PageSample = () => (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
  {/* Header with onPress to navigate back to page 1 */}
  <MyHeader onPress={() => navigateTo(1)} title="Print Kain Roll" />

  <ScrollView>
    
  </ScrollView>
</View>
);

// Konten Halaman Utama
const MainPage = () => (
  <View>
    <MyHeader onPress={() => navigation.goBack()} title="Print Hjiab" />
    <ScrollView>
      {/* HEADER KAIN ROLL */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerImage}
          source={require('../../assets/header_printhijan.png')}
        />
      </View>
      {/* DESKRIPSI */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.mainTitle}>Print Hijab</Text>
        <Text style={styles.descriptionText}>
          Print kain dengan kualitas tinta terbaik, harga ramah kantong, cepat dan pelayanan terbaik. Ragu? Bisa cetak sample terlebih dahulu
        </Text>
      </View>
      {/* KAIN PRINT & SAMPLE */}
      <View style={styles.menuContainer}>
        <View>
          <ImageBackground
            style={styles.menuImage}
            source={require('../../assets/hijab_print_menu.png')}
          >
            <View style={styles.menuButtonContainer}>
              <TouchableWithoutFeedback onPress={() => navigateTo(2)}>
                <View style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Print</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ImageBackground>
        </View>
        <View>
          <ImageBackground
            style={styles.menuImage}
            source={require('../../assets/hijab_sample_menu.png')}
          >

          {/* INI NANTI NAVIGATE KE HALAMAN WA DAN JUGA MASUK KE HISTORY RIWAYAT PESANAN  */}
            <View style={styles.menuButtonContainer}>
              <TouchableWithoutFeedback onPress={() => navigateTo(3)}>
                <View style={styles.menuButton}>
                  <Text style={styles.menuButtonText}>Sample</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  </View>
);

return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      {/* Render Halaman Berdasarkan currentPage */}
      {currentPage === 1 && <MainPage />}
      {currentPage === 2 && <PagePrint />}
      {currentPage === 3 && <PageSample />}
    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
safeArea: {
  flex: 1,
  backgroundColor: colors.white,
},
container: {
  flex: 1,
},
headerContainer: {
  padding: 10,
  alignSelf: 'center',
},
headerImage: {
  width: 378,
  height: 282,
},
descriptionContainer: {
  paddingHorizontal: 20,
  marginTop: 10,
},
mainTitle: {
  fontFamily: fonts.primary[600],
  color: colors.primary,
  fontSize: 20,
  textAlign: 'center',
},
descriptionText: {
  fontFamily: fonts.primary[400],
  textAlign: 'center',
  fontSize: 12,
  color: Color.blueGray[500],
  marginTop: 5,
},
menuContainer: {
  flexDirection: 'row',
  padding: 10,
  justifyContent: 'space-around',
  marginTop: 20,
},
menuImage: {
  width: 170,
  height: 170,
  justifyContent: 'center',
  alignItems: 'center',
},
menuButtonContainer: {
  padding: 10,
},
menuButton: {
  padding: 10,
  backgroundColor: colors.secondary,
  borderRadius: 50,
  height: 45,
  width: 120,
  justifyContent: 'center',
  alignItems: 'center',
},
menuButtonText: {
  fontFamily: fonts.primary[600],
  textAlign: 'center',
  color: colors.primary,
  fontSize: 20,
  top: -2,
},
pageContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
title: {
  fontFamily: fonts.primary[600],
  color: colors.primary,
  fontSize: 24,
  marginBottom: 20,
},
});
