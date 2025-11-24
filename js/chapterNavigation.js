import { getXP } from "./progressStorage.js";

const REQUIRED_XP = 100;

function initChapterNavigation() {
    const nav = document.querySelector(".chapter-nav");
    if (!nav) return;

    const nextLink = nav.querySelector(".chapter-btn.next");
    if (!nextLink) return;

    const chapterKey = document.body.dataset.key;
    if (!chapterKey) return;

    const targetHref = nextLink.dataset.target;
    if (!targetHref) return;

    function updateNextButton(xp) {
        if (xp >= REQUIRED_XP) {
            nextLink.classList.remove("disabled");
            nextLink.setAttribute("href", targetHref);
        } else {
            nextLink.classList.add("disabled");
            nextLink.removeAttribute("href");
        }
    }

    // Initial state when loading the page
    const currentXP = getXP(chapterKey);
    updateNextButton(currentXP);

    // Update as soon as XP is changed in the chapter
    document.addEventListener("xpChanged", (event) => {
        const detail = event.detail;
        if (!detail || detail.key !== chapterKey) return;
        updateNextButton(detail.xp);
    });
}

document.addEventListener("DOMContentLoaded", initChapterNavigation);
