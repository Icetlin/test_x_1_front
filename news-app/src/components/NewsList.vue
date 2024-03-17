<template>
  <div>
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
    <div>
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
    <div v-for="newsItem in displayedNews" :key="newsItem.id">
      <NewsItem :news="newsItem" />
      <button @click="deleteNews(newsItem.id)">Delete</button>
    </div>
    <div v-if="isLoading">Loading...</div>
  </div>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import NewsItem from './NewsItem.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export default {
  name: 'NewsList',
  components: {
    NewsItem
  },
  setup() {
    const store = useStore()
    const currentPage = ref(1)
    const isLoading = ref(false)
    let intervalId = null

    const news = computed(() => store.state.news)

    const newsPerPage = computed({
      get() {
        return store.state.newsPerPage
      },
      set(value) {
        store.commit('setNewsPerPage', value)
      }
    })
    const updateInterval = computed({
      get() {
        return store.state.updateInterval
      },
      set(value) {
        store.commit('setUpdateInterval', value)
      }
    })
    const sourceSite = computed({
      get() {
        return store.state.sourceSite
      },
      set(value) {
        store.commit('setSourceSite', value)
      }
    })
    const sort = computed({
      get() {
        return store.state.sort
      },
      set(value) {
        store.commit('setSort', value)
      }
    })
    const sortOrder = computed({
      get() {
        return store.state.sortOrder
      },
      set(value) {
        store.commit('setSortOrder', value)
      }
    })

    const displayedNews = computed(() => {
      const startIndex = (currentPage.value - 1) * newsPerPage.value
      const endIndex = startIndex + newsPerPage.value

      const newsArray = Array.isArray(news.value) ? news.value : []
      return newsArray.slice(startIndex, endIndex)
    })

    const fetchNews = async () => {
      isLoading.value = true
      await store.dispatch('fetchNews')
      isLoading.value = false
    }

    const handleNewsPerPageChange = () => {
      currentPage.value = 1
    }

    const handleUpdateIntervalChange = () => {
      stopInterval()
      startInterval()
    }

    const handleSourceSiteChange = () => {
      currentPage.value = 1
    }

    const handleSortChange = () => {
      currentPage.value = 1
    }

    const handleSortOrderChange = () => {
      currentPage.value = 1
    }

    const startInterval = () => {
      intervalId = setInterval(() => {
        const newRatings = getNewRatings()
        store.commit('updateNewsRatings', newRatings)
      }, updateInterval.value * 1000)
    }

    const stopInterval = () => {
      clearInterval(intervalId)
    }

    const deleteNews = async (id) => {
      try {

        await axios.delete(`${API_BASE_URL}api/parsed_news/${id}`)
        store.commit('setNews', news.value.filter(item => item.id !== id))
      } catch (error) {
        console.error('Error deleting news:', error)
      }
    }

    const loadMore = () => {
      currentPage.value++
    }

    const getNewRatings = () => {
      return news.value.map(newsItem => ({
        id: newsItem.id,
        rating: Math.floor(Math.random() * 11)
      }))
    }

    onMounted(() => {
      fetchNews()
      startInterval()
    })

    onUnmounted(() => {
      stopInterval()
    })

    return {
      news,
      newsPerPage,
      updateInterval,
      sourceSite,
      sort,
      sortOrder,
      displayedNews,
      isLoading,
      fetchNews,
      handleNewsPerPageChange,
      handleUpdateIntervalChange,
      handleSourceSiteChange,
      handleSortChange,
      handleSortOrderChange,
      deleteNews,
      loadMore
    }
  }
}
</script>