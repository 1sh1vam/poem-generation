import clsx from 'clsx';
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface IMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'sent' | 'received';
  text: string;
  loading?: boolean;
}

const Message = ({ type = 'sent', text, children, ...props }: IMessageProps) => {

  const textClasses = twMerge(
    'p-4 rounded-lg bg-neutral-light text-content-2',
    clsx({
        'bg-neutral-dark text-content-1': type === 'received'
    })
  )
  return (
    <div {...props}>
        <p className={textClasses}>{text}</p>
        {children}
    </div>
  )
}

export default Message