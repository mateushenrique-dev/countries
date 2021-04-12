export default function showByCategories() {
  const categoryField = document.querySelector('select')
  categoryField.addEventListener('click', (event) => {
    document.querySelectorAll('.country').forEach((country, index) => {
      if(country.classList[3] === event.target.value) {
        country.classList.remove('remove')
      } 
      else if(event.target.value === '') {
        country.classList.remove('remove')
      }
      else {
        country.classList.add('remove')
      }
    })
  })
}