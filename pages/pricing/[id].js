import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Pricings } from "../../locales/PricingInfo";
import PropTypes from 'prop-types';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const initialCenter = {
  lat: 47.9077221256817,
  lng: 106.92441872391102,
};

const PricingDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const locale =
    router.locale === "en" ? "1" : router.locale === "cn" ? "2" : "0";
  const pricings = Pricings[locale].types;
  const pricing = pricings[id];

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    orderDate: "",
    orderTime: "",
    note: "",
    latitude: "",
    longitude: "",
    carType: "",
    price: "",
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  });

  const [marker, setMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialCenter);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (selectedPlace) {
      setFormData({
        ...formData,
        latitude: selectedPlace.lat,
        longitude: selectedPlace.lng,
      });
    }
  }, [selectedPlace]);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCurrentLocation(newLocation);
      setMarker(newLocation);
      setSelectedPlace(newLocation);
    }
  };

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarker);
    setSelectedPlace(newMarker);
  };

  const findUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(newLocation);
          setMarker(newLocation);
          setSelectedPlace(newLocation);
          toast.success("Байршил амжилттай тохирууллаа.");
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              toast.error("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              toast.error("An unknown error occurred.");
              break;
            default:
              toast.error("An error occurred while retrieving your location.");
          }
        },
        {
          enableHighAccuracy: true, // Optional: request higher accuracy
          timeout: 5000, // Optional: set timeout for request
          
          maximumAge: 0, // Optional: disable caching
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const carType = ["firstname", "lastname", "phoneNumber", "email"].includes(name)
      ? pricing.mark
      : formData.carType;
    const price =
      router.query.tab === "0"
        ? pricing.price_negtaldaa
        : router.query.tab === "1"
          ? pricing.price_hoyurtaldaa
          : pricing.price_udruur;

    setFormData({
      ...formData,
      [name]: value,
      carType: carType,
      price: price,
    });
  };

  const validateForm = () => {
    const requiredFields = ["latitude", "longitude", "firstname", "lastname", "phoneNumber", "email", "orderDate", "orderTime", "note"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.warn(`${field} талбар дутуу байна.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    console.log(formData);
    try {
      const response = await fetch("https://expressjs-17jy.onrender.com/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data, "data");
      if (data.success) {
        toast.success("Захиалга амжилттай баталгаажлаа!");
        setFormSubmitted(true);
        console.log("Form submitted:", formData);
      } else {
        throw new Error("Server returned error status");
      }
    } catch (error) {
      toast.error("Сервэрт алдаа гарлаа.");
    }
  };

  const handleBackToHome = () => {
    router.push("/questions/payment");
  };

  if (!pricing) {
    return (
      <div className="flex justify-center items-center h-screen">
        Уншиж байна...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eceef3]">
      <div className="max-w-7xl w-full lg:p-4 p-0">
        {formSubmitted ? (
          <div className="text-center">
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/15659/15659968.png"
                alt="Success"
                className="w-24 h-24"
              />
              <h1 className="text-3xl font-extrabold text-gray-800 py-4">
                Таны захиалга амжилттай илгээлээ!
              </h1>
            </div>
            <p className="text-lg  text-gray-600 py-4">
              Бид таны захиалгыг хүлээн авсан бөгөөд төлбөр баталгаажуулалт хийгээрэй.
            </p>
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 font-bold border border-transparent hover:border-blue-400"
            >
              Төлбөр баталгаажуулалт
            </button>
          </div>
        ) : (
          <>
            <div className="md:flex lg:p-4 p-2">
              <div className="md:w-1/2">
                <img
                  className="w-full object-cover rounded-lg w-96"
                  src={pricing.image}
                  alt={pricing.mark}
                />
              </div>
              <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
                <h1 className="text-3xl font-bold mb-3">{pricing.mark}</h1>
                <p className="text-green-500 font-extrabold uppercase text-2xl my-3">
                  {router.query.tab === "0"
                    ? pricing.price_negtaldaa
                    : router.query.tab === "1"
                      ? pricing.price_hoyurtaldaa
                      : pricing.price_udruur}
                  ₮
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {pricing.desc}
                </p>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  {pricing.text1}
                </p>
                <p className="text-gray-600 mb-2 leading-relaxed">
                  {pricing.text2}
                </p>
              </div>
            </div>
            <div className="border rounded-3xl md:p-6 p-2 mt-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-4">
                <div className="md:col-span-2">
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue">
                    Хаягийн мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Та газрын зураг дээр өөрийн хаягаа зоох хэрэгтэй.
                  </p>
                </div>

                <div>
                  <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    libraries={["places"]}
                  >
                    {/* <div className="w-full sm:w-full lg:w-1/2 mb-2 relative">
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (autocompleteRef.current = autocomplete)
                        }
                        onPlaceChanged={onPlaceChanged}
                      >
                        <input
                          type="text"
                          placeholder="Хаяг хайх..."
                          className="border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-150 w-full sm:w-full lg:w-full"
                          style={{
                            padding: "8px",
                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            boxSizing: "border-box",
                          }}
                        />
                      </Autocomplete>
                    </div> */}

                    <div style={{ position: "relative", height: "400px" }}>
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentLocation}
                        zoom={12}
                        onLoad={(map) => {
                          mapRef.current = map;
                          map.setOptions({ scrollwheel: false });
                        }}
                        onClick={handleMapClick}
                      >
                        {marker && (
                          <Marker
                            position={marker}
                            onClick={() => setSelectedPlace(marker)}
                          />
                        )}
                      </GoogleMap>
                    </div>
                    <button
                      onClick={findUserLocation}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 font-semibold"
                    >
                      Яаг одоогийн байршлаар
                    </button>
                  </LoadScript>
                </div>
                <div className="md:col-span-1 mt-6">
                  <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-3 mb-4 rounded-sm lg:mt-5">
                    <p className="text-[20px] font-semibold leading-[28px]">
                      Нэмэлт мэдээлэл
                    </p>
                    <p className="text-[12px]">
                      Та хаяг, байршил болон үйлчилгээтэй холбоотой нэмэлт санал
                      хүсэлтүүдээ энд оруулна уу
                    </p>
                  </div>

                  <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-sm ">
                    <p className="text-[20px] font-semibold leading-[28px]">
                      Анхааруулга
                    </p>
                    <p className="text-[12px]">
                      Хаяг болон байршлын мэдээлэлд алдаа гарсан тохиолдолд,
                      доорх мэдээллийг анхаарна уу
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue mt-6">
                    Захиалгын мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Аялагчийн нэр латин үсэг байх хэрэгтэй (A-Z)
                  </p>
                </div>

                {/* Add hidden class for mobile screens */}
                <div>
                  <FormControl
                    type="date"
                    placeholder="Order Date"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleChange}
                    bgColor="bg-blue-100" // Apply blue background
                  />
                </div>
                <div>
                  <FormControl
                    type="time"
                    placeholder="Нислэгийн цаг"
                    name="orderTime"
                    value={formData.orderTime}
                    onChange={handleChange}
                    bgColor="bg-blue-100" // Apply blue background
                  />
                  </div>
                  
                <div className="md:col-span-2">
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue mt-6">
                    Захиалагчийн мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Аялагчийн нэр латин үсэг байх хэрэгтэй (A-Z)
                  </p>
                </div>
                <FormControl
                  placeholder="Овог"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                <FormControl
                  placeholder="Нэр"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <FormControl
                  placeholder="Утасны дугаар"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <FormControl
                  placeholder="И-мэйл"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <div className="md:col-span-2">
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue mt-6">
                    Нэмэлт мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Та хаяг, байршил болон үйлчилгээтэй холбоотой нэмэлт санал
                    хүсэлтүүдээ энд оруулна уу
                  </p>
                </div>

                <FormControl
                  placeholder="Нэмэлт мэдээлэл"
                  name="note"
                  type="textarea"
                  value={formData.note}
                  onChange={handleChange}
                  rows={5}
                />

                  <div className="md:col-span-2 flex justify-end p-2">
                  <button
                      onClick={() => handleSubmit()}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 font-semibold"
                  >
                    Урьдчилсан захиалга өгөх
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

const FormControl = ({
  type = "text",
  placeholder = "",
  name,
  value,
  onChange,
  options = [],
  rows = 4,
  label = "",
  checked = false,
  onBlur,
  bgColor = "bg-white", // Default to white if no color is specified
}) => {
  const commonProps = {
    name,
    value,
    onChange,
    onBlur,
    className: `w-full px-3 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${bgColor}`,
  };

  return (
    <div className="mb-4">
      {label && <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      {type === "select" ? (
        <select
          {...commonProps}
          className={`${commonProps.className} text-gray-900`}
          required
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          {...commonProps}
          placeholder={placeholder}
          rows={rows}
        />
      ) : type === "checkbox" ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            className="mr-2"
            {...commonProps}
          />
          <span>{placeholder}</span>
        </div>
      ) : type === "radio" ? (
        <div className="flex items-center">
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            className="mr-2"
            {...commonProps}
          />
          <span>{placeholder}</span>
        </div>
      ) : (
        <input
          type={type}
          {...commonProps}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};



export default PricingDetail;
