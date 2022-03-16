import {Flex, Img, Menu, MenuButton, MenuList, MenuItem, Button, Text, HStack} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useTraceEvents } from '../hooks/useTraceEvents'
import MUIDataTable from "mui-datatables";
import { ethers } from 'ethers'
import { useContract, useProvider} from 'wagmi'
import { contractABIInterface } from '../abi/contractInterface'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Table = () => {
  // Usestate step
  const [step, setStep] = useState(1)

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

  // Create data array for MUI table
  const tableData = events.data?.filter((event) => {
    return event.step === step;
  });

  const walletSigner = new ethers.Wallet(signerPK, provider);

  // Create Smart Contract Instance for write (using walletSigner)
  const contractWrite = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABIInterface,
    signerOrProvider: walletSigner
  })
  
  // Handle changeStep function
  const changeStep = async (step: number, itemID:Number, halal:Boolean)=>{
    try{
      switch(step){
        case 1:
          await contractWrite.step2(itemID, "William", halal)
          break
        case 2:
          await contractWrite.step3(itemID, "William", halal)
          break
        case 3:
          await contractWrite.step4(itemID, "William", halal)
          break
      } 
      toast.success(`Step is successfully changed!`)
    } catch(error:any){
      console.log(error)
      toast.error(`${error}`)
    }
  }

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
    {
      name: "stepButton",
      label: "Change Step",
      options: {
        customBodyRender: (dataIndex:any, rowIndex:any) => {
          const itemCount = events.data?.filter((event) => {
            return event.itemID === rowIndex.rowData[1];
          })
          return (
            <Flex justifyContent={'center'} alignItems='center'>
              {step === 1 && 
              <Button 
                disabled={itemCount.length > 1 ? true : false}
                size={'sm'} 
                bgColor='#172a42' 
                textColor='white' 
                borderRadius={'10px'} 
                _hover={{bgColor: "#1a4173"}} 
                onClick={()=>changeStep(step, rowIndex.rowData[1], rowIndex.rowData[4])}
              >
                Change Step
              </Button>
              }
              {step === 2 && 
              <Button 
                disabled={itemCount.length > 2 ? true : false}
                size={'sm'} 
                bgColor='#172a42' 
                textColor='white' 
                borderRadius={'10px'} 
                _hover={{bgColor: "#1a4173"}} 
                onClick={()=>changeStep(step, rowIndex.rowData[1], rowIndex.rowData[4])}
              >
                Change Step
              </Button>
              }
              {step === 3 && 
              <Button 
                disabled={itemCount.length > 3 ? true : false}
                size={'sm'} 
                bgColor='#172a42' 
                textColor='white' 
                borderRadius={'10px'} 
                _hover={{bgColor: "#1a4173"}} 
                onClick={()=>changeStep(step, rowIndex.rowData[1], rowIndex.rowData[4])}
              >
                Change Step
              </Button>
              }
            </Flex>
          )
        }
      }
    }
  ]

  return (
    <Flex height={'100vh'} justify='center' align={'center'} direction={'column'} pb={'10px'} pt={'100px'} bgColor={'#1a202c'}>
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
          <Text textColor='white'>William Chandra</Text>
        </Flex>
      </Flex>
      <Flex justifyContent='center' alignItems={'center'}> 
        <HStack spacing={10}>
          <Button size={'sm'} bgColor={'#21325E'} textColor='white' _hover={{bgColor: "#5D8BF4"}} onClick={()=>{setStep(1)}}>Step 1</Button>
          <Button size={'sm'} bgColor={'#21325E'} textColor='white' _hover={{bgColor: "#5D8BF4"}} onClick={()=>{setStep(2)}}>Step 2</Button>
          <Button size={'sm'} bgColor={'#21325E'} textColor='white' _hover={{bgColor: "#5D8BF4"}} onClick={()=>{setStep(3)}}>Step 3</Button>
        </HStack>
      </Flex>
      <br />
      <MUIDataTable
        title={"Employee List"}
        data={tableData}
        columns={columns}
        options={{
          selectableRows: "none",
          rowsPerPage: 5,
          elevation: 0,
          sort: false
        }}
      />
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
  );
}
 
export default Table;