import { AntDesign } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteList, getLists, toggleListCompletion } from '../db/database';

export default function Home() {
  const [lists, setLists] = useState([]);

  const loadLists = useCallback(() => {
    try {
      const allLists = getLists();
      setLists(allLists);
    } catch (err) {
      console.error('Erro ao carregar listas:', err);
    }
  }, []);

  useFocusEffect(loadLists);

  const handleDelete = (id) => {
    Alert.alert(
      "Excluir Item",
      "Tem certeza que deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            deleteList(id);
            loadLists();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleToggleCompletion = (id, isCompleted) => {
    toggleListCompletion(id, !isCompleted);
    loadLists();
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => router.push({ pathname: 'list-form', params: { listId: item.id } })}
      >
        <Text
          style={[
            styles.listName,
            item.is_completed ? styles.completedText : null,
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleToggleCompletion(item.id, item.is_completed)}>
          <AntDesign
            name={item.is_completed ? "check-circle" : "tags"}
            size={24}
            color={item.is_completed ? "#41EAD4" : "#ccc"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <AntDesign name="delete" size={24} color="#F71735" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={styles.emptyText}>
                Nenhum produto listado para seu carrinho.
              </Text>
              <AntDesign
                name="shopping-cart"
                size={60}
                color="#FDfffC"
                style={{ marginTop: 30 }}
              />
            </View>
          )}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("list-form")}
        >
          <AntDesign name="plus-circle" size={50} color="#41ead4" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 10, 
    backgroundColor: '#0E2841',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  content: { 
    flex: 1,
    marginTop: 40,
   },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: { 
    flex: 1, 
    marginRight: 10, 
    color: '#FDfffC'
  },
  listName: { 
    fontSize: 18,
    color: '#FDfffC',
  },
    completedText: {
    textDecorationLine: 'line-through',
    color: '#FDfffC',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    justifyContent: 'space-between',
    color: '#FDfffC',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: '#FDfffC',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#FDfffC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});