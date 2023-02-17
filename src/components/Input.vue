<template>
  <div class="relative mb-2">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="block w-full px-2 pt-7 pb-2 text-base text-gray-700 border-b-2 font-medium border-gray-300 focus:outline-none focus:border-gray-500"
      :id="id"
    />
    <label
      class="absolute top-8 left-4 z-10 px-1 py-1 text-base text-gray-500 duration-300 origin-left transition-all color-gray pointer-events-none"
      :class="{ 'text-sm': isFocused || value }"
      :style="{
        transform:
          isFocused || value
            ? 'translate(-12px, -29px)'
            : 'translate(-12px, -12px)',
        'font-size': isFocused || value ? '0.875rem' : '1rem',
      }"
      :for="id"
    >
      {{ label }}
    </label>
    <div v-if="isPassword" class="mt-2">
      <div class="flex flex-row items-center h-2 rounded-sm overflow-hidden">
        <div
          v-for="i in 4"
          :key="i"
          class="h-full flex-1"
          :class="{
            'bg-gray-400': passwordStrength.score < i,
            'bg-pinkc': passwordStrength.score >= i,
            'mr-3': i != 4,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import zxcvbn from "zxcvbn";

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    isPassword: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFocused: false,
      passwordStrength: {
        score: 0,
        feedback: {},
      },
    };
  },
  watch: {
    value(newValue) {
      if (this.isPassword) {
        const { score, feedback } = zxcvbn(newValue);
        this.passwordStrength.score = score;
        // not using feedback just set in case we want to appear it to user.
        this.passwordStrength.feedback = feedback;
      }
    },
  },
};
</script>

<style>
input:focus {
  color: rgb(30, 30, 30);
}
</style>
