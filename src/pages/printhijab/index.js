import { View, Text, SafeAreaView, ScrollView, StyleSheet, Alert, Linking, Image, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import React, { useState } from 'react';
import { Color, colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components';

export default function PrintHijab({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [selectedBahan, setSelectedBahan] = useState('voal 45'); // Default to 'Voal 45'
  const [selectedUkuran, setSelectedUkuran] = useState('110 x 110 cm'); // Default to '110 X 110 CM'
  const [selectedLasserCut, setSelectedLasserCut] = useState('Motif 1'); // Default to 'Motif 1'
  const [selectedQuantity, setSelectedQuantity] = useState(''); // Default empty, user must input
  

  
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
    <View style={{padding:10}}>
      <View style={{alignItems:"center", marginTop:10}}>
        <Image style={{width:145, height:145}} source={require('../../assets/upload_printhijab.png')}/>
      </View>


      <View style={{
        
        flexDirection:"column",
        padding:10,
        marginTop:20

      }}>

      {/* SELECT ATAS */}
      <View style={{ flexDirection:"row", justifyContent:"space-around"}}>
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
      {/* END ATAS */}

        {/* SELECT BAWAH */}
        <View style={{ flexDirection:"row", justifyContent:"space-around"}}>
        <View>
        <MyPicker
                value={selectedLasserCut}
                onValueChange={(itemValue) => setSelectedLasserCut(itemValue)}
                data={[
                  { label: 'Motif 1', value: 'Motif 1' },
                ]}
                width={153}
                label="Lasser Cut"
              />
        </View>

        <View style={{
          marginTop:-20
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

      <View style={{marginTop:50, padding:10}}>
        <MyButton onPress={handleOrderPrintHijab} title="Buat Pesanan" warna={colors.primary} colorText={colors.white}/>
      </View>
    </View>
    </ScrollView>
  </View>
);

// Konten Halaman 3 (Sample)
const PageSample = () => (
  <View style={{ flex: 1, backgroundColor: colors.background }}>
    {/* Header with onPress to navigate back to page 1 */}
    <MyHeader onPress={() => navigateTo(1)} title="Print Hijab" />

    <ScrollView>
      <View style={{ padding: 10 }}>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Image style={{ width: 145, height: 145 }} source={require('../../assets/upload_printhijab.png')} />
        </View>

        <View style={{ flexDirection: "column", padding: 10, marginTop: 20 }}>
          {/* Bahan & Ukuran Pickers */}
          <View style={{ alignItems:"center" }}>
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
              <MyPicker
                value={selectedLasserCut}
                onValueChange={(itemValue) => setSelectedLasserCut(itemValue)}
                data={[
                  { label: 'Motif 1', value: 'Motif 1' },
                ]}
                width={153}
                label="Lasser Cut"
              />
            </View>
          </View>

          {/* Submit Button */}
          <View style={{ marginTop: 50, padding: 10 }}>
            <MyButton onPress={handleOrderSample} title="Buat Pesanan" warna={colors.primary} colorText={colors.white} />
          </View>
        </View>
      </View>
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
