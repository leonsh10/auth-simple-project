<template>
  <div class="p-6 h-full w-full flex flex-col">
    <div class="h-1/3 flex justify-center">
      <img class="pt-10 w-44" src="../assets/Frame.svg" />
    </div>
    <div class="h-1/2 mt-5">
      <Input v-model="loginUser.email" label="Email ID" id="loginEmail" />
      <Input
        v-model="loginUser.password"
        label="Password"
        id="loginPassword"
        type="password"
      />
      <p class="text-pinkc flex justify-end cursor-pointer font-medium">
        Forgot Password?
      </p>
      <button
        @click="login"
        class="text-white bg-pinkc w-full font-bold py-2 px-4 rounded mt-10"
        :disabled="hasError"
        :class="
          hasError
            ? 'bg-disabledButton shadow__disabled-button cursor-not-allowed'
            : 'bg-pinkc shadow__success-button'
        "
      >
        Login
      </button>
      <p class="mt-5 text-center">
        Don’t have an account?
        <span
          @click="$router.push('/register')"
          class="text-pinkc cursor-pointer"
          >Register Now</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import { debounce } from "lodash";

export default {
  components: {
    Input,
  },
  data() {
    return {
      hasError: true,
      error: "",
      email: "",
      password: "",
      loginUser: {
        email: "",
        password: "",
      },
    };
  },
  watch: {
    loginUser: {
      deep: true,
      handler: debounce(function () {
        // handle changes to the user object to check validation fields that made with vanilla js
        this.validateInput();
      }, 1000), // debounce for 1 second
    },
  },
  methods: {
    validateInput() {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      if (email.trim().length == 0 || password.trim().length == 0) {
        return false;
      } else {
        this.hasError = false;
      }
    },
    login() {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) =>
          user.email === this.loginUser.email &&
          user.password === this.loginUser.password
      );
      if (user) {
        this.$router.push("/home");
      } else {
        this.$toast.error("Invalid email or password.", {
          position: "top-right",
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: "button",
          icon: true,
          rtl: false,
        });
      }
    },
  },
};
</script>
