import React, { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiFillAlipayCircle,
} from "react-icons/ai";
import Image from "next/image";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { BsImage, BsUnion } from "react-icons/bs";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              alt="prddetail"
              src={urlFor(image && image[index]).url()}
              width={477} // Replace with the actual width of the image
              height={523} // Replace with the actual height of the image
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                alt="smallimage"
                key={i}
                src={urlFor(item).url()}
                width={477} // Replace with the actual width of the small image
                height={523} // Replace with the actual height of the small image
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  try {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) => ({
      params: {
        slug: product.slug.current,
      },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug; // Use optional chaining to safely access params.slug
    if (!slug) {
      throw new Error("Slug is missing");
    }

    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    console.log(product);

    return {
      props: { products, product },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      notFound: true,
    };
  }
};

export default ProductDetails;
