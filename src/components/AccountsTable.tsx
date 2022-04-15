import Table from "react-bootstrap/Table";

interface Cell {
  text?: string;
}

export let columns: Cell[][] = [
  [
    { text: "Account" },
    { text: "TicketA" },
    { text: "TicketB" },
    { text: "TicketC" },
    { text: "Currency:CAD" },
    { text: "Currency:USD" },
    { text: "Total" },
  ],
];

let testCellInterface: Cell[][] = [
  [
    { text: "C1" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "C2" },
    { text: "12.57 CAD" },
    { text: "5 USD" },
    { text: "4.60 EUR" },
    { text: "20 CAD" },
    { text: "7.96 USD" },
    { text: "20 CAD" },
  ],
  [
    { text: "C3" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "C4" },
    { text: "6.29 CAD" },
    { text: "5 USD" },
    { text: "" },
    { text: "10 CAD" },
    { text: "7.96 USD" },
    { text: "10 CAD" },
  ],
  [
    { text: "Total" },
    { text: "31.44 CAD" },
    { text: "20 USD" },
    { text: "4.60 EUR" },
    { text: "50 CAD" },
    { text: "39.78 USD" },
    { text: "50 CAD" },
  ],
];

function RenderTable(data: Cell[][]) {
  return (
    <Table responsive striped bordered hover>
      <thead>
        {columns.map((cellList, x, cellMatrix) => RenderColumns(cellMatrix[x]))}
      </thead>
      <tbody>
        {data.map((cellList, x, cellMatrix) => RenderRows(cellMatrix[x]))}
      </tbody>
    </Table>
  );
}

function RenderRows(cells: Cell[]) {
  const Row = (cell: Cell) => <td>{cell.text}</td>;
  return (
    <tr className="border border-dark text-nowrap">
      {cells.map((cell, i) => (
        <Row key={i} text={cell.text} />
      ))}
    </tr>
  );
}

function RenderColumns(cells: Cell[]) {
  const Column = (cell: Cell) => <th>{cell.text}</th>;
  return (
    <tr className="bg-dark text-white-50 border border-dark text-nowrap">
      {cells.map((cell, i) => (
        <Column key={i} text={cell.text} />
      ))}
    </tr>
  );
}

export default function AccountsTable() {
  return RenderTable(testCellInterface);
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
