import React, { useState } from 'react';

interface Props {}

const Upload: React.FC<Props> = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
      setImages((prevImages) => [...prevImages, ...imageFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const imageFiles = Array.from(files).filter((file) => file.type.startsWith('image/'));
      setImages((prevImages) => [...prevImages, ...imageFiles]);
    }
  };

  const handlePreview = () => {
    const urls = images.map((image) => URL.createObjectURL(image));
    setPreviewUrls(urls);
    setCurrentImageIndex(0);
  };

  const handleUpload = () => {
    // Aquí se podría implementar la lógica para subir las imágenes a algún storage
    for (const file of images) {
        const key = `${Date.now()}-${file.name}`;
        localStorage.setItem(key, file);
    }

    setImages([]);
    setPreviewUrls([]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % previewUrls.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? previewUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div
        style={{ width: '300px', height: '300px', border: '1px dashed gray' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Arrastra y suelta archivos aquí</p>
        <input type="file" onChange={handleFileInputChange} multiple accept="image/*" />
      </div>
      <div>
        {previewUrls.map((url, index) => (
          <img
            key={url}
            src={url}
            alt={`Preview ${index + 1}`}
            style={{ display: currentImageIndex === index ? 'block' : 'none' }}
          />
        ))}
      </div>
      <div>
        <button disabled={previewUrls.length === 0} onClick={handleUpload}>
          Cargar imágenes
        </button>
        <button disabled={images.length === 0} onClick={handlePreview}>
          Ver preview
        </button>
        <button disabled={previewUrls.length === 0} onClick={handlePrevious}>
          Anterior
        </button>
        <button disabled={previewUrls.length === 0} onClick={handleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Upload;
