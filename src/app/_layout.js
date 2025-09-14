import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{ title: "Sua Lista", headerShown: false }}
      />
      <Stack.Screen
        name="list-form"
        options={{ title: "Adicione seu Item", headerShown: false }}
      />
    </Stack>
  );
}