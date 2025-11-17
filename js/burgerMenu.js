export function setupBurgerMenu() {
    const menu = document.getElementById("sideMenu");
    const burgers = document.querySelectorAll(".burger");

    burgers.forEach(burger => {
        burger.addEventListener("click", () => {
            menu.classList.toggle("open");
        });
    });
}
