export default async function countriesApi() {
  try {
    const countriesResponse = await fetch('https://restcountries.eu/rest/v2/all')
    const countriesData = await countriesResponse.json()
    document.querySelector('.loader').classList.add('remove')
    showCountries(countriesData)
  } catch (error) {
    console.error(error)
  }
}

import showCountries from './countries.js'