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
const getAllNeighborsInOrder = (matrix, pos, prevPos = null) => {
    let neighbors = [];
    let rotation = [-1, -1];
    if (prevPos) {
        rotation = [prevPos[0] - pos[0], prevPos[1] - pos[1]];
    }
    // For the 8 neighbors, rotate and add them
    for (let i = 0; i < 8; i++) {
        // Rotate
        rotation = nextLeftNeighbor(rotation);
        neighbors.push([pos[0] + rotation[0], pos[1] + rotation[1]]);
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

const createEmptyMatrix = (rows, columns) => {
    let matrix = Array(rows);
    for (let i = 0; i < rows; i++) {
        matrix[i] = Array(columns);
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

const clearMatrix = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[i][j] = 0;
        }
    }
}

const findPath = (matrix, startPos) => {
    let visited = createEmptyMatrix(matrix.length, matrix[0].length);
    let queue = Array(0);

    function searchNext(prevPos, pos, start = false) {
        // If reached the starting position (found path)
        if (!start && cmp(pos, startPos)) {
            queue.push(pos);
            console.log("Found path:");
            console.log(queue);
            return queue;
        }
        // If we have been visited already, also return
        if (visited[pos[0]][pos[1]] == 1) {
            return null;
        }
        // Otherwise, add ourselves to the queue, and mark as visited
        queue.push(pos);
        visited[pos[0]][pos[1]] = 1;
        // Search for a path from each neighbor
        let neighbors = findNeighborsInOrder(matrix, pos, prevPos);
        for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];
            if (searchNext(pos, neighbor)) {
                return queue;
            };
        }
        queue.pop();
        return null;
    }

    matrix[startPos[0]][startPos[1]] = 1;
    // Search new paths formed
    let neighbors = findNeighborsInOrder(matrix, startPos, null);
    console.log(neighbors);
    // find path formed by each neighbor
    for (let i = 0; i < neighbors.length; i++) {
        clearMatrix(visited);
        queue = [startPos];
        searchNext(startPos, neighbors[i]);
    }
}

findPath(games.b1, [0,3]);