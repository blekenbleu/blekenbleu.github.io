13 Dec 2021
## Node.js WebSocket MIDI server
#### Background
- [ESP32-S2 supports composite USB](ESP32/midi.htm), but not reliably including MIDI
- [MIDI over Wi-Fi is a "thing"](MIDI/index.htm) (but mostly Apple MIDI via UDP)
- MIDI over TCP is reliable, but needs WebSocket for speed
- [mnet MIDIHub](https://xmmc.de/mnet) serves some unsupported flavor of WebSocket MIDI
- Many WebSocket MIDI implementations are in JavaScript,  
  mostly for Node.js.  
- [WebMIDI](https://www.midi.org/midi-articles/about-web-midi) is about browser-based MIDI apps,
  [not necessarily networked](https://webmidi.info).
- [WEBMIDI.js](https://www.npmjs.com/package/webmidi) implements WebMIDI for Node.js,  
  but is also specifically about locally-attached MIDI devices,  
  *not* WebSocket MIDI
- [node-midi](https://github.com/justinlatimer/node-midi) is basic MIDI I/O (device) support for Node.js  

### [node-midisrv](https://www.npmjs.com/package/midisrv) is a MIDI websocket client & server, running on node.js  
- does *not* include a browser JavaScript client
- server does not receive by WebSocket and send to device
- includes [mididump.js for debugging](https://git.nroo.de/norwin/midiserver)
- [midisocket](https://github.com/vine77/midisocket) is another Node.js websocket MIDI client-server
- [midiServer](https://github.com/PauloSeb/midiServer) is yet *another* MIDI websocket nodeJS server *in a single file*
- [midi-websocket](https://github.com/fa-m/midi-websocket) has a simple Node.js websocket server and browser client - [fork](https://github.com/fa-m/midi-websocket)  
- [James Byrd wrote a WebSocket MIDI article](https://medium.com/@jbprojectlab/how-to-make-a-real-time-music-application-using-websockets-56776990c558) about using Node.js  
- [Tutorial: How to create a MIDI synthesizer with MIDI API and Node JS](https://medium.com/nebo-15/tutorial-how-to-create-midi-synthesizer-with-midi-api-and-node-js-48d41c162009)

### [MIDI WebSocket for JavaScript](https://github.com/hhromic/midi-websocket/tree/master/javascript), a browser WebSocket MIDI client  
  also Node.js client and server &nbsp whether and how compatible with e.g. mnet MIDIHub is unknown..  
- [HTML5 - WebSockets](https://www.tutorialspoint.com/html5/html5_websocket.htm) includes Client Side HTML & JavaScript Code
- [How to Set Up a Websocket Client with JavaScript](https://cheatcode.co/tutorials/how-to-set-up-a-websocket-client-with-javascript)
