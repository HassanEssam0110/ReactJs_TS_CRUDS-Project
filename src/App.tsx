import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import Modal from "./components/ui/Model/Model";
import { categories, colors, formInputList, productList } from "./data/data";
import Button from "./components/ui/Button/Button";
import Input from "./components/ui/Input/Input";
import { IProduct } from "./interfaces/IProduct";
import { productValidation } from "./validation";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import CircleColor from "./components/CircleColor/CircleColor";
import { v4 as uuidv4 } from "uuid";
import Select from "./components/ui/Select/Select";
import { TProductName } from "./Types";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: { name: "", imageURL: "" },
  };

  const defaultErrorsMessages = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  /* ------- State -------- */
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIndex, setProductToEditIndex] = useState<number>(0);
  const [errors, setErrors] = useState(defaultErrorsMessages);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const [isOpenConfirmModel, setIsOpenConfirmModel] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  /* ------- Handler -------- */
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModel(false);
  const openEditModal = () => setIsOpenEditModel(true);
  const closeConfirmModal = () => setIsOpenConfirmModel(false);
  const openConfirmModal = () => setIsOpenConfirmModel(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = e.target;
    setProductToEdit({ ...productToEdit, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const onCancel = () => {
    setProduct(defaultProductObj);
    setErrors(defaultErrorsMessages);
    setTempColors([]);
    closeModal();
  };

  const removeProductHandler = () => {
    const filteredProducts = products.filter(
      (item) => item.id !== productToEdit.id
    );
    setProducts(filteredProducts);
    setProductToEdit(defaultProductObj);
    closeConfirmModal();

    toast("Product has been deleted successfully!", {
      icon: "🚫",
      style: {
        backgroundColor: "#c2344d",
        color: "white",
      },
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { description, imageURL, price, title } = product;
    const errors = productValidation({
      title,
      price,
      imageURL,
      description,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    // add new product to products state
    setProducts((prev) => [
      {
        ...product,
        colors: tempColors,
        id: uuidv4(),
        category: selectedCategory,
      },
      ...prev,
    ]);

    // clear And close
    setProduct(defaultProductObj);
    setErrors(defaultErrorsMessages);
    setTempColors([]);
    closeModal();

    toast("Product has been added successfully!", {
      icon: "✅",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { description, imageURL, price, title } = productToEdit;

    const errors = productValidation({
      title,
      price,
      imageURL,
      description,
      colors: tempColors,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");

    if (!hasErrorMsg) {
      console.log(errors);
      setErrors(errors);
      return;
    }

    // Edit product to products state
    const updateProducts = [...products];
    updateProducts[productToEditIndex] = {
      ...productToEdit,
      colors: tempColors,
    };
    setProducts(updateProducts);

    // Clear And Close
    setProductToEdit(defaultProductObj);
    setErrors(defaultErrorsMessages);
    setTempColors([]);
    closeEditModal();

    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  };

  /* ------- Render -------- */
  const renderProductCards = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      idx={idx}
      setProductToEdit={setProductToEdit}
      setProductToEditIndex={setProductToEditIndex}
      setTempColors={setTempColors}
      openEditModal={openEditModal}
      openConfirmModal={openConfirmModal}
    />
  ));

  const renderFormInputList = formInputList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label
        className="text-gray-700 mb-[2px] text-sm font-medium"
        htmlFor={input.id}
      >
        {input.label}
      </label>
      <Input
        id={input.id}
        name={input.name}
        type={input.type}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      <ErrorMessage msg={errors[input.name]} />
    </div>
  ));

  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: TProductName
  ) => {
    return (
      <div className="flex flex-col">
        <label
          className="text-gray-700 mb-[2px] text-sm font-medium"
          htmlFor={id}
        >
          {label}
        </label>
        <Input
          id={id}
          name={name}
          type="text"
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]} />
      </div>
    );
  };

  const renderProductColors = colors.map((color) => (
    <CircleColor
      key={color}
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempColors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempColors((prev) => [...prev, color]);
      }}
      onChange={onChangeHandler}
    />
  ));

  return (
    <main className="container mx-auto">
      <Button
        className="block bg-indigo-700 hover:bg-indigo-800 mx-auto my-10 px-10 font-medium"
        onClick={openModal}
        width="w-fit"
      >
        Build a Product
      </Button>

      <div className="m-5  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProductCards}
      </div>

      {/* Add Product Model */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="Add new Product">
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center flex-wrap space-x-2">
            {renderProductColors}
            {tempColors.length < 1 ? (
              <ErrorMessage msg={errors.colors} />
            ) : null}
          </div>
          <div className="flex items-center flex-wrap space-x-2 mt-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 m-[1px] rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Model */}
      <Modal
        isOpen={isOpenEditModel}
        closeModal={closeEditModal}
        title="Edit Product"
      >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "image",
            "Product Image URL",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product Price", "price")}

          <Select
            selected={productToEdit.category}
            setSelected={(value) =>
              setProductToEdit({ ...productToEdit, category: value })
            }
          />

          <div className="flex items-center flex-wrap space-x-2">
            {renderProductColors}
            {tempColors.length < 1 ? (
              <ErrorMessage msg={errors.colors} />
            ) : null}
          </div>
          <div className="flex items-center flex-wrap space-x-2 mt-1">
            {tempColors.map((color) => (
              <span
                key={color}
                className="p-1 m-[1px] rounded-md text-white"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3 ">
            <Button className="bg-indigo-700 hover:bg-indigo-800">
              Submit
            </Button>
            <Button
              className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
              type="button"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Remove Product Model */}
      <Modal
        isOpen={isOpenConfirmModel}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Product from your Store?"
        description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button
            className="bg-[#c2344d] hover:bg-red-800"
            onClick={removeProductHandler}
          >
            Yes, remove
          </Button>
          <Button
            type="button"
            className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      <Toaster />
    </main>
  );
};

export default App;
