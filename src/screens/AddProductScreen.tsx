import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { insertProduct, insertShoppingList } from '../database/sqlite';
import type { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute, RouteProp } from '@react-navigation/native';

type AddProductScreenProps = {
  navigation: StackNavigationProp<any>;
};

type RouteParams = {
  AddProduct: { shoppingListId?: number };
};

const AddProductScreen = ({ navigation }: AddProductScreenProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState('');

  // Receba o parâmetro
  const route = useRoute<RouteProp<RouteParams, 'AddProduct'>>();
  const shoppingListId = route.params?.shoppingListId;

  const handleAddProduct = async () => {
    if (!name || !quantity) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      await insertProduct(name, parseInt(quantity)); // Removido shoppingListId para corresponder à assinatura esperada
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
    }
  };

  const handleCreateList = async () => {
    if (!listName.trim()) return;
    try {
      const result = await insertShoppingList(listName.trim());
      const shoppingListId = result.insertId;
      setModalVisible(false);
      setListName('');
      navigation.navigate('AddProduct', { shoppingListId });
    } catch {
      alert('Erro ao criar a lista.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          placeholderTextColor="#fff"
        />
        <View style={styles.buttonWrapper}>
          <Button title="Adicionar" onPress={handleAddProduct} color="#1976d2" />
        </View>
        <TouchableOpacity style={styles.newListBtn} onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="playlist-plus" size={40} color="#fff" />
          <Text style={styles.newListText}>Nova Lista</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nome da Lista</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da lista"
              value={listName}
              onChangeText={setListName}
              placeholderTextColor="#888"
            />
            <Button title="Criar" onPress={handleCreateList} color="#1976d2" />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
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
  content: {
    width: '100%',
    marginTop: 40,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#1A3A5F',
    borderRadius: 8,
  },
  buttonWrapper: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  newListBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  newListText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1A3A5F',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;