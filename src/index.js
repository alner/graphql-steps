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
  GraphQLList
} = require("graphql");

const { getInfoById, getAllInfo, getTagsFor } = require("./data");

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
  })
});

const query = `{
  info(id: "321") {
    id
    kind
    description
    tags {
      name
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

graphql(schema, query2).then(response =>
  console.log(JSON.stringify(response, null, 2))
);
