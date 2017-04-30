export default containerSelector => {
	const sliderContainer = document.querySelector(containerSelector);
	
	if (!sliderContainer) return;
	
	sliderContainer.classList.add('swiper--loaded');
	
	const swiper = new window.Swiper(containerSelector, {
		slidesPerView: 'auto',
		spaceBetween: 40,
		loop: true,
		prevButton: '.work-slide__prev',
		nextButton: '.work-slide__next',
		breakpoints: {
			799: { spaceBetween: 20 }
		}
	});
	const slideTitle = sliderContainer.querySelector('.work-label__title');
	const slideRole = sliderContainer.querySelector('.work-label__role');
	const slideSelfInitiated = sliderContainer.querySelector('.work-label__self');
	const slideMono = sliderContainer.querySelector('.work-label__mono');

	
	const onSlideChangeEnd = slider => {
		const currentSlide = sliderContainer.querySelector(`.swiper-slide-active[data-swiper-slide-index="${slider.realIndex}"]`);
		let {work} = currentSlide.dataset;
		work = JSON.parse(work);
		
		slideTitle.innerHTML = (`
			<a class="underline--hover" href="${work.link}">${work.title}</a>
		`);
		slideRole.innerHTML = work.role;
		
		if (work.self) {
			slideSelfInitiated.style.display = 'inline-block';
		} else {
			slideSelfInitiated.style.display = 'none';
		}
		
		if (work.mono) {
			slideMono.style.display = 'inline-block';
		} else {
			slideMono.style.display = 'none';
		}
	};

	swiper.on('slideChangeEnd', onSlideChangeEnd);
	onSlideChangeEnd(swiper);
};