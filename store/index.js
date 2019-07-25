import Vuex from 'vuex'
import Vue from 'vue'

const createStore = () => {
  return new Vuex.Store({
    state() {
      const context = require.context('~/content/collections/', false, /\.json$/);
      const collections = context.keys().map(key => ({
        ...context(key),
        _path: `${key.replace('.json', '').replace('./', '')}`
      })).sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
      });
      return {
        collections,
        currentIndex: 0,
        nextIndex: 0,
        pageData: {}
      }
    },
    getters: {
      getFirstPage: state => state.collections[0]._path,
      getNextPage: state => state.collections[state.nextIndex]._path,
      getPageData: state => state.pageData,
    },
    mutations: {
      updatePage(state, pageName) {
        // Get the index of the current page
        let index = state.collections.findIndex(x => x._path === pageName);
        state.currentIndex = index

        // Initialize pageData
        state.pageData = state.collections[index]

        // Update index to the next page
        if (index === state.collections.length - 1) {
          index = 0;
        } else {
          index = index + 1;
        }
        state.nextIndex = index
      },
      previewPageData(state, preview) {
        let data = state.collections[state.currentIndex]
        if (preview) {
          //state.pageData = state.collections[state.nextIndex]
          data = state.collections[state.nextIndex]
        }
        
        //state.pageData = Object.assign({}, state.pageData, data)
        state.pageData = data
        Vue.set(state.pageData, 'title', preview)
        Vue.set(state.pageData, 'description', 'goodbye')
        console.log(state.pageData)
      },
    },
  })
}

export default createStore
