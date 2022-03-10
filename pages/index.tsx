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
      const result = await contractWrite.createItem(data?._nama, data?._verifier, halalBool);
      setSubmitting(false) 
      toast.success(`Transaction is sucessfully submitted!`)
    } catch(err){
      setSubmitting(false)
      toast.error(`${err}`)
    }
  }

  // Create data array for MUI table
  const tableData:any = events.data?.map((item) => {
    const date = new Date(item.args?._time.toNumber() * 1000)
    const formattedDate = new Intl.DateTimeFormat("en-US", { hour: "numeric", day: "numeric", month: "short", year: "numeric", minute: "numeric" }).format(date);
    return {
      date: formattedDate,
      itemID: item.args?._itemID.toNumber(),
      step: item.args?._step.toNumber(),
      verifiers: item.args?.verifiers,
      halal: item.args?._halal
    }
  })

  const columns = [
    {
      name: "date",
      label: "Date",
    },
    {
      name: "itemID",
      label: "Makanan",
    },
    {
      name: "step",
      label: "Step",
    },
    {
      name: "verifiers",
      label: "Pemverifikasi",
    },
    {
      name: "halal",
      label: "Status Kehalalan",
      options: {
        customBodyRender: (value:any) => {
          return (
            <Flex justifyContent={'center'} alignItems='center'>
              <Img w={'30px'} src={!value ? "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/1024px-Flat_cross_icon.svg.png " : "https://upload.wikimedia.org/wikipedia/commons/c/c6/Sign-check-icon.png"}></Img>
            </Flex>
          )
        }
      }
    },
  ]

  return (
    <Flex height={'100vh'} justify='center' align={'center'} direction={'column'} bgColor={'#1a202c'}>
      <Head>
        {/* <!-- HTML Meta Tags --> */}
        <title>Tracebility System</title>
        <meta name="description" content="Halal supply chain tracebility system using blockchain" />
      </Head>  
      <Flex position={'fixed'} top="10" left="10">
        <Menu>
          <MenuButton as={Button}>
            Menu :
          </MenuButton>
          <MenuList>
            <Link href={'/table'} passHref><MenuItem>Table</MenuItem></Link>
            <Link href={'/'} passHref><MenuItem>Create Item</MenuItem></Link>
          </MenuList>
        </Menu> 
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
                    <Input textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder="Nama Makanan" min={0} {...register('_nama')}></Input>
                  </InputGroup>
                </Flex>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <Select placeholder='Status Kehalalan' border={'none'} {...register('_halal')} textColor="white">
                    <option value='true'>Halal</option>
                    <option value='false'>Non Halal</option>
                  </Select>
                </Flex>
                <Flex flex={{base: 1}} justify={'space-between'} pr={3} align={'center'} bgColor="#20242A" borderRadius={20}>
                  <InputGroup>
                    <Input textColor="#B2B9D2" type="text" border={'none'} focusBorderColor={'none'} placeholder={'Pemverifikasi'} {...register('_verifier')}></Input>
                  </InputGroup>
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
