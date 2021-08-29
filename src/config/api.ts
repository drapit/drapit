// Your project's or company's name.
export const name = process.env.API_NAME || 'Drapit';

// API's port.
export const port = parseInt(`${process.env.API_PORT}`, 10) || 3000;

// Max payload size accepted by the API. (in mb, e.g: 10mb, 23mb, 80mb) 
export const payloadSize = process.env.API_PAYLOAD_MAX_SIZE || '20mb';
