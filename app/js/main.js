
const ACCORDEON = document.querySelectorAll("[data-accordion]");

ACCORDEON.forEach(item => {
  const btn = item.querySelector(".faq__question");
  const content = item.querySelector("[data-accordion-content]");

  btn.addEventListener("click", () => {
    const isOpen = content.style.maxHeight;

    // Закрыть все
    document.querySelectorAll("[data-accordion-content]").forEach( answer => {
      answer.style.maxHeight = null;
      answer.classList.remove("open");
    });

     // Если не было открыто — открыть
     if(!isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("open");
     }
  })
});