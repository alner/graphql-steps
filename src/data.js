const data = {
  "123": {
    id: "123",
    kind: 1,
    description: "Info request 1",
    tags: [
      {
        name: "TAG1"
      },
      {
        name: "TAG2"
      }
    ]
  },

  "321": {
    id: "321",
    kind: 2,
    description: "Info request 2",
    tags: [
      {
        name: "MY CUSTOM TAG"
      }
    ]
  }
};

module.exports.getInfoById = id => data[id];
