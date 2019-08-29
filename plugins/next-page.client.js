import Vue from 'vue'

Vue.prototype.$triggerNextPage = (callback) => {
	const grace = 50;
	window.onscroll = () => {
		if (window.scrollY > grace) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - grace) {
				callback();
			}
		}
	}
}