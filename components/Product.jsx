import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, slug, price } }) => {
  // Check if image exists before using it
  const imageUrl = image ? urlFor(image[0]).url() : "";

  // Check if slug is defined and has the current property
  const productSlug = slug && slug.current ? slug.current : "";

  return (
    <div>
      <Link href={`/product/${productSlug}`}>
        <div className="product-card">
          {imageUrl && ( // Render Image component only if imageUrl is available
            <Image
              src={imageUrl}
              width={250}
              height={250}
              className="product-image"
              alt="products"
            />
          )}

          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
