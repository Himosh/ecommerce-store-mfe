import React, { useEffect, useState } from "react";
import './product-home.css';
import Card from '../../components/product-card/product-card';
import Header from "../../components/header/header";
import { getAllProducts, getAllCategories, searchProductsByProductName } from '../../services/product-service';
import LoadingScreen from "../../components/loading-screen/loadingScreen";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async (page, category = null, searchQuery = '') => {
    try {
      setLoading(true);
      let data;
      if (searchQuery) {
        data = await searchProductsByProductName(searchQuery, page, 8); 
      } else {
        data = await getAllProducts(page, 8); 
      }
      const filteredProducts = category
        ? data.content.filter((product) => product.categoryName === category) 
        : data.content;
  
      setProducts(filteredProducts); 
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories(); // Change URL if required
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, selectedCategory, searchQuery); 
  }, [currentPage, selectedCategory, searchQuery]); 

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySelect = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Reset to all products
    } else {
      setSelectedCategory(categoryName); // Set category
    }
    setCurrentPage(0); // Reset page to 0
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0); 
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
        <Header
        onSearch={handleSearch} 
        currentPage="home" 
      />
      <div className="category-buttons">
        <button 
          className={`category-button ${selectedCategory === null ? 'active' : ''}`} 
          onClick={() => handleCategorySelect(null)}>
          All Products
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.categoryName ? 'active' : ''}`}
            onClick={() => handleCategorySelect(category.categoryName)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>

      <div className="product-container">
        {products.map((product) => (
          <Link key={product.productId} to={`/${product.productId}`}>
            <Card
              key={product.productId}
              name={product.name}
              description={product.productDescription}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 0 || loading}
        >
          Previous
        </button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages - 1 || loading}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
