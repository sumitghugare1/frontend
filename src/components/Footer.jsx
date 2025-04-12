import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW={'container.xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {new Date().getFullYear()} ShopMart. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <Link href="#" aria-label="GitHub">
            <FaGithub />
          </Link>
          <Link href="#" aria-label="Twitter">
            <FaTwitter />
          </Link>
          <Link href="#" aria-label="Instagram">
            <FaInstagram />
          </Link>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
