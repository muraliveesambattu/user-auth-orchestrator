
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SignupModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, type, message, onClose }) => {
  useEffect(() => {
    if (isOpen && type === 'success') {
      // Auto close success modal after 2 seconds (redirect happens from parent)
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4">
            {type === 'success' ? (
              <CheckCircle className="h-16 w-16 text-green-500 animate-bounce" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500 animate-pulse" />
            )}
          </div>
          <DialogTitle className={`text-xl font-bold ${
            type === 'success' ? 'text-green-700' : 'text-red-700'
          }`}>
            {type === 'success' ? 'Success!' : 'Error'}
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            {message}
          </DialogDescription>
        </DialogHeader>
        
        {type === 'success' ? (
          <div className="text-center text-sm text-gray-500 mt-4">
            Redirecting to login page...
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <Button onClick={onClose} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
