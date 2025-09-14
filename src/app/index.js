import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { initDb } from '../db/database';
export default function Preload() {
    const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    // Chama a função de inicialização do banco de dados
    initDb();
    setDbInitialized(true);
  }, []); // O array vazio garante que a função só será executada uma vez

  // Enquanto o banco não for inicializado, você pode mostrar uma tela de carregamento
  if (!dbInitialized) {
    return (
      <View>
        <ActivityIndicator size="large" color="#FDfffC" />
      </View>
    );
  }

  return (
   <View style={styles.container}>
    <View style={styles.content}>
        <Text style={styles.text}>
            Agora Você Pode fazer suas  
            compras sem esquecer nenhum item.
        </Text>

        <Image 
        source={require('../assets/compras.png')}
        style={{ width: 90, height: 90, marginBottom: 20, marginTop: 20 }}
        />

        <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('home')}
        >
          <Text style={styles.buttonText}>Vamos Lá</Text>
       
      </TouchableOpacity>
    </View>
   </View>
  );
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E2841',
  },
    content: {
    width: '80%',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FDfffC',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    width: '90%',
    gap: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E2841',
    paddingHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#41ead4',
  },
  buttonText: {
    color: '#41ead4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});