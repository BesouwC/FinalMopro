import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Gap, Button} from '../../components';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';

const EditItems = ({navigation, route}) => {
  const {selectedBarang} = route.params;
  const [Barang, setBarang] = useState(selectedBarang.namaBarang);
  const [Satuan, setSatuan] = useState(selectedBarang.satuan);
  const [Qty, setQty] = useState(selectedBarang.qty.toString());
  const [Harga, setHarga] = useState(selectedBarang.harga.toString());

  const uid = route.params.uid;
  const db = getDatabase();

  const updateItem = () => {
    const itemRef = child(r(db), `Barang/${uid}/${Barang}`);
    update(itemRef, {
      satuan: Satuan,
      qty: parseInt(Qty, 10),
      harga: parseInt(Harga, 10),
    })
      .then(() => {
        console.log('Item updated successfully');
        navigation.goBack();
      })
      .catch(error => {
        console.error('Error updating item:', error);
      });
  };


  return (
    <View style={styles.container}>
      <Header
        onBack={true}
        onPress={() => navigation.goBack()}
        textInput="Edit Items"
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Nama Barang</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Nama Barang"
          value={Barang}
          onChangeText={text => setBarang(text)}
          editable={false}
        />
        <Gap height={16} />
        <Text style={styles.title}>Satuan</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Satuan"
          value={Satuan}
          onChangeText={text => setSatuan(text)}
        />
        <Gap height={16} />
        <Text style={styles.title}>Qty</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Qty"
          value={Qty}
          onChangeText={text => setQty(text)}
        />
        <Gap height={16} />
        <Text style={styles.title}>Harga</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Harga"
          value={Harga}
          onChangeText={text => setHarga(text)}
        />
        <Gap height={16} />
        <View style={styles.editBarang}>
          <Button
            width={140}
            height={60}
            color="#889FF1"
            title="SIMPAN"
            fontSize={20}
            onPress={updateItem}
          />
        </View>
      </View>
    </View>
  );
};

export default EditItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2CECE',
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: '#212A3E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 30,
    paddingTop: 26,
    marginTop: 24,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  title: {
    fontSize: 15,
    marginBottom: 6,
    color: 'white',
  },
  editBarang: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
