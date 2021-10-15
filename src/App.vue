<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin-top: 70px;
}

form {
  width: 400px;
  text-align: left;
  margin: 30px auto;
  border: 1px solid #2c3e50;
  border-radius: 20px;
  padding: 10px 50px 30px 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

label {
  display: inline-block;
  margin-top: 32px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}

input {
  display: block;
  width: 100%;
  font-size: 15px;
  font-weight: bolder;
  padding: 7px 0 7px 0;
  text-align: center;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #2c3e50;
}

.submit {
  display: block;
  margin: 20px auto 0 auto;
  background: #2c3e50;
  color: white;
  border: 1px solid white;
  font-weight: bolder;
  font-size: 14px;
  padding: 10px 15px;
  border-radius: 10px;
}

.submit:hover {
  cursor: pointer;
  background: white;
  color: #2c3e50;
  border: 1px solid #2c3e50;
}

textarea {
  display: block;
  width: 100%;
  height: 120px;
  font-size: 15px;
  font-weight: bolder;
  padding: 7px;
  box-sizing: border-box;
  border: 1px solid #2c3e50;
  border-radius: 10px;
}

label {
  margin-bottom: 10px;
}

input[type="date"] {
  text-align: left;
  width: fit-content;
  border: 1.5px solid #2c3e50;
  padding: 7px;
  border-radius: 7px;
}

.message {
  color: #42b983;
  font-weight: bolder;
}
</style>
