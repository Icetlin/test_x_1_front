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
          <select v-model="sourceSite" @change="handleSourceSiteChange">
            <option v-for="(source, index) in newsSourceSites" :key="index" :value="source">{{ source }}</option>
          </select>
        </label>
      </div>
      <div class="news-sort-block">
        <label>
          Sort by:
          <select v-model="sortBy" @change="handleSortChange">
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
    </div>
    <div v-for="newsItem in news" :key="newsItem.id">
      <NewsItem :news="newsItem" />
    </div>

  </div>
</template>

<script setup>
import {computed} from 'vue';
import { useStore } from 'vuex';
import NewsItem from './NewsItem.vue';

const store = useStore();

const news = computed(() => store.getters.news);
store.dispatch('fetchNews');

let newsPerPage = store.getters.newsPerPage
let updateInterval = store.getters.updateInterval
let sourceSite = store.getters.sourceSite
let sortBy = store.getters.sortBy
let sortOrder = store.getters.sortOrder
let newsSourceSites = store.getters.newsSourceSites


function handleNewsPerPageChange(){
  store.dispatch('updateNewsPerPage', newsPerPage);
}

function handleUpdateIntervalChange(){
  store.dispatch('updateUpdateInterval', updateInterval);
}

function handleSourceSiteChange(){
  store.dispatch('updateSourceSite', sourceSite);
}

function handleSortChange(){
  store.dispatch('updateSortBy', sortBy);
}

function handleSortOrderChange(){
  store.dispatch('updateSortOrder', sortOrder);
}

</script>

<style scoped>
.news-control-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  row-gap: 10px;
}
.news-sort-block {
  display: flex;
}
</style>
