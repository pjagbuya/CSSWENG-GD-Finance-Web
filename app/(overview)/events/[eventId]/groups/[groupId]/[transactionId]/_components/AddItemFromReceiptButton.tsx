'use client';

import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import AddItemDialog from './AddItemDialog';
import AddItemFromReceiptDialog from './AddItemFromReceiptDialog';
import { getDataFromReceiptImg } from '@/actions/reader';

type AddItemButtonProps = {
  transactionId: string;
};

const AddItemFromReceiptButton = ({ transactionId }: AddItemButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  const [readAmount, setReadAmount] = useState('');
  const [readPaymentDetails, setReadPaymentDetails] = useState('');
  const [readDate, setReadDate] = useState('');

  async function handleClick() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener(
      'input',
      async () => {
        if (fileInput.files === null) {
          return;
        }

        const content = fileInput.files[0];
        const { amount, payment_details, date } =
          await getDataFromReceiptImg(content);

        const dateObject = new Date(date);

        // Get the year, month, and day from the Date object
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // getMonth() returns month from 0-11
        const day = String(dateObject.getDate()).padStart(2, '0'); // getDate() returns the day of the month from 1-31

        // Format the date in 'YYYY-MM-DD'
        const formattedDate = `${year}-${month}-${day}`;

        console.log(date);

        setReadAmount(amount || '');
        setReadPaymentDetails(payment_details || '');
        setReadDate(formattedDate || '');

        setShowDialog(true);
      },
      { once: true },
    );
  }

  return (
    <>
      <Button onClick={() => handleClick()}>
        <CirclePlus className="mr-2 w-4" /> Add Item From Receipt
      </Button>

      {showDialog && (
        <AddItemFromReceiptDialog
          amount={readAmount}
          paymentDetails={readPaymentDetails}
          date={readDate}
          transactionId={transactionId}
          onFinish={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default AddItemFromReceiptButton;
