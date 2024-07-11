import React, { useState, useEffect } from "react";
import "./TransactionForm.scss";
import { CircularProgress, Backdrop, Button } from "@mui/material";
import Text from "../../../atoms/Text/Text";
import APIInUse from "../../../../config/axios/AxiosInUse";
import ServiceCard from "../../../molecules/ServiceCard/ServiceCard";
import { useSelector, useDispatch } from "react-redux";
import SimplePetCard from "../../../molecules/SimplePetCard/SimplePetCard";
import VetInfoCard from "../../../molecules/VetInfoCard/VetInfoCard";
import { setAppointmentId } from "../../../../config/store/BookingForm/bookingForm";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function TransactionForm() {
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [cvv, setCvv] = useState("");
	const [name, setName] = useState("");
	const [billingAddress, setBillingAddress] = useState("");
	const userId = Cookies.get("userId");
	const [paypalEmail, setPaypalEmail] = useState("");
	const [digitalWallet, setDigitalWallet] = useState("");
	const selectedServices = useSelector(
		(state) => state.bookingForm.selectedServices
	);
	const services = useSelector((state) => state.bookingForm.servicesList);
	const [serviceQuantity, setServiceQuantity] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const selectedVet = useSelector((state) => state.bookingForm.selectedVet);
	const bookingNote = useSelector((state) => state.bookingForm.bookingNote);
	const selectedDate = useSelector((state) => state.bookingForm.selectedDate);
	const selectedTimeFrame = useSelector(
		(state) => state.bookingForm.selectedTimeFrameId
	);
	const selectedPets = useSelector((state) => state.bookingForm.selectedPets);
	const dispatch = useDispatch();
	const [totalPrice, setTotalPrice] = useState(0);
	const appointmentId = useSelector((state) => state.bookingForm.appointmentId);
	const navigate = useNavigate();

	useEffect(() => {
		const initialServiceQuantity = services
			.filter((service) => selectedServices.includes(service.id))
			.map((service) => ({
				...service,
				quantity: 1,
			}));
		setServiceQuantity(initialServiceQuantity);
	}, [selectedServices, services]);

	const loadPaymentOptions = async () => {
		try {
			const response = await APIInUse.get("Transaction/dropdown-data");
			setPaymentMethods(response.data.data.paymentMethods);
		} catch (error) {
			console.log(error);
		}
	};

	const handleTotalPriceCalculation = () => {
		let total = 0;
		serviceQuantity.forEach((item) => {
			total += item.price * item.quantity;
		});
		setTotalPrice(total);
	};

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
		loadPaymentOptions();
		handleTotalPriceCalculation();
	}, []);

	useEffect(() => {
		handleTotalPriceCalculation();
	}, [serviceQuantity]);

	const handleIncreaseQuantity = (serviceId) => {
		setServiceQuantity((prevQuantities) =>
			prevQuantities.map((item) =>
				item.id === serviceId && item.quantity < 10
					? { ...item, quantity: item.quantity + 1 }
					: item
			)
		);
		handleTotalPriceCalculation();
	};

	const handleDecreaseQuantity = (serviceId) => {
		setServiceQuantity((prevQuantities) =>
			prevQuantities.map((item) =>
				item.id === serviceId && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			)
		);
		handleTotalPriceCalculation();
	};

	const handlePaymentSubmit = async (e) => {
		e.preventDefault();
		handleCreateAppointment();
		if (appointmentId > 0) {
			handleCreateTransaction();
			navigate("/booking/success");
		} else {
			console.log("Failed to create appointment");
		}
	};

	const handleCreateAppointment = async () => {
		try {
			const response = await APIInUse.post("Appointment/book", {
				serviceIdList: selectedServices,
				vetId: selectedVet.id,
				note: bookingNote,
				customerId: userId,
				timeTableId: selectedTimeFrame,
				appointmentDate: selectedDate,
				petIdList: selectedPets.map((pet) => pet.id),
			});
			dispatch(setAppointmentId(response.data.data.id));
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCreateTransaction = async () => {
		console.log("Rhhn");
		try {
			const response = await APIInUse.post("Transaction/create", {
				appointmentId: appointmentId,
				paymentMethod: paymentMethods.find(
					(paymentMethod) => paymentMethod.value === selectedPaymentMethod
				).id,
				paymentDate: new Date(),
				note: "Test Transaction",
				status: 1,
				services: serviceQuantity.map((service) => ({
					serviceId: service.id,
					quantity: service.quantity,
				})),
			});
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{isLoading && (
				<Backdrop
					sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={isLoading}
				>
					<div className="flex flex-col justify-center items-center gap-2">
						<CircularProgress color="inherit" />
						<h1>Waiting</h1>
					</div>
				</Backdrop>
			)}
			<div className="payment-page">
				<Text
					content="Thông tin thanh toán"
					type={"h2"}
					className={"payment-title"}
				/>
				<form
					className="payment-form"
					onSubmit={handlePaymentSubmit}
				>
					<div className="form-group">
						<Text
							className={"form-label"}
							content="Phương thức thanh toán"
						/>
						<select
							id="paymentMethod"
							value={selectedPaymentMethod}
							onChange={(e) => setSelectedPaymentMethod(e.target.value)}
							required
						>
							{paymentMethods.map((paymentMethod) => (
								<option
									key={paymentMethod.id}
									value={paymentMethod.value}
								>
									{paymentMethod.value === "Cash"
										? "Tiền mặt"
										: paymentMethod.value === "BankTransfer"
										? "Chuyển khoảng ngân hàng"
										: paymentMethod.value === "CreditCard"
										? "Credit Card"
										: paymentMethod.value === "DebitCard"
										? "Debit Card"
										: paymentMethod.value === "PayPal"
										? "PayPal"
										: paymentMethod.value}
								</option>
							))}
						</select>
					</div>

					<div className="form-group selected-pets-container">
						<Text
							className={"form-label"}
							content="Thú cưng"
						/>
						{selectedPets.map((pet) => (
							<SimplePetCard
								data={pet}
								key={pet.id}
							/>
						))}
					</div>

					<div className="form-group selected-vet-container">
						<Text
							className={"form-label"}
							content="Bác sĩ"
						/>
						<VetInfoCard data={selectedVet} />
					</div>

					<div className="form-group selected-date-container">
						<Text
							className={"form-label"}
							content={"Ngày " + selectedDate}
						/>
					</div>

					<div className="form-group">
						<Text
							className={"form-label"}
							content="Dịch vụ"
						/>
					</div>

					<div className="form-group services">
						{serviceQuantity.map((service) => (
							<div
								key={service.id}
								className="service-item"
							>
								<ServiceCard data={service} />
								<div className="quantity-control">
									<button
										type="button"
										className={
											"decrease-quantity" +
											(service.quantity <= 1 ? " disabled" : "")
										}
										onClick={() => handleDecreaseQuantity(service.id)}
										disabled={service.quantity <= 1}
									>
										&lt;
									</button>
									<Text content={service.quantity} />
									<button
										type="button"
										className={
											"increase-quantity" +
											(service.quantity >= 10 ? " disabled" : "")
										}
										onClick={() => handleIncreaseQuantity(service.id)}
										disabled={service.quantity >= 10}
									>
										&gt;
									</button>
								</div>
							</div>
						))}
					</div>

					{(selectedPaymentMethod === "CreditCard" ||
						selectedPaymentMethod === "DebitCard") && (
						<>
							<div className="form-group">
								<label htmlFor="name">Name on Card</label>
								<input
									type="text"
									id="name"
									value={name}
									onChange={(e) => {
										const regex = /^[A-Za-z\s]*$/; // Regular expression for English letters and spaces
										if (regex.test(e.target.value)) {
											setName(e.target.value);
										}
									}}
									pattern="[A-Za-z\s]+"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="cardNumber">Card Number</label>
								<input
									type="text"
									id="cardNumber"
									value={cardNumber}
									onChange={(e) => setCardNumber(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="expiryDate">Expiry Date</label>
								<input
									type="text"
									id="expiryDate"
									value={expiryDate}
									onChange={(e) => setExpiryDate(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="cvv">CVV</label>
								<input
									type="password"
									id="cvv"
									value={cvv}
									maxLength={3}
									minLength={3}
									onChange={(e) => setCvv(e.target.value.replace(/\D/, ""))}
									pattern="\d{3}"
									required
								/>
							</div>
							<div className="form-group">
								<label htmlFor="billingAddress">Billing Address</label>
								<input
									type="text"
									id="billingAddress"
									value={billingAddress}
									onChange={(e) => setBillingAddress(e.target.value)}
									required
								/>
							</div>
						</>
					)}

					{selectedPaymentMethod === "BankTransfer" && (
						<div className="form-group">
							<label htmlFor="paypalEmail">PayPal Email</label>
							<input
								type="email"
								id="paypalEmail"
								value={paypalEmail}
								onChange={(e) => setPaypalEmail(e.target.value)}
								required
							/>
						</div>
					)}

					{selectedPaymentMethod === "VNPay" && (
						<div className="form-group">
							<label htmlFor="digitalWallet">Digital Wallet</label>
							<input
								type="text"
								id="digitalWallet"
								value={digitalWallet}
								onChange={(e) => setDigitalWallet(e.target.value)}
								required
							/>
						</div>
					)}

					<div className="form-group total-price">
						<Text
							className={"form-label"}
							content="Tổng tiền"
						/>
						<Text
							className={"total-price-value"}
							content={totalPrice + " VND"}
						/>
					</div>

					<div className="button-container">
						<button
							type="submit"
							className="submit-button"
						>
							Xác nhận thanh toán
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default TransactionForm;
