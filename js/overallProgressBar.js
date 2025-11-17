import { getXP } from "./progressStorage.js";

// List of all chapters (keys and number of questions must be defined here)
const chapters = [
    { key: "chapter0", questions: 2 },
    { key: "chapter1", questions: 5 },
    { key: "chapter2", questions: 5 },
    { key: "chapter3", questions: 4 }
];

// List of titles
const titles = [
    "Titel 1: Schulbankdrücker:in",
    "Titel 2: Nachwuchs-Quantenforscher:in",
    "Titel 3: Quanten-Tüftler:in",
    "Titel 4: Quantenmeister:in",
    "Titel 5: Quantenlegende"
];

export function updateOverallProgress() {
    let totalQuestions = 0;
    let totalProgress = 0;

    chapters.forEach(chapter => {
        const xp = getXP(chapter.key);
        totalQuestions += chapter.questions;
        totalProgress += (xp / 100) * chapter.questions;
    });

    // calculate proportion of a single quiz question
    let percentage = (totalProgress / totalQuestions) * 100;
    // stop at 100 xp
    percentage = Math.min(100, percentage);

    // update progress bar
    const progress = document.getElementById("xp-bar");
    const statusText = progress?.previousElementSibling; // das <div> vor der Bar

    if (progress) {
        progress.value = percentage;
    }

    // determine title based on percentage
    let titleIndex = Math.min(
        titles.length - 1,
        Math.floor((percentage / 100) * titles.length)
    );

    if (statusText) {
        statusText.textContent = titles[titleIndex];
    }
}

// execute immediately when loading the index page
document.addEventListener("DOMContentLoaded", updateOverallProgress);
