import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Accordian from './components/Accordian'
import { celebrity } from './interfaces'
import CELEBRITIES from "./data/celebrities.json"
import Search from './components/Search'


function App() {
    const[data,setData] =  useState<celebrity[]>(CELEBRITIES)
    const [searchString,setSearchString] = useState<string>("")
  const searchHandler = (value:string) => {
    console.log(value)
    setSearchString(value)
  }


  const handleDelete = (celebrity:celebrity):void => {
      const updatedData = JSON.parse(JSON.stringify(data))
      setData(updatedData?.filter(item  => item?.id !== celebrity?.id))
  }
  
  return (
    <>
     <Search searchCallback={searchHandler}/>
     {data?.filter((item: celebrity) => item?.first?.toLowerCase()?.includes(searchString.toLowerCase()) || item?.last?.toLowerCase()?.includes(searchString.toLowerCase())).map((celebrity, idx) => {
        return <Accordian celebrity={celebrity} key={idx} handleDelete={handleDelete} />;
      })}

    </>
  )
}

export default App
