import { Link as RouterLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { 
  Box, 
  Image, 
  Text, 
  Badge, 
  Flex, 
  Button,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'

const MotionBox = motion(Box)

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { id, title, price, image, category } = product

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      bg={bgColor}
      boxShadow="sm"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <RouterLink to={`/product/${id}`} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box 
          height="200px" 
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          p={4}
          bg={useColorModeValue('white', 'gray.900')}
        >
          <Image 
            src={image} 
            alt={title} 
            maxH="100%" 
            maxW="100%" 
            objectFit="contain"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Box>

        <VStack p={4} align="start" spacing={2} flex={1}>
          <Badge colorScheme="blue" textTransform="capitalize">
            {category}
          </Badge>
          
          <Heading as="h3" size="sm" noOfLines={2} mt={1}>
            {title}
          </Heading>
          
          <Text
            color={useColorModeValue('brand.primary', 'blue.300')}
            fontSize="xl"
            fontWeight="bold"
            mt="auto"
          >
            ${price.toFixed(2)}
          </Text>
        </VStack>
      </RouterLink>

      <Button
        leftIcon={<FiShoppingCart />}
        colorScheme="blue"
        variant="solid"
        borderTopRadius={0}
        onClick={handleAddToCart}
        size="md"
      >
        Add to Cart
      </Button>
    </MotionBox>
  )
}

export default ProductCard
