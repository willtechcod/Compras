import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#0E2841' },
      headerTintColor: '#FDfffC',
      headerTitleStyle: { fontWeight: 'bold' },
      contentStyle: { backgroundColor: '#0E2841' },
      headerShown: false
    }}>
      <Stack.Screen
        name="preload"
        options={{ title: 'Carregando...' }}
      />
      <Stack.Screen
        name="home"
      />
      <Stack.Screen
        name="list-form"
      />
      
    </Stack>
  );
}