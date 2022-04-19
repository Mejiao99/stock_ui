export default function handler(req, res) {
    res.status(200).json({
        // accounts: string[];
        accounts: ["C1","C2","C3","C4"],
        tickets: ["TicketA","TicketB","TicketC"],
        data:{},
        totals: {},
    });
}