import React, { useContext, createContext} from 'react'

import{ useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import { ethers } from 'ethers';

const StateContext = createContext()

export const StateContextProvider = ({children}) =>{
    const { contract } = useContract('0x16eDF7a89935E7655809b4c9eda8FBf526345739')
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')

    const address = useAddress()
    const connect = useMetamask()

    const publishCampaign = async(form) =>{
        try {
            const data = await createCampaign([
                address, //owner
                form.title,// title
                form.description, //description
                form.target,
                new Date(form.deadline).getTime(), //deadline
                form.image
            ])
            console.log('contract call sucess',data)
        } catch (error) {
            console.log('contract call failed',error)
        }
        
    }

    const getCampaigns = async () =>{
        const campaigns = await contract.call('getCampaigns') 

        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))
        console.log(parsedCampaigns)
        return parsedCampaigns
    }
    return(
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns
            }}
        >
            {children}
        </StateContext.Provider>
    )
    
}

export const useStateContext = () => useContext(StateContext) 