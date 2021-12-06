const randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].sort(() => Math.random() - 0.5);
const heights = randomArray.map((item) => item * 10);
const nodeList = [...document.querySelectorAll('.item')];

// add height value to each node
for (let i = 0; i < nodeList.length; i++) {
  nodeList[i].style.height = `${heights[i]}px`;
}

function* sort_visualization() {
  while (true) {
    let flag = false;

    for (let i = 0; i < nodeList.length; i++) {
      yield;

      if (nodeList[i + 1]) {
        let currentElement = nodeList[i];
        let nextElement = nodeList[i + 1];

        const heightOfCurrentElement = parseInt(currentElement.style.height);
        const heightOfNextElement = parseInt(nextElement.style.height);

        if (heightOfCurrentElement > heightOfNextElement) {
          const pos1 = parseInt(currentElement.style.transform.split('(')[1]) || 0;
          const pos2 = parseInt(nextElement.style.transform.split('(')[1]) || 0;

          // change transform styles
          currentElement.style.transform = `translate(${pos1 + 63}px)`;
          nextElement.style.transform = `translate(${pos2 - 63}px)`;

          // swap elements
          [nodeList[i], nodeList[i + 1]] = [nodeList[i + 1], nodeList[i]];
          flag = true;
        }
      }
    }

    if (!flag) {
      break;
    }
  }
}

const generator = sort_visualization();

const start = (ms) => {
  console.log(ms);
  const result = generator.next();
  if (result.done) {
    return;
  }
  setTimeout(() => {
    start(ms);
  }, ms);
};

const INTERVAL = 200;

start(INTERVAL);
