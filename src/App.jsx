import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

export default function App() {
  // Var/state
  const [countries, setCountries] = useState([])

  const [searchValue, setSearchValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [previousSearchTerm, setPreviousSearchTerm] = useState('')

  // Events
  useEffect(() => {
    async function getCountries() {
      try {
        // Consume API
        const { data } = await axios.get('https://restcountries.com/v3.1/all')

        // Set the data to the state varible
        setCountries(data)

      } catch (error) {
        console.log(error)
      }
    }
    getCountries()
  }, [])


  async function handleSearch(event) {
    try {
      // Stop form from reloading page
      event.preventDefault()

      // Consume API/add search
      const { data } = await axios.get(`https://restcountries.com/v3.1/all?q=${searchValue}`)
      setSearchResult(data)

      // Save the previous search term to display alongside the results
      setPreviousSearchTerm(searchValue)

      // Clear search input
      setSearchValue('')

    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(event) {
    setSearchValue(event.target.value)
  }



  return (
    <>
      <form id="search-bar" onSubmit={handleSearch}>
        <input type="search" name="search" id="search" onChange={handleChange} value={searchValue} />
        <button type="submit">Search</button>
      </form>

      {previousSearchTerm && (
        <section>
          <h2>Showing results for: "{previousSearchTerm}"</h2>
        </section>
      )}

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


