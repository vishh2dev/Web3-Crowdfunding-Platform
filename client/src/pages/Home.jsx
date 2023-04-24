import React,{ useEffect,useState} from 'react'

import { useStateContext } from '../context'
const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  const {address,contract, getCampaigns} = useStateContext()

  const fetchCampaigns = async() =>{
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }
  useEffect(() =>{
   if(contract) fetchCampaigns()
  },[contract,address])

  return (
    <div>
      Home
    </div>
  )
}

export default Home
