import { StyleSheet } from 'react-native';
import { scale } from '../constants';

export const cameraStyles = StyleSheet.create({
  camContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // Scan Line
  scanLine: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 3,
  },
  scanLineGradient: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  // Status Badge
  statusContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statusScanning: {
    backgroundColor: 'rgba(46, 204, 113, 0.95)',
  },
  statusReady: {
    backgroundColor: 'rgba(52, 73, 94, 0.9)',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  dotActive: {
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  dotReady: {
    backgroundColor: '#95a5a6',
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  // Detection Badge
  badge: {
    position: 'absolute',
    top: 60,
    right: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  badgeGradient: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: scale(14),
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  // Detection List
  detListContainer: {
    position: 'absolute',
    bottom: 140,
    left: 0,
    right: 0,
  },
  detListContent: {
    paddingHorizontal: 16,
  },
  detItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  detEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  detInfo: {
    flexDirection: 'column',
  },
  detName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  detConf: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    fontWeight: '600',
  },
  // Camera Controls
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 30,
  },
  controlBtn: {
    alignItems: 'center',
  },
  controlBtnInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBtnIcon: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
  },
  controlBtnLabel: {
    color: '#fff',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  captureBtn: {
    alignItems: 'center',
  },
  captureBtnOuter: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  captureBtnInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtnCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#1B5E20',
  },
  // Bounding Box Label
  proLabel: {
    position: 'absolute',
    top: -28,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  proLabelText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
