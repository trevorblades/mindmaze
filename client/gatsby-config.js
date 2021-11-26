require('dotenv').config();
const {API_URL} = process.env;
module.exports = {
  plugins: [
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: API_URL
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'MindMaze',
        fieldName: 'mindmaze',
        url: API_URL
      }
    }
  ]
};
