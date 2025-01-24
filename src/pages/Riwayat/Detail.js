import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { StatusBar } from 'react-native'
import moment from 'moment';
import { MyButton, MyGap, MyHeader, MyHeaderPoint, MyIcon, MyInputLogin, MyLoading } from '../../components';
import axios from 'axios';
import { apiURL, webURL } from '../../utils/localStorage';
import RenderHtml from 'react-native-render-html';
import Share from 'react-native-share';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';


export default function Detail({ navigation, route }) {
    const item = route.params;
    let myUrl = webURL + item.modul + '/detail/' + item.id;
    console.log(myUrl);
    const webRef = useRef();
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            webRef.reload()
        }
    }, [isFocused])
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <View style={{
                padding: 10
            }}>
                <MyHeader onPress={() => navigation.goBack()} title={item.jenis + ' - ' + item.nomor_pesanan} />
            </View>
            <View style={{
                flex: 1, padding: 20
            }}>
                <WebView ref={(ref) => webRef.current = ref} javaScriptEnabledAndroid={true}
                    source={{ uri: myUrl }} style={{ flex: 1 }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})