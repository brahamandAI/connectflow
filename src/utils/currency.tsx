import React from 'react';

interface CurrencyIconProps {
  currency?: string;
  className?: string;
}

const getCurrencySymbol = (currency: string) => {
  switch (currency.toUpperCase()) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'INR':
      return '₹';
    case 'JPY':
      return '¥';
    case 'CAD':
      return 'C$';
    case 'AUD':
      return 'A$';
    default:
      return currency;
  }
};

export const CurrencyIcon: React.FC<CurrencyIconProps> = ({ 
  currency = 'USD', 
  className = 'w-4 h-4' 
}) => {
  return (
    <span className={className}>
      {getCurrencySymbol(currency)}
    </span>
  );
};

export const formatSalary = (min?: number | null, max?: number | null, currency: string = 'USD'): string => {
  if (!min && !max) return 'Salary not specified';
  
  const symbol = getCurrencySymbol(currency);
  
  if (min && max) {
    return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
  } else if (min) {
    return `${symbol}${min.toLocaleString()}+`;
  } else if (max) {
    return `Up to ${symbol}${max.toLocaleString()}`;
  }
  
  return 'Salary not specified';
};

export default CurrencyIcon;