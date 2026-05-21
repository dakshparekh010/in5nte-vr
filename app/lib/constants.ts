/** Total frames in the hero scroll animation sequence */
export const TOTAL_FRAMES = 104;


/** Path prefix for frame images. Full path: `${FRAME_PATH}NNN.${FRAME_EXTENSION}` */
export const FRAME_PATH = '/frames/ezgif-frame-';
export const FRAME_EXTENSION = 'jpg';
export const FRAME_PAD_LENGTH = 3;

/** Fit mode for drawing frame images to canvas ("cover" or "contain") */
export const HERO_FRAME_FIT_MODE = "contain";
export const HERO_MOBILE_FOCAL_X = 0.5;
export const HERO_MOBILE_FOCAL_Y = 0.5;

/** Priority frame indices for progressive loading (every 10th frame) */
export const PRIORITY_INDICES: number[] = [];
for (let i = 0; i < TOTAL_FRAMES; i += 10) {
  PRIORITY_INDICES.push(i);
}
