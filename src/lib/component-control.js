let collapsible_buttons = document.querySelectorAll(".collapsible");
collapsible_buttons.forEach((el) => {
    el.addEventListener("click", () => {
        let targetSelector = el.getAttribute("data-bs-target");
        let target = document.querySelector(targetSelector);
        let wrapper = target.querySelector(".measuringWrapper");
        console.log(wrapper.clientHeight);
        // target.classList.toggle("show");
        if (target.clientHeight) {
            target.style.height = 0;
        } else {
            target.style.height = wrapper.clientHeight + "px";
        }
        // el.classList.toggle("active");
    });
});

let dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((el) => {
    let button = el.querySelector(".dropdown-toggle");
    button.addEventListener("click", () => {
        let target = el.querySelector(".dropdown-menu");
        target.classList.toggle("show");
    });
})
