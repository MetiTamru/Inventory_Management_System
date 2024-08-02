import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainComponent from "./Components/MainComponent";
import LoginPage from "./Components/LoginPage";
import ViewItems from "./Pages/SubPages/ViewItems";
import AddItem from "./Pages/SubPages/AddItem";
import SalesReports from "./Pages/SubPages/SalesReport";
import InventoryManagment from "./Pages/InventoryManagment";
import CheckAvailablity from "./Pages/CheckAvailablity";
import TransactionList from "./Pages/SubPages/TransactionList";
import Setting from "./Pages/Setting";
import StoreSetting from "./Pages/SubPages/StoreSetting";
import SigninRegister from "./Components/SigninRegister";
import RegisterPage from "./Components/RegisterPage";
import Dashboard from "./Pages/Dashboard";
import ManageItems from "./Pages/ManageItems";
import AddSupplier from "./Pages/SubPages/AddSupplier";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Expenses from "./Pages/SubPages/Expenses";
import AddExpenses from "./Pages/SubPages/AddExpenses";
import ViewExpenses from "./Pages/SubPages/ViewExpenses";
import CashierManagement from "./Pages/CashierManagement";
import RegisterCashier from "./Pages/SubPages/RegisterCashier";
import Categories from "./Pages/SubPages/Categories";
import AddCategory from "./Pages/SubPages/AddCategory";
import AddSubCategory from "./Pages/SubPages/AddSubCategory";
import EditCategories from "./Pages/SubPages/EditCategories";

// Layout for authenticated routes
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
        <Route path="/manage-items/sales-report" element={<SalesReports />} />
        <Route path="/manage-items/categories" element={<Categories />} />
        <Route path="/manage-items/add-category" element={<AddCategory />} />
        <Route path="/manage-items/edit-category/:id" element={<AddCategory />} />
        <Route path="/manage-items/add-subcategory" element={<AddSubCategory />} />
        <Route path="/manage-items/edit-categories/:id" element={<EditCategories />} />
        <Route path="/inventory-management" element={<InventoryManagment />} />
        <Route path="/inventory-management/add-supplier" element={<AddSupplier />} />
        <Route path="/check-availablity" element={<CheckAvailablity />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/expenses/add" element={<AddExpenses />} />
        <Route path="/expenses/view" element={<ViewExpenses />} />
        <Route path="/transaction-management/transactio-list" element={<TransactionList />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/settings/store-setting" element={<StoreSetting />} />
        <Route path="/cashier-management" element={<CashierManagement />} />
        
        <Route path="/cashier-management/register" element={<RegisterCashier />} />
        <Route path="/cashier-management/edit/:id" element={<RegisterCashier />} />
        <Route path="/Authentication/register" element={<ProtectedRoute element={<RegisterPage />} allowedRoles={['admin']} />} />
      </Routes>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/Authentication/log-in" element={<LoginPage />} />
        <Route path="/Authentication" element={<SigninRegister />} />
        <Route path="*" element={<AuthenticatedLayout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
