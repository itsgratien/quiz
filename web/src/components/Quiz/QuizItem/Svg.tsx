import * as React from 'react';

const Svg = ({ more }: { more: boolean }) => {
  return (
    <>
      {more ? (
        <svg
          width="589"
          height="433"
          viewBox="0 0 589 433"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_205_362)">
            <path
              d="M4 20C4 8.95431 12.9543 0 24 0H565C576.046 0 585 8.9543 585 20V378.457C585 389.122 576.632 397.91 565.98 398.433L24.9799 424.971C13.5631 425.531 4 416.425 4 404.995V20Z"
              fill="#F1F1F1"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_205_362"
              x="0"
              y="0"
              width="589"
              height="432.995"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_205_362"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_205_362"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <svg
          width="581"
          height="425"
          viewBox="0 0 581 425"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20C0 8.95431 8.9543 0 20 0H561C572.046 0 581 8.9543 581 20V378.457C581 389.122 572.632 397.91 561.98 398.433L20.9799 424.971C9.5631 425.531 0 416.425 0 404.995V20Z"
            fill="#F1F1F1"
          />
        </svg>
      )}
    </>
  );
};
export default Svg;
