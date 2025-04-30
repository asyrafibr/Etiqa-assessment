import axios from 'axios';

const TOKEN = ''; // Optional: Add your GitHub token here to avoid rate limiting

export const getTenDaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 10);
  return date.toISOString().split('T')[0];
};

export const fetchRepositories = async (created, page = 1) => {
  try {
    const response = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: `created:>${created}`,
        sort: 'stars',
        order: 'desc',
        page,
        per_page: 10,
      },
      headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {},
    });

    return {
      items: response.data.items,
      totalCount: response.data.total_count,
    };
  } catch (error) {
    console.error(`Error fetching page ${page}:`, error.response?.data || error.message);
    return { items: [], totalCount: 0 };
  }
};
