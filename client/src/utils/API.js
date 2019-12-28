import axios from "axios";

export default {
  // Gets trails from the Google API
  getTrails: function(q) {
    return axios.get("/api/mtnBikeProject", { params: { q: "title:" + q } });
  },
  // Gets all saved trails
  getSavedTrails: function() {
    return axios.get("/api/trails");
  },
  // Deletes the saved trail with the given id
  deleteTrail: function(id) {
    return axios.delete("/api/trails/" + id);
  },
  // Saves an trail to the database
  saveTrail: function(trailData) {
    return axios.post("/api/trails", trailData);
  }
};
