import React from "react";
import TransactionList from "../Transactions/TransactionList";
import TransactionChart from "../Transactions/TransactionChart";
import FilterSection from "../Transactions/TransactionList";

const Dashboard = () => {
  return (
    <>
      <TransactionChart />
      <TransactionList />
    </>
  );
};

export default Dashboard;
