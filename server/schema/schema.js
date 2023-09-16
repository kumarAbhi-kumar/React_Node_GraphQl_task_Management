// const { projects, clients } = require('../sampleData.js')
// Mongoose Models
const Project = require('../models/Project')
const Client = require('../models/Client')

const { GraphQLObjectType,
     GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList  
} = require('graphql')

// Client Type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString } 
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return clients.findById(parent.clientId);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            },
        },
        project: {
            type: ProjectType, 
            args: { id: { type: GraphQLID }}, 
            resolve(parent, args){
                return Project.findById(args.id);
                // Later on we would use the mongoogse function here
                // Here for now, we are calling the find() which 
                // loops through the client array and finds where (client.id == args.id)
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            },
        },
        client: {
            type: ClientType, 
            args: { id: { type: GraphQLID }}, 
            resolve(parent, args){
                return Client.findById(args.id);
                // Later on we would use the mongoogse function here
                // Here for now, we are calling the find() which 
                // loops through the client array and finds where (client.id == args.id)
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
})