import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import type { MediaAsset } from "../types/content";
import { assetUrl } from "../utils/urls";

export function MediaImage({
  image,
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 100vw, 75vw",
  zoom = false,
}: {
  image: MediaAsset;
  priority?: boolean;
  className?: string;
  sizes?: string;
  zoom?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);
  const imageElement = failed ? (
    <div className="media-error" role="img" aria-label={image.alt}>
      Image unavailable
    </div>
  ) : (
    <img
      src={assetUrl(`${image.src}-800.webp`)}
      srcSet={[480, 800, 1200, 1600]
        .map((width) => `${assetUrl(`${image.src}-${width}.webp`)} ${width}w`)
        .join(", ")}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
  return (
    <>
      {zoom ? (
        <button
          ref={trigger}
          className={`media zoom-media ${className}`}
          onClick={() => setOpen(true)}
          aria-label={`View full-resolution image: ${image.alt}`}
        >
          {imageElement}
          <Expand className="expand-icon" size={21} aria-hidden="true" />
        </button>
      ) : (
        <div className={`media ${className}`}>{imageElement}</div>
      )}
      {open && (
        <dialog
          ref={dialog}
          className="lightbox"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClose={() => setOpen(false)}
          aria-label="Full-resolution artwork"
        >
          <button
            className="icon-button lightbox-close"
            aria-label="Close artwork"
            onClick={close}
            autoFocus
          >
            <X />
          </button>
          {image.videoSrc ? (
            <video
              controls
              autoPlay={false}
              poster={assetUrl(image.original)}
              src={assetUrl(image.videoSrc)}
            />
          ) : (
            <img
              src={assetUrl(image.original)}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          )}
          <p>{image.alt}</p>
        </dialog>
      )}
    </>
  );
}
