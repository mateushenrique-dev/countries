const countriesContainer = document.querySelector('.countries-container')
const countriesDescription = document.querySelector('.details')
const countriesCategory = document.querySelector('.categories')

export default function countries(countrie) {
  const countriesContainer = document.querySelector('.countries')
  for(let i = 0; i < countrie.length; i++) {
    countriesContainer.innerHTML += `
    <div class="country ${countrie[i].alpha3Code} ${countrie[i].name.toLowerCase().replace(/\s/g, '')} ${countrie[i].region}">
    <div class="flag-image"><img src="${countrie[i].flag}" alt="${countrie[i].name}" /></div>
    <div class="infos">
      <h2>${countrie[i].name}</h2>
      <div>
        <p>Population:</p>
        <span>${countrie[i].population}</span>
      </div>
      <div>
        <p>Region:</p>
        <span>${countrie[i].region}</span>
      </div>
      <div>
        <p>Capital:</p>
        <span>${countrie[i].capital}</span>
      </div>
    </div>
  </div>
    `
  document.querySelectorAll('div.country').forEach((country, index) => {
      country.addEventListener('click', () => {
        const info = countrie[index]
        let countriesLanguage = info.languages.reduce((acc, language) => {
          return acc + ', ' + language.name
        }, '')
        let countriesBorder = info.borders.reduce((acc, border) => {
          return acc + '<li>' + document.querySelector(`.${border} .infos h2`).innerText + '</li>'
        }, '')
        countriesContainer.classList.add('remove')
        countriesDescription.classList.remove('remove')
        countriesCategory.classList.add('remove')
        countriesDescription.innerHTML = `
        <div class="back"><button><i class="fas fa-arrow-left"></i> Back</button></div>
            <img src="${info.flag}" alt="${info.name}" />
            <div class="details-description">
              <h2>${info.name}</h2>
              <div class="country-description">
                <div class="native-name">
                  <p>Native Name: </p>
                  <span>${info.nativeName}</span>
                </div>
                <div class="population">
                  <p>Population:</p>
                  <span>${info.population}</span>
                </div>
                <div class="region">
                  <p>Region:</p>
                  <span>${info.region}</span>
                </div>
                <div class="sub-region">
                  <p>Sub Region:</p>
                  <span>${info.subregion}</span>
                </div>
                <div class="capital">
                  <p>Capital</p>
                  <span>${info.capital}</span>
                </div>
              </div>
              <div class="domain">
                <div>
                  <p>Top Level Domain:</p>
                  <span>${info.topLevelDomain}</span>
                </div>
                <div class="currencies">
                  <p>Currencies:</p>
                  <span></span>
                </div>
                <div class="languages">
                  <p>Languages:</p>
                  <span>${countriesLanguage.slice(1)}</span>
                </div>
              </div>
              <div class="country-borders">
                <p>Border Countries:</p>
                <ul>${countriesBorder}</ul>
              </div>
            </div> `
            document.querySelector('.details > div button').addEventListener('click', () => {
              countriesContainer.classList.remove('remove')
              countriesDescription.classList.add('remove')
              countriesCategory.classList.remove('remove')
            })
            showSubDescription()
      })
    })
  }

  function subDescription(currentCountry) {
    document.querySelector('.details img').setAttribute('src', currentCountry[0].flag)
    document.querySelector('.details img').setAttribute('alt', currentCountry[0].name)
    document.querySelector('.details h2').innerText = currentCountry[0].name
    document.querySelector('.details .native-name span').innerText = currentCountry[0].name
    document.querySelector('.details .population span').innerText = currentCountry[0].population
    document.querySelector('.details .region span').innerText = currentCountry[0].region
    document.querySelector('.details .sub-region span').innerText = currentCountry[0].subregion
    document.querySelector('.details .capital span').innerText = currentCountry[0].capital
    document.querySelector('.details .domain span').innerText = currentCountry[0].topLevelDomain
    document.querySelector('.details .currencies span').innerText = currentCountry[0].currencies[0].name
    document.querySelector('.details .languages span').innerText = (currentCountry[0].languages).reduce((acc, language) => {
      return acc + ', ' + language.name
    }, '').slice(1)
    document.querySelector('.details .country-borders ul').innerHTML = (currentCountry[0].borders).reduce((acc, border) => {
    return acc + '<li>' + document.querySelector(`.${border} .infos h2`).innerText + '</li>'
    }, '')
    showSubDescription()
  }

  function showSubDescription() {
    document.querySelectorAll('.country-borders li').forEach((li, index) => {
      li.addEventListener('click', async (event) => {
        try {
          document.querySelector('.loader').classList.remove('remove')
          const countryByName = await fetch(`https://restcountries.eu/rest/v2/name/${event.target.innerText}`)
          const  currentCountry = await countryByName.json()
          document.querySelector('.loader').classList.add('remove')
          subDescription(currentCountry)
        } catch (error) {
          console.log(error)
        }
     })
    })
  }
}