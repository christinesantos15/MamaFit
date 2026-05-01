self.addEventListener("install", e=> {
    e.waitUntil(
        caches.open("mamafit").then(cache => {
            return cache.addAll( [
                "./",
                "./index.html",
                "./style.css",
                "./script.js"
            ]);
        })
    );
});