let highlightedCard;
let observer;

function highlightLinkedPaper() {
  observer?.disconnect();
  highlightedCard?.classList.remove("publication-highlight");
  highlightedCard = undefined;

  const id = window.location.hash.slice(1);
  const card = document.getElementById(id);
  if (!card?.classList.contains("publication-card")) return;

  highlightedCard = card;
  card.classList.add("publication-highlight");

  let enteredViewport = false;
  const cardObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      enteredViewport = true;
    } else if (enteredViewport) {
      card.classList.remove("publication-highlight");
      cardObserver.disconnect();
    }
  }, { rootMargin: "-12% 0px -10% 0px" });
  observer = cardObserver;
  observer.observe(card);
}

window.addEventListener("hashchange", highlightLinkedPaper);
highlightLinkedPaper();
