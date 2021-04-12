 export default function search() {
  const searchField = document.querySelector('.search input')
  searchField.addEventListener('focus', () => {
    function searching() {
      document.querySelectorAll('.countries > div').forEach((country) => {
        if(!country.classList[2].includes(searchField.value.toLowerCase())) {
          country.classList.add('remove')
          country.classList.remove('founded')
          if(document.querySelector('.founded') === null) {
            document.querySelector('.not-found').classList.remove('remove')
          } else {
            document.querySelector('.not-found').classList.add('remove')
          }
        }
         else {
          country.classList.remove('remove')
          country.classList.add('founded')
          document.querySelector('.not-found').classList.add('remove')          
        }
      })
    }
    var search = setInterval(searching, 1)
    searchField.addEventListener('blur', () => {
      clearInterval(search)
    })
  })
}