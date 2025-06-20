"use client";
import { useEffect, useState } from "react";
import { getProductById } from "@/lib/e-commerce";
import { successAlert } from "@/lib/utils/sweetAlerts";
import { updateProduct } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import { 
  Save, 
  ArrowLeft, 
  Package, 
  DollarSign, 
  Tag, 
  Palette, 
  Info, 
  Building, 
  Boxes, 
  Image as ImageIcon,
  Plus,
  X
} from "lucide-react";
import Link from "next/link";

const EditProductPage = ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
      try {
        setLoading(true);
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
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  // Handle input changes
  const handleInputChange =
    (setter: (value: any) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  // Dynamic field handlers
  const handleColorChange = (index: number, value: string) => {
    const updatedColors = [...color];
    updatedColors[index] = value;
    setColor(updatedColors);
  };

  const handleTagChange = (index: number, value: string) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  const handleAboutChange = (index: number, value: string) => {
    const updatedAbout = [...about];
    updatedAbout[index] = value;
    setAbout(updatedAbout);
  };

  const addColorField = () => setColor([...color, ""]);
  const addTagField = () => setTags([...tags, ""]);
  const addAboutField = () => setAbout([...about, ""]);

  const removeColorField = (index: number) => {
    const updatedColors = color.filter((_, i) => i !== index);
    setColor(updatedColors);
  };

  const removeTagField = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const removeAboutField = (index: number) => {
    const updatedAbout = about.filter((_, i) => i !== index);
    setAbout(updatedAbout);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updatedData = { 
        name, description, price, color, tags, about, 
        category, brand, stock, displayImage 
      };
      const res = await updateProduct(product?._id, updatedData);
      if (res?.data?.success) {
        successAlert('Product Updated Successfully.');
        setTimeout(() => {
          window.location.replace(`/admin/products/1`);
        }, 800);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/admin/products/1"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-4 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Edit Product
            </h1>
            <p className="text-gray-600">Update product information and details</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
            <div className="flex items-center space-x-3 text-white">
              <Package size={24} />
              <h2 className="text-2xl font-bold">Product Details</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Info size={20} className="mr-2 text-indigo-500" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange(setName)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <div className="relative">
                    <Building size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={brand}
                      onChange={handleInputChange(setBrand)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter brand name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={price}
                      onChange={handleInputChange(setPrice)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <div className="relative">
                    <Boxes size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={stock}
                      onChange={handleInputChange(setStock)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                      placeholder="Enter stock quantity"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Image URL
                </label>
                <div className="relative">
                  <ImageIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={displayImage}
                    onChange={handleInputChange(setDisplayImage)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <Tag size={20} className="mr-2 text-indigo-500" />
                Category
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Electronics",
                  "Gaming Accessories", 
                  "Fashion",
                  "Furniture",
                  "Kitchen Appliances",
                  "Home Decor",
                  "Outdoor"
                ].map((categoryOption) => (
                  <label key={categoryOption} className="flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-xl hover:border-indigo-300 cursor-pointer transition-colors duration-200">
                    <input
                      type="radio"
                      name="category"
                      value={categoryOption}
                      checked={category === categoryOption}
                      onChange={handleCategoryChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{categoryOption}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            {[
              { 
                title: "Available Colors", 
                icon: Palette, 
                items: color, 
                handleChange: handleColorChange,
                addField: addColorField,
                removeField: removeColorField,
                placeholder: "Add a color (e.g., Red, Blue)"
              },
              { 
                title: "Tags", 
                icon: Tag, 
                items: tags, 
                handleChange: handleTagChange,
                addField: addTagField,
                removeField: removeTagField,
                placeholder: "Add a tag (e.g., Popular, New)"
              },
              { 
                title: "About Details", 
                icon: Info, 
                items: about, 
                handleChange: handleAboutChange,
                addField: addAboutField,
                removeField: removeAboutField,
                placeholder: "Add product details"
              }
            ].map((field, fieldIndex) => (
              <div key={fieldIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <field.icon size={20} className="mr-2 text-indigo-500" />
                  {field.title}
                </h3>
                
                <div className="space-y-3">
                  {field.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => field.handleChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                        placeholder={field.placeholder}
                      />
                      {field.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => field.removeField(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={field.addField}
                    className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                  >
                    <Plus size={16} />
                    <span>Add {field.title.slice(0, -1)}</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-lg font-semibold">Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span className="text-lg font-semibold">Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAdminAuth(EditProductPage);