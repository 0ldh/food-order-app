import React, { useState } from 'react';
import styles from './Checkout.module.css';

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

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.address.trim().length < 10) {
      newErrors.address = 'Please enter a complete address';
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
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
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
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
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
        />
        {errors.address && <p className={styles.error}>{errors.address}</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="email">Email (optional)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
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
