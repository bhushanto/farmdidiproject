import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

class UniversityList1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          universities: [],
          favorites: [],
        };
      }
    
      componentDidMount() {
        this.fetchUniversities();
        this.fetchFavorites();
      }

      componentDidUpdate(){
        this.fetchFavorites();
      }
    
      fetchUniversities() {
        axios
          .get('http://universities.hipolabs.com/search?country=India')
          .then((response) => {
            console.log(response.data);
            this.setState({ universities: response.data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    
      handleFavoriteClick(university) {

        console.log(university);
        let obj={
          "name":university.name,
          "web_pages":university.web_pages[0]
        }
        axios
          .post('http://localhost:8080', obj)
          .catch((error) => {
            console.log(error);
          });
          this.fetchFavorites();
      }

      fetchFavorites() {
        axios
          .get('http://localhost:8080')
          .then((response) => {

            console.log(response.data)

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
        const { universities, favorites } = this.state;
        
    
        return (
            <div>
            <h2>University List</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Website</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {universities.map((university) => (
                  <tr key={university.name}>
                    <td>{university.name}</td>
                    <td>{university.web_pages}</td>
                    
                    
                    <td>
                      <button onClick={() => this.handleFavoriteClick(university)}>
                        Favorite
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


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
                <td>{university.web_pages}</td>
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

          </div>



        );
      }
}

export default UniversityList1;
