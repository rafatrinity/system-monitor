# Real-Time System Monitoring :fa-dashboard:

This project is a real-time application that monitors and displays system information. It is divided into two parts: the server and the client.

The goal of this MVP project is to demonstrate what native Node.js can do with its streaming library. This project generates performance charts for the system's processor and RAM.

[![CPU usage](doc/sysMonitor.gif "CPU usage")]('https://www.youtube.com/watch?v=qaddbspjUS0' "CPU usage")

## Prerequisites :fa-list-alt:

- Node.js v18.0.0 or higher

## Server :fa-hdd-o:

The server uses the OS library from Node.js to collect system data. It creates a stream with this data and exposes it through an endpoint.

To run the server, just run the command `npm run dev`.

## Client :fa-area-chart:

The client consumes the system data stream provided by the server and plots charts on the screen using the Chart.js library.

To run the client, follow the steps below:

1. Install dependencies with the command `npm i`.
2. Start the client with the command `npm start`.

## How to use :fa-question-circle:

1. Start the server.
2. Open the client in a web browser.
3. See system information being updated in real time!

## Contributions :fa-group:

Contributions are welcome! To contribute to the project, add an issue and open a card.

## License :fa-institution:

This project is licensed under the GPL license.
