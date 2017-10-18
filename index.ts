var matrix: number[][] =
[
    [ 1,1,0,0,1],
    [ 0,1,1,0,1],
    [ 0,0,1,0,1],
    [ 1,0,1,0,1],
    [ 1,0,1,0,0],

];

var checked: boolean[][] = []

for(var i = 0; i < matrix.length; i++) {
    var m = matrix[i];
    checked[i] =[]
    for(var j = 0; j < m.length; j++) {
        // console.log(m[j])
        checked[i][j] = false
    }
}
var traversalDepth :number = 0
var lowestDepth :number = 0

function deepDown (matrix : number[][], i:number, j:number, checked: boolean[][]){
  // console.log("i" +i +'-'+"j" +j)

  if(i>=0 && i <matrix.length &&
     j>=0 && j <matrix[0].length && matrix[i][j] !=0 && checked[i][j] != true){
       traversalDepth++;
       console.log(matrix[i][j])
       //save checked
       checked[i][j] = true
       //go right
       deepDown(matrix, i, j+1, checked)
       //go left
       deepDown(matrix, i, j-1, checked)
       //go bottom
       deepDown(matrix, i+1, j, checked)
       //go top
       deepDown(matrix, i-1, j, checked)
       //go top right
       deepDown(matrix, i-1, j+1, checked)
       //go top left
       deepDown(matrix, i-1, j-1, checked)
       //go bottom left
       deepDown(matrix, i+1, j-1, checked)
       //go bottom right
       deepDown(matrix, i+1, j+1, checked)


     }
  return traversalDepth;
}

for(var i = 0; i < matrix.length; i++) {
    var m = matrix[i];
    for(var j = 0; j < m.length; j++) {
        traversalDepth=0
        var depth =deepDown(matrix, i,j, checked)
        if(depth> lowestDepth){
          lowestDepth = depth
        }
    }
}

// console.log(deepDown(matrix, 0,0, checked))
console.log(lowestDepth)
