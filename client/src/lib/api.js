import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//auth api's
export const getProfileApi = async () => {
  return await axios.get(`${API_BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const sendTokenToBackendApi = async (idToken, endpoint) => {
  return await axios.post(
    `${API_BASE_URL}/auth/${endpoint}`,
    {
      token: idToken,
    },
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

export const logoutApi = async () => {
  return await axios.post(
    `${API_BASE_URL}/auth/logout`,
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
};

//manga api's
export const getSearchResultsApi = async (searchQuery) => {
  return await axios.get(`${API_BASE_URL}/manga/search?q=${searchQuery}`);
};

export const getMangaDetailsApi = async (isbn) => {
  return await axios.get(`${API_BASE_URL}/manga/${isbn}`);
};

//usercollection api's
export const getUserCollectionApi = async (userId) => {
  return await axios.get(`${API_BASE_URL}/usercollection/${userId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const addMangatoUserCollectionApi = async ({ bodyInfo }) => {
  return await axios.post(`${API_BASE_URL}/usercollection`, bodyInfo, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateCategoryorNotesApi = async (bodyInfo, userCollectionId) => {
  return await axios.patch(
    `${API_BASE_URL}/usercollection/${userCollectionId}`,
    bodyInfo,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteVolumeApi = async (bodyInfo, userCollectionId) => {
  return await axios.delete(
    `${API_BASE_URL}/usercollection/${userCollectionId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: bodyInfo,
    }
  );
};
