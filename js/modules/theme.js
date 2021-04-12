export default function theme() {
  const modeField = [document.querySelector('.theme span'), document.querySelector('.theme i')]
  modeField.forEach((themeField) => {
    themeField.addEventListener('click', () => {
      document.querySelector('body').classList.toggle('dark')
    })
  })
}