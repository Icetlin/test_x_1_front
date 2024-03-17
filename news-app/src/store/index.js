import { createStore } from 'vuex'
import {API_BASE_URL} from "@/constants";

const store = createStore({
  state: {
    news: [],
    newsPerPage: 10,
    updateInterval: 60,
    sourceSite: 'rbc',
    currentPage: 1,
    sort: 'id',
    sortOrder: 'desc'
  },
  mutations: {
    setNews(state, news) {
      state.news = news
    },
    setNewsPerPage(state, newsPerPage) {
      state.newsPerPage = newsPerPage
    },
    setUpdateInterval(state, updateInterval) {
      state.updateInterval = updateInterval
    },
    setSourceSite(state, sourceSite) {
      state.sourceSite = sourceSite
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    setSort(state, sort) {
      state.sort = sort
    },
    setSortOrder(state, sortOrder) {
      state.sortOrder = sortOrder
    },
    updateNewsRatings(state, newRatings) {
      state.news = state.news.map(news => {
        const updatedRating = newRatings.find(rating => rating.id === news.id)
        return updatedRating ? { ...news, rating: updatedRating.rating } : news
      })
    }
  },
  getters: {
    getNewsById: (state) => (id) => {
      return state.news.find(news => news.id === id)
    }
  },
  actions: {
    fetchNews({ state, commit }) {
      const url = `${API_BASE_URL}api/parsed_news/${state.sourceSite}?page_size=${state.newsPerPage}&page=${state.currentPage}&sort=${state.sort}&sort_order=${state.sortOrder}`;

      return fetch(url)
          .then(response => response.json())
          .then(data => {
            commit('setNews', data);
          });
    }
  }
})

export default store