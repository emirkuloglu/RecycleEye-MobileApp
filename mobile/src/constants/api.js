import Constants from 'expo-constants';

const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost || Constants.manifest?.debuggerHost;
const localhost = debuggerHost?.split(':')[0] || 'localhost';

export const API_URL = `http://${localhost}:8000`;
export const DEFAULT_CONFIDENCE = 0.2;
export const REALTIME_CONFIDENCE = 0.25;
export const DETECTION_INTERVAL = 1200; // ms
