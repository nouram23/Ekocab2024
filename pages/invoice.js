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
            const bankInfo = [
                { field: 'Full Name', location: fullName },
                { field: 'ABN', location: abn },
                { field: 'BSB', location: bsb },
                { field: 'Account Number', location: accountNumber },
            ];

            const combinedData = [
                ...bankInfo,
                {},
                { field: 'ID', location: 'Location', day: 'Day', hour: 'Hours Worked', cost: 'Rate Cost', salary: 'Total Salary' },
                ...updatedTableData.map(row => ({
                    field: row.id,
                    location: row.location,
                    day: row.day,
                    hour: row.hour,
                    cost: row.cost,
                    salary: row.salary
                })),
                {},
                { field: '', location: '', day: '', hour: '', cost: 'Total Salary', salary: totalCost.toFixed(2) }
            ];

            const ws = XLSX.utils.json_to_sheet(combinedData);
            XLSX.utils.book_append_sheet(wb, ws, 'Report');
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.xlsx';
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
        <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-100 md:p-10">
            <div className="">
                <img src="https://i.ibb.co/DgGPXqV/paragon.png" alt="Logo" className="h-14" /> {/* Replace with your logo path or URL */}
            </div>
            <div className="w-full bg-white rounded-lg p-6 mb-6 transition-transform duration-300">
                <h1 className="text-2xl font-bold mb-2 text-gray-800">Full Name: {fullName || 'N/A'}</h1>
                <h3 className="text-lg mb-2 text-gray-600">ABN: {abn || 'N/A'}</h3>
                <h3 className="text-lg mb-2 text-gray-600">BSB: {bsb || 'N/A'}</h3>
                <h3 className="text-lg mb-2 text-gray-600">Account number: {accountNumber || 'N/A'}</h3>
            </div>

            <div className="w-full bg-white rounded-lg p-6 transition-transform duration-300 ">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Цалингаа авахнээээээ</h2>
                <div className="mb-4 flex flex-col md:flex-row md:gap-4">
                    <input type="text" placeholder="Description of Jobs" value={description} onChange={e => setDescription(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <input type="date" value={workedDay} onChange={e => setWorkedDay(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <input type="number" placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                    <input type="number" placeholder="Rate Cost" value={cost} onChange={e => setCost(e.target.value)} className="border border-gray-300 p-3 rounded-md flex-1 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200" />
                </div>
                <div className="flex flex-col md:flex-row md:gap-4">
                    <button
                        onClick={handleAddRow}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md mb-2 md:mb-0 hover:bg-blue-700 transition duration-200"
                    >
                        Add to line, day
                    </button>
                    <button
                        onClick={handleShowModal}
                        className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                    >
                        Add Bank Information
                    </button>
                </div>


                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full rounded-xl">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
                                <th className="py-3 px-4 border-r">ID</th>
                                <th className="py-3 px-4 border-r">Аль салбар дээр</th>
                                <th className="py-3 px-4 border-r">Аль өдөр</th>
                                <th className="py-3 px-4 border-r">Хэдэн цаг ажилсан</th>
                                <th className="py-3 px-4 border-r">Цагийн хөлс</th>
                                <th className="py-3 px-4 border-r">Тэр өдрийн нийт цалин</th>
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
                    <button onClick={handleDownload} disabled={loading} className={`px-6 py-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 transition duration-200'}`}>
                        {loading ? 'Generating...' : 'Excel рүү татах'}
                    </button>
                    <button onClick={handleSendEmail} disabled={sending} className={`px-6 py-3 rounded-lg text-white font-semibold ${sending ? 'bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transition duration-200'}`}>
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
                        <h2 className="text-xl font-bold mb-4">Add Bank Information</h2>
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
