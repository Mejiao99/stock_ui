import Table from 'react-bootstrap/Table'
export default function AccountsTable() {
   return( <Table striped bordered hover>
           <thead>
           <tr className="bg-dark text-white-50">
               <th>Account</th>
               <th>TicketA</th>
               <th>TicketB</th>
               <th>TicketC</th>
               <th>Currency:CAD</th>
               <th>Currency:USD</th>
               <th>Total</th>
           </tr>
           </thead>
           <tbody>
           <tr>
               <td>C1</td>
               <td>Number</td>
               <td>Number</td>
               <td>Number</td>
               <td>Number</td>
               <td>Number</td>
               <td>Number</td>
           </tr>
           <tr>
               <td>2</td>
               <td>Jacob</td>
               <td>Thornton</td>
               <td>@fat</td>
           </tr>
           <tr>
               <td>3</td>
               <td colSpan={2}>Larry the Bird</td>
               <td>@twitter</td>
           </tr>
           </tbody>
       </Table>
   )
}