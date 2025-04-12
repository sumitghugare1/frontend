import { useToast as useChakraToast } from '@chakra-ui/react'
import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose, duration = 4000 }) {
  const toast = useChakraToast()
  
  useEffect(() => {
    if (message) {
      toast({
        title: type === 'success' ? 'Success' : 'Error',
        description: message,
        status: type,
        duration: duration,
        isClosable: true,
        position: 'top-right',
        onCloseComplete: onClose
      })
    }
    
    return () => {}
  }, [message, type, duration, toast, onClose])

  // Return null as we're using Chakra UI's toast system
  return null
}

export default Toast
