import React from 'react';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
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

//For API Requests
import axios from 'axios';

class App extends React.Component {

  // State array variable to save and show data
  constructor(props) {
    super(props)
      this.state = {
        data: [],
       
      }}
  componentDidMount() {
       //Get all users details in bootstrap table
        axios.get('https://www.testjsonapi.com/users/').then(res => 
        {
          //Storing users detail in state array object
          this.setState({data: res.data});
        
        }); 
    //initialize datatable
    $(document).ready(function () {
        setTimeout(function(){
        $('#example').DataTable(
            {
                pagingType: 'full_numbers',
                  pageLength: 5,
                  processing: true,
                  dom: 'Bfrtip',
                      buttons: ['copy', 'csv', 'print', 'colvis']
            }
        );
        } ,
        1000
        );
    });
 }
  render(){
    //Datatable HTML
  return (
    <div className="MainDiv">
    
          <h3>Therichpost.com</h3>
    
      
      <div className="container p-5">
          
          <table id="example" class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((result) => {
            return (
             
                 <tr>
                  <td>{result.id}</td>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.job_title}</td>
                </tr>
             
            )
          })}
           
            
          </tbody>
        </table>
          
        </div>
      </div>
  );
}
}
export default App;
