import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadZone({ onFileSelect, file, loading }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: loading,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? '#6366f1' : file ? '#10b981' : 'rgba(99, 102, 241, 0.4)'}`,
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s',
        background: isDragActive
          ? 'rgba(99, 102, 241, 0.1)'
          : file
          ? 'rgba(16, 185, 129, 0.05)'
          : 'rgba(15, 15, 30, 0.5)',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <input {...getInputProps()} />
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>
        {file ? '✅' : isDragActive ? '📂' : '📄'}
      </div>
      {file ? (
        <>
          <p style={{ color: '#10b981', fontWeight: 600, fontSize: '1rem' }}>
            {file.name}
          </p>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            {(file.size / 1024).toFixed(1)} KB · Click to change
          </p>
        </>
      ) : (
        <>
          <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '1rem' }}>
            {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
          </p>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px' }}>
            Drag & drop or click to select · PDF only
          </p>
        </>
      )}
    </div>
  );
}
