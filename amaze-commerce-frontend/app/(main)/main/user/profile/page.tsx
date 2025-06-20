"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import withAuth from "@/lib/hoc/withAuth";
import { getUser } from "@/lib/user";
import { useCallback, useEffect, useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Package, 
  Calendar,
  DollarSign,
  Truck,
  Home,
  Globe,
  Hash
} from "lucide-react";

interface UserProfileType {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  country: string;
  postalCode: string;
  role: 'admin' | 'user';
  orders?: any[];
}

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    shippingAddress: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const { user } = useAuth();

  const fetchUserData = useCallback(async () => {
    if (user?._id) {
      try {
        setLoading(true);
        const res = await getUser(user._id);
        setUserProfile(res.data.data);
        // Initialize edit form with current data
        setEditForm({
          name: res.data.data.name || "",
          phone: res.data.data.phone || "",
          shippingAddress: res.data.data.shippingAddress || "",
          city: res.data.data.city || "",
          country: res.data.data.country || "",
          postalCode: res.data.data.postalCode || ""
        });
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    setEditForm({
      name: userProfile?.name || "",
      phone: userProfile?.phone || "",
      shippingAddress: userProfile?.shippingAddress || "",
      city: userProfile?.city || "",
      country: userProfile?.country || "",
      postalCode: userProfile?.postalCode || ""
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Here you would call your update user API
      // const updatedUser = await updateUser(user._id, editForm);
      
      // For now, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setUserProfile((prev: UserProfileType | null) => prev ? { ...prev, ...editForm } : null);
      setIsEditing(false);
      
      // Show success message (you can add a toast notification here)
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          <p className="text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {userProfile ? (
          <div className="space-y-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <User size={48} className="text-white" />
                    </div>
                    <div className="text-white">
                      <h2 className="text-3xl font-bold mb-2">{userProfile.name}</h2>
                      <p className="text-indigo-100 flex items-center">
                        <Mail size={18} className="mr-2" />
                        {userProfile.email}
                      </p>
                      <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        <span className="text-sm font-medium capitalize">{userProfile.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={isEditing ? handleCancel : handleEdit}
                    className="flex items-center space-x-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white hover:bg-white/30 transition-all duration-200 hover:scale-105"
                  >
                    {isEditing ? (
                      <>
                        <X size={20} />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit3 size={20} />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <User size={20} className="mr-2 text-indigo-500" />
                      Personal Information
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                            {userProfile.name}
                          </div>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center">
                            <Phone size={18} className="mr-2 text-gray-500" />
                            {userProfile.phone}
                          </div>
                        )}
                      </div>

                      {/* Email (Read-only) */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 flex items-center">
                          <Mail size={18} className="mr-2 text-gray-400" />
                          {userProfile.email}
                          <span className="ml-auto text-xs text-gray-500">Read-only</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Home size={20} className="mr-2 text-indigo-500" />
                      Shipping Address
                    </h3>
                    
                    <div className="space-y-4">
                      {/* Shipping Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        {isEditing ? (
                          <textarea
                            value={editForm.shippingAddress}
                            onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200 resize-none"
                            placeholder="Enter your full address"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 min-h-[80px] flex items-center">
                            <MapPin size={18} className="mr-2 text-gray-500 flex-shrink-0" />
                            <span>{userProfile.shippingAddress || "No address provided"}</span>
                          </div>
                        )}
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                            placeholder="Enter your city"
                          />
                        ) : (
                          <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">
                            {userProfile.city || "Not specified"}
                          </div>
                        )}
                      </div>

                      {/* Country and Postal Code */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                              placeholder="Enter country"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center">
                              <Globe size={16} className="mr-2 text-gray-500" />
                              {userProfile.country || "Not specified"}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Postal Code
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.postalCode}
                              onChange={(e) => handleInputChange('postalCode', e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                              placeholder="Enter postal code"
                            />
                          ) : (
                            <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 flex items-center">
                              <Hash size={16} className="mr-2 text-gray-500" />
                              {userProfile.postalCode || "Not specified"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="button-gradient flex items-center space-x-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Order History Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Package size={24} className="mr-3 text-indigo-500" />
                Order History
              </h2>
              
              {userProfile?.orders && userProfile.orders.length > 0 ? (
                <div className="space-y-4">
                  {userProfile.orders.map((order: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Order #{order.id}
                            </h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' 
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'shipped' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <DollarSign size={16} className="mr-2 text-green-500" />
                              <span className="font-medium">${order.total}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-2 text-blue-500" />
                              <span>{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Truck size={16} className="mr-2 text-indigo-500" />
                              <span className="capitalize">{order.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0">
                          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors duration-200">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                  <p className="text-gray-600 mb-6">Start shopping to see your order history here</p>
                  <button className="button-gradient">
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Unable to load profile data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(UserProfile);