import React from "react";
import "./TransactionForm.scss";
import { useState, useEffect } from "react";
import { CircularProgress, Backdrop } from "@mui/material";


function TransactionForm() {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [digitalWallet, setDigitalWallet] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);


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
            <h2>Payment Information</h2>
            <form onSubmit={handlePaymentSubmit}>
                <div className="form-group">
                    <label htmlFor="paymentMethod">Payment Method</label>
                    <select 
                        id="paymentMethod" 
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="creditCard">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="digitalWallet">Digital Wallet</option>
                    </select>
                </div>

                {paymentMethod === 'creditCard' && (
                    <>
                        <div className="form-group">
                            <label htmlFor="name">Name on Card</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
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
                                type="text" 
                                id="cvv" 
                                value={cvv} 
                                onChange={(e) => setCvv(e.target.value)} 
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

                {paymentMethod === 'paypal' && (
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

                {paymentMethod === 'digitalWallet' && (
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

                <button type="submit" className="submit-button">Submit Payment</button>
            </form>
            <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Item 1: $10.00</p>
                <p>Item 2: $20.00</p>
                <p>Total: $30.00</p>
            </div>
        </div>
        </>
    );
}

export default TransactionForm