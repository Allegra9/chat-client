export const API_WS_ROOT = `ws://${window.location.hostname}:3000/cable`;

const API_ROOT = `http://${window.location.hostname}:3000`;   //can connect on IP address
const HEADERS = {
  'Content-Type': 'application/json',
   Accept: 'application/json',
};

const getToken = () => localStorage.getItem('token');

export const getConversations = (id, token) => {
  return fetch(`${API_ROOT}/${id}/conversations`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': getToken()
    }
  })
    .then(res => res.json())
}

export const getAllConversations = () => {
  return fetch(`${API_ROOT}/conversations`)
    .then(res => res.json())
}

export const subscribeUser = (conversation_id, user_id, token) => {
  return fetch(`${API_ROOT}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': getToken()
    },
    body: JSON.stringify({user_id: user_id, conversation_id: conversation_id})
  }).then(resp => resp.json())
}

export const postMessage = (messageObj, token) => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': getToken()
    },
    body: JSON.stringify(messageObj)
  })
}

export const loginUser = (userLoginObj) => {
  return fetch(`${API_ROOT}/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(userLoginObj)
    })
    .then(res => res.json())
}

export const createUser = (userSignupObj) => {
  return fetch(`${API_ROOT}/users`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(userSignupObj)
    })
    .then(res => res.json())
}

export const getCurrentUser = (token) => {
  return fetch(`${API_ROOT}/current_user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': getToken()
    },
  }).then(res => res.json())
}

export const createConversation = (id, conversationObj, token) => {
  return fetch(`${API_ROOT}/${id}/conversations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': getToken()
    },
    body: JSON.stringify(conversationObj)
  })
}
