import * as React from "react";

function SvgFacebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path d="M222.892 388h51.491a8 8 0 008-8V264.093h26.751a8 8 0 007.958-7.18l4.51-43.772a7.997 7.997 0 00-2.019-6.179 7.997 7.997 0 00-5.939-2.641h-31.261v-17.73c0-3.662 1.159-3.936 2.928-3.936h27.682a8 8 0 008-8v-42.5a8 8 0 00-7.968-8L274.848 124c-26.752 0-41.029 11.77-48.295 21.643-10.146 13.787-11.661 29.941-11.661 38.343v20.334h-16.489a8 8 0 00-8 8v43.772a8 8 0 008 8h16.489V380a8 8 0 008 8zm-16.49-139.907v-27.772h16.489a8 8 0 008-8v-28.334c0-5.185.833-18.376 8.547-28.86 7.386-10.037 19.3-15.126 35.376-15.126l30.177.122v26.533h-19.682c-9.421 0-18.928 6.164-18.928 19.936v25.73a8 8 0 008 8h30.395l-2.862 27.772h-27.533a8 8 0 00-8 8V372H230.89V256.093a8 8 0 00-8-8h-16.488z" />
      <path d="M437.022 74.984C388.67 26.63 324.381 0 256 0 187.624 0 123.338 26.63 74.984 74.984S0 187.624 0 256c0 68.388 26.63 132.678 74.984 181.028C123.335 485.375 187.621 512 256 512c68.385 0 132.673-26.625 181.021-74.972C485.372 388.679 512 324.389 512 256c0-68.378-26.628-132.664-74.978-181.016zm-11.314 350.73C380.381 471.039 320.111 496 256 496c-64.106 0-124.374-24.961-169.703-70.286C40.965 380.386 16 320.113 16 256c0-64.102 24.965-124.37 70.297-169.702C131.63 40.965 191.898 16 256 16c64.108 0 124.378 24.965 169.708 70.297C471.037 131.628 496 191.896 496 256c0 64.115-24.963 124.387-70.292 169.714z" />
      <path d="M430.038 114.969a7.998 7.998 0 00-11.253-1.172 7.999 7.999 0 00-1.172 11.252C447.526 161.919 464 208.425 464 256c0 55.567-21.635 107.803-60.919 147.086C363.797 442.367 311.563 464 256 464c-51.26 0-100.505-18.807-138.663-52.956a8 8 0 00-10.67 11.922C147.763 459.745 200.797 480 256 480c59.837 0 116.089-23.297 158.394-65.601C456.701 372.094 480 315.84 480 256c0-51.234-17.744-101.319-49.962-141.031zM48 256c0-114.691 93.309-208 208-208 51.26 0 100.504 18.808 138.662 52.959a8 8 0 0011.296-.625 8 8 0 00-.625-11.296C364.237 52.256 311.203 32 256 32c-59.829 0-116.079 23.301-158.389 65.611C55.301 139.92 32 196.171 32 256c0 51.24 17.744 101.328 49.963 141.038a7.983 7.983 0 006.217 2.96 8 8 0 006.208-13.041C64.474 350.088 48 303.58 48 256z" />
    </svg>
  );
}

export default SvgFacebook;