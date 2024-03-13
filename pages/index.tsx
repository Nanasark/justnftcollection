import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractRead, ThirdwebNftMedia, useMetadata ,useNFTs} from "@thirdweb-dev/react";
import {Container,Flex,Box,Grid, SimpleGrid,Text, Skeleton, Heading, Divider,Input, Button, Card, Image} from "@chakra-ui/react"
// import styles from "../styles/Home.module.css";
// import Image from "next/image";
import { NextPage } from "next";
import {NFTcard}  from "../components/NFTcard";
import {NFTContractAdress} from "../consts/addresses"
import { useState } from "react";

const Home: NextPage = () => {
  const address = useAddress()
  const {contract} = useContract(NFTContractAdress);

  
  const count = 30
  
  const [pages, setPages] = useState(1)
  function Next(){
    setPages(page => page +1)
  }

  function Previous(){
    setPages(page => page -1)
  }

  const {data:metadata, isLoading: isLoadingMetadata} = useMetadata(contract);
  
  const {data: totalMinted, isLoading: isLoadingTotalMinted } = useContractRead(contract , "totalMinted" )
  // const nfts = await contract.erc721.getAll();
  const { data: nfts, isLoading: isNFTLoading, error: errorNFT } = useNFTs
  (contract, 
    {
      count:count,
      start: (pages-1) * count,
    });
  
  return (
      <Container maxW={"100%"}>
        <Flex p={"20px"} justifyContent={"space-between"}>
          <Box>   
          </Box>
          <ConnectWallet/>
        </Flex >

        <Flex h={"90vh"} alignItems={"center"} maxW={"800px"} justifyContent={"center"}>
          <SimpleGrid columns={2} spacing={10} justifyItems={"center"}>
            <Box>
              <Skeleton isLoaded={!isLoadingMetadata}>
                  <MediaRenderer
                    src={(metadata as {image: string})?.image}
                  />
              </Skeleton>
            </Box>

            <Flex direction={"column"}>
              <Skeleton isLoaded={!isLoadingMetadata}>
                <Heading>{(metadata as {name?:string})?.name}</Heading>
               
              </Skeleton>

              <Skeleton isLoaded={!isLoadingMetadata}>
                
                <Text>{(metadata as {description?:string})?.description}</Text>
              </Skeleton>
              <Skeleton isLoaded={!isLoadingTotalMinted}>
                
                <p>Total Minted: {totalMinted?.toNumber()}/5</p>
              </Skeleton>
              {address? (<Web3Button
                contractAddress={NFTContractAdress}
                action={(contract) => contract.erc721.claim(1)}
              > Claim</Web3Button> 
              ): (<h2> Please Connect your wallet</h2>
              )}
               
              
            </Flex>
          </SimpleGrid>
        </Flex>
        <Divider/>
        <Container border="2px" borderRadius="20px" maxW="1300px" display="flex" centerContent borderColor="purple.600" minH="1800px" mt="40px">
        {/* // Render the NFT onto the UI */}
            
              <Grid gap={10} templateColumns='repeat(5, 1fr)' maxW="1100px"  top={"40px"} position='relative' >
                
                    {isNFTLoading? (<div>Loading...</div>):
                    errorNFT || !nfts? (<div>NFT not found</div>):(
                    nfts.map((nft,index)=>(

                        <NFTcard  key={index} nft={nft}/>
                    )
                    
                    )
                  )}
               
              
              </Grid>
            <Box mt="100px" h="70px" w="350px" alignItems="center">
              <Flex gap={4}>
              
                <Box onClick ={Previous} disabled={pages===1}  as='button' borderRadius='md' bg={pages ===  1 ? '#EEF0EB' : '#1C3041'} color='white' px={4} h={8}>
                Previous
              </Box>

              <Input 
              w="100px"
              type="number"
              placeholder="pg num" 
              _placeholder={{ opacity: 1, color: 'gray.500' }}
              value={pages}
              onChange={(e) => setPages(parseInt(e.target.value))}
             
              />
              <Box onClick ={Next}  as='button' borderRadius='md' bg='#1C3041' color='white' px={4} h={8}>
                Next
              </Box>
              </Flex>
              
            </Box>
         
           
        
 
        </Container>
       
      </Container>
      
      
  );
};

export default Home;
