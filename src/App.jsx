import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import Footer from './components/Footer'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.900')
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <Box minH="100vh" bg={bgColor} display="flex" flexDirection="column">
      {isAuthenticated && <Header onLogout={handleLogout} />}
      <Box as="main" flex="1" py={6} px={{ base: 4, md: 6 }}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/" /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/" 
            element={isAuthenticated ? <ProductListingPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/product/:id" 
            element={isAuthenticated ? <ProductDetailPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/cart" 
            element={isAuthenticated ? <CartPage /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
      {isAuthenticated && <Footer />}
    </Box>
  )
}

export default App
