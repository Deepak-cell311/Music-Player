const play = document.getElementById("play");
          const music = document.querySelector("audio");
          const image = document.querySelector("img")
          const artist = document.getElementById("artist")
          const title = document.getElementById("title")
          const previous = document.getElementById("prev")
          const next = document.getElementById("next")
          let progress = document.getElementById('progress')
          let total_duration = document.getElementById('duration')
          let total_currentTime = document.getElementById("current_time")
          const progress_div = document.getElementById("progress_div")

          const songs = [
               {
                    name: "One Love-(PagalWorld)",
                    title: "One Love1",
                    artist: "Subh",
                    image: "image-1"
               },
               {
                    name: "Cheques(PagalWorld.com.se)",
                    title: "Cheque",
                    artist: "Subh",
                    image: "image-1"
               },
               {
                    title: "Jine nahi Dunga",
                    artist: "Jadu",
                    name: "Jinne nahi dunga",
                    image: "image-1"
               },
               {
                    name: "Unstoppable(PaglaSongs)",
                    title: "Unstopable",
                    artist: "Cheap thrills",
                    image: "image-1"
               }
          ]
          let isplaying = false;

          const playMusic = () => {
               music.play();
               isplaying = true;
               play.classList.replace('fa-play', 'fa-pause');
               image.classList.add("anime")
          };


          const pauseMusic = () => {
               music.pause();
               isplaying = false;
               play.classList.replace('fa-pause', 'fa-play');
               image.classList.remove("anime")
          };

          play.addEventListener('click', () => {
               if (isplaying) {
                    pauseMusic();
               }
               else {
                    playMusic();
               }
          });

         
          const loadSong = (songs) => {
               title.textContent = songs.title;
               artist.textContent = songs.artist;
               music.src = `Music/${songs.name}.mp3`;
               image.src = `images/${songs.image}.jpg`;
          }
          songIndex = 0;
          
          const nextSong = () => {
               songIndex = (songIndex + 1) % songs.length;
               loadSong(songs[songIndex]); 
               playMusic();
          }

          const prevSong = () => {
               songIndex = (songIndex - 1 + songs.length) % songs.length;
               loadSong(songs[songIndex]);
               playMusic();
          }
          
          music.addEventListener('timeupdate', (event) => {
                const {currentTime, duration} = event.srcElement;
                let progress_time = (currentTime/duration)*100;
                progress.style.width = `${progress_time}%`;

                let min_duration = Math.floor(duration / 60);
                let sec_duration = Math.floor(duration % 60);

                let tot_duration = `${min_duration}:${sec_duration}`;
               if(duration){
                 total_duration.textContent =  `${tot_duration}`
               }

               //Current time

                let min_currentTime = Math.floor(currentTime / 60);
                let sec_currentTime = Math.floor(currentTime % 60);
               if(sec_currentTime < 10){
                    sec_currentTime =  `0${sec_currentTime} `
               }

                let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
               
                 total_currentTime.textContent =  `${tot_currentTime}`
          })


          progress_div.addEventListener('click', (event) => {
               const  {duration} = music
               
               let move_progress = (event.offsetX/event.srcElement.clientWidth)*duration
               music.currentTime = move_progress
          })
          music.addEventListener("ended", nextSong)

          next.addEventListener('click', nextSong);
          previous.addEventListener('click', prevSong);


