import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [toggleSwitch, setToggleSwitch] = useState({ bgColor: '#E6007A', transform: 'translateX(150%)' });

  useEffect(async () => {
    const result = await chrome.storage.sync.get(['isExtensionOn']);
    let isExtensionOn = result.isExtensionOn;
    if (isExtensionOn !== true) {
      await chrome.storage.sync.set({ lastState: "OFF" }, () => { console.log('The last state is OFF!!') });
      chrome.storage.sync.set({ isExtensionOn: false }, () => { console.log('Extension is OFF!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "OFF"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({ bgColor: 'gray', transform: 'translateX(0%)' });
    }
  }, [])

  const switchOnClicked = async () => {
    const result = await chrome.storage.sync.get(['isExtensionOn']);
    let isExtensionOn = !result.isExtensionOn;
    if (isExtensionOn) {
      await chrome.storage.sync.set({ lastState: "ON" }, () => { console.log('The last state is On!!') });
      chrome.storage.sync.set({ isExtensionOn: true }, () => { console.log('Extension is On!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "ON"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({ bgColor: '#E6007A', transform: 'translateX(150%)' });
    } else {
      await chrome.storage.sync.set({ lastState: "OFF" }, () => { console.log('The last state is OFF!!') });
      chrome.storage.sync.set({ isExtensionOn: false }, () => { console.log('Extension is OFF!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "OFF"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({ bgColor: 'gray', transform: 'translateX(0%)' });
    }
  }

  const handleClickJoinBtn = () => {
    window.open("https://www.da0xsbt.xyz/soul", "_blank");
  }

  const handleClickVoteBtn = () => {
    window.open("https://www.da0xsbt.xyz/rating", "_blank");
  }

  return (
    <div className="App">
      <div className="header">
        <img src="./soul-256.png" alt="ooak-icon-256" width="48" />
        <span className="header-text">DA0xSBT Extension</span>
        <div className="toggleButton" onClick={() => { switchOnClicked(); }} style={{ 'backgroundColor': toggleSwitch.bgColor }}>
          <div className="toggleSwitchCircle" style={{ 'transform': toggleSwitch.transform }}></div>
        </div>
      </div>
      <div className="main">
        <div className="logo-container">
          <img src="https://d22p4hblaqdu3x.cloudfront.net/0xSBT/sbt-h-128.png" alt="KlayBee" width="84" />
        </div>
        <div className="main-btn-group-container">
          <div className="main-btn-container">
            <button className="main-btn txt-pink" onClick={handleClickJoinBtn}>
              <div className="btn-txt-container">
                JOIN DA0xSBT
              </div>
            </button>
          </div>
          <div className="main-btn-container">
            <button className="main-btn btn-white" onClick={handleClickVoteBtn}>
              <div className="btn-txt-container">
                VOTE FOR DAOs
              </div>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Popup;
