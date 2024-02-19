import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  const imageUrl = urlFor(image).url();
  // Provide width and height attributes (adjust values as needed)
  const imageWidth = 500; // Replace with the actual width of the image
  const imageHeight = 500; // Replace with the actual height of the image
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p style={{ fontWeight: "bold" }}>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href="">
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <Image
          src={imageUrl}
          className="footer-banner-image"
          alt="footerbanner"
          width={imageWidth} // Provide the width
          height={imageHeight} // Provide the height
        />
      </div>
    </div>
  );
};

export default FooterBanner;
