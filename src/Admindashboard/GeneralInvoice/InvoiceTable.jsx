
import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "../Header";
import ReactDOM from "react-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import Paper from "@mui/material/Paper";
import DiscountTable from "./DiscountTable";
import { Row, Col } from "react-bootstrap";
import { TbTableImport } from "react-icons/tb";
import {BsReceiptCutoff} from 'react-icons/bs'
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from "axios";


import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

const InvoiceTable = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [m_name, name] = useState(null);
  const [m_actual_amount, actual_amount] = useState(null);
  const [m_discount_percent, discount_percent] = useState(null);
  const [m_fees_glance, fees_glance] = useState(null);
  const [m_previous_pending_amount, previous_pending_amount] = useState(null);
  const [m_slno, Setslno] = useState(null);
  const [m_amount, amount] = useState(null);
  const [m_paid_amount, paid_amount] = useState(null);
  const [m_payment_status, payment_status] = useState(null);
  const [m_total_invoice_amount, total_invoice_amount] = useState(null);
  const [m_invoice_pending_amount, invoice_pending_amount] = useState(null);
  const [m_SetInvoice_no, SetInvoice_no] = useState(null);
  const [m_Cashamount, setCashamount] = useState(null);
  const [mode, setmode] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [enteredAmount, SetenteredAmount] = useState("");
  const [m_roll_no, roll_no] = useState(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const [payingAmount, setPayingAmount] = useState(0);
  const [sections, setSections] = useState([])

  const fetchSections = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVS/api/pay-master-read');
      const data = await response.json();
      setSections(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);


  useEffect(() => {
    setMaxAmount(invoice_pending_amount === 0 ? total_invoice_amount : 0);
  }, [total_invoice_amount, invoice_pending_amount]);

  const maxAmounts = m_invoice_pending_amount ? parseFloat(m_invoice_pending_amount) : parseFloat(m_total_invoice_amount) ;

  const handleAmountChange = (event) => {
    setCashamount(event.target.value);
    SetenteredAmount(event.target.value);
    const amount = event.target.value;
    if (amount >= 0 && amount <= maxAmounts) {
      setPayingAmount(amount);
    }

    let SetenteredAmount = event.target.value;
    console.log(SetenteredAmount, maxAmount);
    if (enteredAmount > maxAmount) {
      Swal.fire("Entered amount exceeds the maximum value!");
      // enteredAmount = 0;
      // setCashamount(enteredAmount);
    }
    // else {
    // setCashamount(enteredAmount);
    // }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (slno) => {
    console.log(slno);

    fetch("https://www.santhoshavidhyalaya.com/SVS/api/listgenrateById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: slno,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        name(data.data.name);
        actual_amount(data.data.actual_amount);
        discount_percent(data.data.discount_percent);
        fees_glance(data.data.fees_glance);
        previous_pending_amount(data.data.previous_pending_amount);
        total_invoice_amount(data.data.total_invoice_amount);
        amount(data.data.amount);
        paid_amount(data.data.paid_amount);
        payment_status(data.data.payment_status);
        invoice_pending_amount(data.data.invoice_pending_amount);
        roll_no(data.data.roll_no);
        Setslno(data.data.slno);
        SetInvoice_no(data.data.invoice_no);
        setCashamount(data.data.total_invoice_amount);
        setShow(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCash = async () => {
    try {
      await fetch("https://www.santhoshavidhyalaya.com/SVS/api/paycashgenrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: m_slno,
          total_invoice_amount: m_total_invoice_amount,
          invoice_pending_amount: m_invoice_pending_amount,
          Invoice_no: m_SetInvoice_no,
          additionalDetails: additionalDetails,
          amount: m_Cashamount,
          mode: mode,
        }),
      });
  
      // Reload the DataTable
      $('#DiscountTable').DataTable().ajax.reload();
  
      Swal.fire({
        icon: "success",
        title: "Update successfully!",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const printInvoice = (invoiceNo) => {
    // Create a new window or tab for the print view
    const printWindow = window.open(`/svsportaladmin/GeneralInvoice/StudentInvoice/${invoiceNo}`, '_blank');
  };
  const printRecp = (invoiceNo) => {
    // Create a new window or tab for the print view
    const printWindow = window.open(`/svsportaladmin${invoiceNo}`, '_blank');
  };
  const handleFilter = async () => {
    const fromDate = fromDateRef.current.value;
    const toDate = toDateRef.current.value;
    console.log(fromDate, toDate);

    try {
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVS/api/listgenratefilter",
        {
          from: fromDate,
          to: toDate,
        }
      );

      $("#DiscountTable").DataTable().clear().draw();

      const total_actual_amount = response.data.totals.total_actual_amount;
      const total_discount_percent = response.data.totals.total_discount_percent;
      const total_invoice_pending_amount = response.data.totals.invoice_pending_amount;
      const total_paid_amount = response.data.totals.total_paid_amount;

      setTotalActualAmount(total_actual_amount);
      setTotalDiscountAmount(total_discount_percent);
      setTotalPendingAmount(total_invoice_pending_amount);
      setTotalPaidAmount(total_paid_amount);

      $("#DiscountTable").DataTable().rows.add(response.data.data).draw();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $("#DiscountTable").DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'print'],
        destroy: true,
        processing: true,
        serverSide: false,
        ajax: {
          url: "https://www.santhoshavidhyalaya.com/SVS/api/listgenrate",
          type: "GET",
        },
        dom: "lfBrtip",
        buttons: [
          {
            extend: 'copy',
            className: 'btn btn-success',
          },
          {
            extend: 'csv',
            className: 'btn btn-danger',
          },
          {
            extend: 'print',
            className: 'btn btn-warning',
          }
        ],
        columnDefs: [
          {
            data: "action",
            defaultContent: "<button>Edit</button>",
            targets: [20, 21,22],
          },
        ],
        columns: [
          { data: "slno" }, // Hidden column
          { data: "invoice_no" },
          { data: "roll_no" },
          { data: "name" },
          { data: "standard" },
          { data: "twe_group" },
          { data: "sec" },
          { data: "hostelOrDay" },
          { data: "sponser_id" },
          { data: "email" },
          { data: "actual_amount" },
          { data: "discount_percent" },
          { data: "amount" },
          { data: "date" },
          { data: "acad_year" },
          { data: "due_date" },
          { data: "payment_status" },
          { data: "created_by" },
          { data: "additionalDetails" },
          { data: "mode"},
          {
            data: "action",
            targets: 20,
            createdCell: (td, cellData, rowData, row, col) =>
              ReactDOM.render(
                [
                  <MdPayments
                    style={{
                      color: "#F07600",
                      cursor: "pointer",
                      textAlign: "center",
                    }} size={25} onClick={() => handleShow(rowData.slno)}/>,
                ],
                td
              ),
          },
          {
            data: "action",
            targets: 20,
            createdCell: (td, cellData, rowData, row, col) => {
              // Check if rowData.url is not empty
              if (rowData.invoice_no) {
                ReactDOM.render(
                  <FaFileInvoiceDollar
                    style={{ color: "#000", cursor: "pointer", textAlign: "center" }} size={25}
                    onClick={() => printInvoice(rowData.invoice_no)}
                  />,
                  td
                );
              } else {
                ReactDOM.render(null, td); // If rowData.url is empty, render null (which means the icon will not be displayed)
              }
            },
          },
          {
            data: "action",
            targets: 20,
            createdCell: (td, cellData, rowData, row, col) => {
              // Check if rowData.url is not empty
              if (rowData.url) {
                ReactDOM.render(
                  <BsReceiptCutoff
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }} size={25}
                    onClick={() => printRecp(rowData.url)}
                  />,
                  td
                );
              } else {
                ReactDOM.render(null, td); // If rowData.url is empty, render null (which means the icon will not be displayed)
              }
            },
          },
        ],
        order: [[0, "desc"]],



        rowCallback: function (row, data) {
          $(row).on("click", function () {
            // Open the modal here
            handleShow(data.slno);
          });
          row.style.cursor = "pointer";
          // row.addEventListener('mouseover', () => {
          //   row.style.backgroundColor = '#757575'; // Reset to default color
          //   row.style.color = 'WHITE'; // Reset to defa
          // });

          // // Remove hover color
          // row.addEventListener('mouseout', () => {
          //   row.style.backgroundColor = '';

          //    row.style.color = 'black';
          // });
          row.addEventListener("mouseover", () => {
            if (!row.classList.contains("paid-row")) {
              row.style.backgroundColor = "#757575";
              row.style.color = "white";
            }
          });

          row.addEventListener("mouseout", () => {
            if (!row.classList.contains("paid-row")) {
              row.style.backgroundColor = "";
              row.style.color = "black";
            }
          });
        },
        createdRow: function (row, data, dataIndex) {
          const paymentStatus = data.payment_status;
          if (paymentStatus === "Paid") {
            row.style.backgroundColor = "lightgreen";
            row.classList.add("paid-row");
          } else if (paymentStatus === "Partial Paid") {
            row.style.backgroundColor = "#FFC0CB";
            row.classList.add("paid-row");
          }
        },
      });
    });
  }, []);

  const handleFilterClick = () => {
    if (fromDate && toDate) {
      // Call the API with the selected date range
      fetchInvoices();
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVS/api/listgenratefilter",
        {
          from: fromDate,
          to: toDate,
        }
      );
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />

        <div className="container">
          <h2 className="p-4" style={{ fontFamily: "auto" }}>
            <TbTableImport className="pe-1 pb-1" size={35} />
            Invoice list
          </h2>
          <div className="py-1">
            {/* Card for invoice */}
            <div className="container">
              <Row>
                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #73AD21",
                      padding: "16x",
                      width: "220px",
                      height: "170px",
                    }}>
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Actual Amount</h4>
                    <h5>₹ : {totalActualAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #F5C148",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}
                  >
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Discount Amount</h4>
                    <h5>₹ : {totalDiscountAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #F62D1F",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}>
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Paid Amount</h4>
                    <h5>₹ : {totalPaidAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #42AAE6",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}
                  >
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Pending Amount</h4>
                    <h5>₹ : {totalPendingAmount}</h5>
                  </div>
                </Col>
              </Row>
            </div>

            {/*--------------- Filter Date-Time--------------------------------------- */}
            <div className="pt-4">
              <div
                className="pt-5 d-flex"
                style={{
                  margin: "auto",
                  width: "100%",
                  border: "5px solid #dfdfdf",
                  padding: "52px",
                  backgroundColor: "#e6e6e6",
                }} >
                <div style={{ marginLeft: "260px", display: "flex" }}>
                  <h5 className="pe-2 pt-3">From Date:</h5>
                  <input type="date" ref={fromDateRef} />
                  <h5 className="ps-2 pe-2 pt-3">To Date:</h5>
                  <input type="date" ref={toDateRef} />
                  <div className="ps-4">
                    <button
                      className="button-18"
                      type="submit"
                      onClick={handleFilter}>
                      <h6 className="mb-0" onClick={handleFilter}>
                        Filter
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*--------------- Filter Date-Time--------------------------------------- */}


            <Paper elevation={2} className="pb-5">
             <div className='container pt-5'>
               {/* <DiscountTable/> */}
               <div className="MainDiv">
      {/* Model popup for payablefee */}
      <Modal className="pt-5" show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: '#3488FF', color: '#fff' }} closeButton>
          <Modal.Title>Enter Payable Amount</Modal.Title>
        </Modal.Header>
                    <Modal.Body>
                    {m_payment_status === 'Paid' ? (
    <h2 style={{ color: 'green', textAlign: 'center' }}>{m_payment_status}</h2>
  ) : (
    <h2 style={{ textAlign: 'center' }}>{m_payment_status}</h2>
  )}
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                              <h6>{m_name} | {m_roll_no}</h6>
                </td>
              </tr>
              <tr>
                <td>Actual Amount</td>
                <td>
                  <h6>₹{m_actual_amount}</h6>{' '}
                </td>
              </tr>
              <tr>
                <td>Discount Amount</td>
                <td>
                  <h6>₹ {m_discount_percent}</h6>
                </td>
              </tr>
              <tr>
                <td>Fee glance</td>
                <td>
                <h6 dangerouslySetInnerHTML={{ __html: m_fees_glance }}></h6>
                </td>
                          </tr>
                          <tr>
                <td>Status</td>
                <td>
                  <h6>{m_payment_status}</h6>
                </td>
                          </tr>
                          <tr>
                <td>Previous Paid Amount</td>
                <td>
                  <h6>₹ {m_paid_amount}</h6>
                </td>
                          </tr> 
                          <tr>
                <td>Previous Pending Amount</td>
                <td>
                  <h6>₹ {m_previous_pending_amount}</h6>
                </td>
                          </tr>              
                          <tr style={{backgroundColor: 'lightgreen', fontColor: 'black'}}>
                <td>Total Invoice Amount<br></br>[added Previous Pending Amount]</td>
                <td>
                  <h3 className='text-black fw-bolder'>₹ {m_total_invoice_amount}</h3>
                </td>
                          </tr>
                          <tr style={{backgroundColor: '#FFC0CB', color: 'white'}}>
                <td>Current Invoice Pending Amount</td>
                <td>
                  <h4>₹ {m_invoice_pending_amount}</h4>
                </td>
                          </tr>
                          {m_payment_status !== 'Paid' && m_payment_status !== 'Partial Paid' && (
  <>
    <tr>
      <td>Paying Amount</td>
      <td>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            inputProps={{ max: maxAmount }}
            onChange={handleAmountChange}
            value={m_Cashamount}
          />
        </FormControl>
      </td>
    </tr>
    <tr>
      <td>Select Mode of Payment</td>
      <Form.Select onChange={(e) => setmode(e.target.value)}>
      {sections.map((res) => (
            <option key={res.id}>{res.paymenttype}</option>
      ))}
     </Form.Select>
    
    </tr>
    <tr>
      <td>Remarks</td>
      <td>
        <Col>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter additional details"
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </Col>
      </td>
    </tr>
  </>
)}

            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#E2E3E3' }}>
          <Button variant="secondary" onClick={handleClose}>
            Close
                      </Button>
                      {m_payment_status !== 'Paid' && m_payment_status !== 'Partial Paid' && (
  <Button variant="success" onClick={handleCash}>
    Enter
  </Button>
)}

        </Modal.Footer>
      </Modal>



      <div className="container">
        <div className="table-responsive">
          <table responsive id="DiscountTable" className="display">
            <thead>
              <tr>
               <th>Slno</th>
                <th>Invoice no</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Standard</th>
                <th>Group</th>
                <th>Section</th>
                <th>Hostel/Day</th>
                <th>Sponsor Name</th>
                <th>Email</th>
                <th>Actual Amount</th>
                <th>Discount Amount</th>
                <th>Discounted Amount</th>
                <th>Date</th>
                <th>year</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th>Created By</th>
                <th>Remark</th>
                <th>Mode</th>
                <th>Payable Fee</th>
                <th>View Invoice</th>
                <th>Receipt</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

 
    </div>
             </div>
          </Paper>
          
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;







// import React, { useMemo,useState } from 'react';
// import Sidebar from '../Sidebar';
// import Footer from '../Footer';
// import Header from '../Header';
// import Paper from '@mui/material/Paper';
// import DiscountTable from './DiscountTable';
// import {Row,Col} from 'react-bootstrap';
// import {TbTableImport} from 'react-icons/tb'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const InvoiceTable = () => {

//   return (
//     <div>
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>

//         <div className='container'>
//           <h2 className='p-4' style={{fontFamily:'auto'}}><TbTableImport className="pe-1 pb-1" size={35}/>Invoice list</h2>
//           <div className='py-1'>

//             {/* Card for invoice */}
//             <div className='container'>
//               <Row>
//                 <Col className='text-center'>
//                     <div style={{ borderRadius: '10px', border: '2px solid #73AD21', padding: '20px', width: '220px', height: '150px'}}>
//                       <h4 style={{fontFamily:'initial', paddingTop:'20px'}}>Payment</h4>
//                       <h5>Count : 234</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #F5C148', padding: '20px', width: '220px', height: '150px'}}>
//                       <h4 style={{fontFamily:'initial', paddingTop:'20px'}}>Payment</h4>
//                       <h5>Count : 234</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #F62D1F', padding: '20px', width: '220px', height: '150px'}}>
//                       <h4 style={{fontFamily:'initial', paddingTop:'20px'}}>Payment</h4>
//                       <h5>Count : 234</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #42AAE6', padding: '20px', width: '220px', height: '150px'}}>
//                       <h4 style={{fontFamily:'initial', paddingTop:'20px'}}>Payment</h4>
//                       <h5>Count : 234</h5>
//                     </div>
//                 </Col>
//               </Row>
//             </div>

//  {/*--------------- Filter Date-Time--------------------------------------- */}
//           <div className='pt-5 d-flex' style={{marginLeft:'156px'}}>
//                 <div className='d-flex'>
//                 <h5 className='p-4'>From</h5>
//                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                       <DemoContainer components={['DatePicker']}>
//                         <DatePicker  format='DD/MM/YYYY' />
//                       </DemoContainer>
//                     </LocalizationProvider>
//                 </div>

//                 <div className='d-flex'>
//                 <h5 className='p-4' >To</h5>
//                 <LocalizationProvider dateAdapter={AdapterDayjs} >
//                       <DemoContainer components={['DatePicker']}>
//                         <DatePicker format='DD/MM/YYYY'/>
//                       </DemoContainer>
//                     </LocalizationProvider>
//                 </div>
//                 <div className='pt-2 ps-4'>
//                   <button  class="button-18" role="button"><h6 className='mb-0'>Filter</h6></button>
//                 </div>
//             </div>

//  {/*--------------- Filter Date-Time--------------------------------------- */}

//           <Paper elevation={2} className="pb-5">
//              <div className='container pt-5'>
//                <DiscountTable/>
//              </div>
//           </Paper>
//           </div>
//         </div>
//    </div>
//     </div>
//   )
// }

// export default InvoiceTable

// import React, { useRef,useState, useEffect } from 'react';
// import Sidebar from '../Sidebar';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import FilledInput from '@mui/material/FilledInput';
// import InputAdornment from '@mui/material/InputAdornment';
// import Header from '../Header';
// import ReactDOM from 'react-dom';
// import { FaFileInvoiceDollar } from 'react-icons/fa';
// import { MdPayments } from 'react-icons/md';
// import Paper from '@mui/material/Paper';
// import DiscountTable from './DiscountTable';
// import {Row,Col} from 'react-bootstrap';
// import {TbTableImport} from 'react-icons/tb'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import axios from 'axios';
// import $ from 'jquery';

// const InvoiceTable = () => {
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [show, setShow] = useState(false);
//   const [tableData, setTableData] = useState([]);

//   const fromDateRef = useRef(null);
//   const toDateRef = useRef(null);

//   const [totalActualAmount, setTotalActualAmount] = useState(0);
//   const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
//   const [totalPendingAmount, setTotalPendingAmount] = useState(0);
//   const [totalPaidAmount, setTotalPaidAmount] = useState(0);

//   const handleClose = () => {
//     setShow(false);
//   };

//   const handleShow = () => {
//     setShow(true);
//   };

//   const handleFilter = async () => {
//     const fromDate = fromDateRef.current.value;
//     const toDate = toDateRef.current.value;
//     console.log(fromDate,toDate);

//     try {
//       const response = await axios.post('https://www.santhoshavidhyalaya.com/SVS/api/listgenratefilter', {
//         from: fromDate,
//         to: toDate
//       });

//       $('#DiscountTable').DataTable().clear().draw();

//       const total_actual_amount = response.data.totals.total_actual_amount;
//       const total_discount_percent = response.data.totals.total_discount_percent;
//       const total_invoice_pending_amount = response.data.totals.total_invoice_pending_amount;
//       const total_paid_amount = response.data.totals.total_paid_amount;

//       setTotalActualAmount(total_actual_amount);
//       setTotalDiscountAmount(total_discount_percent);
//       setTotalPendingAmount(total_invoice_pending_amount);
//       setTotalPaidAmount(total_paid_amount);

//       $('#DiscountTable').DataTable().rows.add(response.data.data).draw();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     $(document).ready(function () {
//       $('#DiscountTable').DataTable({
//         dom: 'Bfrtip',
//         buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
//         destroy: true,
//         processing: true,
//         serverSide: false,
//         ajax: {
//           url: 'https://www.santhoshavidhyalaya.com/SVS/api/listgenrate',
//           type: 'GET',
//         },
//         dom: 'Plfrtip',
//         columnDefs: [
//           {
//             data: 'action',
//             defaultContent: "<button>Edit</button>",
//             targets: [18, 19],
//           },
//         ],
//         columns: [
//           { data: 'slno' }, // Hidden column
//           { data: 'invoice_no' },
//           { data: 'roll_no' },
//           { data: 'name' },
//           { data: 'standard' },
//           { data: 'twe_group' },
//           { data: 'sec' },
//           { data: 'hostelOrDay' },
//           { data: 'sponser_id' },
//           { data: 'email' },
//           { data: 'actual_amount' },
//           { data: 'discount_percent' },
//           { data: 'amount' },
//           { data: 'date' },
//           { data: 'acad_year' },
//           { data: 'due_date' },
//           { data: 'payment_status' },
//           { data: 'created_by' },
//           {
//             data: 'action',
//             targets: 18,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <MdPayments
//                     style={{ color: '#F07600', cursor: 'pointer', textAlign: 'center' }}
//                     size={25}
//                     onClick={handleShow}
//                   />,
//                   // onClick={() => {handleShow(); content.getById(rowData.slno);}}
//                 ],
//                 td
//               ),
//           },
//           {
//             data: 'action',
//             targets: 19,
//             createdCell: (td, cellData, rowData, row, col) =>
//               ReactDOM.render(
//                 [
//                   <a target='_blank' href={`/GeneralInvoice/StudentInvoice/${rowData.invoice_no}`}>
//                     <FaFileInvoiceDollar
//                       style={{ color: 'green', cursor: 'pointer', textAlign: 'center' }}
//                       size={25}
//                     />
//                   </a>,
//                 ],
//                 td
//               ),
//           },
//         ], order: [[0, 'desc']] //////////for desc
//       });
//     });
//   }, []);

//   const handleFilterClick = () => {
//     if (fromDate && toDate) {
//       // Call the API with the selected date range
//       fetchInvoices();
//     }
//   };

//   const fetchInvoices = async () => {
//     try {
//       const response = await axios.post('https://www.santhoshavidhyalaya.com/SVS/api/listgenratefilter', {
//         from: fromDate,
//         to: toDate
//       });

//       // Process the response data and update your component state accordingly
//       // ...
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//     }
//   };

//   return (
//     <div>
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>

//         <div className='container'>
//           <h2 className='p-4' style={{fontFamily:'auto'}}><TbTableImport className="pe-1 pb-1" size={35}/>Invoice list</h2>
//           <div className='py-1'>

//             {/* Card for invoice */}
//             <div className='container'>
//               <Row>
//                 <Col className='text-center'>
//                     <div style={{ borderRadius: '10px', border: '2px solid #73AD21', padding: '16x', width: '220px', height: '170px'}}>
//                       <h3 style={{fontFamily:'initial', paddingTop:'25px'}}>Total</h3>
//                       <h4 style={{fontFamily:'initial'}}>Actual Amount</h4>
//                       <h5>₹ : {totalActualAmount}</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #F5C148', padding: '0px', width: '220px', height: '170px'}}>
//                     <h3 style={{fontFamily:'initial', paddingTop:'25px'}}>Total</h3>
//                       <h4 style={{fontFamily:'initial'}}>Discount Amount</h4>
//                       <h5>₹ : {totalDiscountAmount}</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #F62D1F', padding: '0px', width: '220px', height: '170px'}}>
//                     <h3 style={{fontFamily:'initial', paddingTop:'25px'}}>Total</h3>
//                     <h4 style={{fontFamily:'initial'}}>Paid Amount</h4>
//                       <h5>₹ : {totalPaidAmount}</h5>
//                     </div>
//                 </Col>

//                 <Col className='text-center'>
//                   <div style={{ borderRadius: '10px', border: '2px solid #42AAE6', padding: '0px', width: '220px', height: '170px'}}>
//                     <h3 style={{fontFamily:'initial', paddingTop:'25px'}}>Total</h3>
//                       <h4 style={{fontFamily:'initial'}}>Pending Amount</h4>
//                       <h5>₹ : {totalPendingAmount}</h5>
//                     </div>
//                 </Col>
//               </Row>
//             </div>

//  {/*--------------- Filter Date-Time--------------------------------------- */}
//  {/* <div className='pt-5 d-flex' style={{ marginLeft: '156px' }}>
//   <div className='d-flex'>
//     <h5 className='p-4'>From</h5>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker
//           format='DD/MM/YYYY'
//           value={fromDate}
//           onChange={(date) => setFromDate(date)}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   </div>

//   <div className='d-flex'>
//     <h5 className='p-4'>To</h5>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker
//           format='DD/MM/YYYY'
//           value={toDate}
//           onChange={(date) => setToDate(date)}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   </div>

//   <div className='pt-2 ps-4'>
//     <button className="button-18" type='submit' onClick={handleFilter}>
//       <h6 className='mb-0'>Filter</h6>
//     </button>
//   </div>
// </div> */}
//      <div className='pt-4'>
//        <div className='pt-5 d-flex' style={{ margin: 'auto',width: '100%',border: '5px solid #dfdfdf',padding: '52px',backgroundColor: '#e6e6e6', }}>
//          <div style={{marginLeft:'260px', display:'flex'}}>
//             <h5 className='pe-2 pt-3'>From Date:</h5>
//             <input type="date" ref={fromDateRef}  />
//             <h5 className='ps-2 pe-2 pt-3'>To Date:</h5>
//             <input type="date" ref={toDateRef} />
//             <div className='ps-4'>
//             <button className="button-18" type='submit' onClick={handleFilter}>
//               <h6 className='mb-0' onClick={handleFilter}>Filter</h6>
//             </button>
//              </div>
//          </div>
//        </div>
//       </div>

//  {/*--------------- Filter Date-Time--------------------------------------- */}

//           <Paper elevation={2} className="pb-5">
//              <div className='container pt-5'>
//                {/* <DiscountTable/> */}
//                <div className="MainDiv">
//       {/* Model popup for payablefee */}
//       <Modal className="pt-5" show={show} onHide={handleClose}>
//         <Modal.Header style={{ backgroundColor: '#3488FF', color: '#fff' }} closeButton>
//           <Modal.Title>Enter Payable Amount</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Table striped bordered hover>
//             <tbody>
//               <tr>
//                 <td>Name</td>
//                 <td>
//                   <h6>Mohammed</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Actual Amount</td>
//                 <td>
//                   <h6>₹ 34000</h6>{' '}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Discount Amount</td>
//                 <td>
//                   <h6>₹ 10000</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Discounted Amount</td>
//                 <td>
//                   <h6>₹ 24000</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Due Amount</td>
//                 <td>
//                   <h6>₹ :-</h6>
//                 </td>
//               </tr>
//               <tr>
//                 <td>Payable Amount</td>
//                 <td>
//                   <FormControl fullWidth sx={{ m: 1 }} variant="filled">
//                     <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
//                     <FilledInput
//                       id="filled-adornment-amount"
//                       startAdornment={<InputAdornment position="start">₹</InputAdornment>}
//                     />
//                   </FormControl>
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer style={{ backgroundColor: '#E2E3E3' }}>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="success" onClick={handleClose}>
//             Enter
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <div className="container">
//         <div className="table-responsive">
//           <table responsive id="DiscountTable" className="display">
//             <thead>
//               <tr>
//                <th>Slno</th>
//                 <th>Invoice no</th>
//                 <th>Roll No</th>
//                 <th>Student Name</th>
//                 <th>Standard</th>
//                 <th>Group</th>
//                 <th>Section</th>
//                 <th>Hostel/Day</th>
//                 <th>Sponsor Name</th>
//                 <th>Email</th>
//                 <th>Actual Amount</th>
//                 <th>Discount Amount</th>
//                 <th>Discounted Amount</th>
//                 <th>Date</th>
//                 <th>year</th>
//                 <th>Due Date</th>
//                 <th>Payment Status</th>
//                 <th>Created By</th>
//                 <th>Payable Fee</th>
//                 <th>View Invoice</th>
//               </tr>
//             </thead>
//           </table>
//         </div>
//       </div>

//     </div>
//              </div>
//           </Paper>
//           </div>
//         </div>
//    </div>
//     </div>
//   )
// }

// export default InvoiceTable










