import React, { useRef, useState } from "react";

export function TransferForm() {
    const pinRefs = [useRef(), useRef(), useRef(), useRef()];
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        account: "",
        receiver: "",
        amount: "",
        pin: "",
    });

    const handlePinChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            e.target.value = value;
            if (value && index < 3) pinRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            pinRefs[index - 1].current.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pin = pinRefs.map((ref) => ref.current.value).join("");
        setFormData({
            account: e.target.account.value,
            receiver: e.target.receiver.value,
            amount: e.target.amount.value,
            pin,
        });
        setShowPopup(true);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Transfer Funds</h1>
                    <p className="text-sm text-gray-500">Welcome back, <span className="font-medium text-gray-700">Mr. XYZ</span></p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Account Select */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Account</label>
                        <select
                            name="account"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white"
                        >
                            <option value="">Select</option>
                            <option value="000-000-000">000-000-000</option>
                            <option value="000-000-111">000-000-111</option>
                        </select>
                    </div>

                    {/* Receiver */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Receiver's Account Title</label>
                        <input
                            name="receiver"
                            type="text"
                            placeholder="e.g. John Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <input
                            name="amount"
                            type="number"
                            placeholder="e.g. 800"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>

                    {/* PIN */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
                        <div className="flex justify-between">
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength="1"
                                    ref={pinRefs[i]}
                                    onChange={(e) => handlePinChange(e, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
                    >
                        Proceed Transaction
                    </button>
                </form>

                {/* Popup */}
                {showPopup && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">

                        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                            <div className="text-green-600 text-3xl mb-2">✅</div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Transaction Successful</h2>
                            <div className="text-sm text-gray-700 text-left space-y-1">
                                <p><strong>From:</strong> {formData.account}</p>
                                <p><strong>To:</strong> {formData.receiver}</p>
                                <p><strong>Amount:</strong> {formData.amount} ₹</p>
                            </div>
                            <button
                                onClick={() => setShowPopup(false)}
                                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}
