import {Box, Flex, Img, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react'
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
    <Flex height={'100vh'} justify='center' align={'center'} direction={'column'} pb={'10px'} pt={'100px'} bgColor={'#1a202c'}>
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