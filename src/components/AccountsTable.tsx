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
}