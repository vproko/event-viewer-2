<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="signIn">
    <div>
      <label>USERNAME</label>
      <input type="text" v-model="login.username" />
    </div>
    <div>
      <label>PASSWORD</label>
      <input type="password" v-model="login.password" />
    </div>
    <div>
      <button class="submit">LOGIN</button>
    </div>
  </form>
  <br />
  <div v-if="this.getMessage">
    <p class="message">{{ this.getMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      title: "Login Page",
      login: {
        username: null,
        password: null,
      },
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["logIn", "clearTheMessage", "setTheMessage"]),
    signIn() {
      for (const key in this.login) {
        if (this.login[key] === "" || this.login[key] === null) {
          return this.setTheMessage("There's empty field/s");
        }
      }
      this.logIn(this.login);
    },
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },
};
</script>

<style scoped></style>
