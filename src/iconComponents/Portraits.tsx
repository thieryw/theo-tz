import * as React from "react";

function SvgPortraits(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.25 0H5.75A2.752 2.752 0 003 2.75v18.5A2.752 2.752 0 005.75 24h12.5A2.752 2.752 0 0021 21.25V2.75A2.752 2.752 0 0018.25 0zM12 6c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm5 11.25a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-1.5A2.752 2.752 0 019.75 13h4.5A2.752 2.752 0 0117 15.75z" />
    </svg>
  );
}

export default SvgPortraits;
