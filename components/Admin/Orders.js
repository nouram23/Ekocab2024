import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal"; // Adjust the import path as needed
import { FaSearch } from 'react-icons/fa'; // Import the FaSearch icon

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("https://expressjs-17jy.onrender.com/api/v1/order");
      const data = await response.json();
      // Sort the orders by createdAt in descending order
      const sortedOrders = data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  const filterOrders = () => {
    if (!searchQuery.trim()) {
      setFilteredOrders(orders);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = orders.filter(order => {
        // Ensure fields are defined before calling toLowerCase
        const phoneNumber = order.phoneNumber?.toLowerCase() || '';
        const firstname = order.firstname?.toLowerCase() || '';
        const lastname = order.lastname?.toLowerCase() || '';
        const orderDate = order.orderDate?.toLowerCase() || '';
        const createdAt = order.createdAt?.toLowerCase() || '';

        return phoneNumber.includes(query) ||
               firstname.includes(query) ||
               lastname.includes(query) ||
               orderDate.includes(query) ||
               createdAt.includes(query);
      });
      setFilteredOrders(filtered);
    }
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
  };

  // Calculate paginated data
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Pagination controls
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto ">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-96 mb-4 md:mb-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Хайлт хийх..."
            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
          />
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <p className="text-lg font-semibold mr-2">
            {filteredOrders.length}
          </p>
          <p className="text-md">Захиалга</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="overflow-y-auto" style={{ maxHeight: '600px' }}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 font-semibold text-md">
              <tr>
                <th className="px-4 py-3 text-left text-center">№</th>
                <th className="px-4 py-3 text-left text-center">Холбогдох дугаар</th>
                <th className="px-4 py-3 text-left text-center">Нэр</th>
                <th className="px-4 py-3 text-left text-center">Захиалгын огноо</th>
                <th className="px-4 py-3 text-left text-center">Захиалга өгсөн огноо</th>
                <th className="px-4 py-3 text-left text-center">Төлөв</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleCardClick(order)}
                >
                  {/* Add index column */}
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {indexOfFirstOrder + index + 1}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {order.phoneNumber}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {order.firstname}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {formatDate(order.orderDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-4 text-[#4ca154] font-medium text-center">
                    <p className="bg-[#e2fbe8] p-2 rounded-md text-xs">Хувиарлалт хийх</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 px-4 py-2 text-sm bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Өмнөх
          </button>
          <div className="text-gray-700">
            Хуудас {currentPage} ээс {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            Дараах
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        order={selectedOrder}
        onEditStatus={() => console.log("Edit Status")} // Define your edit function
        onDeleteStatus={() => console.log("Delete Status")} // Define your delete function
      />
    </div>
  );
};

export default Orders;
