import Table from 'react-bootstrap/Table'

export default function AccountsTable() {
   return( <Table striped bordered hover>
           <thead>
           <tr className="bg-dark text-white-50 border border-dark ">
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
           <tr className="border border-dark">
               <td>C1</td>
               <td className="text-right">6.29 CAD</td>
               <td className="text-right">5 USD</td>
               <td></td>
               <td>10 CAD</td>
               <td>7.96 USD</td>
               <td>10 CAD</td>
           </tr>
           <tr className="border border-dark">
               <td>C2</td>
               <td>12.57 CAD</td>
               <td>5 USD</td>
               <td>4.60 EUR</td>
               <td>20 CAD</td>
               <td>15.91 USD</td>
               <td>20 CAD</td>
           </tr>
           <tr className="border border-dark">
               <td>C3</td>
               <td>6.29 CAD</td>
               <td>5 USD</td>
               <td></td>
               <td>10 CAD</td>
               <td>7.96 USD</td>
               <td>10 CAD</td>
           </tr>
           <tr className="border border-dark">
               <td>C4</td>
               <td>6.29 CAD</td>
               <td>5 USD</td>
               <td></td>
               <td>10 CAD</td>
               <td>7.96 USD</td>
               <td>10 CAD</td>
           </tr>
           <tr className="border border-dark">
               <td>Total</td>
               <td>31.44 CAD</td>
               <td>20 USD</td>
               <td>4.60 EUR</td>
               <td>50 CAD</td>
               <td>38.78 USD</td>
               <td>50 CAD</td>
           </tr>
           </tbody>
       </Table>
   )
}