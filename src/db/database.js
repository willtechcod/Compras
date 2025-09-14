import * as SQLite from 'expo-sqlite';

// Usa openDatabaseSync para obter o objeto de banco de dados síncrono
const db = SQLite.openDatabaseSync("../db/shoppingList.db");

export const initDb = () => {
  try {
    console.log('Inicializando o banco de dados...');
    // A chamada execSync é síncrona e não precisa de `tx` ou Promises
    db.execSync(`
      CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        is_completed INTEGER DEFAULT 0
      );
    `);
    console.log('Tabela "lists" criada com sucesso.');
  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err);
  }
};

export const getLists = () => {
  try {
    // getAllSync retorna todos os resultados de uma vez
    const result = db.getAllSync('SELECT * FROM lists;');
    return result;
  } catch (err) {
    console.error('Erro ao buscar listas:', err);
    return [];
  }
};

export const saveList = (name) => {
  try {
    // runSync executa uma instrução e retorna o resultado da inserção
    const result = db.runSync('INSERT INTO lists (name) VALUES (?)', [name]);
    return result.lastInsertRowId;
  } catch (err) {
    console.error('Erro ao salvar lista:', err);
    return null;
  }
};

export const updateList = (id, name, is_completed) => {
  try {
    db.runSync('UPDATE lists SET name = ?, is_completed = ? WHERE id = ?', [name, is_completed ? 1 : 0, id]);
  } catch (err) {
    console.error('Erro ao atualizar lista:', err);
  }
};

export const toggleListCompletion = (id, is_completed) => {
  try {
    db.runSync('UPDATE lists SET is_completed = ? WHERE id = ?', [is_completed ? 1 : 0, id]);
  } catch (err) {
    console.error('Erro ao alternar status de conclusão:', err);
  }
};

export const deleteList = (id) => {
  try {
    db.runSync('DELETE FROM lists WHERE id = ?', [id]);
  } catch (err) {
    console.error('Erro ao deletar lista:', err);
  }
};