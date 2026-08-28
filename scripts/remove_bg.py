#!/usr/bin/env python3
"""
Simple local background remover using Pillow + NumPy.

Usage:
  python3 scripts/remove_bg.py assets/images/hero-src.jpg assets/images/hero-processed.png

The script tries to detect the canvas background color by sampling the image borders,
creates a mask by thresholding color distance, smooths the mask, applies it as alpha,
and crops to the subject bounding box.

Dependencies:
  pip install pillow numpy

"""
from PIL import Image, ImageFilter
import numpy as np
import sys
import os

def estimate_bg_color(arr, edge_px=10):
    # arr is HxWx3
    h,w,_ = arr.shape
    top = arr[:edge_px,:,:].reshape(-1,3)
    bottom = arr[-edge_px:,:,:].reshape(-1,3)
    left = arr[:, :edge_px, :].reshape(-1,3)
    right = arr[:, -edge_px:, :].reshape(-1,3)
    samples = np.vstack([top, bottom, left, right])
    # median reduces effect of subjects near edge
    return np.median(samples, axis=0)

def color_distance(a, b):
    return np.sqrt(np.sum((a-b)**2, axis=-1))

def remove_bg(in_path, out_path, threshold=45, blur=6):
    im = Image.open(in_path).convert('RGBA')
    arr = np.array(im)
    rgb = arr[...,:3].astype(np.float32)
    alpha = arr[...,3]

    # If image already has meaningful alpha, keep and just crop
    if alpha.max() > 10 and alpha.min() < 250:
        # crop to alpha bounding box
        bbox = Image.fromarray(alpha).getbbox()
        if bbox:
            cropped = im.crop(bbox)
            cropped.save(out_path)
            print('Saved cropped with existing alpha to', out_path)
            return

    bgc = estimate_bg_color(rgb, edge_px=max(6, min(im.size)//60))
    dist = color_distance(rgb, bgc)

    # create mask where distance > threshold
    mask = (dist > threshold).astype(np.uint8) * 255

    # smooth mask
    mask_img = Image.fromarray(mask).convert('L')
    mask_img = mask_img.filter(ImageFilter.GaussianBlur(radius=blur))

    # apply mask as alpha channel
    rgba = im.copy()
    rgba.putalpha(mask_img)

    # crop to non-transparent bbox
    bbox = rgba.getbbox()
    if bbox:
        rgba = rgba.crop(bbox)

    # ensure output dir exists
    os.makedirs(os.path.dirname(out_path) or '.', exist_ok=True)
    rgba.save(out_path)
    print('Saved processed image to', out_path)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python3 scripts/remove_bg.py <input> <output>')
        sys.exit(1)
    in_path = sys.argv[1]
    out_path = sys.argv[2]
    remove_bg(in_path, out_path)
