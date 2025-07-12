import { Provider, defaultTheme } from '@adobe/react-spectrum';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import './App.css'

function App() {
  return (
    // The Provider automatically uses the Light/Dark mode from the browser.  I imagine there are more features built in, like localization and 
    <Provider theme={defaultTheme}> 
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App
