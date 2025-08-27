const toggleLang = document.querySelector('.language-toggle')
toggleLang.addEventListener('click', ()=>{
  toggleLang.classList.toggle('active')
})

const modal = document.querySelector('.modal')
const openModalBtns = document.querySelectorAll('.open-modal')
const closeModal = document.querySelector('.modal-content')

openModalBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    modal.style.display = 'flex'
  })
})

closeModal.addEventListener('click', ()=>{
  modal.style.display = 'none'
})

const animates = document.querySelectorAll('.animate')

window.addEventListener('scroll', ()=>{
  animates.forEach(item=>{
    const top = item.getBoundingClientRect().top
    if(top < window.innerHeight - 100){
      item.classList.add('show')
    } else {
      item.classList.remove('show')
    }
  })
})

const submitBtn = document.querySelector('.submit-btn')
const form = document.querySelector('form')

submitBtn.addEventListener('click', (e)=>{
  e.preventDefault()
  const name = document.querySelector('input[name="name"]').value
  const message = document.querySelector('textarea[name="message"]').value
  if(name && message){
    alert('form submitted')
    form.reset()
  } else {
    alert('please fill all fields')
  }
})

const navLinks = document.querySelectorAll('nav ul li a')

navLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault()
    const target = document.querySelector(link.getAttribute('href'))
    if(target){
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      })
    }
  })
})

const problemCards = document.querySelectorAll('.problem-card')

problemCards.forEach(card=>{
  card.addEventListener('mouseenter', ()=>{
    card.style.transform = 'translateY(-5px)'
  })
  card.addEventListener('mouseleave', ()=>{
    card.style.transform = 'translateY(0)'
  })
})