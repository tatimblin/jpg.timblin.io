import Vue from 'vue'

Vue.prototype.$triggerNextPage = (callback, delay = 300) => {
	const grace = 50;
	let timeout;
	window.onscroll = () => {
		clearTimeout(timeout);
		if (isScrolledBottom()) timeout = setTimeout(callback, delay);
	}
}

function isScrolledBottom(grace = 0) {
	const documentHeight = document.body.offsetHeight;
	const scrolledHeight = window.innerHeight + window.scrollY;

	return scrolledHeight >= documentHeight - grace;
}
