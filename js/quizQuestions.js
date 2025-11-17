import { addXP } from './progressStorage.js';

function setupQuiz(id, correctAnswer) {
    const select = document.getElementById(id);
    if (!select) return;

    const key = "quiz-" + id + "-answered";
    const alreadyAnswered = localStorage.getItem(key) === "true";

    // create feedback element (if not already present)
    let feedback = document.createElement("div");
    feedback.classList.add("quiz-feedback");
    select.insertAdjacentElement("afterend", feedback);

    function lockCorrectAnswer() {
        // mark the correct answer in color
        for (let option of select.options) {
            if (option.value === correctAnswer) {
                option.style.backgroundColor = "#c8f7c5"; // hellgrün
                option.style.fontWeight = "bold";
            } else {
                option.disabled = true; // alle anderen Antworten deaktivieren
            }
        }
    }

    if (alreadyAnswered) {
        // restore condition
        lockCorrectAnswer();
        select.value = correctAnswer;
        feedback.textContent = "✅ Bereits richtig beantwortet!";
        feedback.style.color = "green";
        return;
    }

    select.addEventListener("change", function () {
        const value = this.value;

        if (value === correctAnswer) {
            feedback.textContent = "✅ Richtig!";
            feedback.style.color = "green";
            addXP();
            localStorage.setItem(key, "true");

            // select and lock the drop-down menu
            lockCorrectAnswer();
            select.value = correctAnswer;
        } else {
            feedback.textContent = "❌ Falsch! Versuch’s nochmal.";
            feedback.style.color = "red";
        }
    });
}

// Chapter 0
setupQuiz("quiz-quantum-advantage", "Weil sie durch Superposition und Verschränkung viele mögliche Zustände gleichzeitig verarbeiten können");
setupQuiz("quiz-quantum-usecase", "Beim Entdecken neuer Medikamente durch Simulation von Molekülen");

// Chapter 1
setupQuiz("quiz-bit-vs-qubit", "Ein Qubit kann sich in einer Überlagerung von 0 und 1 befinden");
setupQuiz("bloch-sphere", "Der Vektorpfeil zeigt auf einen Punkt auf dem Äquator.");
setupQuiz("max-born-rule", "Die Summe der Wahrscheinlichkeiten in einem System muss 1 sein.")

setupQuiz("bloch-mid-equator", "Das Qubit wird zu 50 % als |0⟩ und zu 50 % als |1⟩ gemessen.");
setupQuiz("phase-difference", "Das Messergebnis ist gleich, da die relative Phase keinen Einfluss auf Messung in der Z-Basis hat.");
setupQuiz("entanglement-correlation", "Es wird ebenfalls |0⟩ sein.");

// Chapter 2
setupQuiz("quiz-gate-action", "Das Qubit wird durch eine Matrixoperation verändert");
setupQuiz("quiz-unitarity", "Damit die Gesamtwahrscheinlichkeit immer erhalten bleibt");
setupQuiz("quiz-hadamard-on-1", "Es entsteht die Superposition mit gleichem Anteil von |0⟩ und |1⟩, aber mit negativem Vorzeichen vor |1⟩");
setupQuiz("quiz-cnot", "Das Ziel-Qubit wird invertiert (|0⟩ ↔ |1⟩)");
setupQuiz("quiz-circuit-purpose", "Für eine visuelle Darstellung der Abfolge von Quantengattern");

// Chapter 3
setupQuiz("quiz-phase-flip", "Pauli-Z-Gatter");
setupQuiz("quiz-mark-001", "X auf q2 und q1 → CCZ → X auf q2 und q1");
setupQuiz("quiz-iterations", "2");
setupQuiz("quiz-oracle-multi-target", "Zwei Orakel-Blöcke nacheinander: Für jeden Zielzustand passende X-Vor-/Nachschaltungen, dann ein mehrfach-kontrolliertes Z, danach die Xs wieder rückgängig machen.");
