import React from "react";

interface IProps {
  name: string;
  keywords: string;
}

const Mask: React.FC<IProps> = (props) => {
  const { name, keywords } = props;
  if (!keywords) {
    return <>{name}</>;
  }
  const arr = name.split(keywords);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keywords}</span>
          )}
        </span>
      ))}
    </>
  );
};

export default Mask;
