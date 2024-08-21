import { getUserFromStorage } from "../../utils/getUserFromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//!Get the token
const token = getUserFromStorage();

//!add transaction
export const addTransactionAPI = async ({
  type,
  amount,
  date,
  description,
  category,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transactions/create`,
    {
      type,
      amount,
      date,
      description,
      category,
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
