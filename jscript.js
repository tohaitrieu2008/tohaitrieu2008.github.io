const playlist = [
    { src: "Me/Nhacnen.mp3", title: "Nắng dưới chân mây" },
    { src: "Me/Nhacnen2.mp3", title: "Lỡ một lời thương" },
    { src: "Me/Nhacnen3.mp3", title: "E là không thể" },
    { src: "Me/Nhacnen4.mp3", title: "Lo người ướt áo" },
    { src: "Me/Nhacnen5.mp3", title: "Vở kịch của em" },
    { src: "Me/Nhacnen6.mp3", title: "Yêu thật khó xoá thật đau" }
];

let currentTrackIndex = 0;
const audio = document.getElementById("audio");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const bar = document.getElementById("bar");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const progress = document.getElementById("progress");
const volIcon = document.getElementById("vol-icon");
const title = document.getElementById("title");
const trackNum = document.getElementById("track-num");
const playlistEl = document.getElementById("playlist");
const togglePlaylist = document.getElementById("toggle-playlist");

audio.loop = false; /* Không lặp lại bài */

/* Danh sách phát */
function renderPlaylist() {
    playlistEl.innerHTML = playlist.map((track, index) => `
        <div class="playlist-item ${index === currentTrackIndex ? 'active' : ''}" onclick="playTrack(${index})">
            <span class="song-title">${track.title}</span>
        </div>
    `).join('');
}

/* Chạy bài */
function loadTrack(index, autoPlay = false) {
    currentTrackIndex = index;
    const track = playlist[index];
    
    audio.src = track.src;
    title.textContent = track.title;
    trackNum.textContent = `${index + 1} / ${playlist.length}`;
    
    document.querySelectorAll('.playlist-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
    
    if (autoPlay) {
        audio.play().catch(() => {
            play.textContent = "▶";
            play.style.animation = "none";
        });
    }
    
    if (!audio.paused || autoPlay) {
        play.textContent = "❚❚";
        play.style.animation = "pulse 1s infinite";
    }
}

/* Nút play, pause */
play.onclick = () => {
    if (audio.paused) {
        audio.play();
        play.textContent = "❚❚";
        play.style.animation = "pulse 1s infinite";
    } else {
        audio.pause();
        play.textContent = "▶";
        play.style.animation = "none";
    }
};

/* Lùi */
prev.onclick = () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = playlist.length - 1;
    loadTrack(newIndex, true);
};

/* Tiến */
next.onclick = () => {
    nextTrack();
};
function nextTrack() {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= playlist.length) newIndex = 0;
    loadTrack(newIndex, true);
}

/* Tự động chuyển */
audio.onended = () => {
    nextTrack();
};

/* Gọi hàm */
window.playTrack = (index) => {
    loadTrack(index, true);
};

/* Ẩn hiện danh sách phát */
togglePlaylist.onclick = () => {
    const isVisible = playlistEl.style.display !== 'none';
    playlistEl.style.display = isVisible ? 'none' : 'block';
    togglePlaylist.textContent = isVisible ? 'Danh sách phát ▼' : 'Danh sách phát ▲';
};

/* Thanh tiến trình */
audio.ontimeupdate = () => {
    if (!audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    bar.style.width = percent + "%";
    const m = Math.floor(audio.currentTime / 60);
    const s = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
    time.textContent = `${m}:${s}`;
};

/* Click vào thanh tiến trình -> tua */
progress.onclick = (e) => {
    if (!audio.duration) return;
    const rect = progress.getBoundingClientRect();
    const x = e.clientX - rect.left;
    audio.currentTime = (x / rect.width) * audio.duration;
};

/* Âm lượng */
volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    const pct = Number(volume.value) * 100;
    volume.style.background = `linear-gradient(90deg, #64c8ff ${pct}%, rgba(255,255,255,0.2) ${pct}%)`;
});

/* Tắt/mở âm lượng */
volIcon.addEventListener("click", () => {
    audio.muted = !audio.muted;
    volIcon.style.opacity = audio.muted ? 0.4 : 1;
    volume.value = audio.muted ? 0 : audio.volume;
    volIcon.style.transform = audio.muted ? "scale(0.9)" : "scale(1)";
    setTimeout(() => {
        volIcon.style.transform = "scale(1)";
    }, 200);
});

renderPlaylist();
loadTrack(0);
