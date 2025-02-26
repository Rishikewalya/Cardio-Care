import React, { useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

const connectToSmartwatch = async () => {
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error("Scan error:", error);
      return;
    }

    // Filter by smartwatch name or ID
    if (device.name === "stormcall3_0262") {
      console.log("Device found:", device.name);

      // Stop scanning once device is found
      manager.stopDeviceScan();

      // Connect to the smartwatch
      device.connect()
        .then((connectedDevice) => {
          console.log("Connected to smartwatch:", connectedDevice.name);
          return connectedDevice.discoverAllServicesAndCharacteristics();
        })
        .catch((error) => {
          console.error("Connection error:", error);
        });
    }
  });
};

const App = () => {
  useEffect(() => {
    connectToSmartwatch();
    return () => manager.destroy();  // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>Connecting to Smartwatch...</h1>
    </div>
  );
};

export default App;
