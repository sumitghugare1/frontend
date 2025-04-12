import { useState, useEffect } from 'react'
import { getProducts, getCategories, getProductsByCategory } from '../services/api'
import ProductCard from '../components/ProductCard'
import Hero from '../components/Hero'
import Toast from '../components/Toast'
import { 
  Box, 
  Container, 
  Heading, 
  Input, 
  Button, 
  Wrap, 
  WrapItem, 
  SimpleGrid,
  Center,
  Spinner,
  Text,
  useColorModeValue
} from '@chakra-ui/react'

function ProductListingPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch all products and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const categoriesData = await getCategories()
        setCategories(categoriesData)

        // Fetch products (all or by category)
        let productsData
        if (selectedCategory) {
          productsData = await getProductsByCategory(selectedCategory)
        } else {
          productsData = await getProducts()
        }
        setProducts(productsData)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory])

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {/* Add Hero section */}
      <Hero />
      
      <Container maxW="container.xl">
        <Heading as="h1" mb={6} textAlign="center" size="xl">
          Our Products
        </Heading>
        
        <Box mb={8}>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            maxW="600px"
            mx="auto"
            mb={6}
            display="block"
            size="lg"
            bg={bgColor}
          />
          
          <Wrap spacing="3" justify="center">
            <WrapItem>
              <Button
                colorScheme={selectedCategory === '' ? 'blue' : 'gray'}
                variant={selectedCategory === '' ? 'solid' : 'outline'}
                onClick={() => setSelectedCategory('')}
                mb={2}
              >
                All
              </Button>
            </WrapItem>
            
            {categories.map(category => (
              <WrapItem key={category}>
                <Button
                  colorScheme={selectedCategory === category ? 'blue' : 'gray'}
                  variant={selectedCategory === category ? 'solid' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  textTransform="capitalize"
                  mb={2}
                >
                  {category}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </Box>

        {loading ? (
          <Center py={10}>
            <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
          </Center>
        ) : error ? (
          <Center py={10}>
            <Text color="red.500">{error}</Text>
          </Center>
        ) : filteredProducts.length === 0 ? (
          <Center py={10}>
            <Text fontSize="lg">No products found.</Text>
          </Center>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Container>

      {error && <Toast message={error} type="error" onClose={() => setError('')} />}
    </Box>
  )
}

export default ProductListingPage
