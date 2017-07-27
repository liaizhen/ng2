import { CccPage } from './app.po';

describe('ccc App', () => {
  let page: CccPage;

  beforeEach(() => {
    page = new CccPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
