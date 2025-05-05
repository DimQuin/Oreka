import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function Product({product}) {

  const truncateByWords = (str, maxWords) => {
    if (!str) return ''; // Kiểm tra nếu str là undefined hoặc null
    const words = str.split(' ');
    if (words.length <= maxWords) return str;
    return words.slice(0, maxWords).join(' ') + '...';
  };
  return (
    <div className="w-[244px] h-[424px] border overflow-hidden">
        <Link to={`/oreka/${product?._id}`} className='product'>
            <img
                src={product?.images?.[0]?.url}
                alt={product?.title}
            />
        </Link>
      <div className="p-2 mt-4">
        <Link to={`/oreka/${product?._id}`}>
            <p className="text-[14px]">
            {truncateByWords(product?.title, 11)}
            </p>
        </Link>
        <h6 className='font-semibold pt-1 pb-2'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.priceSale)}</h6>
        <div className="flex items-center">
            <FaLocationDot className='me-2 text-[14px] text-[#999]'/> 
            <span>{product?.location}</span>
        </div>
      </div>
    </div>
  );
}
