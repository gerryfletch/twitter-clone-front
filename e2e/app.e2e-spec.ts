import { TwitterFrontPage } from './app.po';

describe('twitter-front App', () => {
  let page: TwitterFrontPage;

  beforeEach(() => {
    page = new TwitterFrontPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
