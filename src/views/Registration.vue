<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="registerUser">
    <div>
      <label>NAME</label>
      <input type="text" v-model="newUser.name" />
    </div>
    <div>
      <label>SURNAME</label>
      <input type="text" v-model="newUser.surname" />
    </div>
    <div>
      <label>USERNAME</label>
      <input type="text" v-model="newUser.username" />
    </div>
    <div>
      <label>PASSWORD</label>
      <input type="password" v-model="newUser.password" />
    </div>
    <div>
      <label>EMAIL</label>
      <input type="email" v-model="newUser.email" />
    </div>
    <div>
      <label>TELEPHONE</label>
      <input type="tel" v-model="newUser.telephone" />
    </div>
    <div>
      <button class="submit">REGISTER</button>
    </div>
  </form>
  <div v-if="this.getMessage">
    <p class="message">{{ this.getMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Registration",
  data() {
    return {
      title: "Registration Page",
      newUser: {
        name: null,
        surname: null,
        username: null,
        password: null,
        email: null,
        telephone: null,
      },
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["clearTheMessage", "setTheMessage", "registration"]),
    async registerUser() {
      let check = await this.checkFields(this.newUser);
      if (check === true) {
        let data = { ...this.newUser };
        data.id = Math.round(Math.random() * 999);
        data.events = [];
        data.formFields = ["name", "date", "description"],
        this.registration(data);
      }
    },
    checkFields(user) {
      let emptyFields = 0;
      return new Promise((resolve) => {
        for (const key in user) {
          if (user[key] === "" || user[key] === null) {
            emptyFields++;
          }
        }
        if (emptyFields !== 0) {
          this.setTheMessage("There's empty field/s");
          resolve(false);
        }
        resolve(true);
      });
    },
  },
  computed: {
    ...mapGetters(["getMessage"]),
  },
};
</script>

<style scoped></style>
