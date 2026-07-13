/**
 * Konversi URL Google Drive ke format viewer
 * Input:  https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/file/d/FILE_ID/preview
 */
export const convertToDriveViewerUrl = (url) => {
  if (!url || url === '#') return url;
  
  // Pattern: /file/d/FILE_ID/...
  const filePattern = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(filePattern);
  
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // Pattern: /open?id=FILE_ID
  const openPattern = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
  const match2 = url.match(openPattern);
  
  if (match2 && match2[1]) {
    const fileId = match2[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
};

/**
 * Cek apakah URL adalah Google Drive
 */
export const isGoogleDriveUrl = (url) => {
  return url && url.includes('drive.google.com');
};