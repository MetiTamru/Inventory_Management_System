import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainComponent from "./Components/MainComponent";
import LoginPage from "./Components/LoginPage";
import ViewItems from "./Pages/SubPages/ViewItems";
import AddItem from "./Pages/SubPages/AddItem";
import SalesReports from "./Pages/SubPages/SalesReport";
import Dashboard from "./Pages/Dashboard";
import ManageItems from "./Pages/ManageItems";
import { AuthProvider } from "./Components/AuthContext";
import Expenses from "./Pages/SubPages/Expenses";
import AddExpenses from "./Pages/SubPages/AddExpenses";

import CashierManagement from "./Pages/CashierManagement";
import RegisterCashier from "./Pages/SubPages/RegisterCashier";
import Categories from "./Pages/SubPages/Categories";
import AddCategory from "./Pages/SubPages/AddCategory";
import AddSubCategory from "./Pages/SubPages/AddSubCategory";
import EditCategories from "./Pages/SubPages/EditCategories";
import Sale from "./Pages/Sale";
import SellItem from "./Pages/SellItem";
import TodaysTransaction from "./Pages/SubPages/TodaysTransaction";
import ViewSales from "./Pages/SubPages/ViewSales";
import UserProfile from "./Pages/UserProfile";
import TodaysSale from "./Pages/SubPages/TodaysSale";
import WeeklySale from "./Pages/SubPages/WeeklySale";
import MonthlySale from "./Pages/SubPages/MonthlySale";
import { useAuth } from './Components/AuthContext';


const AuthenticatedLayout = () => (
  <div className="app-container">
    <MainComponent />
    <div className="content-container">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-items/view-items" element={<ViewItems />} />
        <Route path="/manage-items/add-item" element={<AddItem />} />
        <Route path="/manage-items/edit-item/:id" element={<AddItem />} />
        <Route path="sales-report" element={<SalesReports />} />
        <Route path="/manage-items/sales-report/today" element={<TodaysSale />} />
        <Route path="/manage-items/sales-report/this-week" element={<WeeklySale />} />
        <Route path="/manage-items/sales-report/this-month" element={<MonthlySale />} />
        <Route path="/manage-items/categories" element={<Categories />} />
        <Route path="/manage-items/add-category" element={<AddCategory />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/sell" element={<Sale />} />
        <Route path="/sell-item/:id" element={<SellItem />} />
        <Route path="/manage-items/edit-category/:id" element={<AddCategory />} />
        <Route path="/manage-items/add-subcategory" element={<AddSubCategory />} />
        <Route path="/manage-items/edit-categories/:id" element={<EditCategories />} /> 
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/add" element={<AddExpenses />} />
        <Route path="/todays-transaciton" element={<TodaysTransaction />} />
        <Route path="/sell/view-sell" element={<ViewSales />} />
        <Route path="/cashier-management" element={<CashierManagement />} />
        <Route path="/cashier-management/register" element={<RegisterCashier />} />
        <Route path="/cashier-management/edit/:id" element={<RegisterCashier />} />
       
      </Routes>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="*" element={<AuthenticatedLayout />} />
      )}
    </Routes>
  );
};
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
