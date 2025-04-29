interface ImageProps {
  image: string;
  height?: number;
  width?: number;
  alt: string;
  classname?: string;
}

export const Image = ({ image, height = 40, width = 40, alt }: ImageProps) => {
  return <img src={image} alt={alt} width={`${width}`} height={`${height}`} />;
};
