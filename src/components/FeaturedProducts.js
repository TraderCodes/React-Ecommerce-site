import React from 'react';
import { useProductsContext } from '../context/products_context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import Product from './Product';

const FeaturedProducts = () => {
  // reducer imported from line 3
  // making it easier by shorting the name
  const {
    products_error: error,
    products_loading: loading,
    featured_products: featured,
  } = useProductsContext();
  // if we are loading return a loading components
  if (loading) {
    return <Loading />;
  }
  // Show error components
  if (error) {
    return <Error />;
  }
  //! return products if not Loading and no Error
  return (
    <Wrapper className="section">
      {/* title */}
      <div className="title">
        <h2>featured products</h2>
        <div className="underline"></div>
      </div>
      {/* item section */}
      <div className="section-container featured">
        {/* Featured products are the items filtered in product reducer */}
  {/* //! Slice = amount of items to show in featured */}
        {featured.slice(0,4).map((product) => {
          return  <Product key={product.id} {...product}/>
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
