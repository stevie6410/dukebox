import { DukeboxPage } from './app.po';

describe('dukebox App', () => {
  let page: DukeboxPage;

  beforeEach(() => {
    page = new DukeboxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
