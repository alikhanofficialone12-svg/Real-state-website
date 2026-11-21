import { getProperties, getPropertyById, addProperty, updateProperty, deleteProperty } from "./db";

export const propertyService = {
  // Fetch all properties with optional filters
  fetchProperties: async (filters = {}) => {
    const result = await getProperties(filters);
    if (!result.success) {
      console.error("Error fetching properties:", result.error);
      return [];
    }
    return result.data || [];
  },

  // Fetch single property by ID
  fetchPropertyById: async (propertyId) => {
    const result = await getPropertyById(propertyId);
    if (!result.success) {
      console.error("Error fetching property:", result.error);
      return null;
    }
    return result.data;
  },

  // Create new property
  createProperty: async (propertyData) => {
    const result = await addProperty(propertyData);
    if (!result.success) {
      console.error("Error creating property:", result.error);
      return null;
    }
    return result.id;
  },

  // Update property
  updatePropertyData: async (propertyId, propertyData) => {
    const result = await updateProperty(propertyId, propertyData);
    if (!result.success) {
      console.error("Error updating property:", result.error);
      return false;
    }
    return true;
  },

  // Delete property
  deletePropertyData: async (propertyId) => {
    const result = await deleteProperty(propertyId);
    if (!result.success) {
      console.error("Error deleting property:", result.error);
      return false;
    }
    return true;
  }
};
