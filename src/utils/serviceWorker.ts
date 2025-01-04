export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "/forge-fit/sw.js"
        );
        console.log("ServiceWorker registration successful:", registration);
      } catch (error) {
        console.error("ServiceWorker registration failed:", error);
      }
    });
  }
}
