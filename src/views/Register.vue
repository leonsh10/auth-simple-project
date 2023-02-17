<template>
  <div class="pt-6 w-full h-full">
    <img
      class="cursor-pointer"
      src="../assets/back-icon.svg"
      @click="$router.push('/')"
    />
    <div class="px-6 pt-2">
      <span class="tracking-wide font-semibold text-2xl">
        Register to Stree
      </span>
      <Input v-model="user.name" label="Full Name" id="full-name" />
      <Input v-model="user.email" label="Email" id="email" />
      <Input v-model="user.number" label="Phone Number" id="number" />
      <Input
        v-model="user.password"
        label="Password"
        type="password"
        id="password"
        :isPassword="true"
      />
      <Input
        v-model="user.cPassword"
        label="Confirm Password"
        type="password"
        id="cPassword"
      />
      <button
        :disabled="hasError"
        @click="submitRegistration()"
        class="w-full text-white font-bold py-2 px-4 rounded mt-3"
        :class="
          hasError
            ? 'bg-disabledButton shadow__disabled-button cursor-not-allowed'
            : 'bg-pinkc shadow__success-button'
        "
      >
        Register
      </button>

      <p class="pt-5 px-6 register__conditions-text text-center font-semibold">
        By registering you agree to
        <span class="text-pinkc cursor-pointer">Terms & Conditions</span> and
        <span class="text-pinkc cursor-pointer">Privacy Policy</span>
        of Stree
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
      user: {
        name: "",
        email: "",
        number: "",
        password: "",
        cPassword: "",
      },
    };
  },
  methods: {
    validateFields() {
      // vanilla js validation
      const name = document.getElementById("full-name").value;
      const email = document.getElementById("email").value;
      const number = document.getElementById("number").value;
      const password = document.getElementById("password").value;
      const cPassword = document.getElementById("cPassword").value;
      const fullNameRegex = /^[a-zA-Z ]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const numberRegex = /^\d{9,}$/;
      if (
        name.trim().length == 0 ||
        email.trim().length == 0 ||
        number.trim().length == 0 ||
        password.trim().length == 0 ||
        cPassword.trim().length == 0
      ) {
        return false;
      } else {
        this.hasError = false;
      }

      if (!fullNameRegex.test(name)) {
        this.error = "Full Name value must be text!";
        return false;
      }

      if (!emailRegex.test(email)) {
        this.error = "Email must be a valid email!";
        return false;
      }

      if (!numberRegex.test(number)) {
        this.error =
          "Mobile number must be a number and at least 9 characters long";
        return false;
      }

      if (password.length < 9) {
        this.error = "Password should at least 9 characters long";
        return false;
      }

      if (password != cPassword) {
        this.error = "Confirm Password should be the same as password!";
        return false;
      }

      this.error = "";

      return true;
    },
    submitRegistration() {
      if (this.error) {
        this.$toast.error(this.error, {
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
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(this.user);
        localStorage.setItem("users", JSON.stringify(users));
        this.$router.push("/");
      }
    },
  },
  watch: {
    user: {
      deep: true,
      handler: debounce(function () {
        // handle changes to the user object to check validation fields that made with vanilla js
        this.validateFields();
      }, 1000), // debounce for 1 second
    },
  },
};
</script>

<style scoped>
.register__conditions-text {
  font-size: 0.78rem;
}
</style>
