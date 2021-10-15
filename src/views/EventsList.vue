<template>
  <h1>{{ title }}</h1>
  <div id="table">
    <table>
      <thead>
        <th colspan="3">EVENTS</th>
      </thead>
      <tbody>
        <tr v-if="getEvents && getEvents.length === 0">
          <td colspan="3">There're no events</td>
        </tr>
        <tr v-for="event in getEvents" :key="event.id">
          <td colspan="3">
            <div v-for="(field, idx) in event" :key="field">
              <p v-if="idx !== 'id'">
                {{
                  idx
                    .toString()
                    .charAt(0)
                    .toUpperCase() + idx.toString().slice(1)
                }}: {{ field }}
              </p>
            </div>
            <div id="buttons">
              <button @click="editEvent(event.id)">EDIT</button>&nbsp;
              <button @click="deleteDialog(event.id)">DELETE</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Modal -->
  <div id="myModal" class="modal" ref="modal">
    <div class="modal-content">
      <p>Do you really want to delete this event?</p>
      <div id="modal-btns">
        <button @click="confirmDelete">YES</button>
        <button @click="cancelDelete">NO</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EventsList",
  data() {
    return {
      title: "Events List",
      eventId: null,
    };
  },
  methods: {
    ...mapActions(["removeEvent"]),
    editEvent(eventId) {
      this.$router.push({ name: "EditEvent", params: { id: eventId } });
    },
    async deleteEvent() {
      await this.removeEvent(this.eventId);
      this.$refs.modal.style.display = "none";
    },
    deleteDialog(eventId) {
      this.eventId = eventId;
      this.$refs.modal.style.display = "block";
    },
    confirmDelete() {
      this.deleteEvent();
    },
    cancelDelete() {
      this.$refs.modal.style.display = "none";
    },
  },
  computed: {
    ...mapGetters(["getEvents"]),
  },
};
</script>

<style scoped>
#table {
  width: 700px;
  margin: 30px auto;
}

table {
  width: 100%;
  border-spacing: 0;
  font-size: 18px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: black;
}

th,
td {
  border: 1px solid #2c3e50;
}

tr:last-child td {
  border-bottom: 2px solid #2c3e50;
}

tr td:first-child {
  border-left: 2px solid #2c3e50;
}

tr td:last-child {
  border-right: 2px solid #2c3e50;
}

th {
  box-sizing: border-box;
  color: white;
  background: #2c3e50;
}

#description {
  display: flex;
  justify-content: space-between;
  padding-left: 7px;
}

#buttons {
  padding: 7px;
}

#buttons button {
  display: inline-block;
  margin: 2px auto;
  background: #73caa3;
  color: white;
  border: none;
  border-radius: 7px;
  font-size: 15px;
  font-weight: bolder;
}

#buttons button:last-child {
  background: rgb(255, 199, 95);
  color: white;
}
#buttons button:last-child:hover {
  background: orange;
}
#buttons button:first-child:hover {
  background: #2fb377;
}

#buttons button:hover {
  cursor: pointer;
}

.modal {
  display: none;
  position: fixed;
  padding-top: 20%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  font-weight: bolder;
  width: 50%;
  border: 1px solid #2c3e50;
  border-radius: 20px;
  padding: 10px 50px 30px 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

#modal-btns {
  width: 150px;
  display: flex;
  justify-content: space-around;
  margin-left: auto;
  margin-right: auto;
}

#modal-btns button:first-child {
  margin: 20px auto 0 auto;
  background: #2c3e50;
  color: white;
  border: 3px solid white;
  font-weight: bolder;
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 10px;
}

#modal-btns button:first-child:hover {
  background: white;
  color: #2c3e50;
  border: 3px solid #2c3e50;
}

#modal-btns button:last-child {
  margin: 20px auto 0 auto;
  background: #2fb377;
  color: white;
  border: 3px solid white;
  font-weight: bolder;
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 10px;
}

#modal-btns button:last-child:hover {
  background: white;
  color: #2fb377;
  border: 3px solid #2fb377;
}

#modal-btns button:first-child:hover,
#modal-btns button:last-child:hover {
  cursor: pointer;
}
</style>
