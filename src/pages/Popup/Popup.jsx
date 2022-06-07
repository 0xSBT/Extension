import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [toggleSwitch, setToggleSwitch] = useState({bgColor: '#7C5CBF', transform: 'translateX(150%)'});

  useEffect(async() => {
    const result = await chrome.storage.sync.get(['isExtensionOn']);
    let isExtensionOn = result.isExtensionOn;
    if(isExtensionOn !== true) {
      await chrome.storage.sync.set({ lastState: "OFF" }, () => { console.log('The last state is OFF!!') });
      chrome.storage.sync.set({ isExtensionOn: false }, () => { console.log('Extension is OFF!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "OFF"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({bgColor: 'gray', transform: 'translateX(0%)'});
    }
  },[])

  const switchOnClicked = async() => {
    const result = await chrome.storage.sync.get(['isExtensionOn']);
    let isExtensionOn = !result.isExtensionOn;
    if(isExtensionOn){
      await chrome.storage.sync.set({ lastState: "ON" }, () => { console.log('The last state is On!!') });
      chrome.storage.sync.set({ isExtensionOn: true }, () => { console.log('Extension is On!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "ON"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({bgColor: '#7C5CBF', transform: 'translateX(150%)'});
    } else {
      await chrome.storage.sync.set({ lastState: "OFF" }, () => { console.log('The last state is OFF!!') });
      chrome.storage.sync.set({ isExtensionOn: false }, () => { console.log('Extension is OFF!!') });
      chrome.runtime.sendMessage({
        message: 'setBadgeState',
        state: "OFF"
      }, (response) => {
        if (!response.success) console.log("setBadgeState message error!")
      });
      setToggleSwitch({bgColor: 'gray', transform: 'translateX(0%)'});
    }
  }

  return (
    <div className="App">
      <div className="header">
        <img src="./ooak-icon-256.png" alt="ooak-icon-256" width="48" />
        <span className="header-text">OOAK extension</span>
        <div className="toggleButton" onClick={() => { switchOnClicked(); }} style={{ 'backgroundColor': toggleSwitch.bgColor }}>
          <div className="toggleSwitchCircle" style={{ 'transform': toggleSwitch.transform }}></div>
        </div>
      </div>
      <div className="main">
        <span><img src="https://gateway.pinata.cloud/ipfs/QmZCnTukDNb35CVrpcnuvM5bA3Rtj2k6ZqccbWHJjToB5L" alt="KlayBee" width="64" /></span>
        <span className="main-text">KlayBee is coming soon!!</span>
      </div>
    </div>
  );
};

export default Popup;
