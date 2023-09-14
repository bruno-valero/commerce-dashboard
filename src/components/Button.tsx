'use client'

import { twMerge } from 'tailwind-merge';


interface ButtonProps {
  bgColor: string;
  color: string;
  size: string;
  text: string;
  borderRadius: string;
  className?:string;
}

export default function Button({ bgColor, color, size, text, borderRadius, className }:ButtonProps) {
  return (
    <button type='button' className={twMerge(`${bgColor} ${color} ${size} ${text} ${borderRadius} hover:drop-shadow-xl`, className ? className : '')} >
      {text}
    </button>
  );
};
