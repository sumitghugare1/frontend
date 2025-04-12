import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

function Hero() {
  return (
    <Box 
      bg={useColorModeValue('gray.50', 'gray.900')} 
      py={20}
      mb={10}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Container maxW="container.xl">
        <Flex
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 8, md: 16 }}
        >
          <Stack spacing={6} flex="1">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Text
                as="span"
                color="brand.primary"
                fontWeight="bold"
                fontSize="lg"
              >
                ShopMart Special Offers
              </Text>
              
              <Heading
                mt={2}
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                lineHeight="shorter"
              >
                Discover Amazing <Text as="span" color="brand.primary">Products</Text> at Best Prices
              </Heading>
              
              <Text
                mt={4}
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize="lg"
              >
                Shop the latest trends and find everything you need, from electronics to fashion. 
                Free shipping on orders over $50!
              </Text>
              
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                mt={8}
              >
                <Button
                  as={RouterLink}
                  to="/"
                  size="lg"
                  colorScheme="blue"
                  rounded="md"
                  px={8}
                >
                  Shop Now
                </Button>
                <Button
                  as={RouterLink}
                  to="/cart"
                  size="lg"
                  variant="outline"
                  rounded="md"
                  px={8}
                >
                  View Cart
                </Button>
              </Stack>
            </MotionBox>
          </Stack>
          
          <MotionBox
            flex="1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image 
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Shopping online"
              borderRadius="lg"
              objectFit="cover"
              boxShadow="lg"
              height={{ base: '200px', md: '350px' }}
              width="100%"
            />
          </MotionBox>
        </Flex>
      </Container>
    </Box>
  );
}

export default Hero;
