document.addEventListener("DOMContentLoaded", function () {
	let swiper = new Swiper(".mySwiper", {
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			bulletClass: "swiper-pagination-bullet",
			bulletActiveClass: "swiper-pagination-bullet-active",
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	function animateValue(obj, start, end, duration, includePlus = false) {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min(
				(timestamp - startTimestamp) / duration,
				1,
			);
			obj.innerHTML =
				(includePlus ? "+" : "") +
				Math.floor(progress * (end - start) + start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					document.querySelectorAll(".numbers").forEach((number) => {
						const textContent = number.textContent;
						const value = parseInt(textContent.replace("+", ""));
						const includePlus = textContent.includes("+");
						animateValue(number, 0, value, 1000, includePlus);
					});
					observer.disconnect();
				}
			});
		},
		{ threshold: 0.5 },
	);

	observer.observe(document.querySelector(".container"));
	const filterSelector = document.querySelector("#filter-selector");
	const productCards = document.querySelectorAll(".product-card");

	function updateFilters() {
		const selectedOption =
			filterSelector.options[filterSelector.selectedIndex];
		const selectedValue = selectedOption.value;
		const selectedText = selectedOption.text;
		const isBrandOption = selectedValue.endsWith("-all");

		productCards.forEach((card) => {
			if (selectedValue === "all") {
				card.classList.remove("d-none");
			} else if (isBrandOption) {
				const brandClass = selectedValue.replace("-all", "");
				if (card.classList.contains(brandClass)) {
					card.classList.remove("d-none");
				} else {
					card.classList.add("d-none");
				}
			} else {
				if (card.classList.contains(selectedValue)) {
					card.classList.remove("d-none");
				} else {
					card.classList.add("d-none");
				}
			}
		});
	}

	filterSelector.addEventListener("change", updateFilters);
});
