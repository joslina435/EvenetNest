import { useParams } from "react-router"
import { getEventById } from "../../services/eventService"
import { useEffect, useState } from "react";
import { createExp, getExpenseByEventId, updateExp } from "../../services/eventBudget";

function EventBudget() {

    const { eventId } = useParams();
    const [event, setEvent] = useState({});
    const [isExpFormOpen, setIsExpFormOpen] = useState(false);
    const [expenseName, setExpName] = useState("");
    // const [expCategory,setExpCategory] = useState("")
    const [expenseAmount, setExpAmount] = useState(0);
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentProof, setPaymentProof] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [isEditModeOn, setIsEditModeOn] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [paymentProofName, setPaymentProofName] = useState("");

    // const eventBudget = getEventById(eventId);
    // console.log(eventBudget);
    const handleExp = () => {
        setIsExpFormOpen(true);
    }
    const handleEdit = (expense) => {
        setIsExpFormOpen(true);
        setIsEditModeOn(true);
        console.log(expense);
        setEditingExpense(expense);
        setExpName(expense.expenseName);
        setExpAmount(expense.expenseAmount);
        setPaymentMethod(expense.paymentMethod);
        setPaymentDate(expense.paymentDate);
        setPaymentProof(null);
        setPaymentProofName(expense.paymentProofName || "");
    }

    // const handleExpSubmit = async (event) => {
    //     event.preventDefault();
    //     const exp = {
    //         id: crypto.randomUUID(),
    //         eventId,
    //         expenseName,
    //         expenseAmount: Number(expenseAmount),
    //         paymentDate,
    //         paymentMethod,
    //         paymentProof: null
    //     }
    //     console.log(exp);
    //     const reader = new FileReader();
    //     reader.onload = async () => {
    //         exp.paymentProof = reader.result;

    //         try {
    //             if (isEditModeOn) {
    //                 await updateExp(exp.id, exp);
    //                 console.log("editing loading")
    //             }
    //             else {
    //                 const expensesData = await createExp(exp);
    //                 setExpenses((currentExpens) => [...currentExpens, expensesData]);

    //                 setExpName("");
    //                 setExpAmount("");
    //                 setPaymentMethod("");
    //                 setPaymentProof(null);
    //                 setPaymentDate("");
    //                 setIsExpFormOpen(false);
    //             }

    //         }
    //         catch {
    //             throw Error("Failed to create expenditure");
    //         }
    //     };
    //     reader.readAsDataURL(paymentProof);

    // }
    const handleExpSubmit = async (event) => {
        event.preventDefault();

        try {
            let proofData = editingExpense?.paymentProof || null;
            let proofName = editingExpense?.paymentProofName || "";

            // If user selected a new file
            if (paymentProof) {
                const reader = new FileReader();

                proofData = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(reader.error);

                    reader.readAsDataURL(paymentProof);
                });

                proofName = paymentProof.name;
            }

            const exp = {
                id: isEditModeOn ? editingExpense.id : crypto.randomUUID(),
                eventId,
                expenseName,
                expenseAmount: Number(expenseAmount),
                paymentDate,
                paymentMethod,
                paymentProof: proofData,
                paymentProofName: proofName
            };

            if (isEditModeOn) {
                const updatedExpense = await updateExp(exp.id, exp);

                setExpenses((currentExpenses) =>
                    currentExpenses.map((expense) =>
                        expense.id === updatedExpense.id
                            ? updatedExpense
                            : expense
                    )
                );
            } else {
                const expensesData = await createExp(exp);

                setExpenses((currentExpenses) => [
                    ...currentExpenses,
                    expensesData
                ]);
            }

            setExpName("");
            setExpAmount("");
            setPaymentMethod("");
            setPaymentProof(null);
            setPaymentProofName("");
            setPaymentDate("");
            setIsExpFormOpen(false);
            setIsEditModeOn(false);
            setEditingExpense(null);

        } catch (error) {
            console.error("Failed to save expenditure", error);
        }
    };
    useEffect(() => {
        async function loadEvent() {
            const event = await getEventById(eventId);
            setEvent(event);

            const expensesList = await getExpenseByEventId(eventId);
            setExpenses(expensesList);
            console.log(expensesList);
        }
        loadEvent();
    }, [eventId])
    return (
        <div>
            <h3>Total Event Budget : {event.budget}</h3>
            <h4>Total Expenditure</h4>
            <h4>Remaining Budget</h4>
            <button onClick={handleExp}>Add Expenditure</button>

            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>Expense: {expense.expenseName}</p>
                    <p>Amount: INR {expense.expenseAmount}</p>
                    <p>Payment Date: {expense.paymentDate}</p>
                    <p>Payment Method: {expense.paymentMethod}</p>
                    {expense.paymentProof && (
                        <img
                            src={expense.paymentProof}
                            alt="Payment proof"
                            width="200"
                        />
                    )}

                    <button type="button" onClick={() => handleEdit(expense)}>Edit Expense</button>
                    <button>Delete Expense</button>
                </div>
            ))}
            i
            <div>
                {isExpFormOpen && (
                    <div>
                        <h3>Add expenditure</h3>

                        <form onSubmit={handleExpSubmit}>
                            <div>
                                <label>Expense Name</label>
                                <input type="text" value={expenseName} onChange={(event) => setExpName(event.target.value)} />
                            </div>
                            <div>
                                <label>Expense Amount</label>
                                <input type="number" value={expenseAmount} onChange={(event) => setExpAmount(event.target.value)} />
                            </div>
                            <div>
                                <label>Payment Date</label>
                                <input type="date" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} />
                            </div>
                            <div>
                                <label>Payment Method</label>
                                <input type="text" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} />
                            </div>
                            <div>
                                <label>Payment Proof</label>
                                <input type="file" onChange={(event) => {
                                    const file = event.target.files[0];

                                    if (!file) return;

                                    setPaymentProof(file);
                                    setPaymentProofName(file.name);
                                }} />
                                {isEditModeOn && paymentProofName && (
                                    <p>Current file: {paymentProofName}</p>
                                )}
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}

export default EventBudget