import { Route, Routes } from "react-router-dom";
import "./App.css"
import MainComponent from "./Components/MainComponent";
import LoginPage from "./Components/LoginPage";
import CustomerList from "./Pages/SubPages/CustomerList";
import ViewItems from "./Pages/SubPages/ViewItems";
import AddItem from "./Pages/SubPages/AddItem";
import SalesReports from "./Pages/SubPages/SalesReports";
import InventoryManagment from "./Pages/InventoryManagment";

import Suppliers from "./Pages/SubPages/Suppliers";
import PurchaseOrders from "./Pages/SubPages/PurchaseOrders";
import EmployeeManagment from "./Pages/EmployeeManagment";
import EmployeeList from "./Pages/SubPages/EmployeeList";
import PerformanceTracking from "./Pages/SubPages/PerformanceTracking";
import ShiftManagment from "./Pages/SubPages/ShiftManagment";
import CheckAvailablity from "./Pages/CheckAvailablity";
import TransactionList from "./Pages/SubPages/TransactionList";
import RefundandReturns from "./Pages/SubPages/RefundandReturns";
import PaymentMethods from "./Pages/SubPages/PaymentMethods";
import ReportandAnalytics from "./Pages/ReportandAnalytics";
import InventoryReport from "./Pages/SubPages/InventoryReport";
import EmployeReports from "./Pages/SubPages/EmployeReports";
import Setting from "./Pages/Setting";
import StoreSetting from "./Pages/SubPages/StoreSetting";
import UserRoleandPermission from "./Pages/SubPages/UserRoleandPermission";
import NotificationSetting from "./Pages/SubPages/NotificationSetting";
import NotificationandAlert from "./Pages/NotificationandAlert";
import AlertsList from "./Pages/SubPages/AlertsList";
import NotificationPreferences from "./Pages/SubPages/NotificationPreferences";
import CustomerManagment from "./Pages/CustomerManagment";
import LoyalityPrograms from "./Pages/SubPages/LoyalityPrograms";
import SigninRegister from "./Components/SigninRegister";
import RegisterPage from "./Components/RegisterPage";
import Dashboard from "./Pages/Dashboard";
import ManageItems from "./Pages/ManageItems";
import AddSupplier from "./Pages/SubPages/AddSupplier";

function App() {
  return (
    <div className="app-container">
    
    <MainComponent/>
      <div className="content-container">
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-items/view-items" element={<ViewItems />} />
        <Route path="/manage-items/add-item" element={<AddItem />} />
        <Route path="/sales-manageement/sales-report" element={<SalesReports />} />
        <Route path="/inventory-management" element={<InventoryManagment />} />
        <Route path="/inventory-management/add-supplier" element={<AddSupplier />} />
        
        <Route path="/inventory-management/suppliers" element={<Suppliers />} />
        <Route path="/inventory-management/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/employe-management" element={<EmployeeManagment />} />
        <Route path="/employe-management/emloyee-list" element={<EmployeeList />} />
        <Route path="/employe-management/performance-tracking" element={<PerformanceTracking />} />
        <Route path="/employe-management/shift-management" element={<ShiftManagment />} />
        <Route path="/check-availablity" element={<CheckAvailablity />} />
        <Route path="/transaction-management/transactio-list" element={<TransactionList />} />
        <Route path="/transaction-management/refund-and-return" element={<RefundandReturns />} />
        <Route path="/transaction-management/payment-methods" element={<PaymentMethods />} />
        <Route path="/reports-and-analytics" element={<ReportandAnalytics />} />
        <Route path="/reports-and-analytics/sales-reports" element={<SalesReports />} />
        <Route path="/reports-and-analytics/inventory-reports" element={<InventoryReport />} />
        <Route path="/reports-and-analytics/employee-reports" element={<EmployeReports />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/settings/store-setting" element={<StoreSetting />} />
        <Route path="/settings/user-role-and-permissions" element={<UserRoleandPermission />} />
        <Route path="/settings/notification-setting" element={<NotificationSetting />} />
        <Route path="/notification-and-alert" element={<NotificationandAlert />} />
        <Route path="/notification-and-alert/alert-list" element={<AlertsList />} />
        <Route path="/notification-and-alert/notification-preference" element={<NotificationPreferences />} />
        <Route path="/customer-managemenet" element={<CustomerManagment />} />
        <Route path="/customer-managemenet/customer-list" element={<CustomerList />} />
        <Route path="/customer-managemenet/loyality-programs" element={<LoyalityPrograms />} />
        <Route path="/Authentication" element={<SigninRegister />} />
        
        <Route path="/Authentication/register" element={<RegisterPage />} />
        <Route path="/Authentication/log-in" element={<LoginPage />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
