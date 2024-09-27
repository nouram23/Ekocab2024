import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [description, setDescription] = useState('');
    const [workedDay, setWorkedDay] = useState('');
    const [hours, setHours] = useState('');
    const [cost, setCost] = useState('');
    const [fullName, setFullName] = useState('');
    const [abn, setAbn] = useState('');
    const [bsb, setBsb] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const [tableData, setTableData] = useState([
   
    ]);

    const updatedTableData = tableData.map(row => ({
        ...row,
        salary: (parseFloat(row.hour) * parseFloat(row.cost)).toFixed(2),
    }));

    const totalCost = updatedTableData.reduce((sum, row) => sum + parseFloat(row.salary), 0);

    const handleDownload = async () => {
        setLoading(true);
        if (!fullName || !abn || !bsb || !accountNumber) {
            setShowWarning(true);
            setLoading(false);
            return;
        }
    
        try {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet([]);
    
            // Add bank information to the sheet
            XLSX.utils.sheet_add_aoa(ws, [
                [`Full Name: ${fullName}`],
                [`ABN: ${abn}`],
                [`BSB: ${bsb}`],
                [`Account Number: ${accountNumber}`],
                [],
            ], { origin: "A1" });
    
            // Adjust the merging to cover all the information
            ws["!merges"] = [
                { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // Full Name
                { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, // ABN
                { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } }, // BSB
                { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } }, // Account Number
            ];
    
            XLSX.utils.sheet_add_aoa(ws, [
                ["№", "Location", "Day", "Hours", "Rate", "Total Today"]
            ], { origin: -1 });
    
            updatedTableData.forEach((row, index) => {
                XLSX.utils.sheet_add_aoa(ws, [
                    [
                        row.id, 
                        row.location, 
                        row.day, 
                        row.hour, 
                        `$${row.cost}`, 
                        `$${row.salary}`
                    ]
                ], { origin: -1 });
            });
    
            // Add total salary row
            XLSX.utils.sheet_add_aoa(ws, [
                ["", "", "", "",`My Total Salary: $${totalCost.toFixed(2)}`]
            ], { origin: -1 });
    
            // Append the worksheet to the workbook
            XLSX.utils.book_append_sheet(wb, ws, 'Invoice');
    
            // Write the workbook
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'invoice.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error generating the file:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    

    const handleSendEmail = async () => {
        setSending(true);
        if (!fullName || !abn || !bsb || !accountNumber) {
            setShowWarning(true);
            setSending(false);
            return;
        }

        try {
            const response = await fetch('bilguunerkh@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'bilguunerkh@gmail.com' }),
            });

            if (response.ok) {
                alert('Email sent successfully');
            } else {
                const result = await response.json();
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        } finally {
            setSending(false);
        }
    };

    const locations = ["Dasco-Willoughby", "Ashbury", "Office"];

    const handleAddRow = () => {
        setTableData(prev => [
            ...prev,
            { id: prev.length + 1, location: description, day: workedDay, hour: hours, cost: cost }
        ]);
        setDescription('');
        setWorkedDay('');
        setHours('');
        setCost('');
    };
    

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseWarning = () => setShowWarning(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gradient-to-r from-[#a8fa4e] to-[#eb573a] bg-gray-100 md:p-10 p-2.5">
            <div className="">
                <img src="https://i.ibb.co/DgGPXqV/paragon.png" alt="Logo" className="h-14" /> {/* Replace with your logo path or URL */}
            </div>
            <div className="w-full bg-white rounded-2xl p-6 mb-6 transition-transform duration-300">
                <h1 className="text-2xl font-bold mb-2 text-gray-800">Full Name: {fullName || 'N/A'}</h1>
                <h3 className="text-lg mb-2 text-gray-600">ABN: {abn || 'N/A'}</h3>
                <h3 className="text-lg mb-2 text-gray-600">BSB: {bsb || 'N/A'}</h3>
                <h3 className="text-lg mb-2 text-gray-600">Account number: {accountNumber || 'N/A'}</h3>
                <button
                        onClick={handleShowModal}
                        className="w-full bg-[#61a165] text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                    >
                        Add Bank Information
                    </button>
            </div>
            

            <div className="w-full bg-white rounded-2xl p-6 transition-transform duration-300 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Stories that worked this week at Paragon</h2>
                <div className="mb-4 flex flex-col md:flex-row md:gap-4">
                <select
    value={description}
    onChange={e => setDescription(e.target.value)}
    className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
>
    <option value="">Select Location</option>
    {locations.map(location => (
        <option key={location} value={location}>
            {location}
        </option>
    ))}
</select>
                    <input type="date" value={workedDay} placeholder='date' onChange={e => setWorkedDay(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <input type="number" placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <input type="number" placeholder="Rate Cost" value={cost} onChange={e => setCost(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                    <button
                        onClick={handleAddRow}
                        className="w-full bg-black text-white px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-gray-700 transition duration-200"
                    >
                        Add to line, day
                    </button>
                </div>


                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full rounded-xl">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
                                <th className="py-3 px-4 border-r">№</th>
                                <th className="py-3 px-4 border-r">Location</th>
                                <th className="py-3 px-4 border-r">Date</th>
                                <th className="py-3 px-4 border-r">Hours Worked</th>
                                <th className="py-3 px-4 border-r">Rate</th>
                                <th className="py-3 px-4 border-r">Today Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {updatedTableData.map(row => (
                                <tr key={row.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3 px-4 text-center">{row.id}</td>
                                    <td className="py-3 px-4">{row.location}</td>
                                    <td className="py-3 px-4">{row.day}</td>
                                    <td className="py-3 px-4 text-center">{row.hour}</td>
                                    <td className="py-3 px-4 text-center">${row.cost}</td>
                                    <td className="py-3 px-4 text-center text-green-600">${row.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 text-gray-700 font-bold border-t border-gray-300">
                                <td colSpan="5" className="py-3 px-4">Нийт цалин</td>
                                <td className="py-3 px-4 text-center text-green-600">${totalCost.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
                    <button onClick={handleDownload} disabled={loading} className={`px-6 py-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#61a165] hover:bg-green-700 transition duration-200'}`}>
                        {loading ? 'Generating...' : 'Download to Excel'}
                    </button>
                    <button onClick={handleSendEmail} disabled={sending} className={`px-6 py-3 rounded-lg text-white font-semibold ${sending ? 'bg-blue-500 cursor-not-allowed' : 'bg-[#000] hover:bg-blue-700 transition duration-200'}`}>
                        {sending ? 'Sending...' : 'Send to Selslabour@outlook.com'}
                    </button>
                </div>
            </div>

            {/* Warning Modal */}
            {showWarning && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Warning</h2>
                        <p className="mb-4">Please fill in all bank information fields before proceeding.</p>
                        <button onClick={handleCloseWarning} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">Close</button>
                    </div>
                </div>
            )}

            {/* Modal for Adding Bank Information */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold">Add Bank Information</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name:</label>
                            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">ABN:</label>
                            <input type="text" value={abn} onChange={e => setAbn(e.target.value)} className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">BSB:</label>
                            <input type="text" value={bsb} onChange={e => setBsb(e.target.value)} className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700">Account Number:</label>
                            <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                        </div>
                        <button onClick={handleCloseModal} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">Хадгалах</button>
                    </div>
                </div>
            )}
        </div>
    );
}
