import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import React, { useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';

export default function PrintKainRoll({navigation}) {
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
      <MyHeader onPress={() => navigateTo(1)} title="Print Kain Roll" />

      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{
            fontFamily: fonts.primary[600],
            color: colors.primary,
            fontSize: 25
          }}>Kain</Text>

          {/* LIST KAIN ROLL */}
          <View>
            {/* LIST PERTAMA */}
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              {/* IMAGE */}
              <View>
                <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kainsatu.png')} />
              </View>
              {/* QTY & NAME */}
              <View style={{ left: 10, marginTop: -10 }}>
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 18,
                  color: colors.primary,
                  top: 20
                }}>Armani Silk</Text>

                <View>
                  <MyInput  value={quantity} onChangeText={setQuantity} label="QTY" styleLabel={{ color: 'gray' }} styleInput={{ paddingLeft: 10 }} keyboardType='numeric' width={153} label2="Yard" />
                </View>
              </View>
            </View>
            {/* END LIST PERTAMA */}
            <MyGap jarak={20} />

            {/* LIST KEDUA */}
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              {/* IMAGE */}
              <View>
                <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kaindua.png')} />
              </View>
              {/* QTY & NAME */}
              <View style={{ left: 10, marginTop: -10 }}>
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 18,
                  color: colors.primary,
                  top: 20
                }}>Ceruti</Text>

                <View>
                  <MyInput label="QTY" styleLabel={{ color: 'gray' }} styleInput={{ paddingLeft: 10 }} keyboardType='numeric' width={153} label2="Yard" />
                </View>
              </View>
            </View>
            {/* END LIST KEDUA */}
            <MyGap jarak={20} />

            {/* LIST KETIGA */}
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
              {/* IMAGE */}
              <View>
                <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kaintiga.png')} />
              </View>
              {/* QTY & NAME */}
              <View style={{ left: 10, marginTop: -10 }}>
                <Text style={{
                  fontFamily: fonts.primary[400],
                  fontSize: 18,
                  color: colors.primary,
                  top: 20
                }}>Bawa Sendiri</Text>

                <View>
                  <MyInput label="QTY" styleLabel={{ color: 'gray' }} styleInput={{ paddingLeft: 10 }} keyboardType='numeric' width={153} label2="Yard" />
                </View>
              </View>
            </View>
            {/* END LIST KETIGA */}
          </View>

          <View style={{ marginTop: 100 }}>
            <MyButton onPress={handleOrderQuantity} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
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
      <View style={{ padding: 20 }}>
        <Text style={{
          fontFamily: fonts.primary[600],
          color: colors.primary,
          fontSize: 25
        }}>Kain</Text>

        {/* LIST KAIN ROLL */}
        <View>
          {/* LIST PERTAMA */}
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            {/* IMAGE */}
            <View>
              <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kainsatu.png')} />
            </View>
            {/* QTY & NAME */}
            <View style={{ left: 10, marginTop: 30, padding:10, width:'50%'}}>
              <MyRadio value={selectedKain === 'Armani Silk'}  onPress={() => handleRadioSelect('Armani Silk')  } label2='Armani Silk' />
              <Text style={{fontFamily:fonts.primary[400],
              color:Color.blueGray[500], fontSize:9,}}>*Maksimal panjang kain  <Text style={{fontStyle:"italic"}}>sample</Text>  1 meter</Text>
            
            </View>
          </View>
          {/* END LIST PERTAMA */}
          <MyGap jarak={20} />

          {/* LIST KEDUA */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* IMAGE */}
            <View>
              <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kaindua.png')} />
            </View>
            {/* QTY & NAME */}
            <View style={{ left:-5, marginTop: 30, padding:10,
            width:'50%'}}>
              <MyRadio value={selectedKain === 'Ceruti'}  onPress={() => handleRadioSelect('Ceruti')} label2='Ceruti' />
              <Text style={{fontFamily:fonts.primary[400],
              color:Color.blueGray[500], fontSize:9,}}>*Maksimal panjang kain  <Text style={{fontStyle:"italic"}}>sample</Text>  1 meter</Text>
              
  
            </View>
          </View>
          {/* END LIST KEDUA */}
          <MyGap jarak={20} />

          {/* LIST KETIGA */}
          <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
            {/* IMAGE */}
            <View>
              <Image style={{ width: 145, height: 145 }} source={require('../../assets/print_kainroll_kaintiga.png')} />
            </View>
            {/* QTY & NAME */}
            <View style={{ left:10, marginTop: 30, padding:10,
            width:'50%'}}>
              <MyRadio value={selectedKain === 'Bawa Sendiri'} onPress={() => handleRadioSelect('Bawa Sendiri')} label2='Bawa Sendiri' />
              <Text style={{fontFamily:fonts.primary[400],
              color:Color.blueGray[500], fontSize:9,}}>*Maksimal panjang kain <Text style={{fontStyle:"italic"}}>sample</Text> 1 meter</Text>
              
  
            </View>
          </View>
          {/* END LIST KETIGA */}
        </View>

        <View style={{ marginTop: 100 }}>
          <MyButton onPress={handleOrderKain} warna={colors.primary} colorText={colors.white} title="Buat Pesanan" />
        </View>
      </View>
    </ScrollView>
  </View>
  );

  // Konten Halaman Utama
  const MainPage = () => (
    <View>
      <MyHeader onPress={() => navigation.goBack()} title="Print Kain Roll" />
      <ScrollView>
        {/* HEADER KAIN ROLL */}
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={require('../../assets/header_kainroll.png')}
          />
        </View>
        {/* DESKRIPSI */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.mainTitle}>Print Kain Roll</Text>
          <Text style={styles.descriptionText}>
            Print kain dengan kualitas tinta terbaik, harga ramah kantong, cepat dan pelayanan terbaik. Ragu? Bisa cetak sample terlebih dahulu
          </Text>
        </View>
        {/* KAIN PRINT & SAMPLE */}
        <View style={styles.menuContainer}>
          <View>
            <ImageBackground
              style={styles.menuImage}
              source={require('../../assets/kain_roll_print.png')}
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
              source={require('../../assets/sample_menu.png')}
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
