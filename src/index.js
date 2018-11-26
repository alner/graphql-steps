/* 
  Based on:
  https://github.com/graphql/graphql-js

  See more examples:
  https://github.com/graphql/graphql-js/blob/master/src/__tests__/starWarsSchema.js

*/

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLEnumType,
  GraphQLList,
  GraphQLInterfaceType
} = require("graphql");

const { getInfoById, getAllInfo, getTagsFor, getEvents } = require("./data");

const KindEnum = new GraphQLEnumType({
  name: "Kind",
  description: "Info kind enum",
  values: {
    REQUEST: {
      value: 1,
      description: "Info request"
    },
    RESPONSE: {
      value: 2,
      description: "Response info response"
    }
  }
});

const TagType = new GraphQLObjectType({
  name: "Tag",
  description: "Tag for info",
  fields: () => ({
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: "Tag name"
    }
  })
});

const EventInterface = new GraphQLInterfaceType({
  name: "EventInterface",
  fields: () => ({
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Event title"
    }
  }),
  resolveType(event) {
    console.log("Event type: ", event);
    if (event.type == "Webinar") return WebinarType;
    else if (event.type == "Conference") return ConferenceType;
  }
});

const WebinarType = new GraphQLObjectType({
  name: "Webinar",
  fields: () => ({
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Webinar title"
    },
    url: {
      type: GraphQLNonNull(GraphQLString),
      description: "Webinar url"
    }
  }),
  interfaces: [EventInterface]
});

const ConferenceType = new GraphQLObjectType({
  name: "Conference",
  fields: () => ({
    title: {
      type: GraphQLNonNull(GraphQLString),
      description: "Conference title"
    },
    location: {
      type: GraphQLNonNull(GraphQLString),
      description: "Conference location"
    }
  }),
  interfaces: [EventInterface]
});

const InfoType = new GraphQLObjectType({
  name: "Info",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "Info id"
    },
    kind: {
      type: KindEnum,
      description: "Info kind"
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
      description: "Info description"
    },
    tags: {
      type: GraphQLList(TagType),
      description: "Tags for info",
      resolve: info => getTagsFor(info)
    },
    events: {
      type: GraphQLList(EventInterface),
      description: "Events list",
      resolve: info => getEvents(info)
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      info: {
        type: InfoType,
        args: {
          id: {
            type: GraphQLID,
            description: "Info id parameter"
          }
        },
        resolve(root, args) {
          console.log("Args: ", args);
          return getInfoById(args.id);
        }
      },

      allInfo: {
        type: GraphQLList(InfoType),
        resolve(root, args, info) {
          return getAllInfo();
        }
      }
    }
  }),
  types: [WebinarType, ConferenceType]
});

const query = `{
  info(id: "123") {
    id
    kind
    description
    tags {
      name
    }
    events {
      title
      ... on Webinar {
        url
      }
      ...on Conference {
        location
      }
    }
  }
}`;

const query2 = `{
  allInfo {
    id
    kind
    description
    tags {
      name
    }
  }
}`;

graphql(schema, query).then(response =>
  console.log(JSON.stringify(response, null, 2))
);
