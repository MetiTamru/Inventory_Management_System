// ViewExpenses.js

import React, { useState } from "react";
import styled from "styled-components";

const ViewExpensesContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #9847be;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  text-align: center;
`;

const expensesData = [
  { id: 1, name: "Office Supplies", amount: 50, date: "2024-07-28", description: "Stationery" },
  { id: 2, name: "Travel", amount: 200, date: "2024-07-29", description: "Client visit" },
  { id: 3, name: "Lunch", amount: 30, date: "2024-07-30", description: "Team lunch" },
];

function ViewExpenses() {
  const [expenses] = useState(expensesData);

  return (
    <ViewExpensesContainer>
      <Title>View Expenses</Title>
      <Table>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Expense Name</TableHeader>
            <TableHeader>Amount ($)</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.id}</TableCell>
              <TableCell>{expense.name}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.date}</TableCell>
              <TableCell>{expense.description}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ViewExpensesContainer>
  );
}

export default ViewExpenses;
