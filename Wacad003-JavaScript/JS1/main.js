document.addEventListener("DOMContentLoaded", function () {

  const customName = document.getElementById('customname');
  const randomize = document.querySelector('.randomize');
  const story = document.querySelector('.story');

  function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  let storyText = "Estava fazendo 34 graus lá fora, então :insertx: apareceu :inserty:. De repente, :insertz:. Bob viu tudo, mas não ficou surpreso — essa pessoa pesa 136 quilos, e estava um dia quente.";

  let insertX = ["uma abóbora falante", "um cachorro bêbado", "um mamute perneta"];
  let insertY = ["no quintal", "no telhado", "na faculdade"];
  let insertZ = ["escorregou no chão", "tomou todas", "teve uma desilusão amorosa"];

  randomize.addEventListener('click', result);

  function result() {
    let newStory = storyText;

    let xItem = randomValueFromArray(insertX);
    let yItem = randomValueFromArray(insertY);
    let zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(/:insertx:/g, xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

    if (customName.value !== '') {
      newStory = newStory.replace("Bob", customName.value);
    }

    if (document.getElementById("uk").checked) {
      let weight = Math.round(136 / 6.35) + " stone";
      let temperature = Math.round((34 * 9/5) + 32) + " fahrenheit";

      newStory = newStory.replace("34 graus", temperature);
      newStory = newStory.replace("136 quilos", weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';
  }

});
