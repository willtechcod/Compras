import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from '../types';
import { updateProduct } from '../database/sqlite';

const EditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params as { product: Product };

  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity.toString());

  const handleSave = async () => {
    const updatedProduct = { ...product, name, quantity: parseInt(quantity) };
    await updateProduct(product.id, name, parseInt(quantity), product.isCompleted ? 1 : 0);
    navigation.goBack();
  };

  useEffect(() => {
    setName(product.name);
    setQuantity(product.quantity.toString());
  }, [product]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholderTextColor='#fff'
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0E2841',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: '#1A3A5F',
  },
});

export default EditProductScreen;