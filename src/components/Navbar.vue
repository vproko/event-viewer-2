<template>
  <div id="nav">
    <div v-if="!getLoginStatus">
      <router-link to="/">LOGIN</router-link>
      <router-link to="/registration">REGISTRATION</router-link>
    </div>
    <div v-if="getLoginStatus">
      <router-link to="/add-new-event">ADD NEW EVENT</router-link>
      <router-link to="/edit-event-page">EDIT EVENT PAGE</router-link>
      <router-link to="/events-list">EVENT LIST</router-link>
      <a @click="logOut" id="logout">LOGOUT</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["logOut"]),
  },
  computed: {
    ...mapGetters(["getLoginStatus"]),
  },
};
</script>

<style scoped>
#nav {
  width: 100%;
  padding: 15px;
  display: flex;
  top: 0;
  right: 0;
  position: fixed;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  background: rgb(250, 250, 250);
  height: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-right: 17px;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#logout:hover {
  cursor: pointer;
}
</style>
