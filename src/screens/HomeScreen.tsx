import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProductItem from '../components/ProductItem';
import { deleteProduct, fetchProducts, updateProduct, insertShoppingList } from '../database/sqlite';
import { Product } from '../types';
import * as SQLite from 'expo-sqlite';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase('compras.db');
type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
  EditProduct: { product: Product };
  SavedLists: undefined;
};

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, quantity INTEGER NOT NULL, isCompleted INTEGER NOT NULL);',
        [],
        () => {},
        (_, error) => { return true; }
      );
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      setProducts([]);
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditProduct = (product: Product) => {
    navigation.navigate('EditProduct', { product });
  };

  const handleToggleCompleted = async (product: Product) => {
    await updateProduct(product.id, product.name, product.quantity, product.isCompleted ? 0 : 1);
    await loadProducts();
  };

  const handleSaveList = async () => {
    if (!listName.trim()) return;
    try {
      await insertShoppingList(listName.trim());
      setModalVisible(false);
      setListName('');
      alert('Lista salva com sucesso!');
      navigation.navigate('SavedLists'); // Navega para listas salvas
    } catch {
      alert('Erro ao salvar a lista.');
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductItem
      product={item}
      onEdit={() => handleEditProduct(item)}
      onDelete={async () => {
        await deleteProduct(item.id);
        await loadProducts();
      }}
      onToggleCompleted={async () => {
        await handleToggleCompleted(item);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0E2841" />
      <Text style={styles.title}>Lista de Compras</Text>
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="cart-outline" size={64} color="#fff" />
          <Text style={styles.emptyText}>Sua lista está vazia!</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
        <MaterialCommunityIcons name="plus-circle" size={56} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveBtn} onPress={() => setModalVisible(true)}>
        <MaterialCommunityIcons name="content-save" size={40} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Salvar Lista</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da lista"
              value={listName}
              onChangeText={setListName}
              placeholderTextColor="#888"
            />
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
              <Button title="Salvar" onPress={handleSaveList} color="#1976d2" />
            </View>
            <View style={{ marginTop: 12, width: '100%' }}>
              <Button
                title="Ver listas salvas"
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('SavedLists');
                }}
                color="#0E2841"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0E2841',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    alignSelf: 'center',
  },
  addBtn: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#1976d2',
    borderRadius: 50,
    padding: 4,
    elevation: 5,
  },
  saveBtn: {
    position: 'absolute',
    left: 24,
    bottom: 24,
    backgroundColor: '#1976d2',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(14,40,65,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1976d2',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#222',
    backgroundColor: '#f5f5f5',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    marginTop: 16,
  },
});

export default HomeScreen;