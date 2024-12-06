import { View, Text, SafeAreaView, ScrollView, Image, TouchableWithoutFeedback, ImageBackground, StyleSheet, Alert, Linking, FlatList, Dimensions, Animated, TouchableOpacity} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Color, colors, fonts, getDataByTable } from '../../utils';
import { MyButton, MyGap, MyHeader, MyInput, MyRadio } from '../../components';
import MyMenu from '../../components/MyMenu';
import MyCarousel from '../../components/MyCarouser';
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';


const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const dataCorosel = [
  {
    image: require('../../assets/jersey1.png'),
    title: 'GARUDA SUPPORT',
    description: `Garuda Support`,


  },

  {
    image: require('../../assets/jersey2.png'), // Ganti dengan lokasi gambar Anda
    title: 'VENEZIA JERSEY',
    description: `Venezia`,
  
  },

  {
    image: require('../../assets/jersey_kain_sendiri.png'), // Ganti dengan lokasi gambar Anda
    title: 'KAIN SENDIRI',
    description: `Venezia`,
   
  }
]



export default function PrintJersey({ navigation }) {

  const [selectedFabric, setSelectedFabric] = useState({
    name: 'Garuda Support', // Default kain
    kain: ['Drifit Milano','Drifit Serena'],
    price: 'Rp.55.000/yard',
    image: require('../../assets/jersey1.png'), // Default image
  });
  

  const fabrics = [
    {
      name: 'Garuda Support',
      kain: ['Drifit Milano','Drifit Serena'],
      price: 'Rp.55.000/yard',
      image: require('../../assets/jersey1.png'),
    },
    {
      name: 'Venezia',
      kain: ['Drifit Milano','Drifit Serena'],
      price: 'Rp.45.000/yard',
      image: require('../../assets/jersey2.png'), // Ganti dengan path gambar ceruty
    },
    {
      name: 'Kain Sendiri',
      price: 'Rp.60.000/yard',
      image: require('../../assets/jersey_kain_sendiri.png'), // Ganti dengan path gambar sifon
      kain: ['Drifit Milano','Drifit Serena'],
    },
  ];

    // State untuk menampilkan atau menyembunyikan detail harga
    const [showDetails, setShowDetails] = useState(false);
    const [selectedKain, setSelectedKain] = useState(null); // Tidak ada ukuran default yang aktif
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const [currentPage, setCurrentPage] = useState(1); // State untuk mengelola halaman
  const [quantity, setQuantity] = useState('10'); // Track user input for quantity
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // State untuk slide aktif
  const [activeIndex2, setActiveIndex2] = useState(0); // State untuk slide aktif kedua
  const [activeIndex3, setActiveIndex4] = useState(0); // State untuk slide aktif ketiga
  const carouselRef = useRef(null); // Ref untuk mengakses metode carousel
  const navigateTo = (page) => {
    setCurrentPage(page);
  };
  // Function to handle radio selection
  const handleRadioSelect = (kain) => {
    setSelectedKain(kain);
  };

  const [gambar, setGambar] = useState([{ "file_gambar": "datafoto/77aa75f161f68d878234f06023f722cc1f2801d8.png", "id_gambar": "2", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Banner" }, { "file_gambar": "datafoto/dc5e27da22554899592c344074266072a2f2b2bc.png", "id_gambar": "3", "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Print" }, {
    "file_gambar": "datafoto/b1cc5dba39d74acfb780c3772e7a9e1a6774fc72.png", "id_gambar": "4",
    "image": "https://zavalabs.com/nogambar.jpg", "menu": "Kain Roll", "posisi": "Sample"
  }])
  const __getGambar = () => {
    axios.post(apiURL + 'gambar_detail', {
      menu: 'Kain Roll'
    }).then(res => {
      setGambar(res.data)
    })
  }

  useEffect(() => {
    __getData();
    __getGambar();
  }, [])

  const [data, setData] = useState([]);
  const __getData = () => {
    getDataByTable('bahanroll').then(res => {
      console.log('bahan', res.data);
      setData(res.data);
    })
  }

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
  const renderItem = ({ item }) => (
    <View style={{
      alignItems:"center",
      justifyContent:'center',

    }}>
      <Image source={item.image} style={{
        width:320,
        height:320,

      }} />
      
    </View>
  );

  // Fungsi untuk menavigasi ke gambar berdasarkan indeks
  const navigateToSlide = (index) => {
    if (carouselRef.current) {
      carouselRef.current.snapToItem(index); // Menavigasi ke item berdasarkan indeks
    }
  };

  const openModal = () => {
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

  const handleFabricSelection = (fabric) => {
    setSelectedFabric(fabric); // Update kain yang dipilih
  };
  
 // Menghitung subtotal berdasarkan quantity
// Function to calculate subtotal based on price per yard and quantity
  // Function to calculate subtotal based on price per yard and quantity
  const calculateSubtotal = (pricePerMeter, quantity) => {
    const price = parseInt(pricePerMeter.replace('Rp.', '').replace('.', '').trim()); // Remove currency formatting
    if (isNaN(price) || quantity <= 0) return 0; // Return 0 if quantity is invalid
    return price * quantity;
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

      <View style={{
        padding:10,


      }}>

      <MyHeader onPress={() => navigation.goBack()} title="Back"/>

      </View>


      <View style={{
        marginLeft:0
      }}>
      <Carousel
      ref={carouselRef}
        data={dataCorosel}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8} // Slide lebih kecil dari layar
        inactiveSlideScale={0.9} // Skala item yang tidak aktif (lebih kecil)
        inactiveSlideOpacity={0.6} // Opasitas item yang tidak aktif
        inactiveSlideShift={20} // Memberikan jarak antar item
        loop={false}
        onSnapToItem={(index) => setActiveIndex(index)}
        enableSnap={true}
      />
       <Pagination
        dotsLength={dataCorosel.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          width:10,
         
          borderRadius:5,
          backgroundColor:'#555',

        }}
        inactiveDotStyle={{
          width:10,
          borderRadius:5,
          backgroundColor:'#ccc'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />

      <View style={{
        padding:10,
        marginLeft:20,
        marginTop: -25

      }}>

     
      <Text style={{
        fontFamily:fonts.primary[600],
        fontSize:24,
        color:colors.secondary,

      }}>{dataCorosel[activeIndex].title}</Text>

      <Text style={{
        fontFamily:fonts.primary[500],
        fontSize:12,
        color: Color.blueGray[400],

      }}>Description</Text>

      <Text style={{
        fontFamily:fonts.primary[500],
        fontSize:11,
        textAlign:'justify',
   
        padding:10,
        marginLeft:-10


      }}>{dataCorosel[activeIndex].description}</Text>


        <Text style={{
        fontFamily:fonts.primary[500],
        fontSize:11,
        textAlign:'justify',
        padding:10,
        marginLeft:-10


      }}>{dataCorosel[activeIndex].width}</Text>

      <Text style={{
        fontFamily:fonts.primary[500],
        fontSize:11,
        textAlign:'justify',
        padding:10,
        marginLeft:-10,
        marginTop: -15


      }}>{dataCorosel[activeIndex].weight}</Text>
      

      <View style={{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:50
        
      }}>
        <TouchableWithoutFeedback onPress={openModal}>
          <View style={{
            padding:10,
            backgroundColor:colors.secondary,
            width:200,

          }}>

          <Text style={{
            fontFamily:fonts.primary[600],
            color:colors.white,
            fontSize:20,
            textAlign:'center',

          }}>PRINT</Text>

          </View>
        </TouchableWithoutFeedback>

       

      </View>

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
                padding:10,
                flexDirection:"row",
                
              }}>
              {/* VIEW IMAGE */}
                  <View>
                    <Image style={{
                      width:100,
                      height:100,
                    }} source={selectedFabric.image}/>
                  </View>

                  
                  {/* VIEW JUDUL DAN HARGA */}
                  <View style={{
                  marginLeft:30
                  }}>

                  {/* JUDUL KAIN */}
                    <Text style={{
                      fontFamily:fonts.primary[600],
                      fontSize:20,
                      color:colors.secondary,

                    }}>{selectedFabric.name}</Text>

                  </View>
              </View>

                {/* VIEW PILIH JENIS KAIN */}
                <View  style={{
                  padding:10,

                }}>
                    <Text style={{
                      fontFamily:fonts.primary[300],
                      fontSize:12,
                    }}>Pilih Design</Text>
                  </View>

                  {/* PILIHAN JENIS DESIGN (DEFUALT GARUDA SUPPORT) */}
                  <View style={{
                    flexDirection:"row",
                    justifyContent:'space-between',
                    padding:10,
                    marginTop: -10

                  }}>

{fabrics.map((fabric) => (
    <TouchableWithoutFeedback key={fabric.name} onPress={() => handleFabricSelection(fabric)}>
      <View style={{ 
        padding: 10, 
        backgroundColor:
         Color.blueGray[200],
         borderWidth: selectedFabric?.name === fabric.name ? 1 : 0, // Border aktif saat dipilih
         borderColor: selectedFabric?.name === fabric.name ? colors.danger : 'transparent', // Warna border saat dipilih
          width: 98,
           }}>
        <Text style={{ fontFamily: fonts.primary[300], fontSize: 9, textAlign: 'center' }}>
          {fabric.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  ))}
               
                  </View>


                  <View>
                    
               {selectedFabric.kain && selectedFabric.kain.length > 0 && (
  <View style={{ padding: 10, marginTop: -10 }}>
    <Text style={{
      fontFamily: fonts.primary[300],
      fontSize: 12,
    }}>Pilih Jenis Kain</Text>

    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap', // Agar elemen bisa wrap jika penuh
      justifyContent: "flex-start"
    }}>
      {selectedFabric.kain.map((kain, index) => (
        <TouchableWithoutFeedback 
          key={index} 
          onPress={() => setSelectedKain(kain)} // Set ukuran yang dipilih
        >
          <View style={{
            padding: 10,
            backgroundColor: Color.blueGray[200],
            borderWidth: selectedKain === kain ? 1 : 0, // Border aktif jika ukuran ini dipilih
            borderColor: selectedKain === kain ? colors.danger : 'transparent', // Warna border jika aktif
            width: 98,
            marginRight: 10,
            marginBottom: 10,
          }}>
            <Text style={{
              fontFamily: fonts.primary[300],
              fontSize: 9,
              textAlign: 'center'
            }}>
              {kain}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  </View>
)}

                  </View>

                  {/* VIEW QUANTITY */}
                  <View style={{
                    padding:10,
                 
                  }}>

                    <View>
                      <Text style={{
                        fontFamily:fonts.primary[400],
                        fontSize:12
                      }}>Quantity</Text>
                    </View>

                    <View style={{
                      flexDirection:'row',
                      justifyContent:'space-around',
                      alignItems:"center",
                      flexWrap:"wrap"
                    }}>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center'
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>S</Text>
                  </View>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center'
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>L</Text>
                  </View>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center'
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>XXL</Text>
                  </View>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginLeft:4,
                  marginTop:10
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center',
                      
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>M</Text>
                  </View>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    marginLeft:8
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center'
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>XL</Text>
                  </View>

                  <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    left:3
                  }}>
                  <TextInput style={{
                      backgroundColor:Color.blueGray[200],
                      padding:10,
                      paddingLeft:5,
                      paddingRight:5,
                      fontFamily:fonts.primary[400],
                      fontSize:12,
                      width:60,
                      height:40,
                      marginRight:5,
                      textAlign:'center'
                      

                    }} value={quantity} 
                      onChangeText={handleQuantityChange}
                    />

                    <Text style={{
                      fontFamily:fonts.primary[300],
                      color:Color.blueGray[500 ]
                    }}>XXXL</Text>
                  </View>

                    </View>

                  </View>


                  {/* Subtutol View */}
                  <View>

                  

           {/* Detail Harga (hanya muncul jika showDetails true) */}
          {selectedFabric && (
  <View style={{ padding: 10 }}>
    
    {/* Price Details (only visible if showDetails is true) */}
    {showDetails && (
      <View style={{ paddingLeft: 0, backgroundColor:'red'}}>
        {selectedFabric?.name === 'Ceruty Babydoll' && (
          <>
           <View style={{
            flexDirection:'row',
            justifyContent: "space-between"
           }}>
            <View>
             <Text style={{ fontSize: 12, fontFamily:fonts.primary[400] }}>Kain Armanisilk 10 Meter</Text>
            <Text style={{ fontSize: 12, fontFamily:fonts.primary[400] }}>Print 10 Meter</Text>
            </View>

            <View style={{marginRight:50}}>
             <Text style={{ fontSize: 12, fontFamily:fonts.primary[400] }}>Rp.450.000</Text>
            <Text style={{ fontSize: 12, fontFamily:fonts.primary[400] }}>Rp.250.000</Text>
            </View>
           </View>
          </>
        )}
        {selectedFabric?.name === 'Kain Sendiri' && (
          <>
            <Text style={{ fontSize: 14 }}>Kain Sendiri 10 Meter: Rp.450.000</Text>
            <Text style={{ fontSize: 14 }}>Print 10 Meter: Rp.250.000</Text>
          </>
        )}
      </View>
    )}

    {/* Subtotal and Toggle Button */}

    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center"
    }}>
    <Text style={{ fontSize: 15, fontFamily:fonts.primary[400], }}>
      Subtotal
    </Text>

    <View style={{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:"center",
   
      width:105,
    }}>
    <Text style={{fontFamily:fonts.primary[400], fontSize:15,}}>Rp.{calculateSubtotal(selectedFabric.price, parseInt(quantity)).toLocaleString()}</Text>
 <TouchableOpacity style={{marginTop:-3}} onPress={() => setShowDetails(!showDetails)}>
      <Icon type='ionicon' name={showDetails ? 'caret-up-outline' : 'caret-down-outline'} size={20} color={Color.blueGray[400]}/>
    </TouchableOpacity>
    </View>

    
    </View>
  </View>
)}
  </View>
            </View>

              
            
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Print</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      )}
      </View>



      </View>

    
      </View>
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
