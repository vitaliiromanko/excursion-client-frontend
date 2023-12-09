<template>
  <div class="spec-1 d-flex flex-wrap">
    <div v-for="(topicType, index) in topicTypes" :key="index" class="me-2">
      <router-link
        class="link"
        :to="{
          name: 'search',
          query: { topic_type: topicType.id },
        }"
      >
        <span class="dot"></span>
        <span>{{ topicType.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topicTypes: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.dot {
  height: 7px;
  width: 7px;
  margin-left: 6px;
  margin-right: 6px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
}

.link {
  text-decoration: none;
  color: black;
  transition: 0.3s;
}

.link:hover {
  color: #ffb947;
  transition: 0.3s;
}
</style>
