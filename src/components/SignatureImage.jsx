import { useEffect, useState } from "react";

// Signatures were captured in whichever theme the visitor was using, so some
// are black ink on transparent and some are white. Normalise the white ones to
// black here; the dark-mode CSS then inverts all of them back to white.
export default function SignatureImage({ src, alt, style }) {
  const [normalized, setNormalized] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!src) return;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = image.data;
        let opaque = 0;
        let dark = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 10) continue;
          opaque++;
          const lum =
            0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
          if (lum < 128) dark++;
        }

        // White ink on a transparent background: recolour it to black.
        if (opaque > 0 && dark === 0) {
          for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
              data[i] = 17;
              data[i + 1] = 17;
              data[i + 2] = 17;
            }
          }
          ctx.putImageData(image, 0, 0);
        }

        if (!cancelled) setNormalized(canvas.toDataURL());
      } catch {
        if (!cancelled) setNormalized(src);
      }
    };
    img.onerror = () => {
      if (!cancelled) setNormalized(src);
    };
    img.src = src;

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <img
      className="signature-img"
      src={normalized || src}
      alt={alt}
      style={style}
    />
  );
}
