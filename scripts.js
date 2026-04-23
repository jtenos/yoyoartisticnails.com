async function loadReviews() {
  const reviewsRoot = document.getElementById("reviews");
  if (!reviewsRoot) return;

  try {
    const response = await fetch("/data/reviews.json");
    if (!response.ok) throw new Error("Could not load review data");
    const reviews = await response.json();

    reviewsRoot.innerHTML = "";
    reviews.forEach((review) => {
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      const body = document.createElement("p");

      summary.textContent = `${review.name} • ${review.rating}/5`;
      body.textContent = review.text;

      details.appendChild(summary);
      details.appendChild(body);
      reviewsRoot.appendChild(details);
    });
  } catch (error) {
    reviewsRoot.textContent = "Reviews are currently unavailable. Please check back soon.";
  }
}

loadReviews();
