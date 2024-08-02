import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, order, onEditStatus, onDeleteStatus }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleEdit = () => {
    setIsDropdownOpen(false);
    if (onEditStatus) onEditStatus();
  };

  const handleDelete = () => {
    setIsDropdownOpen(false);
    if (onDeleteStatus) onDeleteStatus();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-11/12 sm:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-150 ease-in-out"
          aria-label="Close Modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Захиалгийн дэлгэрэнгүй</h3>

        <p className="text-base text-gray-700 mb-4"><span className="font-semibold">Холбогдох дугаар:</span> {order.phoneNumber}</p>
        <p className="text-base text-gray-700 mb-4"><span className="font-semibold">Latitude:</span> {order.latitude}</p>
        <p className="text-base text-gray-700 mb-4"><span className="font-semibold">Longitude:</span> {order.longitude}</p>
        <p className="text-base text-gray-700 mb-6"><span className="font-semibold">Нислэгийн өдөр:</span> {order.orderDate}</p>

        {/* Active Status Section with Menu Icon */}
        <div className="relative mb-4 p-4 bg-green-100 text-green-800 rounded-lg border border-green-200 flex items-center justify-between cursor-pointer" onClick={handleDropdownToggle}>
          <p className="text-lg font-semibold">Төлөв: Хувиарлалт хийх</p>
          <svg className={`w-6 h-6 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <button 
                onClick={handleEdit} 
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
