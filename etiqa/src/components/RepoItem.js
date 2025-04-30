import React from 'react';

const RepoItem = ({ repo }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img
            src={repo.owner.avatar_url}
            alt="avatar"
            className="rounded-circle me-3"
            width="50"
            height="50"
          />
          <div>
            <h5 className="mb-0">{repo.name}</h5>
            <small className="text-muted">by {repo.owner.login}</small>
          </div>
        </div>
        <p>{repo.description || 'No description provided.'}</p>
        <div className="text-end">
          <span className="badge bg-primary">★ {repo.stargazers_count}</span>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
