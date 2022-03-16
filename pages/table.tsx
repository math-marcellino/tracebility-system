import {Flex, Img, Menu, MenuButton, MenuList, MenuItem, Button, Text} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useTraceEvents } from '../hooks/useTraceEvents'
import MUIDataTable from "mui-datatables";
import { ethers } from 'ethers'
import { useContract, useProvider} from 'wagmi'
import { contractABIInterface } from '../abi/contractInterface'

const Table = () => {
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
    return event.step === 1;
  });

  const walletSigner = new ethers.Wallet(signerPK, provider);

  // Create Smart Contract Instance for write (using walletSigner)
  const contractWrite = useContract({
    addressOrName: contractAddress,
    contractInterface: contractABIInterface,
    signerOrProvider: walletSigner
  })
  
  const changeStep = async (itemID:Number, halal:Boolean)=>{
    try{
      const result = await contractWrite.step2(itemID, "William", halal)
      console.log(result)
    } catch(err){
      console.log(err)
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
          return (
            <Flex justifyContent={'center'} alignItems='center'>
              {/* <Menu>
                <MenuButton as={Button} size={'sm'} bgColor='#172a42' textColor='white' borderRadius={'10px'} _hover={{bgColor: "#1a4173"}}>
                  Step Menu
                </MenuButton>
                <MenuList bgColor={'white'}>
                  <MenuItem _hover={{bgColor: 'blackAlpha.100'}} onClick={()=>{changeStep(2, rowIndex.rowData[1], rowIndex.rowData[4])}}>Step 2</MenuItem>
                  <MenuItem _hover={{bgColor: 'blackAlpha.100'}} onClick={()=>{changeStep(3, rowIndex.rowData[1], rowIndex.rowData[4])}}>Step 3</MenuItem>
                  <MenuItem _hover={{bgColor: 'blackAlpha.100'}} onClick={()=>{changeStep(4, rowIndex.rowData[1], rowIndex.rowData[4])}}>Step 4</MenuItem>
                </MenuList>
              </Menu> */}
              <Button 
                size={'sm'} 
                bgColor='#172a42' 
                textColor='white' 
                borderRadius={'10px'} 
                _hover={{bgColor: "#1a4173"}} 
                onClick={()=>changeStep(rowIndex.rowData[1], rowIndex.rowData[4])}
              >
                Change Step
              </Button>
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
          <Text>William Chandra</Text>
        </Flex>
      </Flex>
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
    </Flex>
  );
}
 
export default Table;