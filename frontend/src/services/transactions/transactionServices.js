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

//!lists
export const listTransactionsAPI = async ({
  category,
  type,
  startDate,
  endDate,
}) => {
  const response = await axios.get(`${BASE_URL}/transactions/lists`, {
    params: {
      category,
      type,
      startDate,
      endDate,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
