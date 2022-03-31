export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  // defines the players textbox
  public _textbox: Array<string>;

  constructor(id: string, userName: string, location: UserLocation, textbox: Array<string>) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._textbox = textbox;
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  // Gets the players textbox
  get textbox(): Array<string> {
    return this._textbox;
  }

  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location);
  }
}
export type ServerPlayer = { _id: string, _userName: string, location: UserLocation };

export type Direction = 'front'|'back'|'left'|'right';

export type UserLocation = {
  x: number,
  y: number,
  rotation: Direction,
  moving: boolean,
  conversationLabel?: string
};
