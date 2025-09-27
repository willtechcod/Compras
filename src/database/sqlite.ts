import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('compras.db');

// Inicializa a tabela 'products'
export const init = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          isCompleted INTEGER NOT NULL
        );`,
        [],
        () => resolve(),
        (_, error) => {
          console.error('Erro ao criar tabela:', error);
          reject(error);
          return true;
        }
      );

      // Cria a tabela 'shopping_lists' se não existir
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS shopping_lists (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          isFavorite INTEGER NOT NULL DEFAULT 0
        );`,
        [],
        () => {},
        (_, error) => { console.error(error); return true; }
      );

      // Relacione produtos à lista (adicione coluna shopping_list_id na tabela products)
      tx.executeSql(
        `ALTER TABLE products ADD COLUMN shopping_list_id INTEGER;`,
        [],
        () => {},
        (_, error) => false // Ignore erro se já existir
      );
    });
  });
};

// Insere um produto
export const insertProduct = async (name: string, quantity: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO products (name, quantity, isCompleted) VALUES (?, ?, ?);',
        [name, quantity, 0],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Erro ao inserir produto:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

// Busca todos os produtos
export const fetchProducts = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM products;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => {
          console.error('Erro ao buscar produtos:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

// Atualiza um produto
export const updateProduct = async (
  id: number,
  name: string,
  quantity: number,
  isCompleted: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE products SET name = ?, quantity = ?, isCompleted = ? WHERE id = ?;',
        [name, quantity, isCompleted, id],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Erro ao atualizar produto:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

// Exclui um produto
export const deleteProduct = async (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM products WHERE id = ?;',
        [id],
        (_, result) => resolve(result),
        (_, error) => {
          console.error('Erro ao excluir produto:', error);
          reject(error);
          return true;
        }
      );
    });
  });
};

export const insertShoppingList = async (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO shopping_lists (name) VALUES (?);',
        [name],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return true; }
      );
    });
  });
};

export const fetchShoppingLists = async (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM shopping_lists;',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => { reject(error); return true; }
      );
    });
  });
};

export const updateShoppingList = async (id: number, name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE shopping_lists SET name = ? WHERE id = ?;',
        [name, id],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return true; }
      );
    });
  });
};

export const deleteShoppingList = async (id: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM shopping_lists WHERE id = ?;',
        [id],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return true; }
      );
    });
  });
};

export const toggleFavoriteShoppingList = async (id: number, isFavorite: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE shopping_lists SET isFavorite = ? WHERE id = ?;',
        [isFavorite, id],
        (_, result) => resolve(result),
        (_, error) => { reject(error); return true; }
      );
    });
  });
};