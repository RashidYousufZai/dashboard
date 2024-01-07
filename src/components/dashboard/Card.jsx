import React from "react";

const Card = ({ bgImg, name, time, ProfileImg,Loc }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
      className="cardMain"
    >
      <div className="cardBottom">
        <div>
          <p className="cardTitleTypo">{name}</p>
          <p className="cardTime">{time}</p>
          <p className="cardLoc">{Loc}</p>
        </div>

        <img
          src={ProfileImg}
          alt="ProfileImg"
          style={{
            width: "42.759px",
            height: "40.138px",
          }}
        />
      </div>
    </div>
  );
};

export default Card;
