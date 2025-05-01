import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  // Var
  const [countries, setCountries] = useState([])

  // Events
  useEffect(() => {
    async function getCountries() {
      try {
        // 1. Consume API
        const { data } = await axios.get('https://restcountries.com/v3.1/all')

        // 2. Set the data to the state varible
        setCountries(data)

      } catch (error) {
        console.log(error)
      }
    }
    getCountries()
  }, [])



  return (
    <>
      {countries.length > 0 && (
        <div className="grid-container">
          {countries.map(flag => {
            return (
              <div className='flags' key={flag.name.common}>
                <h2>{flag.name.common}</h2>
                <h3>{flag.name.official}</h3>
                <img src={flag.flags.png} />
              </div>
            )
          })}
        </div>
      )}
    </>
  )
  

}


