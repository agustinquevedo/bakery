import React from 'react';
import './App.scss';
import cookie from './img/cookie.png';
import axios from 'axios';
import faker from  'faker';

const api = axios.create({
  baseURL: `http://localhost:4000/clients`
})

export default class App extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      clients: []
    }
    this.changeTheme = this.changeTheme.bind(this);
    this.mailboxBrooken = this.mailboxBrooken.bind(this);
  }
  
  getClients = async () => {
    let data = await api.get('/').then(({data})=>data);
    this.setState({ client: data })
  }

  createOrder = async () => {
    const randomName = faker.name.findName();
    const randomId = faker.random.uuid();

    if ( this.state.theme === "light" ){
      let res = await api.post('/', { id: randomId, name: randomName, date: Date()})
      console.log("This is a new cookies order!")
      console.log(res)
    }
    else {
      console.log("Oh no! The Bakery is Closed")
    }
    this.getClients()
  }

  changeTheme() {
    const theme = this.state.theme === "light" ? "dark" : "light";
    document.documentElement.classList.add("color-theme-in-transition");
    this.setState({ theme });
    document.documentElement.setAttribute("data-theme", theme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("color-theme-in-transition");
    }, 1000);  
  };

  mailboxBrooken() {
    if( this.state.theme === "dark" ){
      document.getElementById("Mailbox").classList.add("in-the-floor")
      console.log("The Mailbox is brooken")
    }
  }

  render() {
    return (
      <div className="App">
        <main className="Top">

          {/* <div className="Switch">
            <input type="checkbox" id="switch" name="theme"/>
            <label htmlFor="switch" onClick={ this.changeTheme }/>
          </div> */}

          <div className={"Sun-and-moon" + ( this.state.theme === "light" ? " isDay" : " isNight" )}>
              <div className="Sun" onClick={ this.changeTheme }/>
              <div className="Moon" onClick={ this.changeTheme }/>
          </div>
          
          <div className="Bakery">
            <div className="Roof"></div>
            <div className="Letter">
              Cookie Bakery
            </div>
            <div className="Box">
              <div className={"Window" + ( this.state.theme === "light" ? " " : " dont-be-a-cookie" )} />
              <img src={cookie} alt="cookie" className="Cookie cookie-l"/>
              <div id="Door" className={"Door" + ( this.state.theme === "light" ? " " : " bakery-closed" )} onClick={this.createOrder}></div>
              <div className={"Window" + ( this.state.theme === "light" ? " " : " dont-be-a-cookie" )} />
              <img src={cookie} alt="cookie" className="Cookie cookie-r"/>
              <div id="Mailbox" className={"Mailbox" + ( this.state.theme === "light" ? " " : " brooken" )} onClick={this.mailboxBrooken}/>
            </div>
          </div>
        </main>
        <footer className="Bottom" />
      </div>
    )
  };
}