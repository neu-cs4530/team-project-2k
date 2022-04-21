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
    testPlayer.spotifyUsername = 'spotted flamingo 2'
    expect(testPlayer.spotifyUsername).toBe('spotted flamingo 2');
  });
});