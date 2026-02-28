import { StyleSheet } from 'react-native';
import { scale } from '../constants';

export const resultStyles = StyleSheet.create({
  resultContainerFull: {
    flex: 1,
    backgroundColor: '#F0F4F3',
  },
  resultInner: {
    flex: 1,
    padding: scale(16),
    justifyContent: 'space-between',
  },
  // Top Section - Image + Summary
  topSection: {
    alignItems: 'center',
  },
  imageBoxCompact: {
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: scale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  summaryInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(10),
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderRadius: scale(20),
    gap: scale(8),
  },
  summaryIconSmall: {
    fontSize: scale(18),
  },
  summaryTitleSmall: {
    fontSize: scale(14),
    fontWeight: '700',
    color: '#1B5E20',
  },
  summarySubSmall: {
    fontSize: scale(12),
    color: '#558B2F',
    fontWeight: '600',
  },
  // Results Section
  resultsSection: {
    flex: 1,
    marginTop: scale(12),
  },
  resultsList: {
    gap: scale(8),
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    justifyContent: 'space-between',
  },
  // Result Item - Full width
  resultItemFull: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: scale(12),
    borderRadius: scale(12),
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  // Result Item - Compact (for 4+ items)
  resultItemCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: scale(10),
    borderRadius: scale(10),
    borderLeftWidth: 3,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  resultIconSmall: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  resultEmojiSmall: {
    fontSize: scale(20),
  },
  resultInfoCompact: {
    flex: 1,
  },
  classNameSmall: {
    fontSize: scale(13),
    fontWeight: '700',
    color: '#263238',
    marginBottom: scale(4),
  },
  confRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  confBarSmall: {
    flex: 1,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  confFillSmall: {
    height: '100%',
    borderRadius: 3,
  },
  confTextSmall: {
    fontSize: scale(12),
    fontWeight: '700',
    minWidth: scale(32),
  },
  // Empty Result Compact
  emptyResultCompact: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyIconSmall: {
    fontSize: scale(36),
    marginBottom: scale(8),
  },
  emptyTextSmall: {
    fontSize: scale(14),
    color: '#546E7A',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Action Button - Compact
  newBtnCompact: {
    borderRadius: scale(14),
    overflow: 'hidden',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  newBtnGradientCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(14),
  },
  newBtnIconSmall: {
    fontSize: scale(18),
    marginRight: scale(8),
  },
  newBtnTextSmall: {
    color: '#fff',
    fontSize: scale(15),
    fontWeight: '700',
  },
});
