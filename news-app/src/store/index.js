import { createStore } from 'vuex'
import { API_BASE_URL } from "@/constants";
import NewsDTO from '/dto/NewsDTO'

const store = createStore({
  state: {
    news: [],
    newsSourceSites: [
      'rbc', 'mail'
    ],
    newsPerPage: 10,
    updateInterval: 1,
    sourceSite: 'rbc',
    currentPage: 1,
    sortBy: 'id',
    sortOrder: 'desc',
    intervalId: null
  },
  mutations: {
    setNews(state, news) {
      state.news = news;
    },
    updateNewsPerPage(state, newsPerPage) {
      state.newsPerPage = newsPerPage;
    },
    updateUpdateInterval(state, updateInterval) {
      state.updateInterval = updateInterval;
    },
    updateSourceSite(state, sourceSite) {
      state.sourceSite = sourceSite;
    },
    updateSortBy(state, sortBy) {
      state.sortBy = sortBy;
    },
    updateSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder;
    },
    updateNewsRatings(state) {
      state.news.forEach(newsItem => {
        newsItem.rating = Math.floor(Math.random() * 11);
      });
    }
  },
  actions: {
    fetchNews({ state, commit }) {
      const url = `${API_BASE_URL}api/parsed_news/${state.sourceSite}?page_size=${state.newsPerPage}&page=${state.currentPage}&sort=${state.sortBy}&sort_order=${state.sortOrder}`;

      if (!state.newsPerPage || !state.sourceSite) return;

      return fetch(url)
          .then(response => response.json())
          .then(data => {
            const newsDTO = data.map(item => new NewsDTO(item));
            commit('setNews', newsDTO);
          });
    },
    updateNewsPerPage({ commit, dispatch }, newsPerPage) {
      commit('updateNewsPerPage', newsPerPage);
      dispatch('fetchNews');
    },
    updateUpdateInterval({ commit }, updateInterval) {
      commit('updateUpdateInterval', updateInterval);
    },
    updateSourceSite({ commit, dispatch }, sourceSite) {
      commit('updateSourceSite', sourceSite);
      dispatch('fetchNews');
    },
    updateSortBy({ commit, dispatch }, sortBy) {
      commit('updateSortBy', sortBy);
      dispatch('fetchNews');
    },
    updateSortOrder({ commit, dispatch }, sortOrder) {
      commit('updateSortOrder', sortOrder);
      dispatch('fetchNews');
    },
    updateNewsRatings({ commit }) {
      commit('updateNewsRatings');
    }
  },
  getters: {
    news: state => state.news,
    newsPerPage: state => state.newsPerPage,
    updateInterval: state => state.updateInterval,
    sourceSite: state => state.sourceSite,
    sortBy: state => state.sortBy,
    sortOrder: state => state.sortOrder,
    newsSourceSites: state => state.newsSourceSites
  }
})

function updateInterval() {
  clearInterval(store.state.intervalId);
  store.state.intervalId = setInterval(() => {
    console.log(store.state.updateInterval);
    store.dispatch('updateNewsRatings');
  }, store.state.updateInterval * 1000);
}
updateInterval();

store.watch(
    (state) => state.updateInterval,
    () => {
      updateInterval();
    }
);


export default store