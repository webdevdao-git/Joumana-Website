#!/usr/bin/env python3
"""
Re-frames portrait photography into the wide hero frames the home page uses.

The hero puts copy on the left and the subject on the right. Studio portraits
are shot with the subject centred, so each one is scaled, slid across, and given
extra backdrop either side. The fill is built from a sliver of empty backdrop
taken from the edge of the same frame, never from a blur of the whole picture,
which would leave a ghost of the subject behind her.

Run from the repo root after dropping new photography into the source folder:

    python3 scripts/prepare-hero-images.py

Requires Pillow:  pip install Pillow
"""

from PIL import Image, ImageFilter

W, H = 2400, 1350     # 16:9 master frame
FACE_X = 0.66         # where the subject's face should land across the frame
FEATHER = 120         # soft edge between the photo and the rebuilt backdrop

# source, output name, subject height in px, face x as a fraction of the source
# width, distance from the top of the frame, and how wide a backdrop sliver to
# sample (as a fraction of source width, must contain no part of the subject)
JOBS = [
    ("../jpg/jouamna-home-v5.jpg", "hero-1.jpg", 1250, 0.465, 110, 0.07),
    ("../jpg/3q0a5829.jpg",        "hero-2.jpg", 1520, 0.490, 130, 0.035),
    ("../jpg/3q0a5790.jpg",        "hero-3.jpg", 1200, 0.490, 150, 0.035),
]

OUT_DIR = "public/images"


def feather_mask(w, h, x, y, pad=FEATHER):
    """Soft rectangle, feathered only on the sides that fall inside the frame."""
    lo_w, lo_h = 300, 169
    mask = Image.new("L", (lo_w, lo_h), 255)
    px = mask.load()
    sx, sy = lo_w / w, lo_h / h
    pads = {
        "l": pad * sx if x > 0 else 0,
        "r": pad * sx if x + w < W else 0,
        "t": pad * sy if y > 0 else 0,
        "b": pad * sy if y + h < H else 0,
    }
    for i in range(lo_w):
        for j in range(lo_h):
            v = 1.0
            if pads["l"] and i < pads["l"]:
                v = min(v, i / pads["l"])
            if pads["r"] and i > lo_w - pads["r"]:
                v = min(v, (lo_w - i) / pads["r"])
            if pads["t"] and j < pads["t"]:
                v = min(v, j / pads["t"])
            if pads["b"] and j > lo_h - pads["b"]:
                v = min(v, (lo_h - j) / pads["b"])
            px[i, j] = int(255 * v)
    return mask.resize((w, h), Image.BILINEAR)


def main():
    for src, out, sub_h, fx, y_off, strip in JOBS:
        orig = Image.open(src).convert("RGB")

        sliver = max(8, int(orig.width * strip))
        frame = orig.crop((0, 0, sliver, orig.height)).resize((W, H), Image.LANCZOS)
        frame = frame.filter(ImageFilter.GaussianBlur(45))

        scale = sub_h / orig.height
        sw, sh = round(orig.width * scale), sub_h
        subject = orig.resize((sw, sh), Image.LANCZOS)
        x_off = round(W * FACE_X - sw * fx)

        frame.paste(subject, (x_off, y_off), feather_mask(sw, sh, x_off, y_off))
        frame.save(f"{OUT_DIR}/{out}", quality=88, optimize=True, progressive=True)
        print(f"{out}: subject {sw}x{sh} placed at ({x_off}, {y_off})")


if __name__ == "__main__":
    main()
