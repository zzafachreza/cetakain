import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, ImageBackground, TouchableWithoutFeedback, Alert, } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { colors, fonts, Color } from '../../utils';
import { MyButton, MyCarouser, MyGap, MyHeader, MyImageUpload, MyInput, MyPicker, MyRadio } from '../../components';

import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';


export default function PrintJersey({ navigation }) {
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [selectedBahan, setSelectedBahan] = useState('Jersey'); // Default to 'Jersey'
  const [selectedPola, setSelectedPola] = useState('O - NECK'); // Default to 'O - NECK'
  const [selectedSize, setSelectedSize] = useState(''); // Selected size by user
  const [quantityS, setQuantityS] = useState(''); // Quantity for size S
  const [quantityM, setQuantityM] = useState(''); // Quantity for size M
  const [quantityL, setQuantityL] = useState(''); // Quantity for size L
  const [quantityXL, setQuantityXL] = useState(''); // Quantity for size XL
  const [quantityXXL, setQuantityXXL] = useState(''); // Quantity for size XXL
  const [quantityXXXL, setQuantityXXXL] = useState(''); // Quantity for size XXXL

  const [entries, setEntries] = useState([
    {
      image: require('../../assets/logo.png'),
    },

    {
      image: require('../../assets/logo.png'),
    }
  ])


  const carouselRef = useRef(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  // Function to handle radio selection
  const handleRadioSelect = (kain) => {
    setSelectedKain(kain);
  };


  // Fungsi untuk memproses pesanan di Halaman 2 (Quantity)
  // Handle order for printing Jersey
  const handleOrderPrintJersey = () => {
    // Validate that at least one quantity is entered
    if (
      !quantityS && !quantityM && !quantityL &&
      !quantityXL && !quantityXXL && !quantityXXXL
    ) {
      Alert.alert("Error", "Mohon masukkan setidaknya satu jumlah Quantity untuk ukuran.");
      return;
    }

    // Construct WhatsApp message with all selected values
    const message = `Halo, Saya ingin memesan print Jersey dengan informasi berikut:\n\n` +
      `Bahan: ${selectedBahan}\n` +
      `Pola: ${selectedPola}\n` +
      `Size S: ${quantityS || '0'} pcs\n` +
      `Size M: ${quantityM || '0'} pcs\n` +
      `Size L: ${quantityL || '0'} pcs\n` +
      `Size XL: ${quantityXL || '0'} pcs\n` +
      `Size XXL: ${quantityXXL || '0'} pcs\n` +
      `Size XXXL: ${quantityXXXL || '0'} pcs`;

    const phoneNumber = '6282281121299'; // WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Gagal membuka WhatsApp.");
    });
  };


  // Fungsi untuk memproses pesanan di Halaman 3 (Kain)
  // Handle order for sample
  const handleOrderSample = () => {
    // Construct WhatsApp message for sample
    const message = `Halo, Saya ingin memesan *sample* print Jersey dengan informasi berikut:\n\n` +
      `Bahan: ${selectedBahan}\n` +
      `Pola: ${selectedPola}\n` +
      `Size: ${selectedSize}`;

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

      <ScrollView>
        <MyHeader onPress={() => navigateTo(1)} title="Print Jersey" />

        <View style={{
          padding: 10
        }}>
          <View style={{}}>
            {/* SLIDER IMAGE */}
            <MyCarouser data_gambar={gambar.filter(i => i.posisi == 'Desain')} />

          </View>


          {/* INPUT & Select */}

          <View style={{ padding: 10, }}>

            {/* SELECT BAHAN */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <View style={{ marginTop: -10, flexDirection: "row" }}>
                <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, color: colors.primary, left: -5 }}>Bahan</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 10 }}>:</Text>
              </View>

              <View style={{ alignItems: "center", left: 10 }}>
                <MyPicker value={selectedBahan} onValueChange={setSelectedBahan} data={[
                  { label: 'Jersey', value: 'Jersey' }
                ]} width={180} height={40} />
              </View>

            </View>
            {/* END PERTAMA */}

            {/* SELECT POLA */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
              <View style={{ marginTop: -10, flexDirection: "row", }}>
                <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, color: colors.primary }}>Pola</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 30 }}>:</Text>

              </View>

              <View>

              </View>

              <View style={{ alignItems: "center", left: 5 }}>
                <MyPicker value={selectedPola} onValueChange={setSelectedPola} data={[
                  { label: 'O - NECK', value: 'O - NECK' },
                  { label: 'V - NECK', value: 'V - NECK' },
                  { label: 'Long Sleeve', value: 'Long Sleeve' },
                  { label: 'Basket', value: 'Basket' },
                ]} width={180} height={40} />
              </View>


            </View>
            {/* END KEDUA */}

            {/* PILIH SIZE */}
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center" }}>
              <View style={{ flexDirection: "row", top: -150 }}>
                <Text style={{ color: colors.primary, fontFamily: fonts.primary[500], left: 2 }}>Size</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 30 }}>:</Text>


              </View>
              <View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>S</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: 4 }}>
                        <MyInput value={quantityS} onChangeText={setQuantityS} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 10, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>


                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>M</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: 2 }}>
                        <MyInput value={quantityM} onChangeText={setQuantityM} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 8, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>L</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: 5 }}>
                        <MyInput value={quantityL} onChangeText={setQuantityL} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 10, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>XL</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: 2 }}>
                        <MyInput value={quantityXL} onChangeText={setQuantityXL} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 8, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>XXL</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: -2 }}>
                        <MyInput value={quantityXXL} onChangeText={setQuantityXXL} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 5, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <Text style={{
                    fontFamily: fonts.primary[500], color: colors.primary, fontSize: 20, top: 0
                  }}>•</Text>

                  <Text style={{ fontFamily: fonts.primary[500], color: Color.blueGray[400] }}>XXXL</Text>

                  <View style={{ left: 10 }}>
                    <View style={{ top: -10, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                      <View style={{ left: -5 }}>
                        <MyInput value={quantityXXXL} onChangeText={setQuantityXXXL} width={160} height={40} />
                      </View>
                      <Text style={{ fontFamily: fonts.primary[300], color: Color.blueGray[500], left: 2, top: 10 }}>Pcs</Text>
                    </View>
                  </View>
                </View>

              </View>


            </View>
          </View>

          <View style={{ padding: 10, marginTop: 20 }}>
            <MyButton onPress={handleOrderPrintJersey} warna={colors.primary} title="Buat Pesanan" colorText={colors.white} />
          </View>
        </View>

      </ScrollView>
    </View>
  );

  // Konten Halaman 3 (Sample)
  const PageSample = () => (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView>
        <MyHeader onPress={() => navigateTo(1)} title="Print Jersey Sample" />

        <View style={{
          padding: 10
        }}>
          <View style={{}}>
            <MyCarouser data_gambar={gambar.filter(i => i.posisi == 'Desain')} />
          </View>


          {/* INPUT & Select */}

          <View style={{ padding: 10, }}>

            {/* SELECT BAHAN */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
              <View style={{ marginTop: -10, flexDirection: "row" }}>
                <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, color: colors.primary, left: -5 }}>Bahan</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 10 }}>:</Text>
              </View>

              <View style={{ alignItems: "center", left: 10 }}>
                <MyPicker value={selectedBahan} onValueChange={setSelectedBahan} data={[
                  { label: 'Jersey', value: 'Jersey' }
                ]} width={180} height={40} />
              </View>

            </View>
            {/* END PERTAMA */}

            {/* SELECT POLA */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
              <View style={{ marginTop: -10, flexDirection: "row", }}>
                <Text style={{ fontFamily: fonts.primary[500], fontSize: 15, color: colors.primary }}>Pola</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 30 }}>:</Text>

              </View>

              <View>

              </View>

              <View style={{ alignItems: "center", left: 5 }}>
                <MyPicker value={selectedPola} onValueChange={setSelectedPola} data={[
                  { label: 'O - NECK', value: 'O - NECK' },
                  { label: 'V - NECK', value: 'V - NECK' },
                  { label: 'Long Sleeve', value: 'Long Sleeve' },
                  { label: 'Basket', value: 'Basket' },
                ]} width={180} height={40} />
              </View>


            </View>
            {/* END KEDUA */}

            {/* PILIH SIZE */}
            <View style={{ flexDirection: 'row', justifyContent: "space-around", alignItems: "center" }}>
              <View style={{ flexDirection: "row", top: 0 }}>
                <Text style={{ color: colors.primary, fontFamily: fonts.primary[500], left: -10 }}>Size</Text>
                <Text style={{ fontFamily: fonts.primary[500], color: colors.primary, left: 28 }}>:</Text>



              </View>

              {/* PICK SIZE  */}
              <View style={{}}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", }}>

                  {/* UKURAN S */}
                  <View style={{ marginRight: 10 }}>
                    <MyRadio value={selectedSize === 'S'} onPress={() => setSelectedSize('S')} label2="S" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>

                  {/* UKURAN M */}
                  <View style={{ marginRight: 10 }}>
                    <MyRadio value={selectedSize === 'M'} onPress={() => setSelectedSize('M')} label2="M" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>

                  {/* UKURAN L */}
                  <View>
                    <MyRadio value={selectedSize === 'L'} onPress={() => setSelectedSize('L')} label2="L" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", }}>

                  {/* UKURAN XL */}
                  <View style={{ marginRight: 0, left: 6 }}>
                    <MyRadio value={selectedSize === 'XL'} onPress={() => setSelectedSize('XL')} label2="XL" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>

                  {/* UKURAN XXL */}
                  <View style={{ marginRight: 0, left: 20 }}>
                    <MyRadio value={selectedSize === 'XXL'} onPress={() => setSelectedSize('XXL')} label2="XXL" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>

                  {/* UKURAN XXXL */}
                  <View style={{ left: 27 }}>
                    <MyRadio value={selectedSize === 'XXXL'} onPress={() => setSelectedSize('XXXL')} label2="XXXL" labelStyle={{ fontSize: 16, fontFamily: fonts.primary[500] }} />
                  </View>
                </View>
              </View>


            </View>
          </View>

          <View style={{ padding: 10, marginTop: 20 }}>
            <MyButton warna={colors.primary} title="Buat Pesanan" colorText={colors.white} />
          </View>
        </View>

      </ScrollView>
    </View>
  );


  const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/77aa75f161f68d878234f06023f722cc1f2801d8.png", "id_gambar": "2", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Banner" }, { "file_gambar": "datafoto/dc5e27da22554899592c344074266072a2f2b2bc.png", "id_gambar": "3", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Print" }, {
    "file_gambar": "datafoto/b1cc5dba39d74acfb780c3772e7a9e1a6774fc72.png", "id_gambar": "4",
    "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Sample"
  }])
  const __getGambar = () => {
    axios.post(apiURL + 'gambar_detail', {
      menu: 'Jersey'
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
      <MyHeader onPress={() => navigation.goBack()} title="Print Jersey" />
      <ScrollView>
        {/* HEADER KAIN ROLL */}
        <View style={styles.headerContainer}>
          <MyCarouser data_gambar={gambar.filter(i => i.posisi == 'Banner')} />
        </View>
        {/* DESKRIPSI */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.mainTitle}>Print Jersey</Text>
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
                <TouchableWithoutFeedback onPress={() => navigation.navigate('PrintJerseyku')}>
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
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SampleJersey')}>
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
