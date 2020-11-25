import axios from "axios";

const instance = axios.create({
  //backend api rooturl
  //baseURL: "http://localhost:5000/",
  //baseURL: "https://us-central1-pdfdetails191120.cloudfunctions.net/app",
  baseURL: "http://127.0.0.1:8000/api",
  //baseURL: "https://saurabh8778.pythonanywhere.com/api",
});

export default instance;
