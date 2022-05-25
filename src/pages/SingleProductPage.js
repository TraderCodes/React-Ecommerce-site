import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  // refactor plus rename to easier context
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  // run everytime when we fetch single product

  // !auto redirect to Homepage when Error appears
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [error]);
  useEffect(() => {

    // ! In order to fetch a single product, we need single product url plus the ID, Single item url is different from total product url in 
    fetchSingleProduct(`${url}${id}`);
  }, [id]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    image,
  } = product;
  return (
    <Wrapper>
      <PageHero title={`/ ${name}`} product />
      {/* Send back to product button 👇 */}
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Go back to product page
        </Link>
        <div className="product-center ">
          {/* add components inported from ./components */}
          <ProductImages />
          <section className="content">
            <h2>{name}</h2>
            {/* star rating ⭐ */}
            <Stars />
            {/* Price */}
            <h5 className="price">{formatPrice(price)}</h5>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
