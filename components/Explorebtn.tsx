"use client";

import Image from "next/image";

const Explorebtn = () => {
  return (
    <button
      onClick={() => {}}
      id="explore-btn"
      type="button"
      className="mt-7 mx-auto"
    >
      <a href="#events">
        Explore Events
        <Image
          src="/Icons/arrow-Down.svg"
          alt="Arrow Down"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
};

export default Explorebtn;
