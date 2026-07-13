document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const text = document.querySelector(".reveal-text");

    const words = text.textContent.trim().split(" ");

    text.innerHTML = words
        .map(word => `<span class="word">${word}</span>`)
        .join(" ");

    const wordSpans = text.querySelectorAll(".word");

    ScrollTrigger.create({
        trigger: "#mission",
        start: "top center",
        end: () => "+=" + wordSpans.length * 35,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        pinSpacing: true,

        onUpdate: (self) => {
            const activeWords = Math.floor(self.progress * wordSpans.length);

            wordSpans.forEach((word, index) => {
                word.classList.toggle("active", index <= activeWords);
            });
        }
    });

    ScrollTrigger.refresh();
});