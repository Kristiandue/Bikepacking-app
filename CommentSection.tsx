import React, { useEffect, useState } from 'react';

type Comment = {
  id: string;
  name: string;
  text: string;
  createdAt: string;
};

const STORAGE_KEY = 'bikepacking_comments_v1';

function loadComments(): Comment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Comment[];
  } catch {
    return [];
  }
}

function saveComments(comments: Comment[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  } catch {
    // ignore storage errors
  }
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(() => loadComments());
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    saveComments(comments);
  }, [comments]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    const c: Comment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      name: name.trim() || 'Anonymous',
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    setComments(prev => [c, ...prev]);
    setText('');
  }

  function handleDelete(id: string) {
    setComments(prev => prev.filter(c => c.id !== id));
  }

  return (
    <section className="comment-section container mt-4">
      <h2>Comments</h2>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Write a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
        />

        <button type="submit" className="btn btn-primary">Post comment</button>
      </form>

      <ul className="comment-list list-unstyled mt-3">
        {comments.length === 0 && <li className="text-muted">No comments yet.</li>}
        {comments.map(c => (
          <li key={c.id} className="comment-item card mb-2">
            <article className="card-body">
              <header className="d-flex justify-content-between align-items-start">
                <div>
                  <strong>{c.name}</strong>
                  <time className="text-muted small d-block" dateTime={c.createdAt}>{new Date(c.createdAt).toLocaleString()}</time>
                </div>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </header>
              <p className="card-text mt-2" style={{ whiteSpace: 'pre-wrap' }}>{c.text}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
