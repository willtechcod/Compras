import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getLists, saveList, updateList } from '../db/database';

export default function ListFormScreen() {
  const { listId } = useLocalSearchParams();
  const [listName, setListName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (listId) {
      setIsEditing(true);
      const allLists = getLists();
      const listToEdit = allLists.find(l => l.id.toString() === listId);
      if (listToEdit) {
        setListName(listToEdit.name);
      }
    }
  }, [listId]);

  const handleSave = () => {
    if (!listName.trim()) {
      Alert.alert("Campo Vazio", "Por favor, digite um nome de produto.");
      return;
    }

    if (isEditing) {
      const allLists = getLists();
      const currentList = allLists.find((l) => l.id.toString() === listId);
      if (currentList) {
        updateList(listId, listName, currentList.is_completed);
      }
    } else {
      saveList(listName);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Crie sua Lista:</Text>
        <TextInput
          style={styles.input}
          value={listName}
          onChangeText={setListName}
          placeholder="Digite o produto da lista"
          placeholderTextColor={"#1d2e3e"}
        />
        <Button
          title={isEditing ? "Atualizar Lista" : "Criar Lista"}
          onPress={handleSave}
        />
      </View>
      <View style={styles.contentButton}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("home")}
        >
          <AntDesign name="arrow-left" size={50} color="#41ead4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0E2841',
  },
  content: { 
    flex: 1,
    marginHorizontal: 20,
    marginTop: 80,
     },
  emptyText: {
    fontSize: 18,
    color: '#FDfffC',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FDfffC',
  },
  input: {
    borderWidth: 1,
    color: '#1d2e3e',
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FDfffC',
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  contentButton: { 
    flex: 1,
   marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});