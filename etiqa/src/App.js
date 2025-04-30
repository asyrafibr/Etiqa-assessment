import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RepoItem from './components/RepoItem';
import { fetchRepositories, getTenDaysAgo } from './services/axios';

const App = () => {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const loadRepos = async (pageNum) => {
    setLoading(true);
    const created = getTenDaysAgo();
    const { items, totalCount } = await fetchRepositories(created, pageNum);

    setRepos(items);
    setPage(pageNum);
    localStorage.setItem('page', pageNum);

    const calculatedPages = Math.ceil(Math.min(totalCount, 1000) / 10); // GitHub caps results at 1000
    setTotalPages(calculatedPages);

    setLoading(false);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem('page');
    const initialPage = savedPage ? Number(savedPage) : 1;
    loadRepos(initialPage);
  }, []);

  const handlePageChange = (e) => {
    const selectedPage = Number(e.target.value);
    if (selectedPage !== page) {
      loadRepos(selectedPage);
    }
  };

  const renderPaginationDropdown = () => {
    const lastPage = Math.min(totalPages, 100); // Cap dropdown to 100 pages

    return (
      <div className="text-center my-4">
        <label className="me-2">Go to page:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={page}
          onChange={handlePageChange}
        >
          {[...Array(lastPage)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
               {i + 1}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Most Starred GitHub Repos (Last 10 Days)</h1>
      {repos.length > 0 && repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
      {loading && <div className="text-center my-4">Loading...</div>}
      {!loading && repos.length === 0 && (
        <div className="text-center my-4">
          <p>No repositories found.</p>
        </div>
      )}
      {!loading && renderPaginationDropdown()}
    </div>
  );
};

export default App;
