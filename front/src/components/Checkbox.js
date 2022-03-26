import React from "react";

const Checkbox = ({ isChecked, onChangeEvent, label }) => {
  return (
    <label aria-label={label}>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => {
          onChangeEvent(!isChecked);
        }}
      />

      <svg
        className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
        aria-hidden="true"
        width="18"
        height="18"
      >
        <g fill="none" fillRule="evenodd">
          <rect width="18" height="18" rx="4" />
          <g>
            <g transform="translate(4.667 6.667)">
              <path
                d="M9.742 0l.925.917-6.473 6.417-.017-.016-.016.016L0 3.208l.925-.917 3.252 3.224L9.742 0z"
                className={"checkbox--tick"}
              />
            </g>
          </g>
        </g>
      </svg>
    </label>
  );
};

export default Checkbox;
