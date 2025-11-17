export function getXP(key) {
    return parseInt(localStorage.getItem(key + "xp") || "0");
}

export function setXP(key, updatedPoints) {
    localStorage.setItem(key + "xp", updatedPoints);
    triggerXPUpdate(document.body.dataset.key);

    document.dispatchEvent(new CustomEvent("xpChanged", {
        detail: { key, xp: updatedPoints }
    }));

    updateProgressBar(key);
}

export function addXP() {
    const key = document.body.dataset.key;
    const questionNumber = document.body.dataset.questionsnumber;

    const currentPoints = getXP(key);
    let updatedPoints = Math.round(currentPoints + 100/questionNumber);
    updatedPoints = Math.min(100, updatedPoints);
    setXP(key, updatedPoints);
}

export function updateProgressBar(key) {
    const xp = getXP(key);
    const progress = document.getElementById("xp-bar");
    const text = document.getElementById("xp-text");

    if (progress) {
        progress.value = xp;
    }

    if (text) {
        text.textContent = `${xp} / 100 XP`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const key = document.body.dataset.key;
    updateProgressBar(key);
});

export function triggerXPUpdate(chapterKey) {
    const xp = getXP(chapterKey);
    const event = new CustomEvent("xpUpdated", {
        detail: { chapter: chapterKey, xp: xp }
    });
    document.dispatchEvent(event);
}
