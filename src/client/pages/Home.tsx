import React, { useState, useEffect } from "react";
import "../styles/pages/HomePage.css";

export function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortQuery, setSortQuery] = useState<string>("price:asc"); // Default sort
    const [searchString, setSearchString] = useState<string>(""); // Default empty search
    const [triggerSearch, setTriggerSearch] = useState<boolean>(false); // Trigger search only when the button is clicked

    const fetchProductsAPI = async () => {
        try {
            setLoading(true);

            // Combine sortQuery and searchString into query params
            const queryParams = new URLSearchParams();
            if (sortQuery) {
                queryParams.append("sort", sortQuery);
            }
            if (searchString) {
                queryParams.append("search", searchString);
            }

            const endpoint = `http://localhost:8000/api/products?${queryParams.toString()}`;

            const res = await fetch(endpoint);
            if (!res.ok) {
                throw new Error("Failed to fetch products.");
            }

            const data = await res.json();
            setProducts(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsAPI();
    }, [sortQuery]); // Fetch products when sorting changes

    useEffect(() => {
        if (triggerSearch) {
            fetchProductsAPI();
            setTriggerSearch(false); // Reset trigger to prevent unwanted calls
        }
    }, [triggerSearch]); // Trigger the API only when the search button is clicked

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortQuery(event.target.value); // Update sort query from dropdown selection
    };


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    const handleSearchClick = () => {
        setTriggerSearch(true); // Set trigger to true when the button is clicked
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="homepage">

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Peaks</h1>
                    <p>Your one-stop shop for premium sunglasses.</p>
                    <button className="shop-now-button">Shop Now</button>
                </div>
            </section>
            {/* Search and Sort Controls */}
            <section className="search-and-sort">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchString}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearchClick}>Search</button>
                {/* Trigger search */}
                <select onChange={handleSortChange} value={sortQuery}>
                    <option value="price:asc">
                        Sort by Price: Low to High
                    </option>
                    <option value="price:desc">
                        Sort by Price: High to Low
                    </option>
                    <option value="name:asc">Sort by Name: A-Z</option>
                    <option value="name:desc">Sort by Name: Z-A</option>
                </select>
            </section>


            {/* Featured Products */}
            <section className="featured-products">
                <h2>Featured Sunglasses</h2>
                <div className="products-grid">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>${product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}