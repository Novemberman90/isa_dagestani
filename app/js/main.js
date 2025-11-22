
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

  // Создаем IntersectionObserver, который будет следить за элементами на странице
const observer = new IntersectionObserver((entries)=> {
  entries.forEach(entry => {

     // Проверяем, пересек ли элемент 50% своей высоты в зоне видимости
    if(entry.isIntersecting){
      // Получаем id элемента, который сейчас виден
       const activeId = entry.target.id;
       
       // Удаляем класс активности у всех элементов списка навигации
       document.querySelectorAll('.menu__link').forEach(item => {
        item.classList.remove('menu__link--active')
       });

       // Находим ссылку, которая ведет к активному элементу
       const adctivLink = document.querySelector(`.menu__link[href="#${activeId}"]`);

       // Если такая ссылка существует, добавляем активный класс ее родителю (элементу списка)
       if(adctivLink) {
        adctivLink.closest('.menu__link').classList.add('menu__link--active');
       }
    }

  });
}, {threshold: 0.3} ); 

// Находим все элементы, за которыми будем следить, и подключаем их к Observer'у

document.querySelectorAll('#hero, #about, #projects, #media, #contact').forEach(element => {
  observer.observe(element)
});

/* При скроле меняется хедер */
let isScrolled = false;
const headerScroll = () => {
  const header = document.querySelector('.header');
  const headerHeght = header.offsetHeight;
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;


    if (scrollPosition >= headerHeght && !isScrolled) {
    isScrolled = true;
    header.classList.add('header--blur')
      
  } else if (scrollPosition  <= headerHeght && isScrolled) {
     isScrolled = false;
     header.classList.remove('header--blur')
  }
  
}
window.addEventListener('scroll', headerScroll);


  //===== Slider ABOUT SECTION

let aboutSlider;
let mediaSwiper;

function initSliders() {
  if (aboutSlider) aboutSlider.destroy(true, true);
  if (mediaSwiper) mediaSwiper.destroy(true, true);

  aboutSlider = new Swiper(".about-slider", {
    slidesPerView: 'auto',
    spaceBetween: 65,
    navigation: {
      nextEl: ".about-slider__btn--next",
      prevEl: ".about-slider__btn--prev",
    }
  });

  mediaSwiper = new Swiper('.media-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.media-slider__btn--next',
      prevEl: '.media-slider__btn--prev'
    },
    on: {
      slideChange() {
        updateTabs(this.activeIndex);
      }
    }
  });
}

initSliders();

  // табы
  const tabs = document.querySelectorAll('.media-tabs__tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      let index = tab.dataset.index;
      mediaSwiper.slideTo(index);
    });
  });

  // обновление активного таба
  const updateTabs =(activeIndex) => {
    tabs.forEach(tab => tab.classList.remove('media-tabs__tab--active'));
    tabs[activeIndex].classList.add('media-tabs__tab--active');
  }






  //===== FAQ =====


  const accordeons = document.querySelectorAll("[data-accordion]");

accordeons.forEach(item => {
  const btn = item.querySelector(".faq__question");
  const content = item.querySelector("[data-accordion-content]");
  const icon = item.querySelector(".faq__question-icon");

  btn.addEventListener("click", () => {
    
    const isOpening = !content.classList.contains("open");

    // 1. Закрываем все остальные аккордеоны
    document.querySelectorAll("[data-accordion-content]").forEach(c => {
      c.style.maxHeight = null;
      c.classList.remove("open");
    });

    document.querySelectorAll(".faq__question-icon").forEach(i => {
      i.classList.remove("faq__question-icon--open");
    });

    // 2. Открываем только текущий (если он был закрыт)
    if (isOpening) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
      icon.classList.add("faq__question-icon--open");
    }
  });
});




let translations = {};
let currentLang = "en";

// Загружаем JSON
fetch("./lang/lang.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    updateContent();
    applyLanguage(currentLang)
  });


  const applyLanguage = (lang) => {
  document.documentElement.setAttribute("lang", lang);

  if (lang === "ar") {
    document.documentElement.classList.add("arabic");
    document.documentElement.setAttribute("dir", "rtl");
    aboutSlider.changeLanguageDirection("rtl");
    mediaSwiper.changeLanguageDirection("rtl");
  } else {
    document.documentElement.classList.remove("arabic");
    document.documentElement.removeAttribute("dir");
    aboutSlider.changeLanguageDirection("");
    mediaSwiper.changeLanguageDirection("");
  }
  
 setTimeout(() => {
    initSliders();
  }, 50);
}


// Функция обновления всех текстов
const updateContent = () => {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerHTML = translations[currentLang][key];
    }
  });
}

  // Переключение языка
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      currentLang = btn.dataset.lang;
      updateContent();
      applyLanguage(currentLang);

      // визуально активная кнопка
      document.querySelectorAll(".lang__option").forEach(l => l.classList.remove("lang__option--active"));
      btn.classList.add("lang__option--active");
    });
  });


  /* Анимация */
  //new WOW().init();
  new WOW({
  boxClass:     'wow',
  animateClass: 'animated',
  offset:       100,
  mobile:       true,
  live:         true,
  callback: function(el) {
    el.style.visibility = "visible";
  }
}).init();


// Also can pass in optional settings block
  var rellax = new Rellax('.rellax', {
    speed: -3,
    center: false,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
  });
  const rellaxAbout = new Rellax('.rellax-projects', {
    speed: -3,
    center: true,
    wrapper: null,
    round: true,
    vertical: true,
    horizontal: false
   });

});