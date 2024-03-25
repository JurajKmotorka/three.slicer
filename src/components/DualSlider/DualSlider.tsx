import { useCallback, useEffect, useState, useRef } from "react";
import "./DualSlider.css";

// Import statements...

const DualSlider = ({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (minVal: number, maxVal: number) => void;
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef({} as HTMLDivElement);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [min, max, minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [min, max, maxVal, getPercent]);

  useEffect(() => {
    memoizedOnChange(minVal, maxVal);
  }, [minVal, maxVal]);

  const memoizedOnChange = useCallback(
    (minVal: number, maxVal: number) => {
      onChange(minVal, maxVal);
    },
    [onChange]
  );

  return (
    <div className="container">
      <input
        title="slider"
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
      />
      <input
        title="slider"
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        {/* <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div> */}
      </div>
    </div>
  );
};

export default DualSlider;
