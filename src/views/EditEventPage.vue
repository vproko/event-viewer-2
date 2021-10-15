<template>
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="field in getFormFields" :key="field" @click="removeField(field)">
      {{ field }}
    </li>
  </ul>
  <form @submit.prevent="createNewField">
    <div>
      <label>ADD NEW FIELD</label>
      <input type="text" v-model="newField" />
    </div>
    <div>
      <button class="submit">ADD FIELD</button>
    </div>
  </form>
  <div v-if="this.getMessage">
    <p class="message">{{ this.getMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditEventPage",
  data() {
    return {
      title: "Add/Remove Fields:",
      newField: null,
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions([
      "addFormField",
      "removeFormField",
      "setTheMessage",
      "clearTheMessage",
    ]),
    createNewField() {
      if (this.newField !== "" || this.newField !== null) {
        this.addFormField(this.newField);
        this.newField = null;
      }
    },
    removeField(field) {
      if (this.getFormFields.length === 1) {
        return this.setTheMessage("There must be at least one field");
      }
      this.removeFormField(field);
    },
  },
  computed: {
    ...mapGetters(["getFormFields", "getMessage"]),
  },
};
</script>

<style scoped>
ul {
  width: 200px;
  margin: 30px auto;
  list-style-type: none;
  text-align: left;
  font-size: 23px;
  font-weight: bolder;
  color: #33b97d;
}

li {
  padding: 5px 7px;
  text-transform: uppercase;
}

li:hover {
  cursor: pointer;
  background: red;
  color: white;
}
</style>
