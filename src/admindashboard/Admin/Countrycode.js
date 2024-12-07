import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles
import { isValidPhoneNumber } from 'react-phone-number-input';

const CountryCode = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleChange = (value) => {
    setPhone(value);

    // Validation
    if (value && !isValidPhoneNumber(value)) {
      setError('Invalid phone number for the selected country');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <h1>Phone Input with Validation</h1>
      <PhoneInput
        international
        defaultCountry="IN" // Default country
        value={phone}
        onChange={handleChange}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Entered Phone: {phone}</p> 
    </div>
  );
};

export default CountryCode;
