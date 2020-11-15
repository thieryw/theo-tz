import * as React from "react";

function SvgChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="1em"
      viewBox="0 0 512.012 512.012"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M333.201 115.038c-28.905-59.021-89.37-98.042-157.193-98.042-97.047 0-176 78.505-176 175 0 26.224 5.63 51.359 16.742 74.794L.299 349.055c-2.094 10.472 7.144 19.728 17.618 17.656l83.279-16.465a172.546 172.546 0 0034.732 12.151c-26.717-126.541 69.199-245.321 197.273-247.359z" />
      <path d="M495.266 394.79a174.485 174.485 0 007.511-18.514h-.549c37.448-109.917-41.305-225.441-157.567-231.066l-.005-.018c-100.036-4.61-183.148 75.486-183.148 174.804 0 96.414 78.361 174.857 174.743 174.997 26.143-.035 51.201-5.663 74.568-16.747 91.207 18.032 84.094 16.75 86.189 16.75 9.479 0 16.56-8.686 14.709-17.941z" />
    </svg>
  );
}

export default SvgChat;
