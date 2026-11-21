import { getArticles, getArticleById, addArticle, updateArticle, deleteArticle } from "../firebase/db";

export const articleService = {
  // Fetch all articles
  fetchArticles: async (limit = 10) => {
    const result = await getArticles(limit);
    if (!result.success) {
      console.error("Error fetching articles:", result.error);
      return [];
    }
    return result.data || [];
  },

  // Fetch single article by ID
  fetchArticleById: async (articleId) => {
    const result = await getArticleById(articleId);
    if (!result.success) {
      console.error("Error fetching article:", result.error);
      return null;
    }
    return result.data;
  },

  // Create new article
  createArticle: async (articleData) => {
    const result = await addArticle(articleData);
    if (!result.success) {
      console.error("Error creating article:", result.error);
      return null;
    }
    return result.id;
  },

  // Update article
  updateArticleData: async (articleId, articleData) => {
    const result = await updateArticle(articleId, articleData);
    if (!result.success) {
      console.error("Error updating article:", result.error);
      return false;
    }
    return true;
  },

  // Delete article
  deleteArticleData: async (articleId) => {
    const result = await deleteArticle(articleId);
    if (!result.success) {
      console.error("Error deleting article:", result.error);
      return false;
    }
    return true;
  }
};
