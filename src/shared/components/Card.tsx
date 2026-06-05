import { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pad?: 'sm' | 'md' | 'lg';
}

const padStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 sm:p-10',
};

export default function Card({
  children,
  pad = 'md',
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-3xl shadow-soft',
        padStyles[pad],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
