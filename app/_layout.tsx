import { Stack } from 'expo-router';
import { UsuarioProvider } from '../src/shared/contexts/UsuarioContext';

export default function Layout() {
  return (
    <UsuarioProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UsuarioProvider>
  );
}