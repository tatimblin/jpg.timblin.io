import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state() {
      const context = require.context('~/content/collections/', false, /\.json$/);
      const collections = context.keys().map(key => ({
        ...context(key),
        _path: `${key.replace('.json', '').replace('./', '')}`,
      })).sort(function(a, b) {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
      });
      return {
        page: 'index',
        collections
      }
    },
    mutations: {
      updatePage(state, pageName) {
        state.page = pageName
      },
    },
  })
}

export default createStore
