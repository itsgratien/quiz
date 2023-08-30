import React from 'react';
import style from './SingleCandidate.module.scss';
import classname from 'classnames';

const Svg = () => {
  return (
    <svg
      width="1100"
      height="350"
      viewBox="0 0 1100 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname(style.svg, 'relative')}
    >
      <path
        d="M0 10C0 4.47716 4.47715 0 10 0H1090C1095.52 0 1100 4.47715 1100 10V339.705C1100 345.342 1095.34 349.865 1089.71 349.701L9.70941 318.298C4.30202 318.141 0 313.712 0 308.302V10Z"
        fill="#FFEC44"
      />
    </svg>
  );
};
export default Svg;
