import axios from "axios";

//auth api's
export const getProfileApi = async () => {
  return await axios.get("http://localhost:3001/auth/profile", {
    withCredentials: true,
  });
};

export const sendTokenToBackendApi = async (idToken, endpoint) => {
  return await axios.post(
    `http://localhost:3001/auth/${endpoint}`,
    {
      token: idToken,
    },
    { withCredentials: true }
  );
};

export const logoutApi = async () => {
  return await axios.post(
    "http://localhost:3001/auth/logout",
    {},
    { withCredentials: true }
  );
};

//manga api's
export const getSearchResultsApi = async (searchQuery) => {
  return await axios.get(`http://localhost:3001/manga/search?q=${searchQuery}`);
};

export const getMangaDetailsApi = async (isbn) => {
  return await axios.get(`http://localhost:3001/manga/${isbn}`);
};

//usercollection api's
export const getUserCollectionApi = async (userId) => {
  return await axios.get(`http://localhost:3001/usercollection/${userId}`, {
    withCredentials: true,
  });
};

export const addMangatoUserCollectionApi = async ({ bodyInfo }) => {
  console.log("form api.js", bodyInfo);
  return await axios.post(`http://localhost:3001/usercollection`, bodyInfo, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserCollectionBySeriesApi = async ({ bodyInfo }) => {
  return await axios.post(`http://localhost:3001/usercollection/byseries`, {
    bodyInfo,
    withCredentials: true,
  });
};

export const getUserCollectionByStatusApi = async ({ bodyInfo }) => {
  return await axios.post(`http://localhost:3001/usercollection/bystatus`, {
    bodyInfo,
    withCredentials: true,
  });
};

export const updateCategoryorNotesApi = async ({
  bodyInfo,
  userCollectionId,
}) => {
  return await axios.patch(
    `http://localhost:3001/usercollection/${userCollectionId}`,
    {
      bodyInfo,
      withCredentials: true,
    }
  );
};

export const deleteVolumeApi = async ({ userCollectionId }) => {
  return await axios.delete(
    `http://localhost:3001/usercollection/${userCollectionId}`,
    {
      withCredentials: true,
    }
  );
};
