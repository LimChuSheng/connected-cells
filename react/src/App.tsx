import * as React from 'react';
import './App.css';


class App extends React.Component<any, any> {
  constructor(props: any) {
       super(props);
       this.state= {row: 4, cols:4 , matrix:[], checked:[],lowestDepth:0};
       this.state.matrix=this.loopMatrixInput()

   }
   loopMatrixInput(){
     var matrixs=[]
     for (let i = 0; i < this.state.row; i++) {
       var x =[]
       matrixs[i]= [];
       for (let j = 0; j < this.state.cols; j++) {
         x[j] =`${i},${j}`;
       }
       matrixs[i]= x;
     }
     return matrixs;
   }
   onRowChange(e:any){
     this.state.row = e.target.value
     this.setState({matrix: this.loopMatrixInput()})
   }
   onColumnChange(e:any){
     this.state.cols = e.target.value
     this.setState({matrix: this.loopMatrixInput()})
   }

   onClick(){
     var data =this.refs
     var checked = [];
     this.state.lowestDepth =0
     for (var i = 0; i < this.state.matrix.length; i++) {
         var m = this.state.matrix[i];
         var x =[]
         for (var j = 0; j < m.length; j++) {
             // console.log(m[j])
             x[j] = false;
         }
         checked[i] = x;
     }
     for (var i = 0; i < this.state.matrix.length; i++) {
         var m = this.state.matrix[i];
         for (var j = 0; j < m.length; j++) {
             this.traversalDepth = 0;
             var depth = this.deepDown(data, i, j, checked);
             if (depth > this.state.lowestDepth) {
                 this.setState({lowestDepth:depth})
             }
         }
     }
   }
   traversalDepth:number = 0;
  deepDown(matrix:any, i:number, j:number, checked:any) {

       if (i >= 0 && matrix[i+','+j]!=null&&
           j >= 0 &&
           matrix[i+','+j]['value'] != 0 &&
           checked[i][j] != true) {

           this.traversalDepth++;
           //save checked
           checked[i][j] = true;
           //go right
           this.deepDown(matrix, i, j + 1, checked);
           //go left
           this.deepDown(matrix, i, j - 1, checked);
           //go bottom
           this.deepDown(matrix, i + 1, j, checked);
           //go top
           this.deepDown(matrix, i - 1, j, checked);
           //go top right
           this.deepDown(matrix, i - 1, j + 1, checked);
           //go top left
           this.deepDown(matrix, i - 1, j - 1, checked);
           //go bottom left
           this.deepDown(matrix, i + 1, j - 1, checked);
           //go bottom right
           this.deepDown(matrix, i + 1, j + 1, checked);
       }
       return this.traversalDepth;
   }
  render() {
    var matrix = this.state.matrix.map((rows:any, i:number) => {
      return <div key={i}>
        {rows.map((cols:any, j:number) => {
         return <input ref={`${i},${j}`} key={`${i},${j}`} defaultValue={"0"} /> })
        }
      </div> ;
    });

    return (
      <div className="App">
        <div >
          <span>Row &nbsp;&nbsp;&nbsp;&nbsp;:</span>
          <input type="number" onChange={e =>this.onRowChange(e)} defaultValue="4"/>

        </div>
        <div>
          <span>Column:</span>
          <input type="number" onChange={e =>this.onColumnChange(e)} defaultValue="4"/>

        </div>
        {matrix}


        <div> (Answer: {this.state.lowestDepth} )</div>
        <input type="button" value="Find largest Region" onClick={this.onClick.bind(this)}/>
      </div>
    );
  }
}

export default App;
