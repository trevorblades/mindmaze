import {RESTDataSource} from 'apollo-datasource-rest';

export default class TrivaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://opentdb.com';
  }

  async getQuestions(params) {
    const response = await this.get('/api.php', params);
    console.log(params);
    return response.results;
  }

  async getCategories() {
    const response = await this.get('/api_category.php');
    return response.trivia_categories;
  }
}
