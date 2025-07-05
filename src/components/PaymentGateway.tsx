
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { toast } from 'sonner';

interface PaymentGatewayProps {
  amount: number;
  bookingDetails: {
    title: string;
    dates: string;
    guests: number;
  };
  onPaymentSuccess: () => void;
  onCancel: () => void;
}

const PaymentGateway = ({ amount, bookingDetails, onPaymentSuccess, onCancel }: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast.success("Payment Successful", {
        description: "Your booking has been confirmed! Check your email for details.",
      });
      setIsProcessing(false);
      onPaymentSuccess();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-green-600" />
              Secure Payment
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Complete your booking payment securely
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Booking Summary */}
            <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Booking Summary</h3>
                <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                  <div className="flex justify-between">
                    <span>{bookingDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span>{bookingDetails.dates}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingDetails.guests}</span>
                  </div>
                  <div className="border-t border-green-200 dark:border-green-800 pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total Amount:</span>
                      <span>₹{amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium text-gray-900 dark:text-white">Payment Method</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('card')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-sm">Card</span>
                </Button>
                <Button
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('upi')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <div className="h-6 w-6 mb-2 bg-orange-500 rounded text-white text-xs flex items-center justify-center">UPI</div>
                  <span className="text-sm">UPI</span>
                </Button>
                <Button
                  variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('wallet')}
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <div className="h-6 w-6 mb-2 bg-blue-500 rounded text-white text-xs flex items-center justify-center">W</div>
                  <span className="text-sm">Wallet</span>
                </Button>
              </div>
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-gray-900 dark:text-white">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-900 dark:text-white">Card Number</Label>
                  <div className="relative">
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                      maxLength={19}
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 pr-12"
                    />
                    <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-gray-900 dark:text-white">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                      maxLength={5}
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-gray-900 dark:text-white">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value.replace(/\D/g, '').slice(0, 3)})}
                      maxLength={3}
                      className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId" className="text-gray-900 dark:text-white">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="yourname@upi"
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            )}

            {/* Wallet Payment */}
            {paymentMethod === 'wallet' && (
              <div className="space-y-4">
                <Label className="text-gray-900 dark:text-white">Select Wallet</Label>
                <Select>
                  <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="Choose wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paytm">Paytm</SelectItem>
                    <SelectItem value="phonepe">PhonePe</SelectItem>
                    <SelectItem value="googlepay">Google Pay</SelectItem>
                    <SelectItem value="amazon">Amazon Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Security Features */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <Lock className="h-4 w-4" />
              <span>Your payment information is encrypted and secure</span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Pay ₹{amount.toLocaleString()}</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentGateway;
