<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="editEvent">
    <div v-for="(field, idx) in getSelectedEvent" :key="field">
      <label v-if="idx!=='id'">{{ idx }}</label>
      <input v-if="idx === 'id'" type="hidden" :name="idx" :value="field"/>
      <input v-if="idx !== 'id' && idx !== 'date'" type="text" :name="idx" :value="field"/>
      <input v-if="idx === 'date'" type="date" name="date" :value="field"/>
    </div>
    <div>
      <button class="submit">UPDATE EVENT</button>
    </div>
  </form>
  <div v-if="this.getMessage">
    <p class="message">{{ this.getMessage }}</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditEvent",
  data() {
    return {
      title: "Edit Event",
    };
  },
  async created() {
    await this.findSelectedEvent(this.$route.params.id);
  },
  beforeUnmount() {
    this.clearTheMessage();
  },
  methods: {
    ...mapActions([
      "updateEvent",
      "findSelectedEvent",
      "setTheMessage",
      "clearTheMessage",
    ]),
    async editEvent(e) {
      let updatedEvent = {};
      for (const key in this.getSelectedEvent) {
        if (!e.target[key].value) {
          return this.setTheMessage("There's empty field/s");
        }
        updatedEvent[key] = key !== "id" ? e.target[key].value : Number(e.target[key].value);
      }
      await this.updateEvent(updatedEvent);
      await this.findSelectedEvent(this.$route.params.id);
      this.setTheMessage("The event was successfully edited");
    },
    clearInputs(e) {
      for (const key in this.getSelectedEvent) {
        e.target[key].value = "";
      }
    }
  },
  computed: {
    ...mapGetters(["getSelectedEvent", "getMessage"]),
  },
};
</script>

<style scoped></style>
