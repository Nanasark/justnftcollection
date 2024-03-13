import React from 'react'
import Link from 'next/link'
import { ThirdwebNftMedia } from '@thirdweb-dev/react'
import { Box,Text } from '@chakra-ui/react'

export const NFTcard: React.FC<{ nft: any }> = ({nft}) => {
    
  return (
    
        <Link href={`/nft/${nft.metadata.id}`}> 
        <Box bgColor="#1C1D21" display='flex' pb="4" w="200px" h="240px" alignItems='center' flexDirection="column" border="2px" borderRadius="lg" overflow="hidden" borderColor="#E5E5E5">
            
                <ThirdwebNftMedia
                    metadata={nft.metadata}
                    width="90%"
                    height = "90%"
                />
            
            <Text border="1px" borderColor='#515052' borderRadius="md" bg="#515052">
                {nft.metadata.name}
            </Text>
         
        </Box>
            
        </Link>
        
  )
}

