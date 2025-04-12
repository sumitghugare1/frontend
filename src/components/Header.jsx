import { Link as RouterLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  Box, 
  Flex, 
  Text, 
  IconButton, 
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  Container,
  Badge
} from '@chakra-ui/react'
import { 
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons'
import { FiShoppingCart } from 'react-icons/fi'

function Header({ onLogout }) {
  const { cartCount } = useCart()
  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  
  return (
    <Box 
      as="header"
      bg={bgColor}
      color={textColor}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Container maxW="container.xl">
        <Flex 
          as="nav" 
          py={4} 
          px={{ base: 4, md: 0 }}
          align="center"
          justify="space-between"
          wrap="wrap"
        >
          <Flex align="center">
            <Text
              as={RouterLink}
              to="/"
              fontSize="xl"
              fontWeight="bold"
              letterSpacing="tight"
              color={useColorModeValue('brand.secondary', 'white')}
            >
              ShopMart
            </Text>
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction="row" spacing={4} align="center">
              <Link 
                as={RouterLink} 
                to="/"
                px={2}
                py={1}
                rounded="md"
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.100', 'gray.700'),
                }}
              >
                Home
              </Link>
              <Link 
                as={RouterLink} 
                to="/cart"
                px={2}
                py={1}
                rounded="md"
                position="relative"
                _hover={{
                  textDecoration: 'none',
                  bg: useColorModeValue('gray.100', 'gray.700'),
                }}
              >
                <Flex align="center">
                  <Box mr={1}>Cart</Box>
                  <FiShoppingCart size="1.2em" />
                  {cartCount > 0 && (
                    <Badge
                      colorScheme="red"
                      borderRadius="full"
                      position="absolute"
                      top="-6px"
                      right="-6px"
                      fontSize="0.8em"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Flex>
              </Link>
              <Button
                variant="ghost"
                onClick={onLogout}
              >
                Logout
              </Button>
              <IconButton
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                variant="ghost"
                onClick={toggleColorMode}
                aria-label={`Toggle ${colorMode === 'light' ? 'Dark' : 'Light'} Mode`}
              />
            </Stack>
          </Flex>

          <Box display={{ base: 'flex', md: 'none' }}>
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
            />
          </Box>
        </Flex>
        
        <Collapse in={isOpen} animateOpacity>
          <Stack
            display={{ md: 'none' }}
            p={4}
            bg={bgColor}
            spacing={4}
            divider={<Box borderColor="gray.200" />}
          >
            <Link 
              as={RouterLink} 
              to="/"
              px={2}
              py={2}
              rounded="md"
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.100', 'gray.700'),
              }}
            >
              Home
            </Link>
            <Link 
              as={RouterLink} 
              to="/cart"
              px={2}
              py={2}
              rounded="md"
              position="relative"
              display="flex"
              alignItems="center"
              _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.100', 'gray.700'),
              }}
            >
              <Box mr={1}>Cart</Box>
              <FiShoppingCart size="1.2em" />
              {cartCount > 0 && (
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  ml={1}
                  fontSize="0.8em"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>
            <Button
              w="full"
              variant="ghost"
              justifyContent="flex-start"
              fontWeight="normal"
              onClick={onLogout}
            >
              Logout
            </Button>
            <Button
              w="full"
              variant="ghost"
              justifyContent="flex-start"
              fontWeight="normal"
              leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </Stack>
        </Collapse>
      </Container>
    </Box>
  )
}

export default Header
