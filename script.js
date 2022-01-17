function MakeMatrix(cols, rows) {
    let a = new Array(cols);

    for (let i = 0; i < a.length; i++) {
        a[i] = new Array(rows);
    }

    return a;
}

let mat;
let cols;
let rows;
let res = 5;

function setup() {
    createCanvas(400, 400);
    cols = width/res
    rows = height/res
    mat = MakeMatrix(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            mat[i][j] = floor(random(2))
        }
    }

    console.table(mat)
}

function draw() {
    background(0);

    for (let i = 0; i < width/res; i++) {
        for (let j = 0; j < height/res; j++) {
            let x = i *  res;
            let y = j * res;

            if (mat[i][j] == 1) {
                fill(255);
                rect(x, y, res, res);
            }
        }
    }

    let next = MakeMatrix(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let n = CountN(mat, i, j);

            let state = mat[i][j];

            if (state == 0 && n == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (n > 3 || n < 2)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }

    mat = next;
}

function CountN(mat, x, y) {
    let sum = 0; 

    for (let i = -1; i < 2; i ++) {
        for (let j = -1; j < 2; j++) {
            let c = (x + i + cols) % cols;
            let r = (y + j + rows) % rows;

            sum += mat[c][r];
        } 
    }

    sum -= mat[x][y];

    return sum;
}
