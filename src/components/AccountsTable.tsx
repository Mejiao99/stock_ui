import Table from "react-bootstrap/Table";
import { Money } from "./Money";

interface Cell {
  text?: string;
}
interface Totals {
  account: Money[];
  ticket: Money[];
  total: Money;
}

interface GetTableResponse {
  accounts: string[];
  tickets: string[];
  data: Money[][];
  totals: Totals;
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

function StringToCell(string: string): Cell {
  return { text: string };
}

function MoneyToCell(money: Money): Cell {
  return { text: money.amount + " " + money.currency };
}

function replaceCellsHorizontal(
  matrix: Cell[][],
  i: number,
  j: number,
  cells: Cell[]
) {
  for (let k = 0; k < cells.length; k++) {
    matrix[i][j + k] = cells[k];
  }
}

function replaceCellsVertical(
  matrix: Cell[][],
  i: number,
  j: number,
  cells: Cell[]
) {
  for (let k = 0; k < cells.length; k++) {
    matrix[i + k][j] = cells[k];
  }
}

function GenerateMatrix(tableResponse: GetTableResponse): Cell[][] {
  let result: Cell[][] = [];
  let rows: number = tableResponse.accounts.length + 2;
  let columns: number = tableResponse.tickets.length + 2;
  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < columns; j++) {
      result[i][j] = StringToCell("foo");
    }
  }
  // Ticket headers
  replaceCellsHorizontal(result, 0, 1, tableResponse.tickets.map(StringToCell));

  // Account tickets
  for (let i = 0; i < tableResponse.accounts.length; i++) {
    replaceCellsHorizontal(
      result,
      i + 1,
      1,
      tableResponse.data[i].map(MoneyToCell)
    );
  }

  // Accounts
  result[0][0] = StringToCell("Account");
  replaceCellsVertical(result, 1, 0, tableResponse.accounts.map(StringToCell));

  // Total
  result[0][columns - 1] = StringToCell("Total");
  replaceCellsVertical(
    result,
    1,
    columns - 1,
    tableResponse.totals.account.map(MoneyToCell)
  );

  // Total total
  result[rows - 1][0] = StringToCell("Total");
  replaceCellsHorizontal(
    result,
    rows - 1,
    1,
    tableResponse.totals.ticket.map(MoneyToCell)
  );
  result[rows - 1][columns - 1] = MoneyToCell(tableResponse.totals.total);

  return result;
}

function RenderTable(data: Cell[][]) {
  return (
    <Table responsive striped bordered hover size="sm">
      <tbody>
        {data.map((cellList, x, cellMatrix) => RenderRows(cellMatrix[x]))}
      </tbody>
    </Table>
  );
}
function RenderCell(cell: Cell) {
  return <td>{cell.text}</td>;
}

function RenderRows(cells: Cell[]) {
  return (
    <tr className="border border-dark text-nowrap">
      {cells.map((cell) => RenderCell(cell))}
    </tr>
  );
}

export default function AccountsTable() {
  let response: GetTableResponse = {
    accounts: ["C1", "C2", "C3", "C4"],
    tickets: ["TicketA", "TicketB", "TicketC", "Currency:CAD", "Currency:USD"],
    data: [
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
        { amount: 10, currency: "CAD" },
        { amount: 7.96, currency: "USD" },
      ],
      [
        { amount: 12.57, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 4.6, currency: "EUR" },
        { amount: 20, currency: "CAD" },
        { amount: 15.91, currency: "USD" },
      ],
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
        { amount: 10, currency: "CAD" },
        { amount: 7.96, currency: "USD" },
      ],
      [
        { amount: 6.29, currency: "CAD" },
        { amount: 5, currency: "USD" },
        { amount: 0, currency: "EUR" },
        { amount: 10, currency: "CAD" },
        { amount: 7.96, currency: "USD" },
      ],
    ],
    totals: {
      account: [
        { currency: "CAD", amount: 10 },
        { currency: "USD", amount: 20 },
        { currency: "CAD", amount: 10 },
        { currency: "CAD", amount: 10 },
      ],
      ticket: [
        { currency: "CAD", amount: 31.44 },
        { currency: "USD", amount: 20 },
        { currency: "EUR", amount: 4.6 },
        { currency: "CAD", amount: 50 },
        { currency: "USD", amount: 39.78 },
      ],
      total: { currency: "CAD", amount: 50 },
    },
  };
  return RenderTable(GenerateMatrix(response));
}
