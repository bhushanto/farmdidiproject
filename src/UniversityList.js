import React, { Component } from 'react';

class UniversityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      universities: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchUniversities();
  }

  fetchUniversities = async () => {
    try {
      const response = await fetch(
        'http://universities.hipolabs.com/search?country=India'
      );
      const universities = await response.json();
      this.setState({ universities });
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  handleFavorite = (university) => {
    const { favorites } = this.state;
    const index = favorites.findIndex((fav) => fav.name === university.name);

    if (index === -1) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, university],
      }));
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      this.setState({ favorites: updatedFavorites });
    }
  };

  handleRemoveFavorite = (university) => {
    const { favorites } = this.state;
    const updatedFavorites = favorites.filter(
      (fav) => fav.name !== university.name
    );
    this.setState({ favorites: updatedFavorites });
  };

  render() {
    const { universities, favorites } = this.state;

    return (
      <div>
        <h1>University List</h1>
        <table>
          <thead>
            <tr>
              <th>University Name</th>
              <th>University Web Page</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.name}>
                <td>{university.name}</td>
                <td>{university.web_pages[0]}</td>
                <td>
                  <button
                    onClick={() => this.handleFavorite(university)}
                    className={
                      favorites.find((fav) => fav.name === university.name)
                        ? 'favorite'
                        : ''
                    }
                  >
                    Favorite
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Favorites</h1>
        <table>
          <thead>
            <tr>
              <th>University Name</th>
              <th>University Web Page</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((favorite) => (
              <tr key={favorite.name}>
                <td>{favorite.name}</td>
                <td>{favorite.web_pages[0]}</td>
                <td>
                  <button
                    onClick={() => this.handleRemoveFavorite(favorite)}
                    className="remove-favorite"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UniversityList;
