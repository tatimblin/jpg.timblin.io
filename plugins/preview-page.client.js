import Vue from 'vue'

Vue.prototype.$previewPageData = (callback) => {
  let preview = false
  window.onscroll = () => {
    if (window.scrollY > window.innerHeight && preview === false) {
      preview = true
      callback(preview)
    } else if (window.scrollY < window.innerHeight && preview === true) {
      preview = false
      callback(preview)
    }
	}
}
