import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//auth api's
export const getProfileApi = async () => {
  return await axios.get(`${API_BASE_URL}/auth/profile`, {
    withCredentials: true,
  });
};

export const sendTokenToBackendApi = async (idToken, endpoint) => {
  return await axios.post(
    `${API_BASE_URL}/auth/${endpoint}`,
    {
      token: idToken,
    },
    { withCredentials: true }
  );
};

export const logoutApi = async () => {
  return await axios.post(
    `${API_BASE_URL}/auth/logout`,
    {},
    { withCredentials: true }
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
    withCredentials: true,
  });
};

export const addMangatoUserCollectionApi = async ({ bodyInfo }) => {
  return await axios.post(`${API_BASE_URL}/usercollection`, bodyInfo, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateCategoryorNotesApi = async (bodyInfo, userCollectionId) => {
  return await axios.patch(
    `${API_BASE_URL}/usercollection/${userCollectionId}`,
    bodyInfo,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteVolumeApi = async (bodyInfo, userCollectionId) => {
  return await axios.delete(
    `${API_BASE_URL}/usercollection/${userCollectionId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: bodyInfo,
    }
  );
};
