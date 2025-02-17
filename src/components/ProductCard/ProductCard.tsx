import { IProduct } from "../../interfaces/IProduct";
import { numberWithCommas, txtSlicer } from "../../utils/functions";
import Button from "../ui/Button/Button";
import CircleColor from "../CircleColor/CircleColor";
import Image from "../Image/Image";
interface IProp {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  openConfirmModal: () => void;
  idx: number;
  setProductToEditIndex: (value: number) => void;
  setTempColors: (value: string[]) => void;
}

const ProductCard = ({
  product,
  setProductToEdit,
  openEditModal,
  openConfirmModal,
  setProductToEditIndex,
  idx,
  setTempColors,
}: IProp) => {
  const { title, description, imageURL, price, colors, category } = product;

  /* ------- Render -------- */
  const renderProductColors = colors.map((color) => (
    <CircleColor key={color} color={color} />
  ));

  /* ------- Handler -------- */
  const onEdit = () => {
    setProductToEdit(product);
    setTempColors(product.colors);
    setProductToEditIndex(idx);
    openEditModal();
  };

  const onRemove = () => {
    openConfirmModal();
    setProductToEdit(product);
  };

  return (
    <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col space-y-3 shadow-md">
      <Image
        imgURL={imageURL}
        alt={title}
        className="rounded-md mb-1 h-52 w-full lg:object-cover"
      />
      <h3 className="text-lg font-semibold">{txtSlicer(title, 25)}</h3>
      <p className="text-sm text-gray-500 break-words">
        {txtSlicer(description, 70)}
      </p>
      <div className="flex items-center flex-wrap space-x-2">
        {!colors.length ? (
          <p className="min-h-[20px]">Not available colors!</p>
        ) : (
          renderProductColors
        )}
      </div>
      <div className="flex items-center justify-between ">
        <span className="text-lg text-indigo-600 font-semibold">
          ${numberWithCommas(price)}
        </span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image
            imgURL={category.imageURL}
            alt={category.name}
            className="w-10 h-10 rounded-full object-bottom"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto space-x-2">
        <Button className="bg-indigo-700 hover:bg-indigo-800" onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-[#c2344d] hover:bg-red-800" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
