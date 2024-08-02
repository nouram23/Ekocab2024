import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Pricings } from "../../locales/PricingInfo";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { Snackbar, Button, TextField, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

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

  const [marker, setMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(initialCenter);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { control, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
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
    }
  });

  useEffect(() => {
    if (selectedPlace) {
      setValue("latitude", selectedPlace.lat);
      setValue("longitude", selectedPlace.lng);
    }
  }, [selectedPlace, setValue]);

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

  const onSubmit = async (data) => {
    const requiredFields = ["latitude", "longitude", "firstname", "lastname", "phoneNumber", "email", "orderDate", "orderTime", "note"];

    for (const field of requiredFields) {
      if (!data[field]) {
        setSnackbarMessage(`${field} талбар дутуу байна.`);
        setSnackbarOpen(true);
        return;
      }
    }

    console.log(data);
    try {
      const response = await fetch("https://expressjs-17jy.onrender.com/api/v1/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result, "data");
      if (result.success) {
        setSnackbarMessage("Захиалга амжилттай баталгаажлаа!");
        setSnackbarOpen(true);
        setFormSubmitted(true);
        console.log("Form submitted:", data);
      } else {
        throw new Error("Server returned error status");
      }
    } catch (error) {
      setSnackbarMessage("Сервэрт алдаа гарлаа.");
      setSnackbarOpen(true);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  if (!pricing) {
    return (
      <div className="flex justify-center items-center h-screen">
        Уншиж байна...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white">
      <div className="max-w-7xl w-full lg:p-4 p-0">
        {formSubmitted ? (
          <div className="text-center">
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/128/15659/15659968.png"
                alt="Success"
                className="w-24 h-24 mb-4"
              />
              <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                Таны захиалга амжилттай илгээлээ!
              </h1>
            </div>
            <p className="text-lg mb-6 text-gray-600">
              Бид таны захиалгыг хүлээн авсан бөгөөд удахгүй холбогдох болно.
            </p>
            <Button
              onClick={handleBackToHome}
              variant="contained"
              color="primary"
              size="large"
            >
              Баярлалаа
            </Button>
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
                    Таны оруулсан хаяг дээрээс жолооч таныг очиж авна
                  </p>
                </div>

                <div>
                  <LoadScript
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                    libraries={["places"]}
                  >
                    <div className="w-full sm:w-full lg:w-1/2 mb-2 relative">
                      <Autocomplete
                        onLoad={(autocomplete) =>
                          (autocompleteRef.current = autocomplete)
                        }
                        onPlaceChanged={onPlaceChanged}
                      >
                        <TextField
                          variant="outlined"
                          placeholder="Хаяг хайх..."
                          fullWidth
                          size="small"
                          style={{
                            padding: "8px",
                            fontSize: "13px",
                            fontFamily: "Arial, sans-serif",
                            boxSizing: "border-box",
                          }}
                        />
                      </Autocomplete>
                    </div>

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
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue">
                    Захиалгын мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Аялагчийн нэр латин үсэг байх хэрэгтэй (A-Z)
                  </p>
                </div>
                <Controller
                  name="orderDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="date"
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      {...field}
                      error={!!errors.orderDate}
                      helperText={errors.orderDate ? 'Order date is required' : ''}
                    />
                  )}
                />
                <Controller
                  name="orderTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="time"
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      {...field}
                      error={!!errors.orderTime}
                      helperText={errors.orderTime ? 'Order time is required' : ''}
                    />
                  )}
                />

                <div className="md:col-span-2">
                  <p className="text-[22px] font-semibold leading-[28px] text-dark-blue mt-6">
                    Захиалагчийн мэдээлэл
                  </p>
                  <p className="text-[14px] text-input-text opacity-40">
                    Аялагчийн нэр латин үсэг байх хэрэгтэй (A-Z)
                  </p>
                </div>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      label="Овог"
                      {...field}
                      error={!!errors.firstname}
                      helperText={errors.firstname ? 'Firstname is required' : ''}
                    />
                  )}
                />
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      label="Нэр"
                      {...field}
                      error={!!errors.lastname}
                      helperText={errors.lastname ? 'Lastname is required' : ''}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      label="Утасны дугаар"
                      {...field}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber ? 'Phone number is required' : ''}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      margin="normal"
                      label="И-мэйл"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email ? 'Email is required' : ''}
                    />
                  )}
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

                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={5}
                      margin="normal"
                      label="Нэмэлт мэдээлэл"
                      {...field}
                      error={!!errors.note}
                      helperText={errors.note ? 'Note is required' : ''}
                    />
                  )}
                />

                <div className="md:col-span-2 flex justify-end p-2">
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="primary"
                  >
                    Урьдчилсан захиалга өгөх
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={formSubmitted ? "success" : "error"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PricingDetail;
