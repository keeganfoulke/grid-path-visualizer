export function dijkstra(grid, startNode, finishNode) {
  const visitednodesInOrder = [];
  if (!startNode || !finishNode || startNode === finishNode) {
    return false;
  }
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    //skip walls
    if (closestNode.isWall) continue;
    //if theres no path, quit
    if (closestNode.distance === Infinity) return visitednodesInOrder;
    closestNode.isVisited = true;
    visitednodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitednodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, table) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(table[row - 1][col]);
  if (row < table.length - 1) neighbors.push(table[row + 1][col]);
  if (col > 0) neighbors.push(table[row][col - 1]);
  if (col < table[0].length - 1) neighbors.push(table[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
