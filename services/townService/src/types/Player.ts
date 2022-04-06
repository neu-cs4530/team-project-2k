import { nanoid } from 'nanoid';
import { SpotifyWebApi } from 'spotify-web-api-ts';
import { ServerConversationArea } from '../client/TownsServiceClient';
import { UserLocation } from '../CoveyTypes';

/**
 * Each user who is connected to a town is represented by a Player object
 */
export default class Player {
  /** The current location of this user in the world map * */
  public location: UserLocation;

  /** The unique identifier for this player * */
  private readonly _id: string;

  /** The player's username, which is not guaranteed to be unique within the town * */
  private readonly _userName: string;

  /** The player's currently playing song, which is not guaranteed to exist * */
  private _currentSong?: string;

  /** The player's selected playlist, which is not guaranteed to exist * */
  private _selectedPlaylist?: string;

  /** The player's spotify username, wihch only exists if player -> associated with spotify * */
  private _spotifyUsername? = 'testing';

  /** The current ConversationArea that the player is in, or undefined if they are not located within one */
  private _activeConversationArea?: ServerConversationArea;

  /** Spotify AUTH Token for the current player that is joining */
  private _spotifyToken: string | null;

  private _tempApi: SpotifyWebApi | null;

  constructor(userName: string, spotifyToken?: string | null) {
    this.location = {
      x: 0,
      y: 0,
      moving: false,
      rotation: 'front',
    };
    this._userName = userName;
    
    this._spotifyToken = spotifyToken || null;
    this._id = nanoid();

    if (spotifyToken) {
      this._tempApi = new SpotifyWebApi({
        accessToken: spotifyToken,
      });
    } else {
      this._tempApi = null;
    }
  }

  async setSpotifyUsername(): Promise<void> {
    if (this._tempApi) {
      this._spotifyUsername = (await this._tempApi.users.getMe()).id;
    }
  }


  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get currentSong(): string | undefined {
    return this._currentSong;
  }

  set currentSong(song: string | undefined) {
    this._currentSong = song;
  }

  get selectedPlaylist(): string | undefined {
    return this._selectedPlaylist;
  }

  set selectedPlaylist(selectedPlaylist: string | undefined) {
    this._selectedPlaylist = selectedPlaylist;
  }

  get spotifyUsername(): string | undefined {
    return this._spotifyUsername;
  }

  set spotifyUsername(userName: string | undefined) {
    this._spotifyUsername = userName;
  }

  get activeConversationArea(): ServerConversationArea | undefined {
    return this._activeConversationArea;
  }

  set activeConversationArea(conversationArea: ServerConversationArea | undefined) {
    this._activeConversationArea = conversationArea;
  }

  /**
   * Checks to see if a player's location is within the specified conversation area
   * 
   * This method is resilient to floating point errors that could arise if any of the coordinates of
   * `this.location` are dramatically smaller than those of the conversation area's bounding box.
   * @param conversation 
   * @returns 
   */
  isWithin(conversation: ServerConversationArea) : boolean {
    return (
      this.location.x > conversation.boundingBox.x - conversation.boundingBox.width / 2 &&
      this.location.x < conversation.boundingBox.x + conversation.boundingBox.width / 2 &&
      this.location.y > conversation.boundingBox.y - conversation.boundingBox.height / 2 &&
      this.location.y < conversation.boundingBox.y + conversation.boundingBox.height / 2
    );
  }

}

