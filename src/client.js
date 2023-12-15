import net from 'net';

class Client {
	constructor() {
		this.connected = false;
		this.socket = null;
	}

	async sendMessage(message) {
		return new Promise((resolve) => {
			this.socket.write(message);
			this.responsePromise = resolve;
		});
	}

	resolveResponsePromise(data) {
		this.responsePromise(data);
		this.responsePromise = null;
	}

	isConnected() {
		return this.connected;
	}

    async tryConnect(port, address) {
        return new Promise((resolve, reject) => {
            this.socket = new net.Socket();
                this.addListenerConnect(() => resolve({ success: true}));
                this.addListenerError(()=> console.log(''));
                this.addListennerData(()=> console.log(''));
                this.addCloseListener(() => reject({ success: false}));
                this.socket.connect(port, address);
        });
    }

	addListenerConnect(callback) {
		this.socket.on('connect', () => {
			console.log('Server socket connection established in port:', this.socket.remotePort);
			this.connected = true;
			callback();
		});
	}

	addListennerData(callback) {
		this.socket.on('data', (data) => {
			const dataJson = JSON.parse(data.toString());
			this.resolveResponsePromise(dataJson);
			console.log('data received', data.toString());
		});
        callback();
	}

	addListenerError(callback) {
		this.socket.on('error', (error) => {
            if(error.code === 'ECONNREFUSED') {
                console.log('Trying to connect to another server');
            }
			callback();
		});
	}

    addCloseListener(callback) {
		this.socket.on('close', () => {
			this.connected = false;
			this.close();
			callback();
		});
	}

	close() {
		this.socket.removeAllListeners();
		this.socket.destroy();
		this.socket = null;
	}
}

const socket = new Client();

export default socket;

// async tryConnect() {
//     return new Promise((resolve, reject) => {
//         const tryNextServer = async (index) => {
//             if (index >= this.servers.length) {
//                 reject({ success: false, message: 'No servers available' });
//                 return;
//             }
//             const server = this.servers[index];
//             this.socket = new net.Socket();
//             this.addListenerConnect(() => {
//                 resolve({ success: true, message: 'Server connected' });
//                 return;
//             });
//             this.addCloseListener(() => tryNextServer(index + 1));
//             this.addListenerError(() => console.log(''));
//             this.addListennerData(() => console.log(''));
//             this.socket.connect(server.port, server.host);
//         };

//         tryNextServer(0);
//     });
// }