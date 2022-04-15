import Table from "react-bootstrap/Table";

interface Cell {
  text?: string;
}
let cellAccount: Cell = {
  text: "Account",
};
let cellTicketA: Cell = {
  text: "TicketA",
};
let cellTicketB: Cell = {
  text: "TicketB",
};
let cellTicketC: Cell = {
  text: "TicketC",
};
let cellCurrencyCAD: Cell = {
  text: "Currency:CAD",
};
let cellCurrencyUSD: Cell = {
  text: "Currency:USD",
};
let cellTotal: Cell = {
  text: "Total",
};

let testDataInterface: String[][] = [
  [
    "Account",
    "TicketA",
    "TicketB",
    "TicketC",
    "Currency:CAD",
    "Currency:USD",
    "Total",
  ],
  ["C1", "6.29 CAD", "5 USD", "", "10 CAD", "7.96 USD", "10 CAD"],
];

function RenderTable(data: String[][]) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr className="bg-dark text-white-50 border border-dark text-nowrap">
          {data[0].map((x, i) => (
            <Column key={i} text={x} />
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="border border-dark text-nowrap">
          {data[1].map((x, i) => (
            <Row key={i} text={x} />
          ))}
        </tr>
      </tbody>
    </Table>
  );
}
const Column = (cell: any) => <th>{cell.text}</th>;
const Row = (cell: any) => <td>{cell.text}</td>;

export default function AccountsTable() {
  return RenderTable(testDataInterface);
  // <Table responsive striped bordered hover>
  //   <thead>
  //     <tr className="bg-dark text-white-50 border border-dark text-nowrap">
  //       <th>Account</th>
  //       <th>TicketA</th>
  //       <th>TicketB</th>
  //       <th>TicketC</th>
  //       <th>Currency:CAD</th>
  //       <th>Currency:USD</th>
  //       <th>Total</th>
  //     </tr>
  //   </thead>
  //   <tbody>
  //     <tr className="border border-dark text-nowrap">
  //       <td>C1</td>
  //       <td>6.29 CAD</td>
  //       <td>5 USD</td>
  //       <td></td>
  //       <td>10 CAD</td>
  //       <td>7.96 USD</td>
  //       <td>10 CAD</td>
  //     </tr>
  //     <tr className="border border-dark text-nowrap">
  //       <td>C2</td>
  //       <td>12.57 CAD</td>
  //       <td>5 USD</td>
  //       <td>4.60 EUR</td>
  //       <td>20 CAD</td>
  //       <td>15.91 USD</td>
  //       <td>20 CAD</td>
  //     </tr>
  //     <tr className="border border-dark text-nowrap">
  //       <td>C3</td>
  //       <td>6.29 CAD</td>
  //       <td>5 USD</td>
  //       <td></td>
  //       <td>10 CAD</td>
  //       <td>7.96 USD</td>
  //       <td>10 CAD</td>
  //     </tr>
  //     <tr className="border border-dark text-nowrap">
  //       <td>C4</td>
  //       <td>6.29 CAD</td>
  //       <td>5 USD</td>
  //       <td></td>
  //       <td>10 CAD</td>
  //       <td>7.96 USD</td>
  //       <td>10 CAD</td>
  //     </tr>
  //     <tr className="border border-dark text-nowrap">
  //       <td>Total</td>
  //       <td>31.44 CAD</td>
  //       <td>20 USD</td>
  //       <td>4.60 EUR</td>
  //       <td>50 CAD</td>
  //       <td>38.78 USD</td>
  //       <td>50 CAD</td>
  //     </tr>
  //   </tbody>
  // </Table>
}
