const express = require('express');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin express
app.use(cors());

mongoose.connect('mongodb://prateek76:prateek76@ds157667.mlab.com:57667/graphql-learn', { useNewUrlParser: true },{
	reconnectTries: 86400	//this will rety connection all day long
  })
mongoose.connection.once('open',() => {
	console.log("connected to database");
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000,() => {
	console.log("listening on port 4000");
})
