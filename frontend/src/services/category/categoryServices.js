import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//!Get the token
const token = getUserFromStorage();

//!Add category
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `${BASE_URL}/categories/create`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  //!Return a promise
  return response.data;
};
