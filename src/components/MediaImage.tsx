import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Expand, X } from "./Icons";
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
  const [originalState, setOriginalState] = useState<
    "loading" | "ready" | "error"
  >("loading");
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
          onClick={() => {
            setOriginalState("loading");
            setOpen(true);
          }}
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
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            )
              close();
          }}
          aria-label="Full-resolution artwork"
        >
          <div className="lightbox-toolbar">
            <span className="lightbox-label">Artwork viewer</span>
            <a
              href={assetUrl(image.videoSrc || image.original)}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Open original <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              className="icon-button lightbox-close"
              aria-label="Close artwork"
              onClick={close}
              autoFocus
            >
              <X size={24} />
            </button>
          </div>
          <div className={`lightbox-stage is-${originalState}`}>
            {originalState !== "error" &&
              (image.videoSrc ? (
                <video
                  controls
                  autoPlay={false}
                  poster={assetUrl(image.original)}
                  src={assetUrl(image.videoSrc)}
                  onLoadedData={() => setOriginalState("ready")}
                  onError={() => setOriginalState("error")}
                />
              ) : (
                <img
                  src={assetUrl(image.original)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  onLoad={() => setOriginalState("ready")}
                  onError={() => setOriginalState("error")}
                />
              ))}
            {originalState !== "ready" && (
              <div
                className="lightbox-message"
                role={originalState === "error" ? "alert" : "status"}
              >
                <Expand size={25} aria-hidden="true" />
                <p>
                  {originalState === "error"
                    ? "The original couldn't be loaded."
                    : "Loading the original artwork…"}
                </p>
                {originalState === "error" && (
                  <p>Close the viewer to return to the gallery.</p>
                )}
              </div>
            )}
          </div>
          <p className="lightbox-caption">{image.alt}</p>
        </dialog>
      )}
    </>
  );
}
