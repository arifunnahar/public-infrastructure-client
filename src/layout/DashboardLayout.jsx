import React from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { AiOutlineForm, AiOutlineHome } from 'react-icons/ai';
import useAuth from '../pages/hooks/useAuth';
import { Link, Outlet } from 'react-router';

import { FaBoxTissue,  FaUserAlt, FaUsers } from 'react-icons/fa';
import { FaPersonChalkboard } from "react-icons/fa6";
import { MdAssignmentTurnedIn, MdOutlineAssignmentInd, MdPayments } from 'react-icons/md';
import { RiKeyboardBoxLine } from "react-icons/ri";
import useRole from '../pages/hooks/useRole';
import logo2 from '../assets/images/logo2.png';

const DashboardLayout = () => {
  const { logOut } = useAuth();
  const [role, isRoleLoading] = useRole();
    
    
      const handleLogOut = () => {
        logOut()
          .then(() => {})
          .catch((error) => console.log(error));
      };
    
    return (
        <div className="drawer lg:drawer-open max-w-[1200px] mx-auto">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            
            {/* Main content */}
            <div className="drawer-content  flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            
                <nav className="navbar w-full bg-base-300 dark:bg-gray-800">
                    <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
                        {/* Sidebar toggle icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4">
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                            <path d="M9 4v16"></path>
                            <path d="M14 10l2 2l-2 2"></path>
                        </svg>
                    </label>
                    <div className="text-2xl font-semibold">CivicHelp DashBoard</div>
                </nav>

                {/* Page content */}
              <Outlet></Outlet>
            </div>

            {/* Sidebar */}
            <div className="drawer-side is-drawer-close:overflow-visible">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="flex min-h-full flex-col justify-between bg-base-200 dark:bg-gray-800 is-drawer-close:w-14 is-drawer-open:w-64">
                    
                    {/* Top Menu Items */}
            <ul className="menu w-full grow">
              
                        <li>
                            <Link to="/" className="flex items-center w-full px-4 mb-2 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Home">
                               <img src={logo2} alt="logo" className='w-12  h-12 object-contain' />
                                <span className="ml-3 is-drawer-close:hidden">Homepage</span>
                            </Link>
                        </li>


                            {/* dashboard link item here ----*/}

            
            
              <li>
                  <Link to="/dashboard" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right"  data-tip="Dashboard">
                      <RiKeyboardBoxLine className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Dashboard</span>
                  </Link>
                </li>
              
{/*------------ Admin ------ 4 Menu------------------*/}
              
               {role === 'admin' && <>  <li>

                   <Link to="/dashboard/view-all-issues" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right"  data-tip="ViewAllIssues">
                      <FaBoxTissue className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">View All Issues</span>
                  </Link>
              </li>
              
             
              

          
              <li>
                  <Link to="/dashboard/manage-staff" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right"  data-tip="ManageStaff">
                      <FaUserAlt className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Manage Staff</span>
                  </Link>
              </li>
            

              
                <li>
                <Link to="/dashboard/manage-users" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="ManageUsers">
                      <FaUsers className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Manage Users</span>
                  </Link>
              </li>
            


       
               <li>
                  <Link
                    to="/dashboard/payments"
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payments"
                  >
                    <MdPayments className="w-5 h-5" />
                    <span className="ml-3 is-drawer-close:hidden">Payments</span>
                  </Link>
              </li>
              </>
              }



{/* staff--------------1 Menu------------------------ */}

               {role === 'staff' && <> <li>
                <Link to="/dashboard/assigned-issues" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="AssignedIssue">
                     <MdAssignmentTurnedIn  className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Assigned Issue</span>
                  </Link>
              </li>
                </>
              }
             

              
{/*-------------- citizen---2----User------------------------ */}
              
              {role === 'user' && <>
                
                 <li>
                <Link to="/dashboard/my-issues-page" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="MyIssues">
                      <FaPersonChalkboard className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">My Issues</span>
                  </Link>
                </li>
              
             {/* Report Issue form */}

          <li>
               <Link to="/dashboard/report-issue" className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="ReportIssue">
                      <AiOutlineForm className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Report Issue</span>
                  </Link>
                </li>
        </>
        }
             


      </ul>
            
            {/* ------------------------------------------------ */}

              <div className="w-full mb-4 flex flex-col">
                    {/* Profile Link */}
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center w-full px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                      <FcSettings className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Profile</span>
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogOut}
                      className="flex items-center w-full px-4 py-2 mt-2 hover:bg-gray-300 dark:hover:bg-gray-700 rounded "
                    >
                      <GrLogout className="w-5 h-5" />
                      <span className="ml-3 is-drawer-close:hidden">Logout</span>
                    </button>
                  </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
