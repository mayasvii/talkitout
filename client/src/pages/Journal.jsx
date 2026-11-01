import React, { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  BookOpenIcon,
  LockIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CalendarIcon,
  CheckIcon,
  CloseIcon,
  SparklesIcon,
  AlertIcon,
} from '../components/common/Icons';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Journal = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // New entry form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  // Edit entry state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [updating, setUpdating] = useState(false);

  // Delete loading state
  const [deletingId, setDeletingId] = useState(null);

  // Fetch entries on load
  const fetchEntries = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/journal');
      if (res && res.data) {
        setEntries(res.data);
      }
    } catch (err) {
      console.error('Failed to load journal entries:', err);
      setError('Could not retrieve your journal entries. Please make sure the server is connected.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle create new entry
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Please provide both a title and some thoughts to save.', 'warning');
      return;
    }

    setSaving(true);
    try {
      const res = await api.post('/journal', {
        title: title.trim(),
        content: content.trim(),
      });
      if (res && res.data) {
        setEntries([res.data, ...entries]);
        setTitle('');
        setContent('');
        showToast('Your private thoughts were safely stored 🌱', 'success');
      }
    } catch (err) {
      console.error('Error creating journal entry:', err);
      showToast(err.response?.data?.message || 'Could not save your entry. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Begin editing an entry
  const startEdit = (entry) => {
    setEditingId(entry._id);
    setEditTitle(entry.title);
    setEditContent(entry.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditContent('');
  };

  // Save updated entry
  const handleUpdate = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) {
      showToast('Title and content cannot be blank.', 'warning');
      return;
    }

    setUpdating(true);
    try {
      const res = await api.put(`/journal/${id}`, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      if (res && res.data) {
        setEntries(entries.map((item) => (item._id === id ? res.data : item)));
        cancelEdit();
        showToast('Journal entry updated successfully.', 'success');
      }
    } catch (err) {
      console.error('Error updating journal entry:', err);
      showToast(err.response?.data?.message || 'Failed to update entry.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/journal/${id}`);
      setEntries(entries.filter((item) => item._id !== id));
      showToast('Entry removed from your private journal.', 'info');
    } catch (err) {
      console.error('Error deleting entry:', err);
      showToast(err.response?.data?.message || 'Could not delete entry.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Helper date formatter
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="journal-page page-container">
      {/* 1. Page Header with Privacy Reassurance */}
      <div className="journal-header-card">
        <div className="journal-badge">
          <LockIcon size={16} />
          <span>Encrypted Student Sanctuary</span>
        </div>
        <h1 className="journal-title">My Private Journal</h1>
        <p className="journal-subtitle">
          Write freely without fear of judgment. Untangle racing thoughts, record small academic wins,
          or unload the stress of today.
        </p>
        <div className="journal-privacy-banner">
          <LockIcon size={16} />
          <span>
            <strong>Only you can see this.</strong> Your entries are tied strictly to your personal student
            account and cannot be viewed by counsellors, admins, or other students.
          </span>
        </div>
      </div>

      {/* 2. Compose New Entry Form */}
      <div className="journal-compose-card">
        <div className="compose-header">
          <BookOpenIcon size={20} className="compose-icon" />
          <h2 className="compose-title">Express Your Mind</h2>
        </div>

        <form onSubmit={handleCreate} className="compose-form">
          <div className="form-group">
            <label htmlFor="journal-title" className="form-label">
              Entry Title
            </label>
            <input
              id="journal-title"
              type="text"
              className="form-input"
              placeholder="e.g. Feeling lighter after project submissions, Late night reflections..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="journal-content" className="form-label">
              Your Thoughts
            </label>
            <textarea
              id="journal-content"
              rows={5}
              className="form-textarea"
              placeholder="What happened today? How did it make your mind and body feel? What is one thing you can let go of?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="compose-actions">
            <button
              type="submit"
              className="btn btn-accent"
              disabled={saving || !title.trim() || !content.trim()}
            >
              {saving ? (
                <span>Saving your thoughts...</span>
              ) : (
                <>
                  <PlusIcon size={18} />
                  <span>Save to Private Journal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 3. Previous Entries List */}
      <section className="journal-entries-section">
        <div className="section-title-row">
          <h2 className="dashboard-section-title">Past Reflections</h2>
          <span className="badge-pill">
            {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </span>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            <AlertIcon size={18} />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <LoadingSpinner message="Opening your private journal..." />
        ) : entries.length === 0 ? (
          <div className="journal-empty-card">
            <div className="journal-empty-icon">
              <BookOpenIcon size={36} />
            </div>
            <h3 className="empty-title">Your journal is waiting for its first entry</h3>
            <p className="empty-desc">
              Putting your thoughts into words activates the reasoning parts of your brain and naturally
              dissolves anxiety. Start with just a couple of sentences above.
            </p>
          </div>
        ) : (
          <div className="journal-entries-grid">
            {entries.map((entry) => {
              const isEditing = editingId === entry._id;

              return (
                <div key={entry._id} className="journal-entry-card">
                  {isEditing ? (
                    /* Inline Editing Mode */
                    <div className="journal-edit-mode">
                      <div className="form-group">
                        <label className="form-label">Edit Title</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          disabled={updating}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Edit Thoughts</label>
                        <textarea
                          rows={6}
                          className="form-textarea"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          disabled={updating}
                        />
                      </div>
                      <div className="edit-btn-row">
                        <button
                          type="button"
                          onClick={() => handleUpdate(entry._id)}
                          className="btn btn-primary btn-sm"
                          disabled={updating}
                        >
                          <CheckIcon size={16} />
                          <span>{updating ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="btn btn-ghost btn-sm"
                          disabled={updating}
                        >
                          <CloseIcon size={16} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Normal Display Mode */
                    <>
                      <div className="entry-card-header">
                        <div className="entry-date-badge">
                          <CalendarIcon size={14} />
                          <span>{formatDate(entry.createdAt)}</span>
                        </div>
                        <div className="entry-actions-row">
                          <button
                            onClick={() => startEdit(entry)}
                            className="entry-action-btn edit-action"
                            title="Edit this entry"
                            aria-label="Edit entry"
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="entry-action-btn delete-action"
                            title="Delete this entry"
                            aria-label="Delete entry"
                            disabled={deletingId === entry._id}
                          >
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </div>

                      <h3 className="entry-title">{entry.title}</h3>

                      <div className="entry-content">
                        {entry.content.split('\n').map((paragraph, i) =>
                          paragraph.trim() ? (
                            <p key={i} className="entry-paragraph">
                              {paragraph}
                            </p>
                          ) : (
                            <br key={i} />
                          )
                        )}
                      </div>

                      <div className="entry-card-footer">
                        <span className="entry-lock-notice">
                          <LockIcon size={12} />
                          <span>Private to you</span>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Journal;
