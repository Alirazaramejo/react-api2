import { useEffect, useState, useCallback, useContext } from 'react';
import { Input, Button, Spin, Card as AntCard, Empty } from 'antd';
import Card from './components/Card/Card';
import ProductsListing from './components/Products/ProductsListing/ProductsListing';
import { getAllProducts, searchProduct } from './service/productsService';
import './App.css';
import { MainContext } from './providers/context/MainContext';
import MainContextProvider from './providers/context/MainContextProvider';

const { Meta } = AntCard;

function App() {
  const { count, setCount } = useContext(MainContext);
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadMoreCount, setLoadMoreCount] = useState(0); // Track the number of times "Load More" is clicked
  const [noResults, setNoResults] = useState(false); // Track if there are no search results

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await getAllProducts(skip);
        if (response) {
          setProducts((prevProducts) => [...prevProducts, ...response.products]);
        }
        setNoResults(false); // Reset noResults flag when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [skip]);

  const handlePagination = useCallback(() => {
    setSkip((prevSkip) => prevSkip + 10);
    setLoadMoreCount((prevCount) => prevCount + 1);
  }, [skip]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await searchProduct(searchTerm);
      if (data.products.length > 0) {
        setProducts(data.products);
        setNoResults(false); // Reset noResults flag when search results are found
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setProducts([]); // Clear existing products
        setNoResults(true); // Set noResults flag when no search results are found
      }
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter search term"
        style={{ width: '200px', marginRight: '8px' }}
      />
      <Button type="primary" onClick={handleSearch} style={{ marginRight: '8px' }}>SEARCH</Button>
      <Button
        type="primary"
        onClick={() => setCount(count + 1)}
      >INC COUNT</Button>
      <ProductsListing
        products={products}
        handle={handlePagination}
      />
      {loading && <Spin size="large" style={{ marginTop: '20px' }} />}
      {noResults && <Empty description="No items available" style={{ marginTop: '20px' }} />}
      <p>Load More Clicks: {loadMoreCount}</p>
    </>
  );

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
}

export default App;
