"use client";
import { useEffect, useState } from "react";
import { getProductById, updateProduct } from "@/lib/e-commerce";
import { successAlert } from "@/lib/utils/sweetAlerts";


export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [color, setColor] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);
  const [about, setAbout] = useState<string[]>([""]);
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [stock, setStock] = useState<number | string>("");
  const [displayImage, setDisplayImage] = useState<string>("");

  // Fetch product details
  useEffect(() => {
    const getProductDetails = async () => {
      const data = await getProductById(id);
      setProduct(data);
      if (data) {
        setName(data.name || "");
        setDescription(data.description || "");
        setPrice(data.price || "");
        setColor(data.color || [""]);
        setTags(data.tags || [""]);
        setAbout(data.about || [""]);
        setCategory(data.category || "");
        setBrand(data.brand || "");
        setStock(data.stock || "");
        setDisplayImage(data.displayImage || "");
      }
    };

    getProductDetails();
  }, [id]);

  // Handle input changes
  const handleInputChange =
    (setter: (value: any) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  // Handle color input change
  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...color];
    updatedColors[index] = value;
    setColor(updatedColors);
  };

  // Handle tag input change
  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  // Handle about input change
  const handleAboutChange = (index: number, value: string) => {
    const updatedAbout = [...about];
    updatedAbout[index] = value;
    setAbout(updatedAbout);
  };

  // Add new color input field
  const addColorField = () => {
    setColor([...color, ""]);
  };

  // Add new tag input field
  const addTagField = () => {
    setTags([...tags, ""]);
  };

  // Add new about input field
  const addAboutField = () => {
    setAbout([...about, ""]);
  };

  // Remove color input field
  const removeColorField = (index: number) => {
    const updatedColors = color.filter((_, i) => i !== index);
    setColor(updatedColors);
  };

  // Remove tag input field
  const removeTagField = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  // Remove about input field
  const removeAboutField = (index: number) => {
    const updatedAbout = about.filter((_, i) => i !== index);
    setAbout(updatedAbout);
  };

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  // Handle submit
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = { name, description, price, color, tags, about, category, brand, stock, displayImage };
    const res = await updateProduct(product?._id, updatedData);
    if (res?.data?.success) {
      successAlert('Product Updated Successfully. For fast result please reload products page . Thank you 😊')
      setTimeout(() => {
        window.location.replace(`/admin/products/1`);
      }, (800));
    }
  };

  return (
    <div className=" py-12 ml-16 border-2 px-12 flex rounded-lg shadow-md justify-center items-center  container mx-auto my-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="name">
          Name:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
        />

        {/* Description Field */}
        <label
          className="text-xl font-semibold text-gray-600"
          htmlFor="description"
        >
          Description:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="text"
          value={description}
          onChange={handleInputChange(setDescription)}
        />

        {/* Price Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="price">
          Price:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="number"
          value={price}
          onChange={handleInputChange(setPrice)}
        />

        {/* About Section */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="about">
          About:
        </label>
        {about.map((aboutText, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1 mb-2"
              type="text"
              value={aboutText}
              onChange={(e) => handleAboutChange(index, e.target.value)}
              placeholder="Add details about the product"
            />
            <button
              type="button"
              onClick={() => removeAboutField(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addAboutField}
          className="mt-2 py-1 px-3 bg-green-500 w-[200px] text-white rounded-lg"
        >
          Add Another
        </button>

        {/* Category Selection */}
        <label
          className="text-xl font-semibold text-gray-600"
          htmlFor="category"
        >
          Category:
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            "Electronics",
            "Gaming Accessories",
            "Fashion",
            "Furniture",
            "Kitchen Appliances",
            "Home Decor",
            "Outdoor",
          ].map((categoryOption) => (
            <label key={categoryOption}>
              <input
                className="mr-2"
                type="radio"
                name="category"
                value={categoryOption}
                checked={category === categoryOption}
                onChange={handleCategoryChange}
              />
              {categoryOption}
            </label>
          ))}
        </div>

        {/* Dynamic Color Inputs */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="color">
          Available Colors:
        </label>
        {color.map((singleColor, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1 mb-2"
              type="text"
              value={singleColor}
              onChange={(e) => handleColorChange(index, e.target.value)}
              placeholder="Add a color"
            />
            <button
              type="button"
              onClick={() => removeColorField(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addColorField}
          className="mt-2 py-1 px-3 bg-green-500 w-[200px] text-white rounded-lg"
        >
          Add Color
        </button>

        {/* Dynamic Tags Inputs */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="tags">
          Tags:
        </label>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1 mb-2"
              type="text"
              value={tag}
              onChange={(e) => handleTagChange(index, e.target.value)}
              placeholder="Add a tag"
            />
            <button
              type="button"
              onClick={() => removeTagField(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTagField}
          className="mt-2 py-1 px-3 bg-green-500 w-[200px] text-white rounded-lg"
        >
          Add Tag
        </button>

        {/* Brand Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="brand">
          Brand:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="text"
          value={brand}
          onChange={handleInputChange(setBrand)}
        />

        {/* Stock Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="stock">
          Stock:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="number"
          value={stock}
          onChange={handleInputChange(setStock)}
        />

        {/* Display Image Field */}
        <label
          className="text-xl font-semibold text-gray-600"
          htmlFor="displayImage"
        >
          Display Image URL:
        </label>
        <input
          className="text-xl w-[700px] font-semibold border-2 border-gray-400 rounded-lg px-2 py-1"
          type="text"
          value={displayImage}
          onChange={handleInputChange(setDisplayImage)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-[700px] py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
