import { useState, useEffect } from 'react';
import './styles/Games.scss';

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createFormData, setCreateFormData] = useState({ name: '' });
  const [updateFormData, setUpdateFormData] = useState({ name: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/games');
    const data = await response.json();
    setGames(data);
    setLoading(false);
  };

  const importGames = async () => {
    setLoading(true);
    await fetch('http://localhost:3000/games', {
      method: 'POST',
    });
    fetchGames(); // Aktualisiert die Liste nach dem Import
  };

  const createGame = async () => {
    setLoading(true);
    await fetch('http://localhost:3000/games/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createFormData),
    });
    setCreateFormData({ name: '' });
    fetchGames(); // Aktualisiert die Liste nach dem Erstellen
  };

  const updateGame = async () => {
    setLoading(true);
    await fetch(`http://localhost:3000/games/${editId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFormData),
    });
    setUpdateFormData({ name: '' });
    setEditMode(false);
    setEditId(null);
    // Liste bleibt mit den Spielen gefüllt nach aktualisieren
    fetchGames();
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    createGame();
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateGame();
  };

  const handleEdit = (game) => {
    setUpdateFormData({ name: game.name, slug: game.slug });
    setEditMode(true);
    setEditId(game._id);
  };

  const deleteGame = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:3000/games/${id}`, {
      method: 'DELETE',
    });
    fetchGames(); // Aktualisiert die Liste nach dem Löschen
  };

  return (
    <div>
      <h1>Games List</h1>
      <button className="import-btn" onClick={importGames}>
        Import Games
      </button>
      {loading && <p>Loading...</p>}

      <div className="form-container">
        <form onSubmit={handleCreateSubmit}>
          <h2>Create Game</h2>
          <input
            type="text"
            placeholder="Name"
            value={createFormData.name}
            onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
            required
          />

          <button type="submit">Create Game</button>
        </form>

        {editMode && (
          <form onSubmit={handleUpdateSubmit}>
            <h2>Update Game</h2>
            <input
              type="text"
              placeholder="Name"
              value={updateFormData.name}
              onChange={(e) => setUpdateFormData({ ...updateFormData, name: e.target.value })}
              required
            />

            <button type="submit">Update Game</button>
          </form>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game.name}</td>
              <td>
                <button onClick={() => handleEdit(game)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteGame(game._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Games;
