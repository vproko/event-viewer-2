<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="createNewEvent">
    <div v-for="field in getFormFields" :key="field">
      <label>{{ field }}</label>
      <input v-if="field !== 'date'" type="text" :name="field" />
      <input v-if="field === 'date'" type="date" :name="field" />
    </div>
    <div>
      <button class="submit">CREATE EVENT</button>
    </div>
  </form>
  <div v-if="this.getMessage">
    <p class="message">{{ this.getMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "AddNewEvent",
  data() {
    return {
      title: "Add New Event",
    };
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions(["addNewEvent", "clearTheMessage", "setTheMessage"]),
    createNewEvent(e) {
      let newEvent = {};
      newEvent.id = Math.round(Math.random() * 1000);
      for (let index = 0; index < this.getFormFields.length; index++) {
        if(e.target[index].value === "" || e.target[index].value === null) {
          return this.setTheMessage("Don't leave empty field/s");
        }
        newEvent[e.target[index].name] = e.target[index].value;
      }
      this.addNewEvent(newEvent);
    },
  },
  computed: {
    ...mapGetters(["getMessage", "getFormFields"]),
  },
};
</script>

<style scoped>
label {
  text-transform: uppercase;
}
</style>
