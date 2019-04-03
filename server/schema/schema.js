const graphql = require('graphql');
const _ = require("lodash");

const { 
        GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt 
    } = graphql;

//data

var books = [
    {name: "book1", genre:"genre1",id:'1'},
    {name: "book2", genre:"genre2",id:'2'},
    {name: "book3", genre:"genre3",id:'3'}
];

var authors = [
    {name: "author1", age:"21",id:'1'},
    {name: "author2", age:"32",id:'2'},
    {name: "author3", age:"33",id:'3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                //code to get data from DB
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args) {
                //code to get data from DB
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});