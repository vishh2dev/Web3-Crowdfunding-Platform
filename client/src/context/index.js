import React, { useContext, createContext} from 'react'

import{ useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import { ethers } from 'ethers';

const stateContext = createContext()

export const StateContextProvider = ({children}) =>{
    const { contract } = useContract()
    
}