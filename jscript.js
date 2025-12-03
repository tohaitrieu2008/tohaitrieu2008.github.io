const a=audio,p=play,b=bar,t=time;
p.onclick=()=>{a.paused?a.play():a.pause();p.textContent=a.paused?'▶':'❚❚'};
a.ontimeupdate=()=>{b.style.width=(a.currentTime/a.duration*100)+'%';t.textContent=`${Math.floor(a.currentTime/60)}:${Math.floor(a.currentTime%60).toString().padStart(2,'0')}`};
const volumeSlider = document.getElementById("volume");
// Thay đổi âm lượng
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});
