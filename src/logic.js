export { knightMoves, };

function knightMoves(startPosition, endPosition) {
    console.log(`Starting at: [${startPosition[0]},${startPosition[1]}]`);
    console.log(`Ending at: [${endPosition[0]},${endPosition[1]}]`);
  
    if (startPosition[0] === endPosition[0] && startPosition[1] === endPosition[1]) {
      console.log("You made it in 0 moves! Here's your path:");
      console.log(`  [${startPosition[0]},${startPosition[1]}]`);
      return [startPosition];
    }
  
    const queue = [];
    const visitedSet = new Set();
    const initialPath = [startPosition];
  
    queue.push({ position: startPosition, path: initialPath });
    visitedSet.add(`${startPosition[0]},${startPosition[1]}`);
  
    while (queue.length > 0) {
      const currentItem = queue.shift();
      const currentPosition = currentItem.position;
      const currentPath = currentItem.path;
  
      if (currentPosition[0] === endPosition[0] && currentPosition[1] === endPosition[1]) {
        console.log(`You made it in ${currentPath.length - 1} moves! Here's your path:`);
        currentPath.forEach((square) => {
          console.log(`  [${square[0]},${square[1]}]`);
        });
        return currentPath;
      }
  
      const nextPossibleSquares = getPossibleNextMoves(currentPosition);
  
      for (const nextSquare of nextPossibleSquares) {
        const nextSquareKey = `${nextSquare[0]},${nextSquare[1]}}`;
  
        if (!visitedSet.has(nextSquareKey)) {
          visitedSet.add(nextSquareKey);
  
          const newPath = [...currentPath, nextSquare];
  
          queue.push({ position: nextSquare, path: newPath });
        }
      }
    }
  
    console.log("Path not found");
    return null;
  }
  
  const possibleMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];
  
  function getPossibleNextMoves(currentPosition) {
    const [x, y] = currentPosition;
    let validMoves = [];
  
    for (const offsets of possibleMoves) {
      const newX = offsets[0] + x;
      const newY = offsets[1] + y;
  
      if (isValidSquare(newX, newY)) {
        validMoves.push([newX, newY]);
      }
    }
  
    return validMoves;
  }
  
  function isValidSquare(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }