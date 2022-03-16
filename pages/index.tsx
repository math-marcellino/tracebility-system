import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { ethers } from 'ethers'
import { useContract, useProvider} from 'wagmi'
import {Flex, Text, Button, Img, Stack, InputGroup, Input, Select, Menu, MenuButton, MenuList, MenuItem} from '@chakra-ui/react'
import { contractABIInterface } from '../abi/contractInterface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTraceEvents } from '../hooks/useTraceEvents'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MUIDataTable from "mui-datatables";

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

  // Get Trace events uing useTraceEvents custom hook
  const events = useTraceEvents({ contractAddress: contractAddress, provider: provider})

  // Create wallet signer instance
  const walletSigner = new ethers.Wallet(signerPK, provider);

  // Create Smart Contract Instance for write (using walletSigner)
  const contractWrite = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABIInterface,
    signerOrProvider: walletSigner
  })

  // Create submitting form loading state
  const [submitting, setSubmitting] = useState(false)

  // Handle data from form & call createItem function from smart contract with walletSigner
  const submitData: SubmitHandler<formData> = async(data) => {
    try{
      const halalBool = data?._halal  == "true" ? true : false;
      setSubmitting(true)
      await contractWrite.createItem(data?._nama, "William Chandra", halalBool)
      setSubmitting(false) 
      toast.success(`Transaction is sucessfully submitted!`)
    } catch(err){
      setSubmitting(false)
      toast.error(`${err}`)
    }
  }

  

  return (
    <Flex height={'100vh'} justify='center' align={'center'} direction={'column'} bgColor={'#1a202c'}>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>Tracebility System</title>
        <meta name="description" content="Halal supply chain tracebility system using blockchain" />
      </Head>  
      <Flex position={'fixed'} top="10" w="100%" justifyContent='space-between' pr={'50px'} pl={'50px'}>
        <Menu>
          <MenuButton as={Button}>
            Menu :
          </MenuButton>
          <MenuList>
          <Link href={'/'} passHref><MenuItem>Create Item</MenuItem></Link>
            <Link href={'/table'} passHref><MenuItem>Table</MenuItem></Link>
          </MenuList>
        </Menu> 
        <Flex alignItems={'center'}>
          <Text>William Chandra</Text>
        </Flex>
      </Flex>
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
              <Text textColor={'white'}>Input Data</Text>
            </Flex>
            <form autoComplete="off" onSubmit={handleSubmit(submitData)}>
              <Stack spacing={5}>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <InputGroup>
                    <Input textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder={errors._nama ? errors._nama.message : "Nama Makanan"} min={0} {...register('_nama', {required: "Makanan Harap Diisi!"})}></Input>
                  </InputGroup>
                </Flex>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <Select placeholder='Status Kehalalan' border={'none'} {...register('_halal')} textColor="white" focusBorderColor='none'>
                    <option value='true'>Halal</option>
                    <option value='false'>Non Halal</option>
                  </Select>
                </Flex>
                <Button isLoading={submitting} colorScheme={'blue'} type="submit" borderRadius={20}>Confirm</Button>
              </Stack>
            </form>
          </Stack>
        </Flex>
      </Flex>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{width: "350px"}}
      />
    </Flex>
  )
}

export default Home
