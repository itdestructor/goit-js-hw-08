import Player from '@vimeo/player'
import throttle from 'lodash.throttle'


let myVideo = document.querySelector('iframe')

const vimeoPlayer = new Player(myVideo)

const saveTime = (data) =>{
console.log(data);
localStorage.setItem("videoplayer-current-time",JSON.stringify(data))
}

const initData = JSON.parse(localStorage.getItem('videoplayer-current-time'))
console.log(initData)


if(initData){

const {seconds} = initData
console.log(seconds)
vimeoPlayer.setCurrentTime(seconds)
}


vimeoPlayer.on('timeupdate',throttle(saveTime,1000))



