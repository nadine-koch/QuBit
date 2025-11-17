import { getXP } from "./progressStorage.js";

function unlockLevels() {
    const totalLevels = 4; // Number of chapters
    const xpThreshold = 100;

    for (let i = 0; i < totalLevels - 1; i++) {
        const xp = getXP("chapter" + i);

        // level i complete -> unlock level i+1
        if (xp >= xpThreshold) {
            const next = document.getElementById("level" + (i + 1));
            if (next) {
                next.classList.remove("locked");
                next.classList.add("unlocked");
                next.setAttribute("href", `../chapters/chapter${i + 1}.html`);
            }
        }
    }
}

export function guardAccess(prevLevel, currentLevel, requiredXP = 100) {
    if (getXP(prevLevel) < requiredXP) {
        window.location.href = "../index.html";
    }
}

document.addEventListener("DOMContentLoaded", unlockLevels);
document.addEventListener("xpChanged", unlockLevels);
