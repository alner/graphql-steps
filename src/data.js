const TAGS_INFO_DATA = {
  "123": [
    {
      name: "TAG1"
    },
    {
      name: "TAG2"
    }
  ],

  "321": [
    {
      name: "MY CUSTOM TAG"
    }
  ]
};

const INFO_DATA = {
  "123": {
    id: "123",
    kind: 1,
    description: "Info request 1"
  },

  "321": {
    id: "321",
    kind: 2,
    description: "Info request 2"
  }
};

// Emaulate request for INFO API
module.exports.getInfoById = id => INFO_DATA[id];

// Emulate request for TAGS API
module.exports.getTagsFor = info => TAGS_INFO_DATA[info.id];
