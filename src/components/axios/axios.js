import axios from "axios";

//evrything goes through the REST API
export default axios.create({
  baseURL: "http://localhost:8099/"
});
