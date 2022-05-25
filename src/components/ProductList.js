import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

// !IMPORTANT  this component is used in ProductPage.js
const ProductList = () => {
  // Grab the reducer state from filter_context
  const { filtered_products: products, grid_view } = useFilterContext();
  // if there is no product to display
  if (products.length < 1) {
    return (
      <h5 style={{ transform: 'none' }}>
        Sorry, there are no products to display
      </h5>
    );
  }
  // the grid_view thats passed in fro usefilter context
  if (grid_view === false) {
    return <ListView products={products} />;
  }
  return <GridView products={products}></GridView>;
};

export default ProductList;
