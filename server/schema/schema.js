const graphql = require('graphql');
const _ = require("lodash");

const { 
        GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList 
    } = graphql;

//data

var books = [
    {name: "book1", genre:"genre1",id:'1', authorId: '1'},
    {name: "book2", genre:"genre2",id:'2', authorId: '2'},
    {name: "book3", genre:"genre3",id:'3', authorId: '3'},
    {name: "book4", genre:"genre4",id:'4', authorId: '2'},
    {name: "book5", genre:"genre5",id:'5', authorId: '2'},
    {name: "book6", genre:"genre6",id:'6', authorId: '3'}
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
        genre: { type: GraphQLString },
        author: {
            type: AuthorType, resolve(parent, args) {
                console.log(parent);
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {
                    authorId: parent.id
                })
            }
        }
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