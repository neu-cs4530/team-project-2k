export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  public textbox?: Phaser.GameObjects.Text;
  
  private readonly _currentSong: string;

  private readonly _selectedPlaylist: string;

  private readonly _spotifyUsername: string;

  constructor(id: string, userName: string, location: UserLocation, currentSong: string, selectedPlaylist: string, spotifyUsername: string) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._currentSong = currentSong;
    this._selectedPlaylist = selectedPlaylist;
    this._spotifyUsername = spotifyUsername;
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

  get selectedPlaylist(): string {
    return this._selectedPlaylist;
  }

  get spotifyUsername(): string {
    return this._spotifyUsername;
  }


  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location, 
      playerFromServer._currentSong, playerFromServer._selectedPlaylist, playerFromServer._spotifyUsername);
  }
}
export type ServerPlayer = { _id: string, 
                              _userName: string,
                              location: UserLocation, 
                              _currentSong: string,
                              _selectedPlaylist: string,
                              _spotifyUsername: string };

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
  selectedPlaylist: string;
  spotifyUsername: string;
}