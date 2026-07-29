async function loadReviews() {
	const reviewsRoot = document.getElementById("reviews");
	if (!reviewsRoot) return;

	try {
		const response = await fetch("/data/reviews.json");
		if (!response.ok) throw new Error("Could not load review data");
		const reviews = await response.json();

		shuffleReviews(reviews);

		reviewsRoot.innerHTML = "";
		reviews.slice(0, 5).forEach((review) => {
			const details = document.createElement("details");
			const summary = document.createElement("summary");
			const body = document.createElement("p");

			const anchor = document.createElement("a");
			anchor.href = review.url;
			anchor.target = "_blank";
			anchor.rel = "noopener noreferrer";
			anchor.textContent = "Read full review";

			summary.textContent = `${review.name} • ${review.rating}/5`;
			body.textContent = review.text;

			if (review.url) {
				body.appendChild(document.createElement("br"));
				body.appendChild(document.createElement("br"));
				body.appendChild(anchor);
			}

			details.appendChild(summary);
			details.appendChild(body);
			reviewsRoot.appendChild(details);
		});
	} catch (error) {
		reviewsRoot.textContent = "Reviews are currently unavailable. Please check back soon.";
	}
}

function shuffleReviews(reviews) {
	// Show 5 reviews chosen at random (Fisher–Yates shuffle, then slice).
	for (let i = reviews.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[reviews[i], reviews[j]] = [reviews[j], reviews[i]];
	}
}

loadReviews();

function showWelcomeModal() {
	const overlay = document.getElementById("welcome-modal");
	if (!overlay) return;

	// Show at most once per day. The cookie stores the date it was last
	// dismissed; if that isn't today (including the stale "=1" flag from the
	// old "once ever" scheme), show the banner again and reset the timer.
	const today = new Date().toISOString().slice(0, 10);
	const seenValue = document.cookie
		.split("; ")
		.find((cookie) => cookie.startsWith("welcomeModalSeen="))
		?.split("=")[1];
	if (seenValue === today) return;

	const closeButton = document.getElementById("welcome-modal-close");

	function close() {
		overlay.hidden = true;
		document.cookie = "welcomeModalSeen=" + today + "; path=/; max-age=" + 60 * 60 * 24 + "; samesite=lax";
	}

	overlay.hidden = false;
	closeButton.addEventListener("click", close);
	overlay.addEventListener("click", (event) => {
		// Close only when the overlay itself (not the dialog) is clicked.
		if (event.target === overlay) close();
	});
}

showWelcomeModal();
