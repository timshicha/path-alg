let games = require('./games.js');

const cmp = (p1, p2) => {
    if (p1[0] == p2[0] && p1[1] == p2[1]) return true;
    return false;
}

const nextLeftNeighbor = (rotation) => {
    if (cmp(rotation, [-1, -1])) return [-1, 0];
    if (cmp(rotation, [-1, 0])) return [-1, 1];
    if (cmp(rotation, [-1, 1])) return [0, 1];
    if (cmp(rotation, [0, 1])) return [1, 1];
    if (cmp(rotation, [1, 1])) return [1, 0];
    if (cmp(rotation, [1, 0])) return [1, -1];
    if (cmp(rotation, [1, -1])) return [0, -1];
    if (cmp(rotation, [0, -1])) return [-1, -1];
    console.log("ERROR: nextLeftNeighbor");
}

// Get all neighboring coordinates in order
const getAllNeighborsInOrder = (matrix, pos, prevPos=null) => {
    let neighbors = [];
    let rotation = [0, 0];
    if (prevPos) {
        rotation = [prevPos[0] - pos[0], prevPos[1] - pos[1]];
    }
    // For the 8 neighbors, rotate and add them
    for (let i = 0; i < 8; i++) {
        // Rotate
        rotation = nextLeftNeighbor(rotation);
        neighbors.push([pos[0] + rotation[0], pos[1] + rotation[1]]);
        // console.log(rotation);
    }
    // If there was a previous position, don't include it as a neighbor
    if (prevPos) {
        neighbors.pop();
    }
    return neighbors;
}

// Filter out all neighbors:
// only include inbounds neighbors and where a 1 is present
const findNeighborsInOrder = (matrix, pos, prevPos) => {
    let realNeighbors = [];
    let max_y = matrix.length - 1;
    let max_x = matrix[0].length - 1;
    let neighbors = getAllNeighborsInOrder(matrix, pos, prevPos);
    
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i][0] >= 0 && neighbors[i][0] <= max_y &&
            neighbors[i][1] >= 0 && neighbors[i][1] <= max_x &&
            matrix[neighbors[i][0]][neighbors[i][1]] == 1) {
            realNeighbors.push(neighbors[i]);
            }
    }
    return realNeighbors;
}

console.log(findNeighborsInOrder(games.b1, [4, 5], [5,6]));