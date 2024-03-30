<template>
  <div class="news-list-container">
    <div class="news-control-block">
      <div>
        <label>
          News per page:
          <input type="number" v-model.number="newsPerPage" @input="handleNewsPerPageChange" />
        </label>
      </div>
      <div>
        <label>
          Update interval (seconds):
          <input type="number" v-model.number="updateInterval" @input="handleUpdateIntervalChange" />
        </label>
      </div>
      <div>
        <label>
          Source site:
          <input type="text" v-model="sourceSite" @input="handleSourceSiteChange" />
        </label>
      </div>
      <div class="news-sort-block">
        <label>
          Sort by:
          <select v-model="sort" @change="handleSortChange">
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>
          Sort order:
          <select v-model="sortOrder" @change="handleSortOrderChange">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </div>
      <div>
        <button @click="fetchNews">Refresh</button>
      </div>
    </div>
    <div v-for="newsItem in displayedNews" :key="newsItem.id">
      <NewsItem :news="newsItem" />
      <button @click="deleteNews(newsItem.id)">Delete</button>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import NewsItem from './NewsItem.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export default {
  name: 'NewsList',
  components: {
    NewsItem
  },
  data() {
    return {
      currentPage: 1,
      isLoading: false,
      intervalId: null
    }
  },
  computed: {
    news() {
      return this.$store.state.news
    },
    newsPerPage: {
      get() {
        return this.$store.state.newsPerPage
      },
      set(value) {
        this.$store.commit('setNewsPerPage', value)
      }
    },
    updateInterval: {
      get() {
        return this.$store.state.updateInterval
      },
      set(value) {
        this.$store.commit('setUpdateInterval', value)
      }
    },
    sourceSite: {
      get() {
        return this.$store.state.sourceSite
      },
      set(value) {
        this.$store.commit('setSourceSite', value)
      }
    },
    sort: {
      get() {
        return this.$store.state.sort
      },
      set(value) {
        this.$store.commit('setSort', value)
      }
    },
    sortOrder: {
      get() {
        return this.$store.state.sortOrder
      },
      set(value) {
        this.$store.commit('setSortOrder', value)
      }
    },
    displayedNews() {
      const startIndex = (this.currentPage - 1) * this.newsPerPage
      const endIndex = startIndex + this.newsPerPage

      const newsArray = Array.isArray(this.news) ? this.news : []
      return newsArray.slice(startIndex, endIndex)
    }
  },
  methods: {
    async fetchNews() {
      this.isLoading = true
      await this.$store.dispatch('fetchNews')
      this.isLoading = false
    },
    handleNewsPerPageChange() {
      this.currentPage = 1
    },
    handleUpdateIntervalChange() {
      this.stopInterval()
      this.startInterval()
    },
    handleSourceSiteChange() {
      this.currentPage = 1
    },
    handleSortChange() {
      this.currentPage = 1
    },
    handleSortOrderChange() {
      this.currentPage = 1
    },
    startInterval() {
      this.intervalId = setInterval(() => {
        const newRatings = this.getNewRatings()
        this.$store.commit('updateNewsRatings', newRatings)
      }, this.updateInterval * 1000)
    },
    stopInterval() {
      clearInterval(this.intervalId)
    },
    async deleteNews(id) {
      try {
        await axios.delete(`${API_BASE_URL}api/parsed_news/${id}`)
        this.$store.commit('setNews', this.news.filter(item => item.id !== id))
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    },
    loadMore() {
      this.currentPage++
    },
    getNewRatings() {
      return this.news.map(newsItem => ({
        id: newsItem.id,
        rating: Math.floor(Math.random() * 11)
      }))
    },
  },
  mounted() {
    this.fetchNews()
    this.startInterval()
  },
  unmounted() {
    this.stopInterval()
  }
}
</script>

<style scoped>
.news-control-block {
  display: flex;
}
.news-sort-block {
  display: flex;
}
</style>