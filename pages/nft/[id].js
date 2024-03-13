import {useContract, useNFT, useContractEvents, ThirdwebNftMedia } from "@thirdweb-dev/react" 
import { NFTContractAdress } from "../../consts/addresses"
import {Container,Flex,Box, SimpleGrid,Text, Skeleton, Heading, Divider,Button} from "@chakra-ui/react"
import {useRouter, router} from "next/router"

const NFTDetail = () =>{
    const {id} = useRouter().query
    const { contract} = useContract(NFTContractAdress)
    const {data:nft, isLoading:isNFTLoading} = useNFT(contract, id)
    const {data:events, isLoading: isEventsLoading} = useContractEvents(
        contract, 
        "Transfer",
        {
            queryFilter:{
                filters:{
                    tokenId:id,
                   
                },
                order: "desc"
            }
        }
    );
    
    return(
        <Container>
            <h3>NFT Detail Page</h3>
            <Button onClick={()=> router.back()}  colorScheme='teal' variant='solid'> 
            Back
            </Button>

            <h1>{nft?.metadata.name}</h1>
            <Flex border="5px" borderRadius="5px" borderColor="blue"  width={"250px"} height="100%">
                {!isNFTLoading && (
                    <ThirdwebNftMedia 
                        metadata={nft.metadata}
                        width= "250px"
                        height= "250px"
                    />
                )}
            </Flex>

            <Flex direction={"column"}>
                <h3>NFT Traits:</h3>
                {nft?.metadata.attributes.map((attribute, index) => (
                    <Box key={index}> 
                        <strong>{attribute.trait_type}</strong>: {attribute.value}
                    </Box>
                ))}

                <Box maxWidth={"500px"}>
                    <h3>History</h3>
                    {!isEventsLoading && Array.isArray(events) && (
                        <div>
                            {events.map((event, index) => (
                                <div key={index}>
                                    <strong>From:</strong> {event.data.from} <strong>To:</strong> {event.data.to}
                                </div>

                            ))}
                        </div>
                    )}
                </Box>
            </Flex>
            
        </Container>
    );
}

export default NFTDetail;
