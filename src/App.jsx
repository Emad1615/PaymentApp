import { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout';
import GlobalStyle from './styles/GlobalStyle';
function App() {
  return (
    <>
      <GlobalStyle />
      <Layout />

      <Toaster
        gutter={12}
        position="top-center"
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          error: {
            duration: 5000,
          },
          success: {
            duration: 3000,
          },
          style: {
            backgroundColor: 'var(--color-grey-0)',
            fontSize: '1.5rem',
            letterSpacing: '1px',
            padding: '1.5rem 2rem',
            color: 'var(--color-grey-600)',
            border: '1px solid var(--color-grey-200)',
            width: '36rem',
            borderRadius: '--border-radius-sm',
            boxShadow: 'var(--shadow-md)',
          },
        }}
      />
    </>
  );
}

export default App;
