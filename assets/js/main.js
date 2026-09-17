/*=============== THEME TOGGLE ===============*/
const themeToggle = document.querySelector('.theme-toggle')
const savedTheme = localStorage.getItem('portfolio-theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const setTheme = (isDark) => {
   document.body.classList.toggle('dark-theme', isDark)

   if (themeToggle) {
      const icon = themeToggle.querySelector('i')
      const label = isDark ? 'Switch to light theme' : 'Switch to dark theme'

      themeToggle.setAttribute('aria-label', label)
      themeToggle.setAttribute('title', label)
      icon.className = isDark ? 'ri-sun-line' : 'ri-moon-line'
   }
}

setTheme(savedTheme ? savedTheme === 'dark' : prefersDark)

themeToggle?.addEventListener('click', () => {
   const isDark = !document.body.classList.contains('dark-theme')

   setTheme(isDark)
   localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
})

/*=============== TABS BUTTONS WITH SMOOTH ANIMATION ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

if (tabs.length && tabContents.length) {
   tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
         const targetSelector = tab.dataset.target,
               targetContent = document.querySelector(targetSelector),
               currentContent = document.querySelector('[data-content].main-active')

         if (!targetContent) return

         if (targetContent === currentContent) return

         tabs.forEach((t) => t.classList.remove('main-active'))
         tab.classList.add('main-active')

         if (currentContent) {
            currentContent.classList.remove('show')

            currentContent.addEventListener('transitionend', function handler() {
               currentContent.classList.remove('main-active')
               currentContent.removeEventListener('transitionend', handler)

               targetContent.classList.add('main-active')

               requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                     targetContent.classList.add('show')
                  })
               })
            }, { once: true })
         } else {
            targetContent.classList.add('main-active')
            requestAnimationFrame(() => {
               requestAnimationFrame(() => {
                  targetContent.classList.add('show')
               })
            })
         }
      })
   })
}

/*=============== INITIAL FADE IN ON LOAD ===============*/
window.addEventListener('load', () => {
   const initialContent = document.querySelector('[data-content].main-active')

   if (initialContent) {
      requestAnimationFrame(() => {
         requestAnimationFrame(() => {
            initialContent.classList.add('show')
         })
      })
   }
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'bottom',
   distance: '60px',
   duration: 2500,
   delay: 400,
})

sr.reveal('.profile__content, .skills, .tools, .experience, .education, .projects__card, .footer', {
   interval: 100,
   reset: false,
})

document.querySelectorAll('.projects__toggle').forEach((toggle) => {
   toggle.addEventListener('click', () => {
      const description = document.getElementById(toggle.getAttribute('aria-controls'))
      const expanded = toggle.getAttribute('aria-expanded') === 'true'

      if (!description) return

      toggle.setAttribute('aria-expanded', String(!expanded))
      toggle.textContent = expanded ? 'Read more' : 'Read less'
      description.classList.toggle('is-expanded', !expanded)
   })
})
