// service-worker.js
const CACHE_NAME = "quantenreise-v2";

// Add all resources needed to run offline
const FILES_TO_CACHE = [
    "./",
    "./index.html",

    // Images and Icons
    "./images/Bloch_sphere.png",
    "./images/Complex_conjugate_ab.png",
    "./images/Grover_Algorithmus.jpg",
    "./images/Grover_Algorithmus_Marked.jpg",
    "./images/small_quantum_circuit.jpg",
    "./images/NPC.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png",

    // Chapters
    "./chapters/chapter0.html",
    "./chapters/chapter1.html",
    "./chapters/chapter2.html",
    "./chapters/chapter3.html",

    // Javascript
    "./js/burgerMenu.js",
    "./js/quizQuestions.js",
    "./js/levelLock.js",
    "./js/overallProgressBar.js",
    "./js/progressStorage.js",
    "./js/stickyHeaderProgressBar.js",
    "./js/chapterNavigation.js",

    // CSS
    "./styles.css",

    // Libraries
    "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
];

self.addEventListener("install", event => {
    self.skipWaiting();
    console.log("Service Worker installiert, aktiviere gleich...");
});

// activate: securely cache all files
self.addEventListener("activate", event => {
    event.waitUntil(
        (async () => {
            clients.claim();
            const cache = await caches.open(CACHE_NAME);
            console.log("Starte komplettes Caching aller Dateien...");
            for (const file of FILES_TO_CACHE) {
                try {
                    const response = await fetch(file, { cache: "no-cache" });
                    if (response.ok) {
                        await cache.put(file, response.clone());
                        console.log("Gecached:", file);
                    } else {
                        console.error("Fehler beim Cachen:", file, response.status);
                    }
                } catch (e) {
                    console.error("Netzwerkfehler bei:", file, e);
                }
            }
            console.log("Alle Dateien wurden gecached!");
        })()
    );
});

// fetch: Offline support
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});