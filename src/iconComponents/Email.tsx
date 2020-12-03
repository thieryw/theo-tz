import * as React from "react";

function SvgEmail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 480 480"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M240 0C107.453 0 0 107.453 0 240s107.453 240 240 240 240-107.453 240-240C479.852 107.516 372.484.148 240 0zm0 464C116.29 464 16 363.71 16 240S116.29 16 240 16s224 100.29 224 224c-.14 123.652-100.348 223.86-224 224zm0 0" />
      <path d="M352 144H128a8 8 0 00-8 8v176a8 8 0 008 8h224a8 8 0 008-8V152a8 8 0 00-8-8zm-21.602 16L240 237.465 149.602 160zM136 320V169.39l98.793 84.68a7.994 7.994 0 0010.398 0L344 169.39V320zm0 0" />
    </svg>
  );
}

export default SvgEmail;
