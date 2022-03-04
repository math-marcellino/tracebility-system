import type { NextPage } from 'next'
import { ethers } from 'ethers'
import { useContract, useProvider, useContractWrite, useContractRead } from 'wagmi'
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
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <label htmlFor="">Nama Makanan</label>
          <input {...register('_nama')} type={'text'}></input>
        </div>
        <br />
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <label>Pilih Kehalalan:</label>
          <select {...register('_halal')}>
            <option value="true">Halal</option>
            <option value="false">Non Halal</option>
          </select>
        </div>
        <br />
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <label htmlFor="">Verifier</label>
          <input {...register('_verifier')} type={'text'}></input>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <button type='submit'>Submit Data</button>
        </div>
      </form>
    </div>
  )
}

export default Home
