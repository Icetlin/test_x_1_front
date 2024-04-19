<template>
  <div class="news-item" :class="{ 'rating-up': isRatingUp, 'rating-down': !isRatingUp }">
    <div class="news-header">
      <h3>{{ news.name }}</h3>
      <div class="rating" :class="{ 'rating-up': isRatingUp, 'rating-down': !isRatingUp }">
        {{ news.rating }}
      </div>
    </div>
    <div class="news-image">
      <img :src="news.image_url" :alt="news.name" />
    </div>
    <div class="news-content">
      <p>{{ news.value }}</p>
      <a :href="news.news_url" target="_blank" class="read-more">Read more</a>
      <p class="source">Source: {{ news.source_site }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  news: Object
})
const isRatingUp = true
</script>

<style scoped>
.news-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.rating {
  font-weight: bold;
  font-size: 18px;
  padding: 5px 10px;
  border-radius: 5px;
}

.rating-up {
  color: green;
  background-color: rgba(0, 128, 0, 0.2);
}

.rating-down {
  color: red;
  background-color: rgba(255, 0, 0, 0.2);
}

.news-image {
  text-align: center;
  margin-bottom: 10px;
}

.news-image img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}

.news-content {
  line-height: 1.5;
}

.read-more {
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.read-more:hover {
  background-color: #0056b3;
}

.source {
  font-style: italic;
  color: #6c757d;
  margin-top: 5px;
}
</style>