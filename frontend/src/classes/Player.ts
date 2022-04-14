export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  public spotifyUsernameText?: Phaser.GameObjects.Text;

  public playlistText?: Phaser.GameObjects.Text;

  public currentSongText?: Phaser.GameObjects.Text;
  
  private readonly _currentSong: string;

  private readonly _currentSongHref: string;

  private readonly _selectedPlaylist: string;

  private readonly _selectedPlaylistHref: string;

  private readonly _spotifyUsername: string;

  private readonly _spotifyUsernameHref: string;

  constructor(
    id: string,
    userName: string,
    location: UserLocation,
    currentSong: string,
    currentSongHref: string,
    selectedPlaylist: string,
    selectedPlaylistHref: string,
    spotifyUsername: string,
    spotifyUsernameHref: string,
    ) {
      this._id = id;
      this._userName = userName;
      this.location = location;
      this._currentSong = currentSong;
      this._currentSongHref = currentSongHref;
      this._selectedPlaylist = selectedPlaylist;
      this._selectedPlaylistHref = selectedPlaylistHref;
      this._spotifyUsername = spotifyUsername;
      this._spotifyUsernameHref = spotifyUsernameHref;
    }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get currentSong(): string {
    return this._currentSong;
  }

  get currentSongHref(): string {
    return this._currentSongHref;
  }

  get selectedPlaylist(): string {
    return this._selectedPlaylist;
  }

  get selectedPlaylistHref(): string {
    return this._selectedPlaylistHref;
  }

  get spotifyUsername(): string {
    return this._spotifyUsername;
  }

  get spotifyUsernameHref(): string {
    return this._spotifyUsernameHref;
  }


  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location, 
      playerFromServer._currentSong, playerFromServer._currentSongHref,
      playerFromServer._selectedPlaylist, playerFromServer._selectedPlaylistHref,
      playerFromServer._spotifyUsername, playerFromServer._spotifyUsernameHref,
      );
  }
}
export type ServerPlayer = { _id: string, 
                              _userName: string,
                              location: UserLocation, 
                              _currentSong: string,
                              _currentSongHref: string,
                              _selectedPlaylist: string,
                              _selectedPlaylistHref: string,
                              _spotifyUsername: string,
                              _spotifyUsernameHref: string };

export type Direction = 'front'|'back'|'left'|'right';

export type UserLocation = {
  x: number,
  y: number,
  rotation: Direction,
  moving: boolean,
  conversationLabel?: string
};

export type SpotifyData = {
  currentSong: string;
  currentSongHref: string;
  selectedPlaylist: string;
  selectedPlaylistHref: string;
  spotifyUsername: string;
  spotifyUsernameHref: string;
}