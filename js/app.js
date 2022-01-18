var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'VIK_PLAYER';
const DURATION_STORAGE_KEY = 'VIK_DURATION';

const appContainers = Array.from($$('.content'));
const audio = $('#audio');
const authors = Array.from($$('.info-author'));
const cdThumbs = Array.from($$('.player__song-thumb .thumb-img'));
const durationTimes = Array.from($$('.durationtime'));
const playlistLists = Array.from($$('.playlist-box'));
const playAllBtns = $$('.btn-play-all');
const albumLists = Array.from($$('.album-box'));
const mvLists = Array.from($$('.mv-box'));
const artistLists = Array.from($$('.artist-box'));
const themeContainer = $('.theme__container');
const progress = Array.from($$('.progress'));
const progressBlocks = Array.from($$('.progress-block'));
const progressTracks = Array.from($$('.progress__track.song--track .progress__track-update'));

const playerPopUp = $('.player .player__popup');
const playerPopUpFooter = $('.player .player__popup .player__popup-footer');
const popUpSongName = $('.player__popup-cd-info h2');
const popUpSongAuthor = $('.player__popup-cd-info h3');
const popUpCdThumb = $('.player__popup-cd-display .player__popup-cd-img');
const popUpCdDisplay = $('.player__popup-cd-display');

const trackTimes = Array.from($$('.tracktime'));
const header = $('.header');
const headerNavTitles = $$('.tab-home .individual-title');
const navThemeBtn = $('.mask-cost .header__mask-icon');
const closeModalBtn = $('.modal__close-btn');
const modalTheme = $('.modal-theme');
const songLists = Array.from($$('.playlist__list'));
const player = $('.player');
const playerInfos = Array.from($$('.player__song-info'));
const settingBtn = $('.setting .header__nav-icon');
const settingMenu = $('.setting__menu');
const logOutBtn = $('.option-logout .option-logout-icon');
const logOutItem = $('.option__log-out');
const slideImgs = $$('.container__slide-item');
const sidebarMenuScroll = $('.menu-scroll')
const sidebarSubnavItems = Array.from($$('.menu-scroll .menu-item'))
const songAnimateTitles = Array.from($$('.name-song-animate'));
const individualItems = Array.from($$('.individual-user-item'));
const tabIndividuals = Array.from($$('.content-individual-containner'));
const nextBtns = Array.from($$('.btn-next'));
const prevBtns = Array.from($$('.btn-prev'));
const randomBtns = Array.from($$('.btn-random'));
const repeatBtns = Array.from($$('.btn-repeat'));
const volumes = Array.from($$('.volume__range'));
const volumeBtns = Array.from($$('.player__options-btn.volume.option-btn'))
const volumeTracks = Array.from($$('.progress__track.volume--track .progress__track-update'));
const volumeIcons = Array.from($$('.volume .btn--icon'));
const playlistScrollBtns = $$('.move-btn-playlist');
const albumScrollBtns = $$('.move-btn-album');
const mvScrollBtns = $$('.move-btn-mv');
const artistScrollBtns = $$('.move-btn-artist');
const App = $('.app');

const app = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isSeeking: false,
  isChangeVolume: false,
  scrollToRight: [true, true, true, true, true, true, true, true, true, true], //use when click move btn
  indexArray: [], //Use for random song
  currentIndex: 0,
  currentTheme: 0,
  currentPlaylist: 0,
  themeList: 0, //Theme list index (have > 1 lists)
  slideIndexs: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Index of Each tab  (playlist, album, mv, artist)
  slideSelectors: [
    '.tab-home .container__individual-playlist .playlist-box .playlist-item',
    '.tab-home .container__individual-albums .album-box .album-item',
    '.tab-home .container__individual-mv .mv-box .mv-item',
    '.tab-home .container__individual-artists .artist-box .artist-item',
    // '.tab--explore .radio--container .row__item.item--radio',
    // '.tab--explore .singer-slide--container .singer__slide-item',
    // '.tab--explore .new-playlist--container .row__item.item--new-playlist',
    // '.tab--explore .fav-artist--container .row__item.item--fav-artist',
    // '.tab--radio .radio--container .row__item.item--radio',
    // '.tab--following .singer-slide--container .singer__slide-item',
  ],
  songPlaylists: JSON.parse(localStorage.getItem(MUSIC_STORAGE_KEY) || '[]'),
  durationList: JSON.parse(localStorage.getItem(DURATION_STORAGE_KEY) || `[
    ["03:10","03:18","04:33","04:20","03:24","06:05","03:55","03:22","03:44","03:08","04:15","03:53","04:07","04:13","04:42","04:08","03:17","04:05","03:11","04:16","04:04"],
    ["04:02","02:57","03:21","14:50","03:57","04:21","04:45","03:06","04:46","05:02","04:24","04:27","08:26","04:48","03:01","03:25","04:24","03:19","03:43","03:34"],
    ["03:16","03:21","02:38","03:28","03:48","03:32","03:04","03:37","03:31","03:11","03:28","03:17","02:37","03:28","03:16","05:32"],
    ["03:25","04:45","03:14","04:15","02:54","02:51","02:01","04:28","03:23","04:04","02:45","03:57","03:21","02:28","02:34","04:03","03:56"]
  ]`),

  slideTitleWidth: 0, //Width of player title on footer
  themeLists: JSON.parse(localStorage.getItem(THEME_LIST_STORAGE_KEY) || '[]'), // List theme image to render to view
  themes: JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) || '[]'), //List theme to apply background
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY) || '{}'),
  playlists: JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY) || '[]'),
  albums: JSON.parse(localStorage.getItem(ALBUM_STORAGE_KEY) || '[]'),
  mvs: JSON.parse(localStorage.getItem(MV_STORAGE_KEY) || '[]'),
  artists: JSON.parse(localStorage.getItem(ARTIST_STORAGE_KEY) || '[]'),


  setConfig: function(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  html([first, ...string], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, string.shift())
        , [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')       
  },

  renderSong() {
    this.songs = this.songPlaylists[this.currentPlaylist]
    songLists.forEach((songList, songIndex) => {
      songList.innerHTML = app.html`${app.songs.map(function(song, index) {
        return app.html`
          <div class="playlist__list-song d-flex media ${app.currentIndex === index ? 'active' : ''}" data-index="${index}">
            <div class="playlist__song-info d-flex media__left">
                ${songIndex === 1 && app.html`
                  <div class="playlist__song-check">
                    <input type="checkbox" name="" id="playlist__check-${index}" class="mr-10" style="display: none">
                    <label for="playlist__check-${index}"></label>
                  </div>
                  <i class="bi bi-music-note-beamed mr-10"></i>
                `}
                <div class="playlist__song-thumb media__thumb me-10" style="background: url('${song.image}') no-repeat center center / cover">
                    <div class="thumb--animate">
                        <div class="thumb--animate-img" style="background: url('img/SongActiveAnimation/icon-playing.gif') no-repeat 50% / cover">
                        </div>
                    </div>
                    <div class="play-song--actions h-100">
                        <div class="control-btn btn-toggle-play m-auto flex btn--play-song">
                            <i class="bi bi-play-fill"></i>
                        </div>
                    </div>
                </div>
                <div class="playlist__song-body media__info">
                    <span class="playlist__song-title info__title">${song.name}</span>
                    <p class="playlist__song-author info__author">
                      ${song.singer.map((singer, index) => {
                        return app.html`
                        <a href="#" class="is-ghost">${singer}</a>${index < song.singer.length - 1 && ', '} 
                        `
                      })}
                    </p>
                </div>
            </div>
            <span class="playlist__song-time media__content">${app.durationList[app.currentPlaylist][index]}</span>
            <div class="playlist__song-option ${songIndex === 1 && "song--tab"} d-flex">
                <div class="playlist__song-btn btn--mic option-btn hide-on-mobile">
                    <i class="btn--icon song__icon bi bi-mic-fill"></i>
                </div>
                <div class="playlist__song-btn song-btn--heart option-btn hide-on-mobile">
                    <i class="btn--icon song__icon icon--heart bi bi-heart-fill primary"></i>
                </div>
                <div class="playlist__song-btn option-btn ${songIndex === 0 && 'hide-on-tablet'}">
                    <i class="btn--icon bi bi-three-dots"></i>
                </div>
            </div>
        </div>
        `
      })}`
    })
  },

  renderPlaylist() {
    console.log(this.playlists);
    playlistLists.forEach((playlistList, playlistIndex) => {
      playlistList.innerHTML = app.html`
        <div class="box-playlist-item">
          <div class="playlist-item br-5 flex-center create-playlist-item mb-4">
            <i class="bi bi-plus-lg playlist__create-icon"></i>
            <span class="album__create-annotate text-center">Tạo playlist mới</span>
          </div>
        </div>
        ${app.playlists.map((playlist, index) => {
          return app.html`
          <div class="box-playlist-item">
            <div class="playlist-item">
              <div class="img-playlist-item br-5">
                  <div class="playlist__item-img br-5 img--square pt-100" style="background: url('${playlist.image}') no-repeat center center / cover"></div>
                  <div class="playlist__item-actions">
                      <div class="action-btn p-icon btn--heart">
                          <i class="btn--icon icon--heart bi bi-heart-fill primary"></i>
                      </div>
                      <div class="btn--play-playlist">
                          <div class="control-btn btn-toggle-play">
                              <i class="bi bi-play-fill br-icon"></i>
                          </div>
                      </div>
                      <div class="action-btn p-icon">
                          <i class="btn--icon bi bi-three-dots"></i>
                      </div>
                  </div>
              </div>
              <div class="playlist-item-info">
                  <a href="#" class="name-playlist ">${playlist.name}</a>
                  <h3 class="playlist-creator">${playlist.creator}</h3>
              </div>
            </div>         
          </div>
          `
        })}
      `
    })
  },

  renderAlbum() {
    albumLists.forEach((albumList, albumIndex) => {
      albumList.innerHTML = app.html`
        ${app.albums.map((album, index) => {
          return app.html`
            <div class="album-item ${album.margin}">
              <div class="img-album-item br-5">
                  <div class="album__item-img br-5 img--square pt-100" style="background: url('${album.image}') no-repeat center center / cover"></div>
                  <div class="btn__item-actions">
                      <div class="action-btn p-icon btn--heart">
                          <i class="btn--icon icon--heart bi bi-heart-fill primary"></i>
                      </div>
                      <div class="btn--play-playlist">
                          <div class="control-btn btn-toggle-play">
                              <i class="bi bi-play-fill br-icon"></i>
                          </div>
                      </div>
                      <div class="action-btn p-icon">
                          <i class="btn--icon bi bi-three-dots"></i>
                      </div>
                  </div>
              </div>
              <div class="playlist-item-info">
                  <a href="#" class="name-playlist ">${album.name}</a>
              </div>
          </div>
          `
        })}
      `
    })
  },

  renderMV() {
    mvLists.forEach((mvList, mvIndex) => {
      mvList.innerHTML = app.html`
        ${app.mvs.map((mv, index) => {
          return app.html`
            <div class="box-mv-item">
              <div class="mv-item ${mv.margin}">
                <div class="img-mv-item br-5">
                    <div class="mv__item-img br-5 img--square pt-56" style="background: url('${mv.image}') no-repeat center center / cover"></div>
                    <div class="mv__item-actions">
                        <div class="action-btn mv-btn--close">
                            <i class="bi bi-x-lg btn--icon"></i>
                        </div>
                        <div class="btn--play-playlist">
                            <div class="control-btn btn-toggle-play">
                                <i class="bi bi-play-fill icon-play br-icon"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mv__time">${mv.time}</div>

                </div>
                <div class="playlist-item-info d-flex align-items-center">
                    <div class="mv-author-avatar mr-10" style="background: url('${mv.authorAvatar}') no-repeat center center / cover"></div>      
                    <div class="">
                        <a href="#" class="name-playlist ">${mv.name}</a>
                        <h3 class="playlist-creator">
                        ${mv.author.map((author, index) => {
                          return app.html`
                            <a href="#" class="is-ghost">${author}</a>${index < mv.author.length -1 && ', '}
                          `
                        })}</h3>
                    </div>                        
                </div>
              </div>
            </div>
          `
        })}
      `
    })
  },

  renderArtist() {
    artistLists.forEach((artistList, artistIndex) => {
      artistList.innerHTML = app.html`
        ${app.artists.map((artist, index) => {
          return app.html`
            <div class="artist-item ${artist.margin}">
              <div class="img-artist-item br-5">
                  <div class="artist__item-img br-5 img--square pt-100" style="background: url('${artist.image}') no-repeat center center / cover"></div>
                  <div class="artist__item-actions">
                      <div class="btn--play-playlist">
                          <div class="control-btn btn-toggle-play">
                              <i class="bi bi-play-fill br-icon"></i>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="playlist-item-info">
                  <a href="#" class="artist-name d-flex box-flex">
                      ${artist.name}
                      <i class="bi bi-star-fill row__info-icon"></i>
                  </a>
                  <p class="follow">
                      ${artist.followers} quan tâm
                  </p>
                  <div class="follow__item-btn">
                      <button class="button is-small primary">
                          <i class="bi bi-check2"></i>
                          <span>Đã quan tâm</span>
                      </button>
                  </div>
              </div>
            </div>
          `
        })}
      `
    })
  },

  renderModalTheme() {
    themeContainer.innerHTML = app.html`
    ${this.themeLists.map((themeList, themeItem) => {
      return app.html`
        <div class="theme__list">
          <div class="theme__container-info">
              <h3 class="theme__info-name">${themeList.type}</h3>
          </div>
          <div class="theme__list-item"> 
            ${themeList.themes.map((theme, index) => {
              return app.html`
                <div class="theme__container-item" data-index="${index}">
                  <div class="theme__item-display row__item-display br-5">
                      <div class="theme__item-img row__item-img" style="background: url('${theme.image}') no-repeat center center / cover"></div>
                      <div class="overlay"></div>
                      <div class="theme__item-actions row__item-actions">
                          <button class="button theme__actions-btn btn--apply-theme button-primary">
                              <span class="theme__btn-title">Áp dụng</span>
                          </button>
                          <button class="button theme__actions-btn btn--preview hide-on-mobile">
                              <span class="theme__btn-title">Xem trước</span>
                          </button>
                      </div>
                  </div>
                  <div class="theme__item-info">
                      <div class="theme__item-name">${theme.name}</div>
                  </div>
                </div>
              `
            })}
          </div>
        </div>
      `
    })}
    `
  },

  render: function() {
    const _this = this;
    this.renderSong();
    this.renderPlaylist();
    this.renderAlbum();
    this.renderMV();
    this.renderArtist();
    this.renderModalTheme();
  },

  defineProperties: function() {
    const _this = this;
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex];
      }
    })
  },

  handleEvents: function() {
    const _this = this;
    const listThemes = Array.from($$('.theme__container .theme__list'));
    const playBtns = Array.from($$('.btn-toggle-play.btn--play-song'));

    // Play audio when onclick
    playBtns.forEach(playBtn => {
      playBtn.onclick = (e) => {
        if(_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }
    })

    // Handle when click play all
    playAllBtns.forEach(playAllBtn => {
      playAllBtn.onclick = function() {
        _this.currentIndex = 0;
        const songActives = $$(`.playlist__list-song[data-index="${_this.currentIndex}"]`)
        _this.loadCurrentSong();
        Array.from($$('.playlist__list-song.active')).forEach(songActive => {
          songActive.classList.remove('active');
        })
        Array.from(songActives).forEach(songActive => {
          songActive.classList.add('active');
        })
        _this.loadCurrentSong();
        _this.scrollToActiveSong();
        audio.play();
      }
    })

    // When the song is playing
    audio.onplay = function() {
      const songActives = Array.from($$('.playlist__list-song.active')) 
      _this.isPlaying = true;
      songActives.forEach(songActive => {
        songActive.classList.add('playing');
      })
      player.classList.add('playing')
      playerInfos.forEach(playerInfo => {
        playerInfo.classList.add('playing')
      })
      popUpCdThumbAnimate.play();
      _this.titleAnimate(songAnimateTitles[0]).play();
      _this.titleAnimate(songAnimateTitles[1]).play();
    }

    // When the song is paused
    audio.onpause = function() {
      const songActives = Array.from($$('.playlist__list-song.active')) 
      _this.isPlaying = false;
      songActives.forEach(songActive => {
        songActive.classList.remove('playing');
      })
      player.classList.remove('playing')
      playerInfos.forEach(playerInfo => {
        playerInfo.classList.remove('playing')
      })
      popUpCdThumbAnimate.pause();
    }

    // Handle next song when radio ended
    audio.onended = function() {
      if(_this.isRepeat) {

      } else {
        nextBtns[0].click();
      }
      audio.play();

    }

    // Handle when next song
    nextBtns.forEach(nextBtn => {
      nextBtn.onclick = function() {
        if(_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.nextSong();
        }
        _this.scrollToActiveSong();
        audio.play();
        _this.renderSong();
      }
    })

    // Handle when prev song
    prevBtns.forEach(prevBtn => {
      prevBtn.onclick = function() {
        if(_this.isRandom) {
          _this.playRandomSong();
        } else {
          _this.prevSong();
        }
        _this.scrollToActiveSong();
        audio.play();
        _this.renderSong();
      }
    })

    // Handle on/off random song
    randomBtns.forEach(randomBtn => {
      randomBtn.onclick = function() {
        _this.isRandom = !_this.isRandom;
        _this.setConfig('isRandom', _this.isRandom)
        randomBtns.forEach(randomBtn => {
          randomBtn.classList.toggle('active-btn', _this.isRandom)
        })
      }
    })

    // Single-parallel repeat processing
    repeatBtns.forEach(repeatBtn => {
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtns.forEach(repeatBtn => {
                repeatBtn.classList.toggle('active-btn', _this.isRepeat)
            })
        }
    })

    // Handle when onclick player
    player.onclick = function(e) {
      const authorNode = e.target.closest('.player-container .player__song-info .info-author');
      const actionNode = e.target.closest('.player-container .player__song-info .media-options');
      const controlNode = e.target.closest('.player-container .player-control-btn');
      const progressNode = e.target.closest('.player-container .progress-block');
      const optionNode = e.target.closest('.player-container .player__options-container');
      const popUpNode = e.target.closest('.player .player__popup');
      const popDownBtn = e.target.closest('.popup__action-btn.btn--pop-down');
      if(!player.classList.contains('open-popup') && !actionNode && !authorNode && !controlNode && !progressNode && !optionNode && !popUpNode) {
        player.classList.add('open-popup')
      }
      // Handle close pop-up window
      if(popUpNode) {
          if(popDownBtn) {
              player.classList.remove('open-popup')
          }
      }
    }

    // Playlist onclick
    songLists.forEach(songList => {
      songList.onclick = function(e) {
        const checkNode = e.target.closest('.playlist__list-song:not(.active) .playlist__song-check')
        const songNode = e.target.closest('.playlist__list-song:not(.active)');
        const optionNode = e.target.closest('.playlist__song-option');
        const heartIconBtn = e.target.closest('.song-btn--heart');
        const micIconBtn = e.target.closest('.btn--mic');
        if(songNode && !optionNode && !checkNode) {
          // Handle when click on the song
          if(songNode) {
            _this.currentIndex = Number(songNode.dataset.index);
            const songActives = $$(`.playlist__list-song[data-index="${_this.currentIndex}"]`)
            _this.loadCurrentSong();
            Array.from($$('.playlist__list-song.active')).forEach(songActive => {
                songActive.classList.remove('playing')
                songActive.classList.remove('active');
            })
            Array.from(songActives).forEach(songActive => {
                songActive.classList.add('active');
            })
            audio.play();
          }
        }
        //Handle when click on song checkbox
        if(checkNode) {
          checkNode.onclick = function(e) {
              const inputCheck = e.target.closest('.playlist__song-check').querySelector('.mr-10')
              e.target.closest('.playlist__list-song').classList.toggle('active', inputCheck.checked)
          }
        }

        // Handle when clicking on the song option
        if(optionNode) {
              
        }

        // Handle when click on icons heart
        if(heartIconBtn) {
          console.log("oke")

          const heartIcon = heartIconBtn.firstElementChild
          if(heartIcon.classList.contains('primary')) heartIcon.classList.replace('bi-heart-fill', 'bi-heart')
          else heartIcon.classList.replace('bi-heart', 'bi-heart-fill')
          heartIcon.classList.toggle('primary')
        }

        //Handle when click on icons micro
        if(micIconBtn) {
          console.log("oke")
          const micIcon = micIconBtn.firstElementChild
          micIcon.classList.toggle('primary')
        }
      }
    })

    // Handle adjust volume change
    function changeVolume(index) {
      if(audio.volume * 100 != volumes[index].value) {
        audio.volume = volumes[index].value / 100;
        volumeTracks.forEach(volumeTrack => {
          volumeTrack.style.width = volumes[index].value + '%';
        })
        _this.setConfig('currentVolume', volumes[index].value);
        if(!audio.volume) {
          volumeIcons.forEach(volumeIcon => {
            volumeIcon.classList.replace('bi-volume-up', 'bi-volume-mute')
          })
        } else {
          volumeIcons.forEach(volumeIcon => {
            volumeIcon.classList.replace('bi-volume-mute', 'bi-volume-up')
        })
        }
      }
    }

    volumeBtns.forEach((volumeBtn, index) => {
      volumeBtn.onclick = (e) => {
        let currentVolume;
        if(audio.volume > 0) {
          currentVolume = 0;
        } else {
          if(volumes[index].value > 0) {
            currentVolume = volumes[index].value
          } else {
            currentVolume = 100;
            volumes.forEach(volume => {
              volume.value = 100;
            })
          }
        }
        audio.volume = currentVolume / 100;
        volumeTracks.forEach(volumeTrack => {
          volumeTrack.style.width = currentVolume + "%";
        })
        _this.setConfig('currentVolume', currentVolume);
        if (!audio.volume) {
          volumeIcons.forEach(volumeIcon => {
              volumeIcon.classList.replace('bi-volume-up', 'bi-volume-mute');
          })
        } else {
          volumeIcons.forEach(volumeIcon => {
              volumeIcon.classList.replace('bi-volume-mute', 'bi-volume-up')
          })
        }
      }
    })

    // Change volume
    volumes.forEach((volume, index) => {
      volume.onchange = function(e) {
        changeVolume(index);
      }
      volume.onmousedown = (e) => {
        _this.isChangeVolume = true;
      }
      volume.onmouseup = (e) => {
        _this.isChangeVolume = false;
      }
      volume.onmousemove = (e) => {
        if(_this.isChangeVolume === true) {
          changeVolume(index);
          // e.stopPropagation();
        }
      }
      // Use addEventListener to fix the bug when the first loading
      volume.addEventListener('touchstart', function(e) {
        _this.isChangeVolume = true;
      })
      volume.addEventListener('touchend', function(e) {
          _this.isChangeVolume = false;
      })
      volume.addEventListener('touchmove', function(e) {
          if(_this.isChangeVolume === true) {
              changeVolume(index);
              e.stopPropagation();
          }
      })
    })

    headerNavTitles.forEach((headerNavTitle, index) => {
      headerNavTitle.onclick = (e) => {
        appContainers[0].scrollTop = 0;
        $('.individual-user-item.active').classList.remove('active')
        individualItems[index + 1].classList.add('active')

        $('.content-individual-containner.active-individual').classList.remove('active-individual')
        tabIndividuals[index + 1].classList.add('active-individual')
      }
    })

    //Open and close modal theme
    navThemeBtn.onclick = function() {
      modalTheme.classList.add('open')
    }
    modalTheme.onclick = (e) => {
      const themeContainer = e.target.closest('.modal-theme .modal-container');
      if(themeContainer) {
        e.stopPropagation();
      } else {
        modalTheme.classList.remove('open')
      }
    }
    closeModalBtn.onclick = (e) => {
      modalTheme.classList.remove('open')
    }

    // Open setting
    settingBtn.onclick = (e) => {
      e.stopPropagation()
      settingMenu.classList.toggle('open')
    }
    // Handle when click on setting menu
    settingMenu.onclick = (e) => {
      e.stopPropagation();
    }
    document.onclick = (e) => {
      settingMenu.classList.remove('open');
      logOutItem.classList.remove('open-log-out');
    }

    // Open log-out
    logOutBtn.onclick = (e) => {
      (e).stopPropagation();
      logOutItem.classList.toggle('open-log-out')
    }

    // Handle when click on sidebar subnav
    sidebarSubnavItems.forEach(subnavItem => {
      subnavItem.onclick = (e) => {
          showNotificationToast('Tính năng hiện chưa được cập nhật, bạn vui lòng thông cảm!')
      }
    })

    // Hide and visible shadow of subnav on sidebar
    sidebarMenuScroll.onscroll = (e) => {
      const scrollTop = sidebarMenuScroll.scrollY || sidebarMenuScroll.scrollTop;
      if(scrollTop > 10) {
        sidebarMenuScroll.classList.add('has-mask');
      } else {
        sidebarMenuScroll.classList.remove('has-mask');
      }
    }

    // Set background for header when scroll 
    appContainers.forEach(appContainer => {
      appContainer.onscroll = function() {
        const scrollTop = appContainer.scrollY || appContainer.scrollTop;
        if(scrollTop > 5) {
          header.classList.add('smoothScroll')
          Object.assign(header.style, {
            backgroundColor: 'var(--layout-bg)',
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.08)',
          })
        } else {
          header.classList.remove('smoothScroll')
          Object.assign(header.style, {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          })
        }
      }
    })
    
    // Handle change theme method
    listThemes.forEach((listTheme, themeIndex) => {
      listTheme.onclick = (e) => {
        const applyThemeBtn = e.target.closest('.theme__actions-btn.btn--apply-theme');
        const previewBtn = e.target.closest('.theme__actions-btn.btn--preview');
        const themeItem = e.target.closest('.theme__container-item');
        if(themeItem && (applyThemeBtn || previewBtn)) {
          const currentTheme = Number(themeItem.dataset.index)
          if(applyThemeBtn) {
            _this.loadThemeBg(themeIndex, currentTheme)
            _this.setConfig('themeList', themeIndex)
            _this.setConfig('currentTheme', currentTheme)
            closeModalBtn.onclick()
          } 
          if(previewBtn) {
            _this.loadThemeBg(themeIndex, currentTheme)
          }
        }
      }
    })

    // Handle slide show
    let imgIndex = 2;
    function slideShow() {
      const slideImgFirst = $('.container__slide-item.first')
      const slideImgSecond = $('.container__slide-item.second')
      const slideImgThird = slideImgs[imgIndex]
      const slideImgFourth = slideImgs[imgIndex === slideImgs.length - 1 ? 0 : imgIndex + 1]
      slideImgFourth.classList.replace('fourth', 'third')
      slideImgThird.classList.replace('third', 'second')
      slideImgSecond.classList.replace('second', 'first')
      slideImgFirst.classList.replace('first', 'fourth')
      imgIndex++;
      if(imgIndex >= slideImgs.length) { 
        imgIndex = 0;
      }
      setTimeout(slideShow, 2000)
    }
    slideShow();

    // Handle when click individual item
    individualItems.forEach((individualItem, index) => {
      individualItem.onclick = function() {
        const tabIndividual = tabIndividuals[index];
        $('.individual-user-item.active').classList.remove('active')
        individualItem.classList.add('active')

        $('.content-individual-containner.active-individual').classList.remove('active-individual')
        tabIndividual.classList.add('active-individual')
      }
    })

    //***  Handle when click button move Album, Playlist, MV and Artist on tab HOME
    // Playlist
    playlistScrollBtns[0].onclick = function() {
      _this.showSlides(-5, 0, playlistLists[0], playlistScrollBtns)
    }

    playlistScrollBtns[1].onclick = function() {
        _this.showSlides(5, 0, playlistLists[0],playlistScrollBtns)
    }

    // Album
    albumScrollBtns[0].onclick = function() {
      _this.showSlides(-5, 1, albumLists[0],albumScrollBtns)
    }

    albumScrollBtns[1].onclick = function() {
        _this.showSlides(5, 1, albumLists[0],albumScrollBtns)
    }

    // MV
    mvScrollBtns[0].onclick = function() {
      _this.showSlides(-3, 2, mvLists[0],mvScrollBtns)
    }
    
    mvScrollBtns[1].onclick = function() {
        _this.showSlides(3, 2, mvLists[0],mvScrollBtns)
    }

    // Artist
    artistScrollBtns[0].onclick = function() {
      _this.showSlides(-5, 3, artistLists[0],artistScrollBtns)
    }

    artistScrollBtns[1].onclick = function() {
        _this.showSlides(5, 3, artistLists[0],artistScrollBtns)
    }

    // When the song progress changes
    audio.ontimeupdate = function(e) {
      if (audio.duration) {
          if(!_this.isSeeking) {
              const listDurationTime = $('.playlist__list-song.active .playlist__song-time')
              trackTimes.forEach(trackTime => {
                  trackTime.innerHTML = _this.audioCalTime(audio.currentTime);
              })
              progress.forEach(progressChild => {
                  progressChild.value = Math.round(audio.currentTime / audio.duration * 100);
              })
              progressTracks.forEach(progressTrack => {
                  progressTrack.style.width = Math.round(audio.currentTime / audio.duration * 100) + '%';
              })
              if(listDurationTime.innerText === '--/--' || listDurationTime.innerText === '') {
                  _this.durationList[_this.currentPlaylist].splice(_this.currentIndex, 1, _this.audioCalTime(audio.duration))
                  localStorage.setItem(DURATION_STORAGE_KEY, JSON.stringify(_this.durationList));
                  listDurationTime.innerHTML = _this.durationList[_this.currentPlaylist][_this.currentIndex];
                  durationTimes.forEach(durationTime => {
                      durationTime.innerHTML = _this.durationList[_this.currentPlaylist][_this.currentIndex];
                  })
              }
          }
      } else {
          // Handling when seek
          progress.forEach(progressChild => {
              progressChild.onchange = function(e) {
                  const seekTime = e.target.value * audio.duration / 100;
                  audio.currentTime = seekTime;
              }
          })
      }
    }
  
    // Method 2 to seek
    function currentTime() {
        if(_this.isSeeking) {
            let seekTime;
            progress.forEach(progressChild => {
                progressChild.oninput = (e) => {
                    seekTime = e.target.value * audio.duration / 100;
                    progressTracks.forEach(progressTrack => {
                        progressTrack.style.width = e.target.value + '%';
                    })
                    trackTimes.forEach(trackTime => {
                        trackTime.innerHTML = _this.audioCalTime(seekTime);
                    })
                }
            })
        }
    }

    progress.forEach(progressChild => {
        progressChild.onmousemove = currentTime;
        progressChild.addEventListener('touchmove', currentTime);
    })


    function seekStart() {
        if(audio.duration) {
            _this.isSeeking = true;
        }
    }

    function seekEnd() {
        _this.isSeeking = false;
    }

    // Handle CD spins / stops
    _this.smoothAnimation(popUpCdThumb) 
    const popUpCdThumbAnimate = popUpCdThumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 15000,
      iterations: Infinity,
    })
    popUpCdThumbAnimate.pause();

    // progressBlock.addEventListener('touchstart', seekStart);
    progress.forEach(progressChild => {
        progressChild.onmousedown = seekStart;
        progressChild.ontouchstart = seekStart;
    })

    progress.forEach(progressChild => {
        progressChild.onmouseup = seekEnd;
        progressChild.ontouchend = seekEnd;
    })

    // // Set width header 
    // function setWidthHeader() {
    //   header.style.width = $(".content").offsetWidth + "px"
    // }

    // setWidthHeader();
  },

  // Load theme Background
  loadThemeBg(themeListIndex, currentTheme) {
    const currentThemeColor = this.themes[themeListIndex][currentTheme].colors;
    document.documentElement.style.setProperty('--bg-content-color', currentThemeColor.bgContentColor)
    document.documentElement.style.setProperty('--border-box', currentThemeColor.borderBox)
    document.documentElement.style.setProperty('--border-primary', currentThemeColor.borderPrimary)
    document.documentElement.style.setProperty('--layout-bg', currentThemeColor.layoutBg)
    document.documentElement.style.setProperty('--link-text-hover', currentThemeColor.linkTextHover)
    document.documentElement.style.setProperty('--modal-scrollbar', currentThemeColor.modalScrollbar)
    document.documentElement.style.setProperty('--player-bg', currentThemeColor.playerBg)
    document.documentElement.style.setProperty('--purple-primary', currentThemeColor.purplePrimary)
    document.documentElement.style.setProperty('--primary-bg', currentThemeColor.primaryBg)
    document.documentElement.style.setProperty('--sidebar-popup-bg', currentThemeColor.sidebarPopupBg)
    document.documentElement.style.setProperty('--text-color', currentThemeColor.textColor)
    document.documentElement.style.setProperty('--text-item-hover', currentThemeColor.textItemHover)
    document.documentElement.style.setProperty('--text-secondary', currentThemeColor.textSecondary)
    document.documentElement.style.setProperty('--navigation-text', currentThemeColor.navigationText)
    document.documentElement.style.setProperty('--placeholder-text', currentThemeColor.placeholderText)

    if(this.themes[themeListIndex][currentTheme].image) {
      App.style.backgroundImage = `url('${this.themes[themeListIndex][currentTheme].image}')`;
      playerPopUp.style.backgroundImage = `url('${this.themes[themeListIndex][currentTheme].image}')`;
      App.classList.add('has__theme-img')
    } else {
        App.style.backgroundImage = 'none';
        playerPopUp.style.backgroundImage = 'none';
        App.classList.remove('has__theme-img')
    }

    if(this.themes[themeListIndex][currentTheme].playerImage) {
      player.style.backgroundImage = `url('${this.themes[themeListIndex][currentTheme].playerImage}')`;
      playerPopUpFooter.style.backgroundImage = `url('${this.themes[themeListIndex][currentTheme].playerImage}')`;
    } else {
        player.style.backgroundImage = 'none';
        playerPopUpFooter.style.backgroundImage = 'none';
    }
  },

  loadCurrentSong: function() {
    const _this = this;
    // load name song 
    songAnimateTitles.forEach(songAnimateTitle => {
      songAnimateTitle.innerHTML = app.html`
              <div class="name-song">${this.currentSong.name}</div>
              <div class="name-song">${this.currentSong.name}</div>
      `;
    })

    // load song
    audio.src = `${this.currentSong.path}`;

    // load cdThumb
    cdThumbs.forEach(cdThumb => {
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    })

    popUpSongName.innerText = this.currentSong.name;
    // load author
    authors.forEach(author => {
      author.innerHTML = app.html`
          ${this.currentSong.singer.map((singer, index) => {
              return app.html`<a href="#" class="is-ghost">${singer}</a>${index < this.currentSong.singer.length - 1 && ', '}`
          })}
      
      `;
    })

    popUpSongAuthor.innerHTML = app.html`
      ${this.currentSong.singer.map((singer, index) => {
        return app.html`<a href="#" class="is-ghost">${singer}</a>${index < this.currentSong.singer.length - 1 && ', '}`
      })}
    `

    this.setPlayerInfoWidth()
    popUpCdThumb.style.backgroundImage = `url('${this.currentSong.image}')`

    // load duration time progress
    durationTimes.forEach(durationTime => {
      durationTime.innerHTML = this.durationList[this.currentPlaylist][this.currentIndex];          
    })
    this.setConfig('currentIndex', this.currentIndex);
  },

  setPlayerInfoWidth() {
    // const animateTitleItems = $$('.name-song-animate .name-song')
    const playerSongTitles = Array.from($$('.info-name-song'))
    playerSongTitles.forEach(playerSongTitle => {
        playerSongTitle.style.width = songAnimateTitles[0].offsetWidth / 2 + 'px'
    })
    this.slideTitleWidth = playerSongTitles[0].offsetWidth;
  },

  // Handle title runs/stops

  titleAnimate(title) {
    // Smooth Animation
    const titleAnimate = title.animate([
        {transform: 'translate(0px)'},
        {transform: `translateX(-${this.slideTitleWidth}px)`}
    ], {
        duration: 21 * this.slideTitleWidth,
        iterations: Infinity,
    })
    titleAnimate.pause()
    return titleAnimate
  },

  smoothAnimation(element) {
    element.style.willChange = 'transform, opacity';
  },

  audioCalTime: function(time) {
    const _this = this;
    let minute;
    let second;
    if(time) {
      minute = Math.floor(time / 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      second = Math.floor(time % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    } else {
      minute = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
      second = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    }
    return `${minute}:${second}`;
  },

  loadConfig: function() { 
    const _this = this;
    this.isRandom = this.config.isRandom || false;
    this.isRepeat = this.config.isRepeat || false;
    this.themeList = this.config.themeList || 0;
    this.currentTheme = this.config.currentTheme || 0;
    this.loadThemeBg(this.themeList ,this.currentTheme);

    audio.volume = this.config.currentVolume == 0 ? 0 : this.config.currentVolume / 100 || 1;
    if (!audio.volume) {
        volumeIcons.forEach(volumeIcon => {
            volumeIcon.classList.replace('bi-volume-up', 'bi-volume-mute');
        })
    }
    volumes.forEach(volume => {
        volume.value = this.config.currentVolume == 0 ? 0 : this.config.currentVolume || 100;
    })
    volumeTracks.forEach(volumeTrack => {
        volumeTrack.style.width = (this.config.currentVolume == 0 ? 0 : this.config.currentVolume || 100) + '%';
    })

    durationTimes.forEach(durationTime => {
      durationTime.textContent = this.audioCalTime(this.durationList[this.currentPlaylist][this.currentIndex]);
    })

    randomBtns.forEach(randomBtn => {
      randomBtn.classList.toggle('active-btn', this.isRandom);
    })
    repeatBtns.forEach(repeatBtn => {
        repeatBtn.classList.toggle('active-btn', this.isRepeat);
    })
  },

  setUpRender: function() {
    const _this = this;
    this.songs = this.songPlaylists[this.currentPlaylist]
    if(this.durationList[this.currentPlaylist].length === 0) {
        this.songs.forEach((song, index) => this.durationList[this.currentPlaylist].push('--/--'))
    }
  },

  prevSlide: function() {
    const _this = this;

  },

  nextSlide: function() {
    const _this = this;

  },

  nextSong: function() {
    const _this = this;
    this.currentIndex++;
    if(this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  prevSong: function() {
    const _this = this;
    this.currentIndex--;
    if(this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  playRandomSong: function() {
    const _this = this;
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while(newIndex === this.currentIndex || this.indexArray.includes(newIndex));
    this.indexArray.push(newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
    if(this.indexArray.length === this.songs.length) {
      this.indexArray = [];
    }
  },

  scrollToActiveSong: function() {
    setTimeout(function() {
      Array.from($$('.playlist__list-song.active')).forEach(songActive => {
        songActive.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        })
      })
    }, 200)
  },

  getSlideIndex(step, slideOrder, listItems, listBtn) {
    this.slideIndexs[slideOrder] += step;
    if(this.slideIndexs[slideOrder] + step > listItems.length - 1) {
        this.slideIndexs[slideOrder] = listItems.length - 1;
        listBtn[1].classList.add('button--disabled')
        listBtn[0].classList.remove('button--disabled')
        this.scrollToRight[slideOrder] = false;
    } else if (this.slideIndexs[slideOrder] + step < 0) {
        this.slideIndexs[slideOrder] = 0;
        listBtn[0].classList.add('button--disabled')
        listBtn[1].classList.remove('button--disabled')
        this.scrollToRight[slideOrder] = true;
    } else {
        listBtn[0].classList.remove('button--disabled')
        listBtn[1].classList.remove('button--disabled')
    }
  },

  showSlides(step, slideOrder, listContainer, listBtn) {
      const listItems = $$(this.slideSelectors[slideOrder])
      this.getSlideIndex(step, slideOrder, listItems, listBtn)
      const currentIndex = Math.floor(this.slideIndexs[slideOrder] / Math.abs(step))
      // Scroll Into View
      listContainer.scrollLeft = listContainer.offsetWidth * currentIndex

  },

  start: function() {
    // Setup duration time to render
    this.setUpRender()

    // Assign configuration from config to application
    this.loadConfig();
    
    // Define properties for the object
    this.defineProperties();
    
    // Render playlist
    this.render();

    // Load the first song information into the UI when running the app
    this.loadCurrentSong();
    
    // Listening / handling events (DOM events)
    this.handleEvents();
    
  },
  
}

app.start();
