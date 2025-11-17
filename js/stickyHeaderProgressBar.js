window.addEventListener("scroll", () => {
    const progress = document.getElementById("progressHeader");
    if (window.scrollY > 80) {
        progress.classList.add("sticky");
    } else {
        progress.classList.remove("sticky");
    }
});