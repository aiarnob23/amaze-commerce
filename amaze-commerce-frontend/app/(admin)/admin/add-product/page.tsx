"use client";
import { useState } from "react";
import { successAlert } from "@/lib/utils/sweetAlerts";
import { addNewProduct } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";

const AddProductPage = () => {
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
  const [collectionName, setCollectionName] = useState<string>("");

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price,
      color,
      tags,
      about,
      category,
      collectionName,
      brand,
      stock,
      displayImage,
    };
    const res = await addNewProduct(newProduct);
    if (res.data.success) {
      successAlert('Product added successfully');
      setTimeout(() => {
        window.location.replace('/admin/products/1');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 py-12 px-8 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h3 className="text-3xl font-bold text-indigo-600 mb-4">Add New Product</h3>
        
        {/* Name Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="name">Name:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="text"
          value={name}
          onChange={handleInputChange(setName)}
        />

        {/* Description Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="description">Description:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="text"
          value={description}
          onChange={handleInputChange(setDescription)}
        />

        {/* Price Field */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="price">Price:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="number"
          value={price}
          onChange={handleInputChange(setPrice)}
        />

        {/* About Section */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="about">More About Product:</label>
        {about.map((aboutText, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              required
              className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              type="text"
              value={aboutText}
              onChange={(e) => handleAboutChange(index, e.target.value)}
              placeholder="Add more details about the product"
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
          className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Another
        </button>

        {/* Category Selection */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="category">Category:</label>
        <div className="flex flex-wrap gap-2">
          {["Electronics", "Gaming Accessories", "Fashion", "Furniture", "Kitchen Appliances", "Home Decor", "Outdoor"].map((categoryOption) => (
            <label key={categoryOption}>
              <input
                required
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

        {/* Collection Name */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="collectionName">Collection Name:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="text"
          value={collectionName}
          onChange={handleInputChange(setCollectionName)}
        />

        {/* Color Inputs */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="color">Available Colors:</label>
        {color.map((singleColor, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              required
              className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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
          className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Color
        </button>

        {/* Tags */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="tags">Tags:</label>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              required
              className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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
          className="mt-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Tag
        </button>

        {/* Brand */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="brand">Brand:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="text"
          value={brand}
          onChange={handleInputChange(setBrand)}
        />

        {/* Stock */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="stock">Stock:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="number"
          value={stock}
          onChange={handleInputChange(setStock)}
        />

        {/* Display Image */}
        <label className="text-xl font-semibold text-gray-600" htmlFor="displayImage">Display Image URL:</label>
        <input
          required
          className="text-xl w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
          type="text"
          value={displayImage}
          onChange={handleInputChange(setDisplayImage)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default withAdminAuth(AddProductPage);
