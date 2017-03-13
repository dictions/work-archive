var swiper = new window.Swiper('.swiper-container', {
	slidesPerView: 'auto',
	spaceBetween: 40,
	loop: true,
	
	breakpoints: {
		799: {
			spaceBetween: 20
		}
	}
});