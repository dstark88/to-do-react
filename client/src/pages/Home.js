import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Trail from "../components/Trail";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Home extends Component {
  state = {
    trails: [],
    q: "",
    message: "Search For A Trail To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getTrails = () => {
    API.getTrails(this.state.q)
      .then(res =>
        this.setState({
          trails: res.data
        })
      )
      .catch(() =>
        this.setState({
          trails: [],
          message: "No New Trails Found, Try a Different Query"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getTrails();
  };

  handleTrailSave = id => {
    const trail = this.state.trails.find(trail => trail.id === id);

    API.saveTrail({
      mtnBikeProjectId: trail.id,
      title: trail.volumeInfo.title,
      subtitle: trail.volumeInfo.subtitle,
      link: trail.volumeInfo.infoLink,
      authors: trail.volumeInfo.authors,
      description: trail.volumeInfo.description,
      image: trail.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getTrails());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Mtn Bike Project Trails Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Trails of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Trail Search" icon="far fa-trail">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.trails.length ? (
                <List>
                  {this.state.trails.map(trail => (
                    <trail
                      key={trail.id}
                      title={trail.volumeInfo.title}
                      subtitle={trail.volumeInfo.subtitle}
                      link={trail.volumeInfo.infoLink}
                      authors={trail.volumeInfo.authors.join(", ")}
                      description={trail.volumeInfo.description}
                      image={trail.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleTrailSave(trail.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
