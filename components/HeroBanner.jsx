import React from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  const imageUrl = urlFor(heroBanner.image).url();

  // Provide width and height attributes (adjust values as needed)
  const imageWidth = 500; // Replace with the actual width of the image
  const imageHeight = 500; // Replace with the actual height of the image

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo" style={{ fontWeight: "bold" }}>
          {heroBanner.smallText}
        </p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <Image
          src={imageUrl}
          alt="banner"
          width={imageWidth} // Provide the width
          height={imageHeight} // Provide the height
          className="hero-banner-image"
        />

        <div>
          <Link href="/Product">
            <button type="button">{heroBanner.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
