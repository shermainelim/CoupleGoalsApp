import axios from "axios";

export default axios.create({
  baseURL: "http://couple-goals-new.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
