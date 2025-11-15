
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