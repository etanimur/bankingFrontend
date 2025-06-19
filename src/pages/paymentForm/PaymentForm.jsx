"use client"

import React, { useState, useRef } from "react"
import { ArrowLeft, Wifi, CreditCard } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Label } from "../../components/label"

export function PaymentForm() {
    const [cardNumber, setCardNumber] = useState("2412 - 7512 - 3412 - 3456")
    const [receiverAccount, setReceiverAccount] = useState("")
    const [amount, setAmount] = useState("549.99")
    const [formStep, setFormStep] = useState(1)

    const pinRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ]

    const handlePinChange = (e, index) => {
        const value = e.target.value
        if (/^\d?$/.test(value)) {
            e.target.value = value
            if (value && index < 3) pinRefs[index + 1].current.focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            pinRefs[index - 1].current.focus()
        }
    }

    const getProgress = () => {
        let filled = 0
        if (cardNumber.trim()) filled++
        if (receiverAccount.trim()) filled++
        if (amount.trim()) filled++
        return (filled / 5) * 100
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-600 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-blue-600 to-transparent opacity-20"></div>
            </div>

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full grid lg:grid-cols-3 overflow-hidden">
                <div className="lg:col-span-2 p-8 lg:p-12">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getProgress()}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">AceCoinPay</span>
                        </div>

                        <div className="flex gap-1">
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono">0</div>
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono">1</div>
                            <span className="text-gray-800 mx-1">:</span>
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono">1</div>
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono">9</div>
                        </div>
                    </div>

                    {formStep === 1 && (
                        <div>
                            <div className="mb-6 flex flex-col items-start">
                                <Label className="text-gray-900 font-medium mb-2 block">Card Number</Label>
                                <p className="text-sm text-gray-500 mb-3">Enter the 16-digit card number on the card</p>
                                <Input
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="font-mono text-lg pointer-events-none"
                                    placeholder="2412 - 7512 - 3412 - 3456"
                                />
                            </div>

                            <div className="mb-6 flex flex-col items-start">
                                <Label className="text-gray-900 font-medium mb-2 block ">Receiver Account Number</Label>
                                <p className="text-sm text-gray-500 mb-3">Enter the 16-digit of receiver</p>
                                <div className="relative w-full">
                                    <Input
                                        value={receiverAccount}
                                        onChange={(e) => setReceiverAccount(e.target.value)}
                                        className="pr-12 font-mono text-lg"
                                        placeholder="2412 - 7512 - 3412 - 3456"

                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded opacity-50 pointer-events-none"
                                    >
                                        <div className="grid grid-cols-3 gap-0.5">
                                            {[...Array(9)].map((_, i) => (
                                                <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                            ))}
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col items-start">
                                <Label className="text-gray-900 font-medium mb-2 block">Amount (USD)</Label>
                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="font-mono text-lg text-center border-2"
                                    placeholder="549.99"
                                />
                            </div>


                            <Button
                                onClick={() => setFormStep(2)}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg"
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {formStep === 2 && (
                        <div className="space-y-6">
                            <button
                                onClick={() => setFormStep(1)}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Card Info
                            </button>

                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-2">Enter PIN</Label>
                                <div className="flex justify-between">
                                    {[0, 1, 2, 3].map((i) => (
                                        <input
                                            key={i}
                                            type="password"
                                            maxLength="1"
                                            ref={pinRefs[i]}
                                            onChange={(e) => handlePinChange(e, i)}
                                            onKeyDown={(e) => handleKeyDown(e, i)}
                                            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    ))}
                                </div>
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-lg">
                                Proceed Payment
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right Section - Card Preview & Order Summary */}
                <div className="bg-gray-50 p-8 lg:p-12 space-y-8">
                    <div className="relative">
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 aspect-[1.6/1] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                            <div>
                                <p className="text-gray-800 font-semibold">Jonathan Michael</p>

                            </div>
                            <div className="flex justify-between items-start mb-8">
                                <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-sm"></div>
                                <Wifi className="w-6 h-6 text-gray-600" />
                            </div>

                            <div className="mb-6">
                                <p className="text-gray-800 font-mono text-lg tracking-wider">
                                    {cardNumber ? `•••• ${cardNumber.slice(-4)}` : "•••• •••• •••• ••••"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">From</span>
                            <span className="font-semibold">{cardNumber.slice(-4)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">To</span>
                            <span className="font-semibold">{receiverAccount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Amount</span>
                            <span className="font-semibold">${amount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600">Charges (20%)</span>
                            <span className="font-semibold">
                                ${(Number(amount) * 0.2).toFixed(2)}
                            </span>
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-2">
                            <p className="text-gray-600 text-sm">You have to Pay</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {(Number(amount) + Number(amount) * 0.2).toFixed(2)}
                                    </span>
                                    <span className="text-lg text-gray-600">USD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
