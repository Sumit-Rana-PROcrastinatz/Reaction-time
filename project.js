const home=document.querySelector(".home");
const area = document.querySelector(".area");
const challenge = document.querySelector(".challenge");
const after = document.querySelector(".after");
const yourtime = document.querySelector(".after  .yourtime");
const button = document.querySelector(".after .button");
const challengebutton = document.querySelector(".challengebutton")

let timer;
let greendisplayed;
let time;
let waitingforstart;
let waitingforgreen;
let scores;

const init = () => {
    greendisplayed= false;
    waitingforstart = false;
    waitingforgreen = false;
    scores = [];

};

init();

const setgreen = () => {
    area.style.backgroundColor = "#32cd32";
    challenge.innerHTML = "Click Now !";
    challenge.style.color = "#111";
    greendisplayed = true;
    time = Date.now();
}

const start = () => {
    area.style.backgroundColor = "#c1121f";
    challenge.innerHTML = "Wait for the Green Colour ";
    challenge.style.color = "#fff";

    let randomno= Math.floor(Math.random()*3000 + 2000);
    timer = setTimeout(setgreen, randomno);

    waitingforstart = false;
    waitingforgreen =true;

    console.log("randomno : ", randomno);
};

challengebutton.addEventListener("click", ()=>{
    home.classList.remove("active");
    start();
});

const endgame = () => {
    after.classList.add("active");
    clearTimeout(timer);

    let total=0;

    scores.forEach((s)=>{
        total+=s;
    });

    let avg = Math.round(total/scores.length);

    console.log("total : ",total);
    console.log("avg : ", avg);

    yourtime.innerHTML = `${avg} ms`;
}

const displayrt = (rt) => {
    area.style.backgroundColor = "#faf0ca";
    challenge.innerHTML =`<div class='yourtime'>${rt} ms </div>Click to Continue.`;
    greendisplayed = false ;
    waitingforstart= true;
    scores.push(rt);

    if (scores.length >=3){
        endgame();
    };

};

const displaytoosoon = () => {
    area.style.backgroundColor = "#faf0ca";
    challenge.innerHTML = "Too soon. Click to continue.";
    challenge.style.color = "#111";
    waitingforstart = true;
    clearTimeout(timer);
}

area.addEventListener("click", ()=>{
    if (greendisplayed){
        let clicktime = Date.now();
        let reactiontime = clicktime - time ;
        console.log("reaction time : ", reactiontime);

        displayrt(reactiontime);
        return;
    }

    if (waitingforstart){
        start();
        return;
    }

    if(waitingforgreen){
        displaytoosoon();
    }
})

button.addEventListener("click", () => {
    after.classList.remove("active");
    init();
    start();
});
