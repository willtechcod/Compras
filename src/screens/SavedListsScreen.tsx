import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { fetchShoppingLists, deleteShoppingList, toggleFavoriteShoppingList, insertShoppingList } from '../database/sqlite';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: { shoppingListId: number; shoppingListName: string };
  AddProduct: undefined;
  EditProduct: { product: any };
  SavedLists: undefined;
};

const SavedListsScreen = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    loadLists();
  }, []);

  const loadLists = async () => {
    const data = await fetchShoppingLists();
    setLists(data);
  };

  const handleDelete = async (id: number) => {
    await deleteShoppingList(id);
    await loadLists();
  };

  const handleFavorite = async (id: number, isFavorite: number) => {
    await toggleFavoriteShoppingList(id, isFavorite ? 0 : 1);
    await loadLists();
  };

  const handleOpenList = (list: any) => {
    navigation.navigate('Home', { shoppingListId: list.id, shoppingListName: list.name });
  };

  const handleSaveList = async () => {
    if (!listName.trim()) return;
    try {
      await insertShoppingList(listName.trim());
      setModalVisible(false);
      setListName('');
      alert('Lista salva com sucesso!');
      navigation.navigate('SavedLists');
    } catch {
      alert('Erro ao salvar a lista.');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleOpenList(item)}>
      <MaterialIcons name={item.isFavorite ? 'star' : 'star-border'} size={28} color="#FFD700" />
      <Text style={styles.listName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleFavorite(item.id, item.isFavorite)}>
        <MaterialIcons name="star" size={24} color="#FFD700" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <MaterialIcons name="delete" size={24} color="#d32f2f" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listas Salvas</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Lista</Text>
      </TouchableOpacity>
      <FlatList
        data={lists}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
            <Button title="Salvar" onPress={handleSaveList} color="#1976d2" />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="#888" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0E2841', padding: 20 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, padding: 12 },
  listName: { flex: 1, fontSize: 18, marginLeft: 10 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontSize: 18, marginLeft: 10 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SavedListsScreen;