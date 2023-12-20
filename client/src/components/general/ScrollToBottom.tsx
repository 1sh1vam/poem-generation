import React, { useRef, useEffect } from 'react';

const ScrolledToBottomContainer = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      console.log('contaier', containerRef.current.scrollHeight)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div
      {...props}
      ref={containerRef}
    >
      {children}
    </div>
  );
};

export default ScrolledToBottomContainer;
