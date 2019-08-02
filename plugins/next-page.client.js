import Vue from 'vue'

Vue.prototype.$triggerNextPage = (callback) => {
	window.onscroll = () => {
		if (window.scrollY > 1) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				callback();
			}
		}
	}
}