import "./SideNav.css";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useRef, useEffect, useState } from "react";
const navLinks = [
  { name: "Home" },
  { name: "Sports" },
  { name: "Clubs" },
  { name: "Charity" },
  { name: "Protests" },
  { name: "Settings" },
];

class SideNav extends React.Component {
  constructor() {
    super();
    this.state = {
      style: "menu",
      innerMenuStyle: "innerMenu",
      menuStatus: "open",
      innerMenuStatus: "open",
      showModal: false,
      selectedTab: "",
    };
    this.OpenMenu = this.OpenMenu.bind(this);
    this.CloseMenu = this.CloseMenu.bind(this);
    this.OpenInnerMenu = this.OpenInnerMenu.bind(this);
    this.CloseInnerMenu = this.CloseInnerMenu.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = (e) => {
    console.log("showModal");
    this.setState({
      showModal: true,
    });
  };
  OpenMenu() {
    this.setState({
      menuStatus: "close",
      style: "menu active",
    });
  }
  CloseMenu() {
    this.setState({
      menuStatus: "open",
      style: "menu",
      innerMenuStatus: "close",
      innerMenuStyle: "innerMenu",
    });
  }

  OpenInnerMenu(tabName) {
    console.log(tabName);
    this.setState({
      innerMenuStatus: "open",
      innerMenuStyle: "innerMenu hidden",
      selectedTab: tabName,
    });
  }

  CloseInnerMenu() {
    this.setState({
      innerMenuStatus: "close",
      innerMenuStyle: "innerMenu",
    });
  }

  render() {
    return (
      <div style={{ width: "100vw" }}>
        <button className="openMenuButton" onClick={this.OpenMenu}>
          |||
        </button>

        <div
          className={this.state.innerMenuStyle}
          onMouseLeave={this.CloseInnerMenu}
        >
          <div>{this.state.selectedTab == "Home" ? <Home /> : null}</div>
          <div>{this.state.selectedTab == "Sports" ? <Sports /> : null}</div>
          <div>{this.state.selectedTab == "Clubs" ? <Clubs /> : null}</div>
          <div>{this.state.selectedTab == "Charity" ? <Charity /> : null}</div>
          <div>
            {this.state.selectedTab == "Protests" ? <Protests /> : null}
          </div>
          <div>
            {this.state.selectedTab == "Settings" ? <Settings /> : null}
          </div>
        </div>
        <div>
          <div className={this.state.style}>
            <button onClick={this.CloseMenu}>X</button>
            <ul>
              {navLinks.map(({ url, name }) => (
                <li>
                  <a
                    onClick={this.handleClick2}
                    onMouseEnter={() => this.OpenInnerMenu(name)}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function Home() {
  // Declare a new state variable, which we'll call "count"
  const [SavedEvents, SetSavedEventTab] = useState(false);

  return (
    <div style={{ padding: "10px" }}>
      <label>Home</label>
      <p>Welcome to EventX BVringing something to do near you</p>
      <div>
        <button
          className="btn-secondary"
          onClick={() => SetSavedEventTab(true)}
        >
          Saved Events
        </button>
        <button
          className="btn-secondary"
          onClick={() => SetSavedEventTab(false)}
        >
          My Events
        </button>
        <button
          className="btn-secondary"
          onClick={() => SetSavedEventTab(false)}
        >
          +
        </button>
      </div>
      <div>{SavedEvents ? <MyEvents /> : null}</div>
      <div>{!SavedEvents ? <MySavedEvents /> : null}</div>
    </div>
  );
}
function MyEvents() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <ul>
        <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li>{" "}
        <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li>{" "}
        <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li>{" "}
        <li>MINE</li> <li>MINE</li> <li>MINE</li> <li>MINE</li>
      </ul>
    </div>
  );
}
function MySavedEvents() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <ul>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
        <li>TEST</li>
      </ul>
    </div>
  );
}

function Sports() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <label>Football</label>
      </div>
    </div>
  );
}

function Clubs() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <label>Poker</label>
      </div>
    </div>
  );
}

function Charity() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <label>Charity</label>
      </div>
    </div>
  );
}

function Protests() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <label>Protest</label>
      </div>
    </div>
  );
}

function Settings() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "5px", overflowY: "auto" }}>
      <div>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
        <label>Settings</label>
      </div>
    </div>
  );
}

export default SideNav;
