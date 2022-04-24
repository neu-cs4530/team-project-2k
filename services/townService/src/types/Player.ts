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

  /** The url of the player's currently playing song, which is not guaranteed to exist * */
  private _currentSongHref?: string;

  /** The player's selected playlist, which is not guaranteed to exist * */
  private _selectedPlaylist?: string;

  /** The url of the player's selected playlist, which is not guaranteed to exist * */
  private _selectedPlaylistHref?: string;

  /** The player's Spotify username, which only exists if player -> associated with spotify * */
  private _spotifyUsername?: string;

  /** The url of the player's Spotify user profileg, which is not guaranteed to exist * */
  private _spotifyUsernameHref?: string;

  /** The current ConversationArea that the player is in, or undefined if they are not located within one */
  private _activeConversationArea?: ServerConversationArea;

  /** Spotify AUTH Token for the current player that is joining */
  private _spotifyToken: string | null;

  private _spotifyApi: SpotifyWebApi | null;

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
      this._spotifyApi = new SpotifyWebApi({
        accessToken: spotifyToken,
      });
    } else {
      this._spotifyApi = null;
    }
  }

  public async loadData(): Promise<void> {
    if (this._spotifyApi) {
      const currentlyPlaying = await this._spotifyApi.player.getCurrentlyPlayingTrack();
      const userData = await this._spotifyApi.users.getMe();
      const playListData =  await this._spotifyApi.playlists.getMyPlaylists({ limit: 1 });

      if (typeof currentlyPlaying !== 'string') {
        this.currentSong = currentlyPlaying.item?.name;
        this.currentSongHref = currentlyPlaying.item?.external_urls?.spotify;
      } else {
        this.currentSong = undefined;
        this.currentSongHref = undefined;
      }
      this.spotifyUsername = userData.id;
      this.spotifyUsernameHref = userData.external_urls?.spotify;
      this.selectedPlaylist = playListData.items[0].name;
      this.selectedPlaylistHref = playListData.items[0].external_urls?.spotify;
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

  get currentSongHref(): string | undefined {
    return this._currentSongHref;
  }

  set currentSongHref(songHref: string | undefined) {
    this._currentSongHref = songHref;
  }

  get selectedPlaylist(): string | undefined {
    return this._selectedPlaylist;
  }

  set selectedPlaylist(selectedPlaylist: string | undefined) {
    this._selectedPlaylist = selectedPlaylist;
  }

  get selectedPlaylistHref(): string | undefined {
    return this._selectedPlaylistHref;
  }

  set selectedPlaylistHref(selectedPlaylistHref: string | undefined) {
    this._selectedPlaylistHref = selectedPlaylistHref;
  }

  get spotifyUsername(): string | undefined {
    return this._spotifyUsername;
  }

  set spotifyUsername(userName: string | undefined) {
    this._spotifyUsername = userName;
  }

  get spotifyUsernameHref(): string | undefined {
    return this._spotifyUsernameHref;
  }

  set spotifyUsernameHref(userNameHref: string | undefined) {
    this._spotifyUsernameHref = userNameHref;
  }

  get spotifyApi(): SpotifyWebApi | null {
    return this._spotifyApi;
  }

  set spotifyApi(spotifyApi: SpotifyWebApi | null) {
    this.spotifyApi = spotifyApi;
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
