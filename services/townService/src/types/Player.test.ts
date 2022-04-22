import Player from './Player';

describe('Player', () => {
  it('should initialize with appropriate fields', () => {
    const testPlayer = new Player('test');
    expect(testPlayer.location).toBeTruthy();
    expect(testPlayer.userName).toBe('test');
    expect(testPlayer.activeConversationArea).toBe(undefined);
    expect(testPlayer.currentSong).toBe(undefined);
    expect(testPlayer.selectedPlaylist).toBe(undefined);
    expect(testPlayer.spotifyUsername).toBe(undefined);
  });
  it('should set fields with appropriate values via setter functions', () => {
    const testPlayer = new Player('test');
    testPlayer.currentSong = 'This World is On Fire By Alicia KEYS';
    expect(testPlayer.currentSong).toBe('This World is On Fire By Alicia KEYS');
    testPlayer.selectedPlaylist = 'test - Pavan';
    expect(testPlayer.selectedPlaylist).toBe('test - Pavan');
    testPlayer.spotifyUsername = 'spotted flamingo 2';
    expect(testPlayer.spotifyUsername).toBe('spotted flamingo 2');
  });
  it('should set Spotify related fields when given a valid Spotify token', async () => {
    const testPlayer = new Player('foo', 'valid-token');
    jest.spyOn(testPlayer, 'loadData').mockImplementation(async () => {
      if (testPlayer.spotifyApi) {
        testPlayer.currentSong = 'Party in the USA';
        testPlayer.selectedPlaylist = 'Throwbacks';
        testPlayer.spotifyUsername = 'MileyCyrusLover';
      }
    });

    expect(testPlayer.currentSong).toBe(undefined);
    expect(testPlayer.selectedPlaylist).toBe(undefined);
    expect(testPlayer.spotifyUsername).toBe(undefined);

    await testPlayer.loadData();

    expect(testPlayer.currentSong).toBe('Party in the USA');
    expect(testPlayer.selectedPlaylist).toBe('Throwbacks');
    expect(testPlayer.spotifyUsername).toBe('MileyCyrusLover');
  });
  it('should not set Spotify related fields missing a valid Spotify token', async () => {
    const testPlayer = new Player('foo', null);
    jest.spyOn(testPlayer, 'loadData').mockImplementation(async () => {
      if (testPlayer.spotifyApi) {
        testPlayer.currentSong = 'Party in the USA';
        testPlayer.selectedPlaylist = 'Throwbacks';
        testPlayer.spotifyUsername = 'MileyCyrusLover';
      }
    });

    expect(testPlayer.currentSong).toBe(undefined);
    expect(testPlayer.selectedPlaylist).toBe(undefined);
    expect(testPlayer.spotifyUsername).toBe(undefined);

    await testPlayer.loadData();

    expect(testPlayer.currentSong).toBe(undefined);
    expect(testPlayer.selectedPlaylist).toBe(undefined);
    expect(testPlayer.spotifyUsername).toBe(undefined);
  });
});
