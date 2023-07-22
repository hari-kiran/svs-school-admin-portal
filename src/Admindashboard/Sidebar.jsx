import React,{useState} from 'react';
import './dashboard.css';
import logo from '../Assets/logo.jpeg'
import {FaPeopleCarry} from 'react-icons/fa';
import {AiFillSetting,AiOutlineDashboard} from 'react-icons/ai';
import {BiChevronDown,BiSitemap} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {GiNailedHead,GiTakeMyMoney} from 'react-icons/gi';
import {AiOutlineMenu} from 'react-icons/ai';
import {MdManageHistory} from 'react-icons/md';
import {SiGoogletagmanager} from 'react-icons/si';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {CgEditBlackPoint,CgPaypal} from 'react-icons/cg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const userId = sessionStorage.getItem('token_id');
const accessToken = sessionStorage.getItem('accessToken');

const handleLogout = async () => {
try {
const payload = {
 id: userId
 };
 const config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
};
const response = await axios.post('https://www.santhoshavidhyalaya.com/SVS/api/logout', payload,config);

// const response = await axios.post('http://127.0.0.1:8000/api/logout', payload, config);
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('user_type');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('token_id');


// setIsLoggedIn(false);


// Store the response data in session storage 
console.log("logout");
  window.location.href = '/svsportaladmin/';
} catch (error) {
console.error(error);
}
};


const Test = () => {

  const notify = () => toast.error("Toggle will not close !");
  return (
    <div>
    <div className="sidebar">
      <div className='damDiv'>
        <div className='row' >
          <div style={{backgroundColor:'#192F59',borderRight:'1px solid'}} className='col-auto col-sm-12  d-flex flex-column justify-content-between min-vh-100 p-0'>
            <div className=''>
                <div className='bg-white'>
                  <img style={{width:'40%',paddingLeft:'10px'}} src={logo} alt='logo' />
                  <AiOutlineMenu onClick={notify} className='navmenuside'/>
                </div>

                <div className='damIt'>
                  <div>
                  <ul class="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">

    {/*-------------------- DASHBOARD -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="/svsportaladmin/dashboard " className="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <AiOutlineDashboard size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Dashboard</span>
                    </a>
                  </li>
    {/*-------------------- Management User -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <SiGoogletagmanager size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Manage user</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>

                    <ul class="nav collapse ms-1" id='submenu' data-bs-parent = "parentM">
                        <li class="nav-item" style={{marginLeft:'30px'}}>
                            <a class="nav-link text-white" href="/svsportaladmin/MangerUser/User" aria-current="page" ><CgEditBlackPoint className='pe-1 pt-1'/><span className='d-none d-sm-inline menuSpanText'>User</span></a>
                        </li>
                        <li class="nav-item" style={{marginLeft:'30px'}}>
                            <a class="nav-link text-white" href="/svsportaladmin/MangerUser/Role" aria-current="page" ><CgEditBlackPoint className='pe-1 pt-1'/><span className='d-none d-sm-inline menuSpanText'>Role</span></a>
                        </li>
                        <li class="nav-item" style={{marginLeft:'30px'}}>
                            <a class="nav-link text-white" href="/svsportaladmin/MangerUser/StudentUser" aria-current="page" ><CgEditBlackPoint className='pe-1 pt-1'/><span className='d-none d-sm-inline menuSpanText'>Student user</span></a>
                        </li>
                    </ul>
                  </li>
    {/*-------------------- MASTERS -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu1" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <GiNailedHead size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Masters</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>
                    <ul  class="nav collapse ms-1" id='submenu1' data-bs-parent = "parentM">
                        {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/AddStudentlist" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Add student</span></a>
                        </li> */}
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/UploadPic" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Upload Photo</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/Mfees"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Fees Category</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/AddSponsorlist"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Sponsor</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/SectionMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Section</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/ClassMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Class</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/GroupMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Group</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}}class="nav-item ">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/ModeofpaymentMaster"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Mode of payment</span></a>
                        </li>
                    </ul>
                  </li>

    {/*-------------------- STUDENT FEES -----------------------------------------------*/}
                  {/* <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu2" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <GiTakeMyMoney size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Student Fees</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>

                    <ul class="nav collapse ms-1" id='submenu2' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="#student_profile" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Tuition Fees</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="#student_profile" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Bus Fees</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item ">
                            <a class="nav-link text-white" href="#SponserProfile"><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Hostal Fees</span></a>
                        </li>
                    </ul>
                  </li> */}
    {/*-------------------- Genrate Invoice -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu3" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <FaFileInvoiceDollar size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Genrate Invoice</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>

                    <ul class="nav collapse ms-1" id='submenu3' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/GeneralInvoice/Discountfees" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Discount fees</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/GeneralInvoice/Createinvoice" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Create Invoice</span></a>
                        </li>
                        {/* <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/GeneralInvoice/Payfee" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Pay Fees</span></a>
                        </li> */}
                           <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/GeneralInvoice/InvoiceTable" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Invoice Table</span></a>
                        </li>
                    </ul>
                  </li>
    {/*-------------------- Mapping System -----------------------------------------------*/}
                  <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu4" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <BiSitemap size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>Mapping System</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>

                    <ul class="nav collapse ms-1" id='submenu4' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/MappingStystem/Feesmaping" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Fees Mapping</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/MappingStystem/ViewMapping" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>View Mapping</span></a>
                        </li>
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/MappingStystem/Sponsormaping" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline menuSpanText'>Sponsor Mapping</span></a>
                        </li>
                    </ul>
                  </li>
      {/*-------------------- History -----------------------------------------------*/}
                      {/* <li class="nav-item my-1 py-2 py-sm-0">
                    <a href="#submenu5" class="nav-link text-white text-center text-sm-start menuText" data-bs-toggle = "collapse" aria-current="page">
                      <MdManageHistory size={29}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline'>History</span>
                      <BiChevronDown size={25} className='ms-0 ms-sm-3 d-none d-sm-inline' style={{float:'right'}}/>
                    </a>
                    <ul  class="nav collapse ms-1" id='submenu5' data-bs-parent = "parentM">
                        <li style={{marginLeft:'30px'}} class="nav-item">
                            <a class="nav-link text-white" href="/svsportaladmin/Masters/AddStudentlist" aria-current="page" ><CgEditBlackPoint className='pe-1'/><span className='d-none d-sm-inline'>Fees History</span></a>
                        </li>
                    </ul>
                  </li> */}

    {/*-------------------- Student Profile -----------------------------------------------*/}
                  {/* <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                    <a href="/svsportaladmin/StudentProfile/Profile" class="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <BsFillPersonLinesFill className='text-white' size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>User Profile</span>
                    </a>
                  </li> */}
    {/*-------------------- SPONSOR Payment -----------------------------------------------*/}
                  {/* <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                    <a href="/svsportaladmin/fees" class="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <FaPeopleCarry className='text-white' size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Sponsor Payment </span>
                    </a>
                  </li> */}

    {/*-------------------- SETTING-----------------------------------------------*/}
              <li class="nav-item text-white my-1 py-2 py-sm-0 ">
                    <a href="/svsportaladmin/Setting" class="nav-link text-white text-center text-sm-start menuText" aria-current="page">
                      <AiFillSetting className='text-white' size={25}/><span style={{fontSize:'20px'}} className='ms-2 d-none d-sm-inline menuSpanText'>Setting</span>
                    </a>
                  </li>
                  </ul>
                </div>
                </div>
{/*----------------- Login ----------------------------*/}
                

            </div>
            
        {/* LOGOUT SECTION */}
        {/* <div>
            <hr className='text-white'/>
                <div className='pb-2 ps-4 ' >
                  <a class="dropdown-item" href="#"><h6 className='text-danger ' style={{fontSize:'20px'}}><FiLogOut size={30} className='pe-2'/>Logout</h6></a>
                </div>
            </div> */}
        {/* LOGOUT SECTION */}

          </div>
        </div>
      </div>
    </div>
     <div className='pb-2 ps-4 ' style={{position: 'fixed',top: '90%',width: '17%',background: '#192f59',zIndex: '9999'}}>
        <div>
            <hr className='text-white'/> 
        </div> 
             <h6 onClick={handleLogout} className='text-danger' style={{fontSize:'20px',cursor:'pointer'}}><FiLogOut size={30} className='pe-2'/>Logout</h6>
        </div>
        </div>
  )
}

export default Test



