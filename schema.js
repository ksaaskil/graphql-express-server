const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  // GraphQLList,
  // GraphQLNonNull
} = require('graphql');

// Hardcoded data
const customers = [
  {
    id: '1', name: 'John Doe', age: 35, email: 'jdoe@gmail.com'
  },
  {
    id: '2', name: 'Steve Smith', age: 44, email: 'ssmith@gmail.com'
  },
  {
    id: '3', name: 'Sarah Williams', age: 25, email: 'swilliams@gmail.com'
  },
];

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve(parentValue, args) {
        const matches = customers.filter(customer => customer.id === args.id);
        return matches.length > 0 ? matches[0] : null;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
