console.log("Welcome to Spotify");
// Initialize the variables
let songIndex=0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItems'));
let currentlyPlayingButton = null;
let mastersongName=document.getElementById('mastersongName'); 

// Track the currently playing button


let songs = [
{songName:"yo", filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
{songName:"fsdfsf", filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
{songName:"fwefwef", filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
{songName:"wfew", filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
{songName:"fwfwef", filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
{songName:"vegerg", filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
{songName:"efgerer", filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},
{songName:"fewffw", filePath:"songs/8.mp3",coverPath:"covers/8.jpg"},
{songName:"sfewfwf", filePath:"songs/9.mp3",coverPath:"covers/9.jpg"},
{songName:"verrgerf", filePath:"songs/10.mp3",coverPath:"covers/10.jpg"},
];

songItems.forEach((element, i)=>{
console.log(element, i);
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

// handle play pause
masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('plays');
        masterPlay.src = "./svgs/Pause.svg";
        gif.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.src = "./svgs/Play.svg";
        gif.style.opacity = 0;
    }
});

// listen to events
audioElement.addEventListener('canplay', () => {
    audioElement.addEventListener('timeupdate', () => {
        if (audioElement.duration) {
            const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myProgressBar.value = progress;
            console.log('Time update event triggered');
            console.log('Progress:', progress);
        }
    });
    
    myProgressBar.addEventListener('input', () => {
        if (audioElement.duration) {
            const newTime = (myProgressBar.value / 100) * audioElement.duration;
            if (isFinite(newTime)) {
                audioElement.currentTime = newTime;
                console.log('Progress bar value changed');
            }
        }
    });
});

Array.from(document.getElementsByClassName('play')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const index = parseInt(e.target.id);
        if (currentlyPlayingButton === e.target) {
            if (audioElement.paused) {
                audioElement.play();
                gif.style.opacity =1;
                e.target.src = "./svgs/Subtract.svg";
                e.target.classList.remove('pause');
                masterPlay.src = "./svgs/Pause.svg";
            } else {
                audioElement.pause();
                gif.style.opacity =0;
                e.target.src = "./svgs/Play.svg";
                e.target.classList.add('pause');
                masterPlay.src = "./svgs/Play.svg";
            }
        } else {
            if (currentlyPlayingButton) {
                currentlyPlayingButton.src = './svgs/Play.svg';
                currentlyPlayingButton.classList.add('pause');
                audioElement.pause();
                gif.style.opacity =0;
            }

            e.target.src = "./svgs/Subtract.svg";
            e.target.classList.remove('pause');
            currentlyPlayingButton = e.target;

            audioElement.src = songs[index].filePath;
            mastersongName.innerText=songs[songIndex].songName; 
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity =1;
            masterPlay.classList.remove('pause');
            masterPlay.src = "./svgs/Pause.svg";
        }
    });
});

// masterPlay.addEventListener('click', () => {
//     if (audioElement.paused) {
//         audioElement.play();
//         masterPlay.src = "./Pause.svg";
//         if (currentlyPlayingButton) {
//             currentlyPlayingButton.src = "./Subtract.svg";
//             currentlyPlayingButton.classList.remove('pause');
//         }
//     } else {
//         audioElement.pause();
//         masterPlay.src = "./Play.svg";
//         if (currentlyPlayingButton) {
//             currentlyPlayingButton.src = "./Play.svg";
//             currentlyPlayingButton.classList.add('pause');
//         }
//     }
// });

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath; // Use songIndex instead of index
    gif.style.opacity =1;
    mastersongName.innerText=songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('pause');
    masterPlay.src = "./svgs/Pause.svg";
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) { // Change >= to <=
        songIndex = songs.length - 1; // Update the index to the last song
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath; // Use songIndex instead of index
    gif.style.opacity =1;
    mastersongName.innerText=songs[songIndex].songName; 
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('pause');
    masterPlay.src = "./svgs/Pause.svg";
});


