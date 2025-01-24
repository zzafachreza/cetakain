import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking, FlatList, Dimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Color, colors, fonts, getDataByTable, getDataCompany, windowHeight, windowWidth } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';
import MyCarousel from '../../components/MyCarouser';
import axios from 'axios';
import { apiURL, getData, webURL } from '../../utils/localStorage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';



export default function PrintKainRoll({ navigation }) {



  const [comp, setComp] = useState({});
  const [user, setUser] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [selectedKain, setSelectedKain] = useState(''); // State to track the selected fabric
  const [quantity, setQuantity] = useState('10'); // Track user input for quantity
  const [activeIndex, setActiveIndex] = useState(0); // State untuk slide aktif
  const carouselRef = useRef(null); // Ref untuk mengakses metode carousel
  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  // Function to handle radio selection



  const __getGambar = () => {
    axios.post(apiURL + 'gambar_detail', {
      menu: 'Kain Roll'
    }).then(res => {
      setGambar(res.data)
    })
  }


  useEffect(() => {
    __getData();
    getData('user').then(u => setUser(u));
    getDataCompany().then(res => setComp(res.data.data));
    __getGambar();
  }, [])

  const [data, setData] = useState([
    {
      nama_bahan: '',
      keterangan: '',
      image: 'https://zavalabs.com/nogambar.jpg'
    }
  ]);
  const __getData = () => {
    getDataByTable('bahanroll').then(res => {
      console.log('bahan', res.data);
      setData(res.data);
    })
  }


  const sendServer = () => {
    closeModal();
    let sendData = {
      fid_pengguna: user.id_pengguna,
      jenis: 'PRINT',
      nomor_pesanan: 'RP' + moment().format('YYYYMMDDHHmmss'),
      fid_bahanroll: data[activeIndex].id_bahanroll,
      qty: quantity,
      order: [
        {
          id_bahanroll: data[activeIndex].id_bahanroll,
          nama_bahan: data[activeIndex].nama_bahan,
          qty: quantity
        }
      ],
    };

    if (sendData.order.length > 0) {
      let WATemplate = `*PESANAN ${sendData.jenis} KAIN ROLL*\n\nNomor Pesanan : *${sendData.nomor_pesanan}*\nTanggal : *${moment().format('dddd, DD MM YYYY')}*\nPengguna : *${user.nama_lengkap} / ${user.telepon}*\n----------------------------------\n`;
      sendData.order.map(i => {
        if (i.qty > 0) {
          WATemplate += `${i.nama_bahan} *${i.qty} Yard* \n`
        }

      })


      axios.post(apiURL + 'add_print_roll', sendData).then(res => {
        console.log(res.data);
        if (res.data.status == 200) {
          showMessage({
            type: 'success',
            icon: 'success',
            message: res.data.message
          });
          Linking.openURL('https://wa.me/' + comp.tlp + '?text=' + WATemplate);
          navigation.goBack()
        }
      })
    } else {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Silahkan pilih minimal 1 bahan !'
      });
    }


  }

  const renderItem = ({ item }) => (
    <View style={{
      alignItems: "center",
      justifyContent: 'center',
      // marginHorizontal: 10,
    }}>
      <Image source={{
        uri: item.image
      }} style={{
        borderRadius: 10,
        width: 300,
        height: 300,

      }} />

    </View>
  );


  const openModal = () => {
    console.log(activeIndex)
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Posisi akhir modal saat muncul
      duration: 300,
      useNativeDriver: true, // Gunakan true untuk performa lebih baik
    }).start();
  };

  const closeModal = () => {

    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').height, // Geser modal keluar layar
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };



  // Fungsi untuk menangani perubahan input quantity
  const handleQuantityChange = (text) => {
    // Validating input to only allow numeric values
    const validQuantity = text.replace(/[^0-9]/g, '');
    setQuantity(validQuantity);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>


        {/* Header */}
        <MyHeader onPress={() => navigation.goBack()} title="Back" />

        <ScrollView>

          <Carousel
            layout="slide"
            ref={carouselRef}
            layoutCardOffset={20}
            data={data}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={300} // Slide lebih kecil dari layar
            inactiveSlideScale={0.9} // Skala item yang tidak aktif (lebih kecil)
            inactiveSlideOpacity={0.5} // Opasitas item yang tidak aktif
            inactiveSlideShift={20} // Memberikan jarak antar item
            loop={true}
            onSnapToItem={(index) => setActiveIndex(index)}
            enableSnap={true}
          />


          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeIndex}
            dotContainerStyle={{
              padding: 0,
              marginHorizontal: 4,
            }}
            dotStyle={{
              width: 20,
              height: 8,
              borderRadius: 5,
              backgroundColor: '#555',

            }}
            inactiveDotStyle={{
              width: 10,
              height: 10,
              borderRadius: 10,
              backgroundColor: '#ccc'
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={0.5}
          />

          <View style={{
            paddingHorizontal: 10,
          }}>


            <Text style={{
              fontFamily: fonts.primary[600],
              fontSize: 24,
              color: colors.secondary,

            }}>{data[activeIndex].nama_bahan}</Text>

            <Text style={{
              fontFamily: fonts.primary[500],
              fontSize: 12,
              color: Color.blueGray[400],

            }}>Description</Text>

            <Text style={{
              fontFamily: fonts.primary[500],
              fontSize: 11,
              textAlign: 'justify',

              padding: 10,
              marginLeft: -10


            }}>{data[activeIndex].keterangan}</Text>






            <View>
              {/* Modal */}
              {modalVisible && (
                <Modal

                  transparent
                  animationType="none"
                  visible={modalVisible}
                  onRequestClose={closeModal}
                >
                  <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.overlayTouchable} onPress={closeModal} />
                    <Animated.View
                      style={[
                        styles.modalContent,
                        { transform: [{ translateY: slideAnim }] },
                      ]}
                    >

                      <View>

                        {/* IMAGE, Judul dan Harga per yard INI NANTI BISA BERUBAH KETIKA USER MEMILIH JENIS KAIN */}

                        <View style={{
                          padding: 10,
                          flexDirection: "row",

                        }}>
                          {/* VIEW IMAGE */}
                          <View>
                            <Image style={{
                              width: 100,
                              height: 100,
                            }} source={{
                              uri: data[activeIndex].image
                            }} />
                          </View>


                          {/* VIEW JUDUL DAN HARGA */}
                          <View style={{
                            flex: 1,
                            marginLeft: 10
                          }}>

                            {/* JUDUL KAIN */}
                            <Text style={{
                              fontFamily: fonts.primary[600],
                              fontSize: 20,
                              color: colors.secondary,

                            }}>{data[activeIndex].nama_bahan}</Text>

                            {/* HARGA */}
                            {/* <Text style={{

                              fontFamily: fonts.primary[300],
                              color: colors.danger,
                              fontSize: 10,
                              maxWidth: '100%',

                            }}>{data[activeIndex].keterangan}</Text> */}

                          </View>
                        </View>

                        {/* VIEW PILIH JENIS KAIN */}
                        <View style={{
                          padding: 0,

                        }}>
                          <Text style={{
                            fontFamily: fonts.primary[300],
                            fontSize: 12,
                            marginBottom: 10,
                          }}>Pilih jenis kain</Text>
                        </View>

                        {/* PILIHAN JENIS KAIN (DEFUALT ARMANI SLIK) */}
                        <View style={{
                          flexDirection: "row",
                          justifyContent: 'space-between',
                          padding: 0,

                        }}>

                          {data.map((fabric, index) => (
                            <TouchableWithoutFeedback key={fabric.nama_bahan} onPress={() => {
                              setActiveIndex(index);
                              carouselRef.current.snapToItem(index);
                            }
                            }>
                              <View style={{
                                borderRadius: 4,
                                padding: 10,
                                backgroundColor: Color.blueGray[200],
                                width: windowWidth / 3.5,
                                borderWidth: 2,
                                borderColor: index == activeIndex ? colors.primary : Color.blueGray[200]

                              }}>
                                <Text style={{ fontFamily: fonts.primary[300], fontSize: 8, textAlign: 'center' }}>
                                  {fabric.nama_bahan}
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          ))}

                        </View>

                        {/* VIEW QUANTITY */}
                        <View style={{
                          marginTop: 20,
                          padding: 0,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>

                          <View>
                            <Text style={{
                              fontFamily: fonts.primary[400],
                              fontSize: 12
                            }}>Quantity</Text>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: "center"
                          }}>

                            <TextInput keyboardType='number-pad' style={{
                              backgroundColor: Color.blueGray[200],
                              padding: 0,
                              paddingLeft: 5,
                              paddingRight: 5,
                              fontFamily: fonts.primary[400],
                              fontSize: 12,
                              width: 60,
                              height: 30,
                              marginRight: 5,
                              textAlign: 'center'


                            }} value={quantity}
                              onChangeText={handleQuantityChange}
                            />

                            <Text style={{
                              fontFamily: fonts.primary[300],
                              color: Color.blueGray[500]
                            }}>/Yard</Text>

                          </View>

                        </View>


                        {/* Subtutol View */}
                        <View>



                        </View>
                      </View>



                      <TouchableOpacity style={styles.closeButton} onPress={sendServer}>
                        <Text style={styles.closeButtonText}>Print</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                </Modal>
              )}
            </View>



          </View>



        </ScrollView>
        <TouchableWithoutFeedback onPress={openModal}>
          <View style={{
            padding: 10,
            backgroundColor: colors.secondary,
            width: 200,
            alignSelf: 'center',
            marginBottom: 10,
          }}>

            <Text style={{
              fontFamily: fonts.primary[600],
              color: colors.white,
              fontSize: 20,
              textAlign: 'center',

            }}>ORDER NOW</Text>

          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5, // Memberikan bayangan pada Android
    shadowColor: '#000', // Bayangan pada iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
