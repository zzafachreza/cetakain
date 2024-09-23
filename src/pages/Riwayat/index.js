import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'

import { SafeAreaView } from 'react-native'
import { MyGap, MyHeader } from '../../components'
import { Color, colors, fonts } from '../../utils'

export default function Riwayat({navigation}) {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:colors.white}}>
        <MyHeader title="Riwayat Pemesanan"/>

        <ScrollView>
            <View style={{padding:10}}>
                <View style={{padding:10, backgroundColor:colors.white, borderWidth:1,
                borderRadius:20, borderColor:Color.blueGray[300]
                }}>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>

                {/* IMG, DARI PRINT APA, RESI */}
                    <View style={{flexDirection:"row", justifyContent:"center", alignContent:"center",}}>
                        {/* IMG */}
                       <View style={{alignItems:"center", top:5}}>
                       <Image style={{
                            width:44,
                            height:45
                        }} source={require('../../assets/upload_printhijab.png')}/>
                       </View>

                       {/* TEXT */}
                       <View style={{
                      marginLeft:10
                        
                       }}>
                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary,
                        fontSize:18
                        }}>Print Hijab</Text>

                        <Text style={{fontFamily:fonts.primary[800], color:Color.blueGray[400], fontSize:10}}>#HJB202409070001</Text>
                       </View>
                    </View>
                {/*  END IMG, DARI PRINT APA, RESI */}

                
                <View>
                    <View>
                        <Text style={{
                            fontFamily:fonts.primary[600],
                            color:Color.blueGray[400],
                            fontSize:10
                        }}>7 September 2024</Text>
                    </View>

                    <View style={{flexDirection:"row", justifyContent:'space-around', alignItems:"center"}}>
                        <View style={{}}>
                        <Text style={{fontFamily:fonts.primary[500], fontSize:10,
                        color:Color.blueGray[400]}}>Status :</Text>
                        </View>

                        <View style={{backgroundColor:colors.primary, padding:10,borderRadius:10, width:45, height:35, }}>
                                <Text style={{color:colors.white, fontFamily:fonts.primary[400], fontSize:10, textAlign:"center"}}>Print</Text>
                        </View>
                    </View>
                </View>

                </View>

                {/* STRIP */}
                <View style={{padding:1, backgroundColor:Color.blueGray[300], marginTop:10, borderRadius:10}}></View>


                            {/* INFOMASI BAWAH */}

                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:10, padding:10 }}>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Kain</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:20}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:30}}    > Voal</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Ukuran</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:4}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:15}}    > 110 x 110 cm</Text>
                        </View>
                    </View>


                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Laser</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:30}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:50}}    > Motif 2</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Quantity</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:10}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:30}}    > 12 Pcs</Text>
                        </View>
                    </View>
                    <View>
                       
                    </View>
                </View>

                </View>

                {/*  */}
                <MyGap jarak={20}/>

                <View style={{padding:10, backgroundColor:colors.white, borderWidth:1,
                borderRadius:20, borderColor:Color.blueGray[300]
                }}>

                <View style={{flexDirection:"row", justifyContent:"space-between"}}>

                {/* IMG, DARI PRINT APA, RESI */}
                    <View style={{flexDirection:"row", justifyContent:"center", alignContent:"center",}}>
                        {/* IMG */}
                       <View style={{alignItems:"center", top:5}}>
                       <Image style={{
                            width:44,
                            height:45
                        }} source={require('../../assets/history_jersey.png')}/>
                       </View>

                       {/* TEXT */}
                       <View style={{
                      marginLeft:10
                        
                       }}>
                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary,
                        fontSize:18
                        }}>Print Jersey</Text>

                        <Text style={{fontFamily:fonts.primary[800], color:Color.blueGray[400], fontSize:10}}>#HJB202409070001</Text>
                       </View>
                    </View>
                {/*  END IMG, DARI PRINT APA, RESI */}

                
                <View>
                    <View>
                        <Text style={{
                            fontFamily:fonts.primary[600],
                            color:Color.blueGray[400],
                            fontSize:10
                        }}>7 September 2024</Text>
                    </View>

                    <View style={{flexDirection:"row", justifyContent:'space-around', alignItems:"center"}}>
                        <View style={{}}>
                        <Text style={{fontFamily:fonts.primary[500], fontSize:10,
                        color:Color.blueGray[400]}}>Status :</Text>
                        </View>

                        <View style={{backgroundColor:colors.primary, padding:10,borderRadius:10, width:60, height:35, }}>
                                <Text style={{color:colors.white, fontFamily:fonts.primary[400], fontSize:10, textAlign:"center"}}>Selesai</Text>
                        </View>
                    </View>
                </View>

                </View>

                {/* STRIP */}
                <View style={{padding:1, backgroundColor:Color.blueGray[300], marginTop:10, borderRadius:10}}></View>


                            {/* INFOMASI BAWAH */}

                <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:10, padding:10 }}>
                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Bahan</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:20}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:30}}    > Jersey</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Pola</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:33}}    > :</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:43}}    > O - Neck</Text>
                        </View>
                    </View>


                    <View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary}}>Size</Text>
                            <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:colors.primary, left:10}}    > :</Text>

                            <View style={{left:20}}>
                                <View style={{flexDirection:"row",}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>S</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12, left:10}}> : 4 </Text>
                                    </View>

                                    
                                    <View style={{flexDirection:"row", left:30}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>XL</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12, left:13}}> : 4 </Text>
                                    </View>
                                </View>

                                <View style={{flexDirection:"row",}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>M</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12, left:6}}> : 6 </Text>
                                    </View>

                                    
                                    <View style={{flexDirection:"row", left:25}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>XXL</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12, left:7}}> : 2 </Text>
                                    </View>
                                </View>

                                <View style={{flexDirection:"row",}}>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>L</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12, left:12}}> : 6 </Text>
                                    </View>

                                    
                                    <View style={{flexDirection:"row", left:30}}>
                                        <Text style={{fontFamily:fonts.primary[600], color:colors.primary, fontSize:12, }}>•</Text>
                                        <Text style={{fontFamily:fonts.primary[500], fontSize:12, color:Color.blueGray[400]}}>XXXL</Text>
                                        <Text style={{fontFamily:fonts.primary[500], color:Color.blueGray[400], fontSize:12}}> : 2 </Text>
                                    </View>
                                </View>
                            </View>
                            
                        </View>


                    </View>
                    <View>
                       
                    </View>
                </View>

                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}