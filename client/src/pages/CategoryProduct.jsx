import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { getAllCategory } from '../features/Category/categorySlice';
import { getAllProduct } from '../features/products/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const priceRanges = [
  { label: 'Tất cả', value: '' },
  { label: 'Dưới 100.000', value: '0-100000' },
  { label: 'Từ 100.000 - 300.000', value: '100000-300000' },
  { label: 'Từ 300.000 - 1.000.000', value: '300000-1000000' },
  { label: 'Trên 1.000.000', value: '1000000-' }
];

export default function CategoryProduct() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultCategory = queryParams.get('category') || '';

  const [filter, setFilter] = useState({ priceRange: '', name: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    dispatch(getAllProduct());
    dispatch(getAllCategory());
    window.scroll(0, 0);
  }, [dispatch]);

  useEffect(() => {
    const normalizedDefault = defaultCategory ? normalizeString(defaultCategory) : '';
    if (normalizedDefault) {
      setSelectedCategories([normalizedDefault]);
    }
  }, [defaultCategory]);

  const products = useSelector(state => state.product?.products);
  const categories = useSelector(state => state.category?.category);

  const normalizeString = (str) => {
    return str.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filterProducts = (products) => {
    if (!Array.isArray(products)) return [];

    return products
      .filter((product) => {
        const matchesName = normalizeString(product.title).includes(normalizeString(filter.name));
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(normalizeString(product.category));

        let matchesPrice = true;
        if (filter.priceRange) {
          const [minPrice, maxPrice] = filter.priceRange.split('-').map((p) => parseFloat(p));
          matchesPrice = product.priceSale >= minPrice && (isNaN(maxPrice) || product.priceSale <= maxPrice);
        }

        return matchesName && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortOrder === 'asc') return a.priceSale - b.priceSale;
        if (sortOrder === 'desc') return b.priceSale - a.priceSale;
        return 0;
      });
  };

  const [sortOrder, setSortOrder] = useState('');
  const filteredProducts = filterProducts(products);

  return (
    <section className="bg-[#f3f3f3] py-5">
      <div className="container">
        <div className="flex">
          <div className="w-[20%]">
            <div>
              <div>
                <h6 className="mb-2 pt-3 font-bold">Giá tiền</h6>
                {priceRanges.map((range) => (
                  <div key={range.value} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="priceRange"
                      value={range.value}
                      checked={filter.priceRange === range.value}
                      onChange={() => setFilter((prev) => ({ ...prev, priceRange: range.value }))}
                    />
                    <label className="form-check-label">{range.label}</label>
                  </div>
                ))}
              </div>
              <div>
                <h6 className="mb-2 pt-3 font-bold">Danh mục</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="category"
                    value="all"
                    checked={selectedCategories.length === 0}
                    onChange={() => setSelectedCategories([])}
                  />
                  <label className="form-check-label">Tất cả</label>
                </div>
                {Array.isArray(categories) &&
                  categories.map((category) => {
                    const normalizedTitle = normalizeString(category.title);
                    return (
                      <div key={category._id} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="category"
                          value={normalizedTitle}
                          checked={selectedCategories.includes(normalizedTitle)}
                          onChange={() => handleCategorySelect(normalizedTitle)}
                        />
                        <label className="form-check-label">{category.title}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="w-[80%]">
            <div className="flex items-center justify-between">
              <h6>Bán sách cũ</h6>
              <select
                name="sortOrder"
                className="form-control"
                style={{ width: '200px' }}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Lọc theo thứ tự</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>
            <div className="flex flex-wrap justify-items-start gap-3 mt-4">
              {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <Product key={product._id} product={product} />)
              ) : (
                <p>Không có sản phẩm nào phù hợp.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
