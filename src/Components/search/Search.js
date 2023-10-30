import React, { Component } from "react";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

import "../../App.css";
class Search extends Component {
  state = {
    searchText: "",
    amount: 100,
    apiUrl: "https://pixabay.com/api/",
    apiKey: process.env.REACT_APP_PIXABAY_API_KEY,
    images: [],
    isLoading: false,
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val, isLoading: true }, () => {
      if (val === "") {
        this.setState({ images: [], isLoading: false });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then((res) =>
            this.setState({ images: res.data.hits, isLoading: false })
          )
          .catch((err) => {
            console.log(err);
            this.setState({ isLoading: false });
          });
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2%",
          color: "#fff",
        }}
      >
        <input
          type="text"
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          placeholder="Search For Images"
          className="search-input"
        />

        <br />

        <select
          name="amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>

        <br />

        {this.state.isLoading ? (
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            Loading...
          </div>
        ) : this.state.images.length > 0 ? (
          <div className="image-results">
            <ImageResults images={this.state.images} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Search;
