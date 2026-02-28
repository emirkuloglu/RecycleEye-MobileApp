import { StyleSheet } from 'react-native';
import { scale } from '../constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F3',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F3',
  },
  header: {
    backgroundColor: '#1B5E20',
    paddingVertical: scale(18),
    paddingHorizontal: scale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: scale(22),
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerCompact: {
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    alignItems: 'center',
  },
  headerTextCompact: {
    color: '#fff',
    fontSize: scale(18),
    fontWeight: '700',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: scale(18),
    fontSize: scale(19),
    color: '#1B5E20',
    fontWeight: '700',
  },
});
