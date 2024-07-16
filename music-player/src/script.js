const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const songs = [
  { title: 'Heartless', artist: 'The Weeknd', path: '/music-player/File/song1.mp3' },
  { title: 'Starboy', artist: 'The weeknd', path: '/music-player/File/song2.mp3' },
  { title: 'Hills', artist: 'The Weeknd', path: '/music-player/File/song3.mp3' }
];

let songIndex = 0;


function loadSong(song) {
  title.innerText = song.title;
  artist.innerText = song.artist;
  audio.src = song.path;
}


loadSong(songs[songIndex]);


function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  playBtn.setAttribute('data-playing', 'true');
}


function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  playBtn.setAttribute('data-playing', 'false');
}


playBtn.addEventListener('click', () => {
  const isPlaying = playBtn.getAttribute('data-playing') === 'true';
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


prevBtn.addEventListener('click', () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
});


nextBtn.addEventListener('click', () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
});


audio.addEventListener('timeupdate', (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
});


progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
});


audio.addEventListener('ended', () => {
  nextBtn.click();
});
