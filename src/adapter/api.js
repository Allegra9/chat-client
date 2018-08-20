export const API_WS_ROOT = 'ws://localhost:3000/cable';

const API_ROOT = 'http://localhost:3000';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getConversations = (id) => {
  return fetch(`${API_ROOT}/${id}/conversations`)
    .then(res => res.json())
}

export const getAllConversations = () => {
  return fetch(`${API_ROOT}/conversations`)
    .then(res => res.json())
}

export const subscribeUser = (conversation_id, user_id) => {
  return fetch(`${API_ROOT}/${user_id}/conversations/${conversation_id}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({})
  })
}

export const postMessage = (messageObj) => {
  return fetch(`${API_ROOT}/messages`, {
    method: 'POST',
    headers: HEADERS,
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

export const createConversation = (id, conversationObj) => {
  return fetch(`${API_ROOT}/${id}/conversations`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(conversationObj)
  })
}
