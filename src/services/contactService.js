import { submitContactForm, getContactForms, updateContactStatus } from "../firebase/db";

export const contactService = {
  // Submit contact form
  submitForm: async (formData) => {
    if (!formData.name || !formData.email) {
      return { success: false, error: "Name and email are required" };
    }

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      subject: formData.subject || "",
      message: formData.message || "",
      companySize: formData.companySize || ""
    });

    if (!result.success) {
      console.error("Error submitting contact form:", result.error);
      return { success: false, error: result.error };
    }

    return { success: true, id: result.id };
  },

  // Fetch all contact forms (admin use)
  fetchContactForms: async () => {
    const result = await getContactForms();
    if (!result.success) {
      console.error("Error fetching contact forms:", result.error);
      return [];
    }
    return result.data || [];
  },

  // Update contact form status (admin use)
  updateStatus: async (contactId, status) => {
    const result = await updateContactStatus(contactId, status);
    if (!result.success) {
      console.error("Error updating contact status:", result.error);
      return false;
    }
    return true;
  }
};
