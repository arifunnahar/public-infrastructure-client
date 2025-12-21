import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AllIssues from "../pages/AllIssues/AllIssues";

import IssueDetails from "../pages/AllIssues/IssueDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/Common/Profile";
import About from "../pages/Shared/Navbar/About";
import ContactUs from "../pages/Shared/Navbar/ContactUs";
import ReportIssueForm from "../pages/Dashboard/Citizen/ReportIssueForm";
import ViewAllIssues from "../pages/Dashboard/Admin/ViewAllIssues";

import ManageStaff from "../pages/Dashboard/Admin/ManageStaff";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AssignedIssues from "../pages/Dashboard/Staff/AssignedIssues";
import MyIssuesPage from "../pages/Dashboard/Citizen/MyIssuesPage";


import PaymentSuccess from "../pages/AllIssues/PaymentSuccess";
import Payments from "../pages/Dashboard/Admin/Payments";
import UserSubscribe from "../pages/Dashboard/Admin/UserSubscribe";
import SubscriptionSuccess from "../pages/Dashboard/Admin/SubscriptionSuccess";
import PaymentCancelled from "../pages/AllIssues/PaymentCancelled";
import SubscriptionCancelled from "../pages/AllIssues/SubscriptionCancelled";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import AdminRoute from "./AdminRoute";
import StaffRoute from "./StaffRoute";









export const router = createBrowserRouter([
  {
    path: "/",
        element: <RootLayout></RootLayout>,
       
        children: [
            {
            index: true,
            element:<Home></Home>,
            },
            {
              path: "*",
              element: <ErrorPage />, 
            },
            {

                path: '/all-issues',
                element: <AllIssues></AllIssues>,
               
            },
            {
                path: "/issues/:id",
                element: <PrivateRoute><IssueDetails /></PrivateRoute>
            },
                    
            // {
            //     path: "/issue/:id",
            //     element: <PrivateRoute><IssueDetails /></PrivateRoute>,
            // },
            
            {
                path: '/about',
                element: <About></About>
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/payment-success',
                element: <PaymentSuccess></PaymentSuccess>
          },
          {
            path: '/payment-cancelled',
            element:<PaymentCancelled></PaymentCancelled>
          },
            
            {
                path: '/user-subscribe',
                element: <UserSubscribe></UserSubscribe>
            },
            {
                path: '/subscription-success',
                element: <SubscriptionSuccess></SubscriptionSuccess>
            },
            {
                path: '/subscription-cancelled',
                element: <SubscriptionCancelled></SubscriptionCancelled>
            }
    ]
    },
    {
        path: '/',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path: 'register',
                element:<Register></Register>
            }
            
            
        ]
    },
      {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
        <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      
      {
        path: 'view-all-issues',
        element: (
          <PrivateRoute>
    <AdminRoute><ViewAllIssues></ViewAllIssues></AdminRoute>
          </PrivateRoute>
        ),
      },
    
      {
        path: 'manage-staff',
        element: (
          <PrivateRoute>
       <AdminRoute>  <ManageStaff></ManageStaff></AdminRoute>
          </PrivateRoute>
        ),
      },
      

     
       {
        path: 'manage-users',
        element: (
          <PrivateRoute>
        <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
          </PrivateRoute>
        ),
      },
       
      
      {
       path: 'paymentS',
       element: (
         <PrivateRoute>
  <AdminRoute> <Payments></Payments></AdminRoute>
         </PrivateRoute>
       ),
     },

// ----------------------staff----------------
        {
        path: 'assigned-issues',
        element: (
          <PrivateRoute>
         <StaffRoute> <AssignedIssues></AssignedIssues></StaffRoute>
          </PrivateRoute>
        ),
      },



    //----------------Citizen------------------
      {
        path: 'my-issues-page',
        element: (
          <PrivateRoute>
        <MyIssuesPage></MyIssuesPage>
          </PrivateRoute>
        ),
      },



       {
        path: 'report-issue',
        element: (
          <PrivateRoute>
          <ReportIssueForm></ReportIssueForm>
          </PrivateRoute>
        ),
      },


      {
        path: 'profile',
        element: (
          <PrivateRoute>
          <Profile></Profile>
          </PrivateRoute>
        ),
      },
     
     
    ],
  },


]);