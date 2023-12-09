<template>
  <div class="border rounded p-3">
    <div>
      <div class="mb-2 row align-items-center">
        <div class="col-sm-8">
          <div class="d-flex align-items-center">
            <div class="me-2">
              <img
                v-if="review.client.photo !== null"
                class="rounded-circle rev-icon-size"
                :src="review.client.photo"
                alt="client_photo"
              />

              <img
                v-else
                src="@/assets/images/default_user_photo.jpg"
                alt="client_photo"
                class="rounded-circle rev-icon-size"
              />
            </div>

            <div>
              <div>
                <p class="client-name">
                  {{ review.client.last_name }}&nbsp;{{
                    review.client.first_name
                  }}
                </p>
              </div>

              <div>
                <p class="create-date">
                  {{
                    dayjs(review.creation_date).format("dd, DD.MM.YYYY HH:mm")
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="text-end stars">
            <font-awesome-icon
              v-for="n in 5"
              :key="n"
              class="text-warning"
              :icon="review.rating <= n - 1 ? 'fa-star fa-regular' : 'fa-star'"
            />
          </div>
        </div>
      </div>

      <div :class="{ 'mb-2': commentNeedLineClamp }">
        <p ref="comment" class="comment max-default-comment-lines">
          {{ review.comment }}
        </p>
      </div>

      <div v-if="commentNeedLineClamp">
        <button
          class="read-more-less-button"
          @click="showMoreComment = !showMoreComment"
        >
          {{ showMoreLessButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, onMounted, ref, watch } from "vue";

defineProps({
  review: {
    required: true,
  },
});

const comment = ref(null);
const commentNeedLineClamp = ref(null);
const showMoreComment = ref(false);

const showMoreLessButtonText = computed(() => {
  return showMoreComment.value ? "Показати менше" : "Показати більше";
});

watch(showMoreComment, (newValue) => {
  if (newValue) {
    comment.value.classList.remove("max-default-comment-lines");
  } else {
    comment.value.classList.add("max-default-comment-lines");
  }
});

onMounted(() => {
  commentNeedLineClamp.value =
    0 > comment.value.clientHeight - comment.value.scrollHeight;
});
</script>

<style scoped>
p {
  margin: 0;
}

.client-name {
  font-size: 18px;
  font-weight: 500;
}

.create-date {
  color: gray;
  font-size: 14px;
}

.comment {
  white-space: pre-wrap;
}

.max-default-comment-lines {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.read-more-less-button {
  all: unset;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #a1a1a1;
  text-transform: uppercase;
  transition: 0.3s;
}

.read-more-less-button:hover {
  color: #ffb947;
  transition: 0.3s;
}

@media only screen and (max-width: 575px) {
  .stars {
    text-align: left !important;
    margin-top: 0.5rem !important;
  }
}
</style>
