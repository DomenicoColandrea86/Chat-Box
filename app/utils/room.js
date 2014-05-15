
// Define Room function
function Room(name, id, owner) {
  this.name = name;
  this.id = id;
  this.owner = owner;
  this.people = [];
  this.status = "available";
};

// create Room prototype
Room.prototype.addPerson = function(personID) {
  if (this.status === "available") {
    this.people.push(personID);
  }
};

// exports Room module
module.exports = Room;