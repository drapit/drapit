export const name = process.env.API_NAME || 'DDD Template';
export const port = parseInt(process.env.API_PORT || '3000', 10);
export const payloadSize = process.env.API_PAYLOAD_MAX_SIZE;
export const rootDir = `${process.env.ROOT_DIR}`;
