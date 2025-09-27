import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem
      product={item}
      onEdit={() => onEdit(item)}
      onDelete={async () => onDelete(item.id)} onToggleCompleted={function (): Promise<void> {
        throw new Error('Function not implemented.');
      } }    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default ProductList;