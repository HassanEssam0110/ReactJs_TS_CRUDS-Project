interface IProp {
  imgURL: string;
  alt: string;
  className: string;
}
const Image = ({ imgURL, alt, className }: IProp) => {
  return <img src={imgURL} alt={alt} className={className} />;
};

export default Image;
