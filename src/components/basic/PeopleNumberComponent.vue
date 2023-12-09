<template>
  <div class="people-number-container">
    <div class="border rounded d-flex align-items-center">
      <div class="h-100">
        <button
          class="people-number-button minus-button"
          type="button"
          @click="changeValue(-1)"
        >
          -
        </button>
      </div>

      <div class="h-100">
        <input
          :value="modelValue"
          class="people-number-input"
          type="number"
          readonly
        />
      </div>

      <div class="h-100">
        <button
          class="people-number-button plus-button"
          type="button"
          @click="changeValue(1)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: Number,
});

const emit = defineEmits(["update:modelValue"]);

const changeValue = (number) => {
  if (props.modelValue === 1 && number === -1) {
    return;
  }

  if (number === -1) {
    emit("update:modelValue", props.modelValue - 1);
  } else if (number === 1) {
    emit("update:modelValue", props.modelValue + 1);
  }
};
</script>

<style scoped>
.people-number-container {
  display: flex;
  min-height: 36px;
}

.people-number-button {
  height: 100%;
  width: 34px;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  transition: 0.3s;
}

.people-number-button:hover {
  color: #ffb947;
  transition: 0.3s;
}

.people-number-input {
  height: 100%;
  width: 60px;
  border: none;
  text-align: center;
}

.people-number-input:focus {
  outline: none;
}

.people-number-input::-webkit-outer-spin-button,
.people-number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.people-number-input {
  -moz-appearance: textfield;
}
</style>
