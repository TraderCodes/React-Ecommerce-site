import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  // Grab the reducer state from filter_context 
  const {filtered_products:products} = useFilterContext()

  return <GridView products ={products}></GridView>
}

export default ProductList
