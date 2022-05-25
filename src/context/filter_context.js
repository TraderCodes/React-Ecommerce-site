import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';
// filter reducer function
const initialState = {
  filtered_products: [],
  all_products: [],
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // grab products from product context
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
    // Trigger dispatch when product is fetched, it will send the products to (filtered_products + all_products) in initialstate
  }, [products]);
  // ! 👆 now go to filter reducer and set the function

  return (
    // pass in the state so we can use it in everywhere else
    <FilterContext.Provider value={{...state}}>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
