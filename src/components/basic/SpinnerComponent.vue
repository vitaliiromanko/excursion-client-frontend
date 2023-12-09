<template>
  <div class="spin">
    <div class="ring">
      <swapping-squares-spinner
        :animation-duration="1000"
        :size="65"
        color="#ffb947"
      />
    </div>
  </div>
</template>

<script setup>
import { SwappingSquaresSpinner } from "epic-spinners";
</script>

<style scoped>
.spin {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
