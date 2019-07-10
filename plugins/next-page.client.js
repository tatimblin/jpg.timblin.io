import Vue from 'vue'

Vue.prototype.$triggerNextPage = (callback) => {
	window.onscroll = () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			callback();
		}
	}
}