export enum ToolType {
  COMPRESS = 'COMPRESS',
  CROP = 'CROP',
  CONVERT = 'CONVERT',
  WATERMARK = 'WATERMARK',
}

export type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ImageFile {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
  size: number; // bytes
  name: string;
  type: string;
}

export interface CropState {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
  aspect?: number; 
}

export interface WatermarkSettings {
  text: string;
  color: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  isRepeating: boolean;
  x: number;
  y: number;
  fontFamily: string;
}

export const FONTS = [
  'Inter',
  'Roboto',
  'Arial',
  'Courier New',
  'Times New Roman'
];