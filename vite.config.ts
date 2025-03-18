
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import federation from "@originjs/vite-plugin-federation";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    federation({
      name: 'auth_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './ProtectedRoute': './src/components/ProtectedRoute.tsx',
        './federationEvents': './src/utils/federationEvents.ts'
      },
      shared: {
        react: {
          eager: true,
          requiredVersion: '^18.3.1'
        },
        'react-dom': {
          eager: true,
          requiredVersion: '^18.3.1'
        },
        '@auth0/auth0-react': {
          eager: true,
          requiredVersion: '^2.2.4'
        },
        'react-router-dom': {
          eager: true,
          requiredVersion: '^6.26.2'
        }
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/secure-sailor-app/",
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
}));
