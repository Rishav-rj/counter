let countInterval;
let sound = new Audio("alarm-sound.mp3")

function startCounter() {
  const number = parseInt(document.getElementById("number").value);
  const currentNos = document.querySelectorAll(".current");
  const nextNos = document.querySelectorAll(".next");

  resetNumbers(currentNos, nextNos);
  clearInterval(countInterval);

  if (!number || number < 1 || number > 99999) {
    alert("Please enter a number between 1 and 99999");
    return;
  }
  
  

  countInterval = setInterval(() => {
    let count = "";
    for(let k = 0; k<5; k++){
      count += currentNos[k].innerHTML
    }

    count = parseInt(count)

    if (count === number) {
      clearInterval(countInterval);
      sound.play()
      sound.loop = true;
      if (confirm("Counter completed, click OK to stop the alarm") == true){
        sound.pause();
      }
      document.getElementById("number").value = "";
      resetNumbers(currentNos, nextNos)
    }

    if (parseInt(currentNos[4].innerHTML) === 9) {
      for (let i = 4; i >= 0; i--) {
        increaseCount(currentNos[i], nextNos[i]);

        if (parseInt(currentNos[i].innerHTML) !== 9) break;
        nextNos[i].innerHTML = 0;
      }
    } else {
      if (count !== number){
        increaseCount(currentNos[4], nextNos[4]);
      }
    }
  }, 1000);
}

function resetNumbers(currentNos, nextNos) {
  currentNos.forEach((current, index) => {
    current.innerHTML = 0;
    nextNos[index].innerHTML = 1;
  });
}

function increaseCount(currentNo, nextNo) {
  nextNo.classList.add("animate");
  setTimeout(() => {
    nextNo.classList.remove("animate");
    currentNo.innerHTML = nextNo.innerHTML;
    nextNo.innerHTML = parseInt(nextNo.innerHTML) + 1;
  }, 500);
}