/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const thumbContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  maxWidth: 450,
  maxHeight: 300,
  padding: 4,
  boxSizing: 'border-box',
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function Previews({ files, setFiles }) {
  // const [files, setFiles] = useState([]);
  if (!files) return null;
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // accept: "image/*",
    onDrop: (acceptedFiles) => {
      // console.log('accepted', acceptedFiles);
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
      );
    },
  });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt="selected" src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files],
  );

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone', style })}>
        <input {...getInputProps()} />
        { isDragActive ? (
          <p>Drop the files here ...</p>
        ) : files.length === 0 ? (
          <p>Drag and drop some files here, or click to select files</p>
        ) : null}
        <aside style={thumbContainer}>{thumbs}</aside>
      </div>
    </section>
  );
}

export default Previews;
