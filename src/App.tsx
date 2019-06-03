import React, { Fragment, useState, CSSProperties } from "react";
import "./App.css";

interface Product {
  text: string;
  complete: boolean;
}

function App() {
  const [value, setValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addProduct(value);
    setValue("");
  };

  const addProduct = (text: string): void => {
    const newProducts: Product[] = [
      ...products,
      { text: text, complete: false }
    ];
    setProducts(newProducts);
  };

  const toggleProduct = (index: number): void => {
    const newProducts: Product[] = [...products];
    newProducts[index].complete = !newProducts[index].complete;
    setProducts(newProducts);
  };

  const delProduct = (index: number): void => {
    const newProducts: Product[] = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  return (
    <Fragment>
      <h1>Product List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Product ..."
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit" className="btn" style={{ flex: "1" }}>
          Add Product
        </button>
      </form>
      <section>
        {products.map((product: Product, index: number) => (
          <Fragment key={index}>
            <div
              style={{
                background: "#f4f4f4",
                padding: "10px",
                borderBottom: "1px #ccc dotted",
                textDecoration: product.complete ? "line-through" : ""
              }}
              className="container"
            >
              <input type="checkbox" onChange={() => toggleProduct(index)} />{" "}
              {product.text}
              <button
                type="button"
                onClick={() => delProduct(index)}
                style={delStyle as CSSProperties}
              >
                x
              </button>
            </div>
          </Fragment>
        ))}
      </section>
    </Fragment>
  );
}

const delStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "4px 8px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right"
};
export default App;
