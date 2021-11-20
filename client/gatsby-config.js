module.exports = {
  plugins: [
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'http://localhost:4000'
      }
    }
  ]
};
