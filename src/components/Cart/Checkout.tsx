import React, { useState } from 'react';
import styles from './Checkout.module.css';

// Validation constants
const VALIDATION_CONSTANTS = {
  MIN_NAME_LENGTH: 2,
  MIN_PHONE_LENGTH: 10,
  MIN_ADDRESS_LENGTH: 10,
};

// Validation patterns
const VALIDATION_PATTERNS = {
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Error messages
const ERROR_MESSAGES = {
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_CONSTANTS.MIN_NAME_LENGTH} characters`,
  PHONE_INVALID: 'Please enter a valid phone number format',
  ADDRESS_TOO_SHORT: 'Please enter a complete address',
  EMAIL_INVALID: 'Please enter a valid email address',
};

interface CheckoutProps {
  onCancel: () => void;
  onConfirm: (orderData: OrderData) => void;
}

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  email?: string;
  notes?: string;
}

function Checkout({ onCancel, onConfirm }: CheckoutProps) {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<OrderData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderData> = {};

    // Name validation
    if (formData.name.trim().length < VALIDATION_CONSTANTS.MIN_NAME_LENGTH) {
      newErrors.name = ERROR_MESSAGES.NAME_TOO_SHORT;
    }

    // Phone validation with regex
    const phoneValue = formData.phone.trim();
    if (!phoneValue || phoneValue.length < VALIDATION_CONSTANTS.MIN_PHONE_LENGTH || !VALIDATION_PATTERNS.PHONE.test(phoneValue)) {
      newErrors.phone = ERROR_MESSAGES.PHONE_INVALID;
    }

    // Address validation
    if (formData.address.trim().length < VALIDATION_CONSTANTS.MIN_ADDRESS_LENGTH) {
      newErrors.address = ERROR_MESSAGES.ADDRESS_TOO_SHORT;
    }

    // Email validation (only if provided)
    const emailValue = formData.email?.trim();
    if (emailValue && !VALIDATION_PATTERNS.EMAIL.test(emailValue)) {
      newErrors.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      onConfirm(formData);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof OrderData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.control}>
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={errors.name ? styles.invalid : ''}
          aria-describedby={errors.name ? 'name-error' : undefined}
          required
        />
        {errors.name && <p id="name-error" className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={errors.phone ? styles.invalid : ''}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
          required
        />
        {errors.phone && <p id="phone-error" className={styles.error}>{errors.phone}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="address">Delivery Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className={errors.address ? styles.invalid : ''}
          aria-describedby={errors.address ? 'address-error' : undefined}
          required
        />
        {errors.address && <p id="address-error" className={styles.error}>{errors.address}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="email">Email (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={errors.email ? styles.invalid : ''}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <p id="email-error" className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="notes">Order Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formData.notes}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles['button--alt']}>
          Cancel
        </button>
        <button type="submit" className={styles.button}>
          Confirm Order
        </button>
      </div>
    </form>
  );
}

export default Checkout;
