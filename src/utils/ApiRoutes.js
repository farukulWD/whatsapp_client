export const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/messages`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ONBOARD_USER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

export const SEND_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/add-message`;
export const GET_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/get-messages`;
export const ADD_IMAGE_ROUTE = `${MESSAGE_ROUTE}/add-image-messages`;
export const ADD_AUDIO_ROUTE = `${MESSAGE_ROUTE}/add-audio-messages`;
export const GET_INITIAL_CONTACTS = `${MESSAGE_ROUTE}/get-initial-contacts`;
