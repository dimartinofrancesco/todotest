import React from "react";

const Lightswitch = ({ isChecked, onChangeEvent, label }) => {
  return (
    <label className="lightswitch" aria-label={label}>
      <input
        type="checkbox"
        className="lightswitch__input"
        onChange={() => {
          onChangeEvent(!isChecked);
        }}
      />
      <span className="lightswitch__label">{label}</span>
      <div
        className={`lightswitch__selector ${
          isChecked ? "lightswitch__selector--active" : ""
        }`}
        aria-hidden="true"
      ></div>
    </label>
  );
};

export default Lightswitch;
