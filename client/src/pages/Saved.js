import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Trail from "../components/Trail";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";

class Saved extends Component {
  state = {
    trails: []
  };

  componentDidMount() {
    this.getSavedTrails();
  }

  getSavedTrails = () => {
    API.getSavedTrails()
      .then(res =>
        this.setState({
          trails: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleTrailDelete = id => {
    API.deleteTrail(id).then(res => this.getSavedTrails());
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
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Trails" icon="download">
              {this.state.trails.length ? (
                <List>
                  {this.state.trails.map(trail => (
                    <Trail
                      key={trail._id}
                      title={trail.title}
                      subtitle={trail.subtitle}
                      link={trail.link}
                      authors={trail.authors.join(", ")}
                      description={trail.description}
                      image={trail.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleTrailDelete(trail._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Trails</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
