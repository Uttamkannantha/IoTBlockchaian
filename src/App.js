import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as  rs from 'react-bootstrap';
import web3 from './web3';
import lottery from './iot';

//import Dropdownrs.Button from 'react-bootstrap/Dropdownrs.Button';
//import Dropdown from 'react-bootstrap/Dropdown';
class App extends Component {

constructor(props, context) {
      super(props, context);



      this.state = {
        show: false,
        value : '0',
        apiKey:"CIWB7GRWS8FIJV242NHQUGXBN3QPW4QQTJ",
add:"0x493aBFb2aC57BE6a28FaC1d88E1686ABfdE25D55",
        ar:[]
      };
    }
  async  componentDidMount(){

const accounts = await web3.eth.getAccounts();
console.log(accounts);
//accounts.push("k");
this.setState({ar:accounts});


let base='http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=';
let addr=this.state.add;
let mid='&startblock=0&endblock=9999999&sort=asc&apikey=';
let end=this.state.apiKey;
let url=base+addr+mid+end+'&c=json';


      fetch(url,
      {
    },
    ).then(response => {
      if (response.ok) {
        response.json().then(json => {

            this.setState({ data: json.result});

          console.log(json,json.result[0].blockHash,json.result[1].blockHash);
        });
      }
});
    }




  createSelectItems() {

     let items = [];
     for (let i = 0; i < this.state.ar.length; i++) {
          items.push(<option key={i} value={this.state.ar[i]}>{this.state.ar[i]}</option>);
          //here I will be creating my options dynamically based on
          //what props are currently passed to the parent component
     }
     return items;
 }
 onDropdownSelected(e) {
     console.log("THE VAL", e.target.value);
     //here you will see the current selected value of the select input
 }




 // When the user clicks the button, open the modal



render() {
console.log(web3.version);

  return (
<div>


<div >
  < rs.Navbar bg="dark" variant="dark">
    < rs.Navbar.Brand href="#home">BLockchain</ rs.Navbar.Brand>
    < rs.Nav className="mr-auto" >

      < rs.Nav.Link href="#home" >Home</ rs.Nav.Link>
      < rs.Nav.Link href="#features">Features</ rs.Nav.Link>
      < rs.Nav.Link href="#pricing">Pricing</ rs.Nav.Link>

    </ rs.Nav>
       <h4 style={{color:"white"}}>{this.state.value}</h4>

  </ rs.Navbar>
  <br />

</div>



<div >


<select  class="button" style={{backgroundColor:""}} value = {this.state.value}
onChange = {event => this.setState({value : event.target.value})}>
 {this.createSelectItems()}
</select>

<button class="button " >Enter Device</button>
<button class="button "  >Send data privately</button>
<button class="button "  >Publish data</button>
<button class="button " >Read private data</button>
<button class="button " >Read published data</button>


</div>

<div style={{height:"20px"}}>
</div>

<div >
  <div class="column" style={{backgroundColor:"#f0f0f0"}} id ="rcorners2">

      <table id="customers">
  <tr>
    <th>BlockHash</th>
     <th>Time Stamp</th>
     <th>Block Number</th>
     <th>Gas Used</th>
     <th>Sent To</th>
  </tr>
  {(this.state.data).map((post,index)=>{
  return(<tr>
    <th>{post.blockHash}</th>
    <th>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(post.timeStamp*1000)}</th>
    <th>{post.blockNumber}</th>
    <th>{post.gasUsed}</th>
    <th>{post.to}</th>
    </tr>
  )
  }
  )
  }
</table>
  </div>
</div>
</div>
  );
}
}
export default App;
