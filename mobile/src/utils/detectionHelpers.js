import { SCREEN_WIDTH, SCREEN_HEIGHT, scale } from '../constants';

/**
 * Kamera önizlemesi için gerçek zamanlı bounding box boyutlarını hesapla
 * @param {Array} detections - Tespit edilen nesneler
 * @param {Object} imageSize - Orijinal görüntü boyutu {width, height}
 * @returns {Array} - Hesaplanmış box pozisyonları
 */
export const calculateRealtimeBoxes = (detections, imageSize) => {
  if (!detections.length || imageSize.width === 0) return [];

  const previewHeight = SCREEN_HEIGHT - 180;
  const previewWidth = SCREEN_WIDTH;
  const photoAspect = imageSize.width / imageSize.height;
  const previewAspect = previewWidth / previewHeight;

  let displayWidth, displayHeight, offsetX = 0, offsetY = 0;

  if (photoAspect > previewAspect) {
    displayHeight = previewHeight;
    displayWidth = displayHeight * photoAspect;
    offsetX = (previewWidth - displayWidth) / 2;
  } else {
    displayWidth = previewWidth;
    displayHeight = displayWidth / photoAspect;
    offsetY = (previewHeight - displayHeight) / 2;
  }

  const scaleX = displayWidth / imageSize.width;
  const scaleY = displayHeight / imageSize.height;

  return detections.map((det) => ({
    ...det,
    displayBox: {
      left: det.bbox.x1 * scaleX + offsetX,
      top: det.bbox.y1 * scaleY + offsetY,
      width: (det.bbox.x2 - det.bbox.x1) * scaleX,
      height: (det.bbox.y2 - det.bbox.y1) * scaleY,
    },
  }));
};

/**
 * Sonuç ekranı için görüntü boyutlarını hesapla (contain mode)
 * @param {Object} imageSize - Orijinal görüntü boyutu {width, height}
 * @returns {Object} - Display boyutları ve offsetler
 */
export const calculateResultDisplayDimensions = (imageSize) => {
  const containerWidth = SCREEN_WIDTH - scale(32);
  const availableHeight = SCREEN_HEIGHT - 180;
  const maxImageHeight = availableHeight * 0.45;

  if (imageSize.width === 0 || imageSize.height === 0) {
    return { displayWidth: containerWidth, displayHeight: maxImageHeight, offsetX: 0, offsetY: 0 };
  }

  const imageAspect = imageSize.width / imageSize.height;
  const containerAspect = containerWidth / maxImageHeight;

  let displayWidth, displayHeight, offsetX = 0, offsetY = 0;

  if (imageAspect > containerAspect) {
    displayWidth = containerWidth;
    displayHeight = containerWidth / imageAspect;
    offsetY = (maxImageHeight - displayHeight) / 2;
  } else {
    displayHeight = maxImageHeight;
    displayWidth = maxImageHeight * imageAspect;
    offsetX = (containerWidth - displayWidth) / 2;
  }

  return { displayWidth, displayHeight, offsetX, offsetY, containerWidth, maxImageHeight };
};

/**
 * Sonuç ekranı için bounding box'ları hesapla
 * @param {Array} detections - Tespit edilen nesneler
 * @param {Object} imageSize - Orijinal görüntü boyutu
 * @returns {Array} - Hesaplanmış box pozisyonları
 */
export const calculateResultBoxes = (detections, imageSize) => {
  if (!detections.length || imageSize.width === 0) return [];

  const { displayWidth, displayHeight } = calculateResultDisplayDimensions(imageSize);
  const scaleX = displayWidth / imageSize.width;
  const scaleY = displayHeight / imageSize.height;

  return detections.map((det) => ({
    ...det,
    displayBox: {
      left: det.bbox.x1 * scaleX,
      top: det.bbox.y1 * scaleY,
      width: (det.bbox.x2 - det.bbox.x1) * scaleX,
      height: (det.bbox.y2 - det.bbox.y1) * scaleY,
    },
  }));
};
