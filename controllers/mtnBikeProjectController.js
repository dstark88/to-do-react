const axios = require("axios");
const db = require("../models");

// Defining methods for the mtnBikeProjectController

// findAll searches the Google Trails API and returns only the entries we haven't already saved

// It also makes sure that the trails returned from the API all contain a title, author, link, description, and image
module.exports = {
  findAll: function(req, res) {
    const { query: params } = req;
    axios
      .get("https://www.mtnBikeProjectapis.com/trails/v1/volumes", {
        params
      })
      .then(results =>
        results.data.items.filter(
          result =>
            result.volumeInfo.title &&
            result.volumeInfo.infoLink &&
            result.volumeInfo.authors &&
            result.volumeInfo.description &&
            result.volumeInfo.imageLinks &&
            result.volumeInfo.imageLinks.thumbnail
        )
      )
      .then(apiTrails =>
        db.Trail.find().then(dbTrails =>
          apiTrails.filter(apiTrail =>
            dbTrails.every(dbTrail => dbTrail.mtnBikeProjectId.toString() !== apiTrail.id)
          )
        )
      )
      .then(trails => res.json(trails))
      .catch(err => res.status(422).json(err));
  }
};
