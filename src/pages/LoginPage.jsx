import { useState, useEffect } from 'react'
import { login } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  InputGroup,
  InputRightElement,
  Divider,
  Code,
  VStack,
  Center,
  Flex,
  Image
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

function LoginPage({ setIsAuthenticated }) {
  const [username, setUsername] = useState('mor_2314')
  const [password, setPassword] = useState('83r5^_')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(username, password)
      localStorage.setItem('token', data.token)
      setIsAuthenticated(true)
      navigate('/')
    } catch (err) {
      setError('Invalid username or password. Please try again.')
      console.error('Login failed:', err)
    } finally {
      setLoading(false)
    }
  }

  // Automatically focus the first input field when the component mounts
  useEffect(() => {
    document.getElementById('username').focus()
  }, [])

  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Container maxW="100vw" p={0} h="100vh">
      <Flex h="full" direction={{ base: 'column', md: 'row' }}>
        {/* Left side - Login Form */}
        <Box 
          w={{ base: '100%', md: '50%' }} 
          p={{ base: 8, md: 16 }}
          display="flex"
          flexDir="column"
          justifyContent="center"
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            maxW="400px"
            mx="auto"
            w="100%"
          >
            <Heading mb={2} size="xl" color="brand.primary">Welcome to ShopMart</Heading>
            <Text mb={8} fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
              Please log in to continue
            </Text>
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="username-control" isRequired>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    bg={useColorModeValue('white', 'gray.700')}
                    borderColor={borderColor}
                  />
                </FormControl>

                <FormControl id="password-control" isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg={useColorModeValue('white', 'gray.700')}
                      borderColor={borderColor}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="100%"
                  mt={4}
                  isLoading={loading}
                  loadingText="Logging in..."
                >
                  Log in
                </Button>
              </VStack>
            </form>

            <Box mt={6} pt={6} borderTop="1px solid" borderColor={borderColor}>
              <Text align="center" fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                <strong>Default Credentials</strong><br />
                Username: <Code>mor_2314</Code><br />
                Password: <Code>83r5^_</Code>
              </Text>
            </Box>
          </MotionBox>
        </Box>
        
        {/* Right side - Image/Branding */}
        <Box 
          w={{ base: '100%', md: '50%' }}
          bg="brand.primary"
          position="relative"
          display={{ base: 'none', md: 'block' }}
        >
          <Center h="100%">
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              p={10}
              textAlign="center"
            >
              <Heading size="2xl" color="white" mb={6}>
                Shop Smart,<br />Shop with ShopMart
              </Heading>
              <Text color="white" fontSize="lg" mb={8}>
                Your one-stop shop for all your favorite products.
                Enjoy exclusive deals and fast shipping!
              </Text>
              <Image 
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Shopping"
                borderRadius="lg"
                boxShadow="dark-lg"
                maxW="400px"
                mx="auto"
              />
            </MotionBox>
          </Center>
        </Box>
      </Flex>

      {error && (
        <Toast 
          message={error} 
          type="error" 
          onClose={() => setError('')} 
        />
      )}
    </Container>
  )
}

export default LoginPage
