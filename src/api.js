import axios from "axios";

export const getPatterns = () => {
  return axios.get("https://automatrixapi.pythonanywhere.com/api/patterns");
};

export const getUsers = () => {
  return axios.get("https://automatrixapi.pythonanywhere.com/api/users");
};

export const getUserById = id => {
  return axios.get(`https://automatrixapi.pythonanywhere.com/api/users/${id}`);
}

export const getPatternsByUser = username => {
  return axios.get(`https://automatrixapi.pythonanywhere.com/api/users/${username}/patterns`)
};

export const postPattern = (username, pattern_name, pattern_body) => {
  return axios.post(`https://automatrixapi.pythonanywhere.com/api/patterns`, {
    username,
    pattern_name,
    pattern_body
  })
};

export const deletePattern = id => {
  return axios.delete(`https://automatrixapi.pythonanywhere.com/api/patterns/${id}`);
};

export const postUser = (user, username, email, avatar_url) => {
  return axios.post("https://automatrixapi.pythonanywhere.com/api/users", {
    account_owner: user,
    username: username,
    email: email,
    avatar_url: avatar_url
  });
};

export const updateUser = (request, id) => {
  const requestBody = {};
  if (request.account_owner) {
    requestBody.account_owner = request.account_owner;
  } if (request.email) {
    requestBody.email = request.email;
  } if (request.avatar_url) {
    requestBody.avatar_url = request.avatar_url;
  };
  return axios.put(`https://automatrixapi.pythonanywhere.com/api/users/${id}`, requestBody);
}

export const login = (username, password) => {
  return axios.post('https://automatrixapi.pythonanywhere.com/mongo_auth/login/', {username, password});
};

export const signup = (username, email, password) => {
  return axios.post('https://automatrixapi.pythonanywhere.com/mongo_auth/signup/', {username, email, password});
};