import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';  // Importando o módulo path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Definindo o alias '@' para apontar para a pasta 'src'
    },
  },
});
