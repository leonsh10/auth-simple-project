<template>
  <div class="p-10 h-full w-full flex flex-col place-content-center">
    <div class="w-full h-2/4">
      <p class="text-center text-2xl font-semibold">You are now Home</p>
      <p class="text-center text-base text-gray-400 pt-10">
        All you can do here is get out
      </p>
    </div>
    <button
      @click="logout"
      class="text-white bg-pinkc shadow__success-button w-full font-bold py-2 px-4 rounded mt-3 shadow__success-button"
    >
      Logout
    </button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
