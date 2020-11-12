import * as React from "react";

function SvgMonitor(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 512 512" width="1em" {...props}>
      <path d="M482 25H30C13.458 25 0 38.458 0 55v298c0 16.542 13.458 30 30 30h147v74H96c-8.284 0-15 6.716-15 15s6.716 15 15 15h320c8.284 0 15-6.716 15-15s-6.716-15-15-15h-81v-74h147c16.542 0 30-13.458 30-30V55c0-16.542-13.458-30-30-30zM305 457h-98v-74h98zm177-104H30V55h452c.019 304.472.1 298 0 298z" />
    </svg>
  );
}

export default SvgMonitor;
