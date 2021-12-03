function clearAllTasks(array) {
  const finalArray = array.filter((object) => object.completed === false);
  return finalArray;
}

function setIndex(array) {
  for (let i = 0; i < array.length; i += 1) {
    const element = array[i];
    element.id = parseInt([i], 10) + 1;
  }
}

export { clearAllTasks, setIndex };
