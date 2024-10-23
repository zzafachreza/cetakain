import { View, Text, SafeAreaView, ScrollView, StyleSheet, Alert, Linking, Image, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker, MyPickerSecond } from '../../components';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import MyCarousel from '../../components/MyCarouser';

export default function PrintHijab({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [selectedBahan, setSelectedBahan] = useState('voal 45'); // Default to 'Voal 45'
  const [selectedUkuran, setSelectedUkuran] = useState('110 x 110 cm'); // Default to '110 X 110 CM'
  const [selectedLasserCut, setSelectedLasserCut] = useState('Motif 1'); // Default to 'Motif 1'
  const [selectedQuantity, setSelectedQuantity] = useState(''); // Default empty, user must input

  const source = require('../../assets/slider_1.png')


  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  // Function to handle radio selection
  const handleRadioSelect = (kain) => {
    setSelectedKain(kain);
  };


  // Fungsi untuk memproses pesanan di Halaman 2 (Quantity)
  const handleOrderPrintHijab = () => {
    // Validate that all fields are selected, especially quantity
    if (!selectedQuantity || isNaN(selectedQuantity) || Number(selectedQuantity) <= 0) {
      Alert.alert("Error", "Mohon masukkan jumlah Quantity yang valid.");
      return;
    }

    // Construct WhatsApp message with all selected values
    const message = `Halo, Saya ingin print hijab dengan informasi berikut:\n\n` +
      `Bahan: ${selectedBahan}\n` +
      `Ukuran: ${selectedUkuran}\n` +
      `Lasser Cut: ${selectedLasserCut}\n` +
      `Quantity: ${selectedQuantity} pcs`;
    const phoneNumber = '6282281121299'; // WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Gagal membuka WhatsApp.");
    });
  };


  // Fungsi untuk memproses pesanan di Halaman 3 (Kain)
  const handleOrderSample = () => {
    // Check if all fields are selected
    if (!selectedBahan || !selectedUkuran || !selectedLasserCut) {
      Alert.alert("Error", "Mohon lengkapi semua pilihan.");
      return;
    }

    // Construct WhatsApp message for sample
    const message = `Halo, Saya ingin memesan *sample* print hijab dengan informasi berikut:\n\n` +
      `Bahan: ${selectedBahan}\n` +
      `Ukuran: ${selectedUkuran}\n` +
      `Lasser Cut: ${selectedLasserCut}`;

    const phoneNumber = '6282281121299'; // WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Gagal membuka WhatsApp.");
    });
  };

  // Konten Halaman 2 (Print)
  const PagePrint = () => (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header with onPress to navigate back to page 1 */}
      <MyHeader onPress={() => navigateTo(1)} title="Print Hijab" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <MyCarousel data_gambar={gambar.filter(i => i.posisi == 'Desain')} />
          </View>


          <View style={{


            padding: 10,
            marginTop: 20

          }}>

            {/* SELECT ATAS */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", }}>
              <View>
                <MyPicker
                  value={selectedBahan}
                  onValueChange={(itemValue) => setSelectedBahan(itemValue)}
                  data={[
                    { label: 'Voal 45', value: 'voal 45', },
                  ]}
                  width={153}
                  label="Bahan"
                />
              </View>

              <View>
                <MyPicker
                  value={selectedUkuran}
                  onValueChange={(itemValue) => setSelectedUkuran(itemValue)}
                  data={[
                    { label: '110 X 110 CM', value: '110 x 110 cm' },
                    { label: '115 X 115 CM', value: '115 x 115 cm' },
                    { label: '120 X 120 CM', value: '120 x 120 cm' },
                  ]}
                  width={153}
                  label="Ukuran"
                />
              </View>
            </View>
            {/* END ATAS */}

            {/* SELECT BAWAH */}
            <View style={{}}>
              <View style={{ alignItems: 'center' }}>
                <MyPickerSecond data={[
                  { label: 'Motif 1', value: 'Motif 1', image: require('../../assets/motif_1.png') },
                  { label: 'Motif 2', value: 'Motif 2', image: require('../../assets/motif_2.png') },
                  { label: 'Motif 3', value: 'Motif 3', image: require('../../assets/motif_3.png') },
                  { label: 'Motif 4', value: 'Motif 4', image: require('../../assets/motif_4.png') },
                  { label: 'Motif 5', value: 'Motif 5', image: require('../../assets/motif_5.png') },
                  { label: 'Motif 6', value: 'Motif 6', image: require('../../assets/motif_6.png') },
                  { label: 'Motif 7', value: 'Motif 7', image: require('../../assets/motif_7.png') },
                ]} label="Lasser Cut" width={222} onValueChange={(value) => console.log(value)} />
              </View>

              <View style={{
                marginTop: -20,
                alignItems: 'center'
              }}>
                <MyInput
                  value={selectedQuantity}
                  onChangeText={setSelectedQuantity}
                  label="Quantity"
                  keyboardType='numeric'
                  width={153}
                  styleInput={{ paddingLeft: 10 }}
                  styleLabel={{ color: colors.primary, textAlign: 'center' }}
                  placeholder="..."
                />
              </View>
            </View>
            {/* END BAWAH */}

          </View>
          {/* END PICKER */}


        </View>
      </ScrollView>
      <View style={{ marginTop: 50, padding: 10 }}>
        <MyButton radius={50} onPress={handleOrderPrintHijab} title="Buat Pesanan" warna={colors.primary} colorText={colors.white} />
      </View>
    </View>
  );

  // Konten Halaman 3 (Sample)
  const PageSample = () => (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header with onPress to navigate back to page 1 */}
      <MyHeader onPress={() => navigateTo(1)} title="Print Hijab Sample" />

      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <MyCarousel data_gambar={gambar.filter(i => i.posisi == 'Desain')} />
          </View>

          <View style={{ flexDirection: "column", padding: 10, marginTop: 20 }}>
            {/* Bahan & Ukuran Pickers */}
            <View style={{ alignItems: "center" }}>
              <View>
                <MyPicker
                  value={selectedBahan}
                  onValueChange={(itemValue) => setSelectedBahan(itemValue)}
                  data={[
                    { label: 'Voal 45', value: 'voal 45' },
                  ]}
                  width={153}
                  label="Bahan"
                />
              </View>

              <View>
                <MyPicker
                  value={selectedUkuran}
                  onValueChange={(itemValue) => setSelectedUkuran(itemValue)}
                  data={[
                    { label: '110 X 110 CM', value: '110 x 110 cm' },
                    { label: '115 X 115 CM', value: '115 x 115 cm' },
                    { label: '120 X 120 CM', value: '120 x 120 cm' },
                  ]}
                  width={153}
                  label="Ukuran"
                />
              </View>
            </View>

            {/* Lasser Cut Picker */}
            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
              <View>
                <MyPickerSecond data={[
                  { label: 'Motif 1', value: 'Motif 1', image: require('../../assets/motif_1.png') },
                  { label: 'Motif 2', value: 'Motif 2', image: require('../../assets/motif_2.png') },
                  { label: 'Motif 3', value: 'Motif 3', image: require('../../assets/motif_3.png') },
                  { label: 'Motif 4', value: 'Motif 4', image: require('../../assets/motif_4.png') },
                  { label: 'Motif 5', value: 'Motif 5', image: require('../../assets/motif_5.png') },
                  { label: 'Motif 6', value: 'Motif 6', image: require('../../assets/motif_6.png') },
                  { label: 'Motif 7', value: 'Motif 7', image: require('../../assets/motif_7.png') },
                ]} label="Lasser Cut" width={222} onValueChange={(value) => console.log(value)} />
              </View>
            </View>


          </View>
        </View>
      </ScrollView>
      {/* Submit Button */}
      <View style={{ marginTop: 50, padding: 10 }}>
        <MyButton radius={50} onPress={handleOrderSample} title="Buat Pesanan" warna={colors.primary} colorText={colors.white} />
      </View>
    </View>
  );
  const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/77aa75f161f68d878234f06023f722cc1f2801d8.png", "id_gambar": "2", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Banner" }, { "file_gambar": "datafoto/dc5e27da22554899592c344074266072a2f2b2bc.png", "id_gambar": "3", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Print" }, {
    "file_gambar": "datafoto/b1cc5dba39d74acfb780c3772e7a9e1a6774fc72.png", "id_gambar": "4",
    "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Sample"
  }])
  const __getGambar = () => {
    axios.post(apiURL + 'gambar_detail', {
      menu: 'Hijab'
    }).then(res => {
      console.log('data_gambar', res.data);
      setGambar(res.data)
    })
  }

  useEffect(() => {
    __getGambar();
  }, [])

  // Konten Halaman Utama
  const MainPage = () => (
    <View>
      <MyHeader onPress={() => navigation.goBack()} title="Print Hijab" />
      <ScrollView>
        {/* HEADER KAIN ROLL */}
        <View style={styles.headerContainer}>
          <MyCarousel data_gambar={gambar.filter(i => i.posisi == 'Banner')} />
        </View>
        {/* DESKRIPSI */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.mainTitle}>Print Hijab</Text>
          <Text style={styles.descriptionText}>
            Print kain dengan kualitas tinta terbaik, harga ramah kantong, cepat dan pelayanan terbaik. <Text style={{ fontStyle: "italic" }}>Ragu?</Text> Bisa cetak sample terlebih dahulu
          </Text>
        </View>
        {/* KAIN PRINT & SAMPLE */}
        <View style={styles.menuContainer}>
          <View>
            <ImageBackground
              style={styles.menuImage}
              source={{
                uri: gambar.filter(i => i.posisi == 'Print')[0].image
              }}
            >
              <View style={styles.menuButtonContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintHijabku')}>
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
              source={{
                uri: gambar.filter(i => i.posisi == 'Sample')[0].image
              }}
            >

              {/* INI NANTI NAVIGATE KE HALAMAN WA DAN JUGA MASUK KE HISTORY RIWAYAT PESANAN  */}
              <View style={styles.menuButtonContainer}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SampleHijab')}>
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
