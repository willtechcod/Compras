// filepath: c:\Users\willt\OneDrive\Área de Trabalho\PROJETOS\React-Native\Compras\src\components\ProductItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

export interface ProductItemProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => Promise<void>;
  onToggleCompleted: () => Promise<void>;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onEdit, onDelete, onToggleCompleted }) => {
  return (
    <View style={[styles.item, product.isCompleted ? styles.completed : null]}>
      <TouchableOpacity onPress={onToggleCompleted} style={styles.check}>
        <MaterialIcons
          name={product.isCompleted ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={product.isCompleted ? '#4caf50' : '#aaa'}
        />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={[styles.name, product.isCompleted && styles.textCompleted]}>{product.name}</Text>
        <Text style={styles.quantity}>Qtd: {product.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <MaterialIcons name="edit" size={24} color="#1976d2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <MaterialIcons name="delete" size={24} color="#d32f2f" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
  },
  completed: {
    backgroundColor: '#e0f2f1',
  },
  check: {
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 10,
  },
});

export default ProductItem;