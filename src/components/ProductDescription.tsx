import React from 'react';

type Props = {
  description: string;
};

const ProductDescription: React.FC<Props> = ({ description }) => {
  const renderDescription = () => {
    const lines = description.split('<br>');

    return lines.map((line, index) => {
      if (line.startsWith('<b>') && line.endsWith('</b>')) {
        const text = line.replace(/<\/?b>/g, '');
        return <strong key={index}>{text}</strong>;
      } else if (line.startsWith('<p>') && line.endsWith('</p>')) {
        const text = line.replace(/<\/?p>/g, '');
        return <p key={index}>{text}</p>;
      } else {
        return (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        );
      }
    });
  };

  return <div>{renderDescription()}</div>;
};

export default ProductDescription;
