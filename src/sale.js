import socket from './client.js';

export const readAll = async (req, res) => {
	try {
		const query = {
			type: 'READALL',
		};

		const response = await socket.sendMessage(JSON.stringify(query) + '\r\n');

		if (!response) {
			res.status(404).json({ message: 'Sales not found' });
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.error('Error in readAll controller:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const read = async (req, res) => {
	try {
		const { id } = req.params;
		const query = {
			type: 'READ',
			venta: {
				id_sales: id,
			},
		};

		const response = await socket.sendMessage(JSON.stringify(query) + '\r\n');

		if (!response) {
			res.status(404).json({ message: `Sale with id ${id} not found` });
			return;
		}

		res.status(200).json(response);
	} catch (error) {
		console.error('Error in read controller:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const create = (req, res) => {
	try {
		const {id_sales, ruc, name, cost_total, detalle_venta } = req.body;

		const query = {
			type: 'CREATE',
			venta: {
                id_sales: id_sales,
				ruc: ruc,
				name: name,
				cost_total:cost_total,
			},
            detalle_venta: detalle_venta,
		};

		socket.sendMessage(JSON.stringify(query) + '\r\n');

		res.status(201).json({ message: 'Request received successfully' });
	} catch (error) {
		console.error('Error in create controller:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const update = (req, res) => {
	try {
		const { id } = req.params;
		const { ruc, name, cost_total, detalle_venta } = req.body;

		const query = {
			type: 'UPDATE',
			venta: {
				id_sales: id,
				ruc: ruc,
				name: name,
				cost_total: cost_total,
			},
            detalle_venta: detalle_venta,
		};

		socket.sendMessage(JSON.stringify(query) + '\r\n');

		res.status(200).json({ message: 'Request received successfully' });
	} catch (error) {
		console.error('Error in update controller:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

export const remove = (req, res) => {
	try {
		const { id } = req.params;

		const query = {
			type: 'DELETE',
			venta: {
				id_sales: id,
			},
		};

		socket.sendMessage(JSON.stringify(query) + '\r\n');

		res.status(200).json({ message: 'Request received successfully' });
	} catch (error) {
		console.error('Error in remove controller:', error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
