"use client"

import Link from "next/link"

type TabLinkProps = {
    href: string;
    upDown?: boolean;
    text: string;
    textSize?: string;
    mx?: string;
    bgColor: string;
    borderColor: string;
};

const TabLink = ({ href, upDown = true, text, textSize = "text-lg", mx = "", bgColor, borderColor }: TabLinkProps) => {

  if (upDown) {
    return (
      <Link href={href} className={`${mx}`}>
        <div className="relative">
          <div className={`absolute z-0 top-0 left-0 w-full h-full ${bgColor} ${borderColor} border-x-2 border-b-2 rounded-b-primary`} />
          <div className={`relative z-10 p-3 ${textSize} ${bgColor} ${borderColor} border-x-2 border-b-2 rounded-b-primary transition-transform duration-300 hover:translate-y-3`}>
            {text}
          </div>
        </div>
      </Link>
    )
  } else {
    return (
      <Link href={href} className={`${mx}`}>
        <div className="relative">
          <div className={`absolute z-0 top-0 left-0 w-full h-full ${bgColor} ${borderColor} border-x-2 border-t-2 rounded-t-primary`} />
          <div className={`relative z-10 p-3 ${textSize} ${bgColor} ${borderColor} border-x-2 border-t-2 rounded-t-primary transition-transform duration-300 hover:-translate-y-3`}>
            {text}
          </div>
        </div>
      </Link>
    )
  }
}

export default TabLink
