import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header, Gap, Button} from '../../components';
import {set, ref as r, update, get} from 'firebase/database';
import {db} from '../../config/firebase';

const AddItems = ({navigation, route}) => {
  const [Barang, setBarang] = useState('');
  const [Satuan, setSatuan] = useState('');
  const [Qty, setQty] = useState('');
  const [Harga, setHarga] = useState('');
  const uid = route.params.uid;

  const tambahBarang = async () => {
    try {
      const barangRef = r(db, `Barang/${uid}`);
      const snapshot = await get(barangRef);
      if (snapshot.exists()) {
        const barangList = Object.keys(snapshot.val());
        if (barangList.includes(Barang)) {
          alert(`${Barang} already exists!`);
          return;
        }
      }
      await update(barangRef, {
        [Barang]: {
          satuan: Satuan,
          qty: Qty,
          harga: Harga,
        },
      });
      alert(`${Barang} has been added!`);
      navigation.navigate('ListItems', {uid: uid});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onBack={true}
        onPress={() => navigation.goBack()}
        textInput="Add Items"
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Nama Barang</Text>
        <TextInput
          style={styles.textInput}
          placeholderTextColor="#A39D9D"
          placeholder="Nama Barang"
          value={Barang}
          onChangeText={text => setBarang(text)}
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
        <View style={styles.tambahBarang}>
          <Button width={140} height={60} color="#889FF1" title="TAMBAH" fontSize={20} onPress={tambahBarang}/>
        </View>
      </View>
    </View>
  );
};

export default AddItems

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
  tambahBarang: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});