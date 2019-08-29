import Vue from 'vue'

Vue.prototype.$triggerNextPage = (callback) => {
	const grace = 50;
	window.onscroll = () => {
		if (window.scrollY > 1) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - grace) {
				callback();
			}
		}
	}
}