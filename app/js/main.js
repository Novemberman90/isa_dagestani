window.addEventListener('DOMContentLoaded',()=>{

  // ===== MENU =====
  const MENUBTN = document.querySelector(".menu__btn");
  const MENU = document.querySelector('.menu__nav');
  
  MENUBTN.addEventListener("click", ()=>{
    if(MENUBTN) {
      openMenu();
      document.body.classList.toggle('lock');
    }
  });
  const openMenu=()=>{
    MENU.classList.toggle('menu__nav--active');
    MENUBTN.classList.toggle('menu__btn--active');
  }
  const closeMenu =()=>{
    document.body.classList.remove('lock');
    MENU.classList.remove('menu__nav--active');
    MENUBTN.classList.remove('menu__btn--active');
  }
  
/* Скрол меню */
  const navLink = document.querySelectorAll('a[href^="#"], [data-scroll]');
  navLink.forEach(link => {
    link.addEventListener('click', (e)=>{
      e.preventDefault();
       const targetId = link.dataset.scroll || link.getAttribute('href').substring(1);
       
       if(targetId) {
        scrollNavigation(targetId);
        closeMenu();
       }
    })
  });

  const scrollNavigation = (targetId)=> {
    const targetElement = document.getElementById(targetId);
  
    if(!targetElement) return;

    const headerHeght = document.querySelector('#header').offsetHeight;
    const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeght;

      window.scrollTo({
        top: top,
        behavior:'smooth',
      })
  }

  //===== Slider ABOUT SECTION

    var swiper = new Swiper(".about-slider", {
      slidesPerView: 2.5,
      spaceBetween: 65,
      navigation: {
        nextEl: ".about-slider__btn--next",
        prevEl: ".about-slider__btn--prev",
      },
    });

  //===== FAQ =====
  const ACCORDEON = document.querySelectorAll("[data-accordion]");
  
  ACCORDEON.forEach(item => {
    const btn = item.querySelector(".faq__question");
    const content = item.querySelector("[data-accordion-content]");
    const currentIcon = item.querySelector('.faq__question-icon');
  
    btn.addEventListener("click", () => {
      const isOpen = content.style.maxHeight;
  
      // Закрыть все ответы и вернуть все иконки
      document.querySelectorAll("[data-accordion-content]").forEach( answer => {
        answer.style.maxHeight = null;
        answer.classList.remove("open");
      });
  
      document.querySelectorAll(".faq__question-icon").forEach(icon  => {
        icon.classList.remove("faq__question-icon--open");
      });
  
       // Если не было открыто — открыть
       if(!isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add("open");
  
        // Повернуть иконку только у текущего аккордеона
        currentIcon.classList.add("faq__question-icon--open");
       }
  
    })
  });



});

