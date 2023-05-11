import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gap, Header} from '../../components';
import {ref as r, onValue, off, getDatabase, child, get, update, set} from 'firebase/database';

const ListItems = ({navigation, route}) => {
  const uid = route.params.uid;
  const db = getDatabase();
  const [barangList, setBarangList] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  console.log(activeItem);

  const fetchBarangData = uid => {
    const barangRef = r(db, `Barang/${uid}`);
    const onValueChange = onValue(
      barangRef,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          const list = Object.keys(data).map(key => ({
            namaBarang: key,
            satuan: data[key].satuan,
            qty: data[key].qty,
            harga: data[key].harga,
          }));
          setBarangList(list);
        }
      },
      error => {
        console.error('Error fetching barang data:', error);
      },
    );

    // Cleanup function to remove the listener when the component is unmounted
    return () => off(barangRef, 'value', onValueChange);
  };

  useEffect(() => {
    fetchBarangData(uid);
  }, [uid]);

  const toggleButtons = itemIdentifier => {
    setActiveItem(itemIdentifier);
  };
  const deleteItem = (uid, itemName) => {
    const itemRef = child(r(db), `Barang/${uid}/${itemName}`);
    set(itemRef, null)
      .then(() => {
        console.log(`${itemName} deleted successfully`);
        setBarangList(prevState =>
          prevState.filter(item => item.namaBarang !== itemName),
        );
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const goEdit = barang => {
    navigation.navigate('EditItems', {selectedBarang: barang, uid: uid});
  };


  return (
    <View style={styles.container}>
      <Header
        onBack={true}
        onPress={() => navigation.goBack()}
        textInput="List Items"
      />
      <View style={styles.contentWrapper}>
        {barangList.length > 0 ? (
          barangList.map(barang => (
            <View
              key={barang.namaBarang}
              style={[
                styles.barangBox,
                activeItem === barang.namaBarang && styles.activeBarangBox,
              ]}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => toggleButtons(barang.namaBarang)}>
                <Text style={styles.editButtonText}>...</Text>
              </TouchableOpacity>
              <Text style={styles.namaBarang}>{barang.namaBarang}</Text>
              <Text style={styles.detailText}>
                Satuan: {barang.satuan} | Qty: {barang.qty} | Harga:{' '}
                {barang.harga}
              </Text>
              {activeItem === barang.namaBarang && (
                <>
                  <TouchableOpacity
                    style={styles.editItemButton}
                    onPress={() => goEdit(barang)}>
                    <Text style={styles.editItemButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteItemButton}
                    onPress={() => deleteItem(uid, barang.namaBarang)}>
                    <Text style={styles.deleteItemButtonText}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noItemsWrapper}>
            <Text style={styles.noItemsText}>No item exists</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ListItems;

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
  barangBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  namaBarang: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    color: 'black',
    fontSize: 12,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    bottom: 10
  },
  editItemButton: {
    position: 'absolute',
    top: 10,
    right: 80,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editItemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  deleteItemButton: {
    position: 'absolute',
    top: 10,
    right: 5,
    backgroundColor: '#F44336',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteItemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  noItemsWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  noItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
