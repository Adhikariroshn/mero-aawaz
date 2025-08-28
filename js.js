const toggleLang = document.querySelector('.language-toggle')
let lang = "EN"

toggleLang.addEventListener('click', () => {
  let span = toggleLang.querySelector('span')
  if(lang === "EN"){
    lang = "NP"
    span.innerText = "NP"
  } else {
    lang = "EN"
    span.innerText = "EN"
  }
})

const modal = document.getElementById('successModal')
const modalOkBtn = document.getElementById('modalOkBtn')

document.querySelectorAll('.complaint-form button, #customComplaintBtn').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()
    modal.style.display = "flex"
  })
})

modalOkBtn.addEventListener('click', () => {
  modal.style.display = "none"
})

window.addEventListener('click', e => {
  if(e.target === modal){
    modal.style.display = "none"
  }
})

const animItems = document.querySelectorAll('.animate')
window.addEventListener('scroll', () => {
  animItems.forEach(item => {
    const rect = item.getBoundingClientRect()
    if(rect.top < window.innerHeight - 50){
      item.classList.add('show')
    } else if(rect.top > window.innerHeight){
      item.classList.remove('show')
    }
  })
})

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault()
    const nameField = form.querySelector('input[type="text"]')
    const msgField = form.querySelector('textarea')
    if(nameField.value === "" || msgField.value === ""){
      alert("Please fill all fields")
    } else {
      alert("Message sent: " + nameField.value)
      form.reset()
    }
  })
})