import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyPickerSecond({
  label,
  iconname,
  onValueChange,
  value,
  data = [],    // Data with images and labels
  width = '100%',
  height = 50,
  colorIcon = colors.primary,
}) {
// Instead of saving just the value, save the entire selected item
const [selectedItem, setSelectedItem] = useState(data.length > 0 ? data[0] : null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item) => {
    setSelectedItem(item);
    onValueChange(item.value);
    setModalVisible(false);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && (
        <Text style={{
          ...fonts.subheadline3,
          color: colors.primary,
          marginBottom: 8,
          textAlign: 'center',
        }}>
          {label}
        </Text>
      )}

      {/* Picker Container */}
      <TouchableOpacity
        style={[styles.pickerContainer, { width, height }]}
        onPress={() => setModalVisible(true)}
      >
        {iconname && (
          <View style={styles.iconContainer}>
            <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
          </View>
        )}

       <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start'
       }}>
         {/* Display Selected Value */}
         <Text style={styles.selectedValueText}>{selectedItem?.label}</Text>
         {selectedItem?.image && <Image source={selectedItem.image} style={styles.selectedImage} />}

       </View>
        <View style={styles.dropdownIcon}>
          <Icon type='ionicon' name='caret-down-outline' color={colors.primary} size={24} />
        </View>
      </TouchableOpacity>

      {/* Modal for Dropdown */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        {/* Background Touchable to close modal when clicked outside */}
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalContent}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.itemContainer} onPress={() => handleSelect(item)}>
                    <Text style={styles.itemText}>{item.label}</Text>
                    {item.image && <Image source={item.image} style={styles.itemImage} />}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Color.blueGray[300],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  selectedValueText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 5,
    fontSize: 12,
    color: colors.black,
  },
  dropdownIcon: {
    position: 'absolute',
    right: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
  },
  modalContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  itemImage: {
    width: 170,
    height: 41,
    marginRight: 10,
    left: 10,
    marginTop: 10,
  },

  selectedImage: {
    height:29,
    width:120,
    left:-30,
    top:5
  },

  itemText: {
    fontSize: 16,
    color: colors.black,
  },
});
