import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    logged: false,
    formFields: [],
    loggedUser: {},
    selectedEvent: {},
    users: [
      {
        id: 1,
        name: "Jane",
        surname: "Doe",
        username: "test",
        password: "pass123",
        events: [
          {
            id: 123,
            name: "Lunch",
            date: "2021-10-13",
            description: "Lunch with my boss.",
          },
        ],
        formFields: ["name", "date", "description"],
      },
      {
        id: 3,
        name: "Mike",
        surname: "Tyson",
        username: "mike",
        password: "mike123",
        events: [
          {
            id: 439,
            name: "Shopping",
            date: "2021-10-14",
            description: "I have to buy new snickers.",
          },
        ],
        formFields: ["name", "date", "description"],
      },
    ],
    message: "",
  },
  getters: {
    getUsers: (state) => state.users,
    getLoginStatus: (state) => state.logged,
    getMessage: (state) => state.message,
    getEvents: (state) => state.loggedUser.events,
    getUsersEvents: (state) => state.users.filter((user) => user.id === state.loggedUserId),
    getSelectedEvent: (state) => state.selectedEvent,
    getFormFields: (state) => state.formFields,
  },
  mutations: {
    addNewUser: (state, newUser) => state.users.push(newUser),
    setUsersList: (state, usersList) => (state.users = [...usersList]),
    setLoggedUser: (state, user) => (state.loggedUser = { ...user }),
    updateUsersList: (state, newUsersList) => (state.users = newUsersList),
    clearLoggedUser: (state) => (state.loggedUser = {}),
    setLoggedIn: (state) => (state.logged = true),
    setLoggedOut: (state) => (state.logged = false),
    setSelectedEvent: (state, event) => (state.selectedEvent = { ...event }),
    clearSelectedEvent: (state) => (state.selectedEvent = {}),
    setMessage: (state, payload) => (state.message = payload),
    clearMessage: (state) => (state.message = ""),
    setFormFields: (state, fields) => (state.formFields = [...fields]),
    setUsersFormField: (state, fields) => (state.formFields = [...fields]),
    clearFormFields: (state) => (state.formFields = []),
  },
  actions: {
    registration(context, newUser) {
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      context.commit("clearMessage");
      for (const user of usersList) {
        if (newUser.username.toLowerCase() === user.username.toLowerCase()) {
          context.commit("setMessage", "The username is already in use");
          return router.push({ name: "Registration" });
        }
        context.commit("addNewUser", newUser);
        context.commit("setMessage", "The user was successfully registered");
        router.push({ name: "AddNewEvent" });
      }
    },

    logIn(context, currentUser) {
      context.commit("clearMessage");
      for (const user of context.state.users) {
        if (
          currentUser.username === user.username &&
          currentUser.password === user.password
        ) {
          context.commit("setLoggedIn");
          context.commit("setLoggedUser", user);
          context.commit("setUsersFormField", [...JSON.parse(JSON.stringify(user)).formFields]);
          return router.push({ name: "AddNewEvent" });
        }
      }
      context.commit("setMessage", "Invalid username, or password!");
      router.push({ name: "Login" });
    },

    logOut(context) {
      context.commit("setLoggedOut");
      context.commit("clearLoggedUser");
      context.commit("clearFormFields");
      context.commit("clearSelectedEvent");
      router.push({ name: "Login" });
      context.commit("setMessage", "You've been successfully logged out!");
    },

    addNewEvent(context, newEvent) {
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      currentUser.events.push(newEvent);
      const usersIndexInList = usersList.map((users) => users.username).indexOf(currentUser.username);
      usersList[usersIndexInList].events.push(newEvent);
      context.commit("setUsersList", usersList);
      context.commit("setLoggedUser", currentUser);
      context.commit("setMessage", "The event was successfully added.");
    },

    findSelectedEvent(context, eventId) {
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      const eventsIndexInList = currentUser.events.map((event) => event.id).indexOf(Number(eventId));
      const selectedEvent = currentUser.events[eventsIndexInList];
      context.commit("setSelectedEvent", selectedEvent);
    },

    updateEvent(context, updatedEvent) {
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      const eventsIndexInList = currentUser.events.map((event) => event.id).indexOf(Number(updatedEvent.id));
      currentUser.events[eventsIndexInList] = updatedEvent;
      const usersIndexInList = usersList.map((users) => users.username).indexOf(currentUser.username)
      usersList[usersIndexInList] = currentUser;
      context.commit("setUsersList", usersList);
      context.commit("setLoggedUser", currentUser);
    },

    removeEvent(context, eventId) {
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      const eventsIndexInList = currentUser.events.map((event) => event.id).indexOf(eventId);
      currentUser.events.splice(eventsIndexInList, 1);
      const usersIndexInList = usersList.map((users) => users.username).indexOf(currentUser.username);
      usersList[usersIndexInList] = currentUser;
      context.commit("setUsersList", usersList);
      context.commit("setLoggedUser", currentUser);
    },

    addFormField(context, field) {
      const formFields = [...this.state.formFields];
      formFields.push(field);
      context.commit("setFormFields", formFields);
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      const usersIndexInList = usersList.map((users) => users.username).indexOf(currentUser.username);
      currentUser.formFields = [...this.state.formFields];
      usersList[usersIndexInList] = currentUser;
      context.commit("setUsersList", usersList);
      context.commit("setMessage", "New field was added");
    },

    removeFormField(context, field) {
      const formFields = [...this.state.formFields];
      const fieldsIndex = formFields.indexOf(field);
      formFields.splice(fieldsIndex, 1);
      context.commit("setFormFields", formFields);
      const usersList = JSON.parse(JSON.stringify(this.state.users));
      const currentUser = JSON.parse(JSON.stringify(this.state.loggedUser));
      const usersIndexInList = usersList.map((users) => users.username).indexOf(currentUser.username);
      currentUser.formFields = [...this.state.formFields];
      usersList[usersIndexInList] = currentUser;
      context.commit("setUsersList", usersList);
      context.commit("setMessage", "The field was removed");
    },

    setTheMessage(context, newMessage) {
      context.commit("clearMessage");
      context.commit("setMessage", newMessage);
    },

    clearTheMessage(context) {
      context.commit("clearMessage");
    },
  },
  modules: {},
});
