import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Layout } from './components/Layout';
import { ColorSchemeProvider, useColorScheme } from './context/ColorSchemeContext';
import './App.css'

function AppContent() {
  const { colorScheme } = useColorScheme();

  return (
    <Provider theme={defaultTheme} colorScheme={colorScheme}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

function App() {
  return (
    <ColorSchemeProvider>
      <AppContent />
    </ColorSchemeProvider>
  );
}

export default App
