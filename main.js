var playList = [
    {songName: "Create Ft. Hify",
    artist: "Double-F the King",
    image: "https://picsum.photos/id/1006/300/300",
    path: "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/Qn5Aq1OpdXwRTcqgkpuP9D83PDBUybQ0Uj6wtzix.mp3",
  },
  
  {songName: "Strangers",
  artist: " HoliznaCC0",
  image: "https://picsum.photos/id/1033/300/300",
  path: "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/AwdzX9NdHm3S7PhotDrJqgvt5ca8SqIP8pnwRwDE.mp3",
},

{songName: "Faint",
artist: "Linkin Park",
image: "https://picsum.photos/id/103/300/300",
path: "https:\/\/files.freemusicarchive.org\/storage-freemusicarchive-org\/tracks\/vpTNLHvkDTWY60BGHkM8tN2tbLjOMC3c8WI50ff9.mp3",
},
]

var currentTrack = document.createElement("audio")
var isPlaying = false;
var list = "";
var muted = false;
var currentSongIndex = 0;
var time;
var current = document.getElementsByClassName("active");
for (var i = 0; i < playList.length; i++){
  list += "<p>" + playList[i].songName +"</p>"
  // console.log("<p>" + playList[i].songName +"</p>");
}
console.log(list);
document.getElementById("playMusic").innerHTML = list;

function renderTrack(){
   document.getElementById("name").innerHTML = playList[currentSongIndex].songName;
   document.getElementById("img").src = playList[currentSongIndex].image;
   document.getElementById("artist").innerHTML = playList[currentSongIndex].artist;
}

renderTrack();

function playAndPause(){
    if(isPlaying){
        isPlaying = false;
        currentTrack.pause();
        document.getElementById("play").innerHTML = "play_circle"

      }else{
        isPlaying = true;
        currentTrack.src = playList[currentSongIndex].path;
        currentTrack.play();
        document.getElementById("play").innerHTML = "pause_circle"
        
      }
}



function nextSong(){
if(currentSongIndex < playList.length -1){
  currentSongIndex++;
}else{
  currentSongIndex = 0;
}
renderTrack(currentSongIndex);
playAndPause();
}

function prevSong(){
  if(currentSongIndex > 0){
    currentSongIndex--;
  }else{
    currentSongIndex = playList.length -1;
  }
  renderTrack(currentSongIndex);
  playAndPause();
}

currentTrack.onended = function(){
nextSong();
}

function changeVolume(){
  currentTrack.volume = document.getElementById("volume").value / 100;
  if(currentTrack.volume === 0){
    document.getElementById("volumeIcon").innerHTML = "volume_mute"
  }else{
    document.getElementById("volumeIcon").innerHTML = "volume_up"
  }
}


function muteSound(){
    if (muted){
      muted = false;
      document.getElementById("volumeIcon").innerHTML = "volume_up"
      changeVolume();
      
    } else{
      muted = true;
      currentTrack.volume = 0;
      document.getElementById("volume").value = 0;
      document.getElementById("volumeIcon").innerHTML = "volume_mute"
     }
}

//Play song from display's playlist
var songList = document.querySelectorAll("#playMusic p");
var a = [];
console.log(songList);
for (var i = 0; i < songList.length; i++){
  a.push(songList[i].innerHTML);
    songList[i].onclick = function(){
    currentSongIndex = a.indexOf(this.innerHTML);
    if (current.length > 0) {
      current[0].className = current[0].className.replace("active", "");
    }
    this.className = "active";
    renderTrack();
    playAndPause();
}
}

//update seekbar value
function updateSlider() {
var position = 0;
position = currentTrack.currentTime * (100 / currentTrack.duration);
seekBar.value = position;
}

//Update time as the track plays

currentTrack.addEventListener("timeupdate", () => {
clearInterval();
time = setInterval(updateSlider,1000);
if (currentTrack.duration) {
  var currentMins = Math.floor(currentTrack.currentTime / 60);
  var currentSecs = Math.floor(currentTrack.currentTime - currentMins * 60);
  var durationMins = Math.floor(currentTrack.duration / 60);
  var durationSecs = Math.floor(currentTrack.duration - durationMins * 60);
  if(currentSecs < 10){
    currentSecs = "0" + currentSecs;
  }
  trackCurrentDuration.innerHTML  = currentMins + ":" + currentSecs;
  totalDuration.innerHTML = durationMins + ":" + durationSecs;
}
});

//changing seek bar position
function changeDuration(){
  var seekBarPosition = currentTrack.duration * (seekBar.value / 100)
  currentTrack.currentTime = seekBarPosition;
}
