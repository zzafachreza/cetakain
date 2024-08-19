import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';

export default function MyRadio({ label, iconname, value, onPress, onPress2, label1 = "Ya", label2 = "Tidak" }) {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 0,
                    position: 'relative',
                }}>
                <Icon type="ionicon" name={iconname} color={colors.primary} size={MyDimensi / 4} />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        left: 10,
                        fontSize: MyDimensi / 4,
                    }}>
                    {label}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                paddingRight: windowWidth / 4, // Adjusted for wider spacing between options
            }}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={styles.radioButton}>
                            {value === label1 && (
                                <View style={styles.radioButtonSelected} />
                            )}
                        </View>
                        <Text style={styles.radioLabel}>
                            {label1}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={onPress2}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={styles.radioButton}>
                            {value === label2 && (
                                <View style={styles.radioButtonSelected} />
                            )}
                        </View>
                        <Text style={styles.radioLabel}>
                            {label2}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    radioButton: {
        width: MyDimensi / 4,
        height: MyDimensi / 4,
        backgroundColor: colors.white, // Set the background color to white
        borderRadius: 4, // Make it a square (remove circular border)
        borderColor: colors.border, // Border color of the square
        borderWidth: 2, // Thickness of the border
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: MyDimensi / 4,
        height: MyDimensi / 4,
        backgroundColor: colors.primary,
        borderRadius: 2, // Square shape for the selected state
    },
    radioLabel: {
        left: 15, // Increased spacing between the button and label
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 4,
    },
});
