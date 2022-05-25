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
  grid_view: true,
  sort: 'price-lowest', // preset sort showcase
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // grab products from product context
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products }); //🟢
    // Trigger dispatch when product is fetched, it will send the products to (filtered_products + all_products) in initialstate = payload
  }, [products]);
  // ! 👆 now go to filter reducer and set the function
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS }); //🟢
    // Only call the dispatch after Sort value is changed
  }, [products, state.sort]);
  // --------------------TOGGLE GRID SORT--------------------
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW }); //🟢
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW }); //🟢
  };
  // ------------------------------------------------
  const updateSort = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // trigger dispatch when sort is changed
    dispatch({ type: UPDATE_SORT, payload: value }); //🟢
  };

  return (
    // pass in the state so we can use it in everywhere else
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateSort }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
