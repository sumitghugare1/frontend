import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      primary: '#3498db',
      secondary: '#2c3e50',
      accent: '#e74c3c',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'blue.500',
          },
        },
        secondary: {
          bg: 'brand.secondary',
          color: 'white',
          _hover: {
            bg: 'gray.600',
          },
        },
        danger: {
          bg: 'brand.accent',
          color: 'white',
          _hover: {
            bg: 'red.500',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
