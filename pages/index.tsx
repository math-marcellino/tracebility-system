import type { NextPage } from 'next'
import { ethers } from 'ethers'
import { useContract, useProvider, useContractWrite, useContractRead } from 'wagmi'
import {Box, Flex, Text, Button, Img, HStack, Stack, InputGroup, Input, Select} from '@chakra-ui/react'
import { contractABIInterface } from '../abi/contractInterface'
import { SubmitHandler, useForm } from 'react-hook-form'

type formData = {
  _nama: string,
  _halal: string,
  _verifier: string
}

const Home: NextPage = () => {
  // Setup useForm Hooks
  const { register, handleSubmit, formState:{errors} } = useForm<formData>()

  // Setup Wagmi Hooks
  const provider = useProvider();

  // Get Signer Private Key from Environment Variable
  let signerPK = "";
  if(process.env.NEXT_PUBLIC_SIGNER_PRIVATEKEY){
    signerPK = process.env.NEXT_PUBLIC_SIGNER_PRIVATEKEY;
  }

  // Get Smart Contract address from Environment Variable
  let contractAddress = ""
  if(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS){
    contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  }

  // Create wallet signer instance
  const walletSigner = new ethers.Wallet(signerPK, provider);
  console.log("owner address:", walletSigner.address)

  // Create Smart Contract Instance for read and write
  const contractRead = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABIInterface,
    signerOrProvider: provider
  })

  const contractWrite = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABIInterface,
    signerOrProvider: walletSigner
  })

  // Create Filter for querying events from smart contract
  const filter = contractRead.filters.Trace();

  // Query events from smart contract (currently displayed on console.log)
  const eventsData = contractRead.queryFilter(filter);
  console.log(eventsData)
  
  // Handle data from form & call createItem function from smart contract with walletSigner
  const submitData: SubmitHandler<formData> = async(data) => {
    const halalBool = data?._halal  == "true" ? true : false;
    const result = await contractWrite.createItem(data?._nama, data?._verifier, halalBool);
    console.log(result)
  }

  return (
    <Flex height={'100vh'} justify='center' align={'center'}>
      <Flex justify={'center'} align={'center'}>
        <Flex
          borderRadius={30}
          bgColor="#191B1F"
          w="30rem"
          py={4}
          pb={8}
          px={6}
          direction={'column'}
        >
          <Stack spacing={5}>
            <Flex flex={{base: 1}} justify={'space-between'} align={'center'}>
              <Text>Input Data</Text>
            </Flex>
            <form autoComplete="off" onSubmit={handleSubmit(submitData)}>
              <Stack spacing={5}>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <InputGroup>
                    <Input textColor="#B2B9D2" type="number" border={'none'} step={'any'} focusBorderColor={'none'} placeholder="Nama Makanan" min={0} {...register('_nama')}></Input>
                  </InputGroup>
                </Flex>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <Select placeholder='Status Kehalalan' border={'none'} {...register('_halal')}>
                    <option value='true'>Halal</option>
                    <option value='false'>Non Halal</option>
                  </Select>
                </Flex>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <InputGroup>
                    <Input textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder={'Pemverifikasi'} {...register('_verifier')}></Input>
                  </InputGroup>
                </Flex>
                <Button colorScheme={'blue'} type="submit" borderRadius={20}>Confirm</Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
