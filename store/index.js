import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      const context = require.context('~/content/collections/', false, /\.json$/);
      const collections = context.keys().map(key => ({
        _path: `${key.replace('.json', '').replace('./', '')}`
      })).sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
      });
      return {
        collections, 
        nextCollection: ''
      }
    },
    getters: {
      getNextPage: state => state.nextCollection,
    },
    mutations: {
      updatePage(state, pageName) {
        // Get the index of the current page
        let currentCollection = state.collections.findIndex(x => x._path === pageName);
        // Update index to the next page
        if (currentCollection === state.collections.length - 1) {
          currentCollection = 0;
        } else {
          currentCollection = currentCollection + 1;
        }
        // Get the slug of the next page
        state.nextCollection = state.collections[currentCollection]._path;
      },
    },
  })
}

export default createStore
