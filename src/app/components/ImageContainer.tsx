import React from 'react';
import Image from 'next/image';

interface ImageContainerProps {
  icon: string;
  size?: number;
  color?: string;
}

const ImageContainer = ({
  icon,
  size = 24,
  color = 'gray-500',
}: ImageContainerProps) => {
  return (
    <Image src={icon} alt="Image_icon" className={`${color}`} style={{ width: size, height: size }} />
  );
};

export default ImageContainer;