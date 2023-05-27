import React, { Component } from 'react';
import axios from 'axios';

class FavoriteUniversity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites() {
    axios
      .get('http://localhost:8080')
      .then((response) => {
        this.setState({ favorites: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUnfavoriteClick(university) {
    axios
      .delete(`http://localhost:8080/${university.id}`)
      .then(() => {
        this.fetchFavorites();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { favorites } = this.state;

    return (
      <div>
        <h2>Favorite Universities</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((university) => (
              <tr key={university.id}>
                <td>{university.name}</td>
                <td>{university.website}</td>
                <td>
                  <button
                    onClick={() => this.handleUnfavoriteClick(university)}
                  >
                    Unfavorite
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

export default FavoriteUniversity;
