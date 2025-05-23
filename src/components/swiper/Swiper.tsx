import React, { useState, useRef, useEffect } from "react";
import { getRefValue, useStateRef } from "../lib/hooks";
import { getTouchEventData } from "../lib/dom";
import { SwiperItemType } from "./SwiperItem";
import SwiperItem from "./SwiperItem";

// import "./Swiper.css";
let nIntervId: any;

export type Props = {
  items: Array<SwiperItemType>;
};

const MIN_SWIPE_REQUIRED = 40;

function Swiper({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeOutCheck, setTimeOutCheck] = useState(false);
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const refInterval = useRef<any>();

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = -getRefValue(minOffsetXRef);
    const minOffsetX = 0;

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };
  const onTouchEnd = () => {
    const currentOffsetX = getRefValue(currentOffsetXRef);
    const containerWidth = getRefValue(containerWidthRef);
    let newOffsetX = getRefValue(offsetXRef);

    const diff = currentOffsetX - newOffsetX;

    // we need to check difference in absolute/positive value (if diff is more than 40px)
    if (Math.abs(diff) > MIN_SWIPE_REQUIRED) {
      if (diff > 0) {
        // swipe to the right if diff is positive
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      } else {
        // swipe to the left if diff is negative
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      // remain in the current image
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIdx(Math.abs(newOffsetX / containerWidth));

    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseup", onTouchEnd);
    window.removeEventListener("mousemove", onTouchMove);
  };
  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl?.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerWidth - containerEl.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };
  const indicatorOnClick = (idx: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl?.offsetWidth;

    setCurrentIdx(idx);
    setOffsetX(containerWidth * idx);
  };

  function intevalForward() {
    // setTimeOutCheck(true);
    if (currentIdx < items?.length - 1) indicatorOnClick(currentIdx + 1);
    else indicatorOnClick(0);
    // console.log("intervall ", currentIdx, items.length - 1);
  }

  function stopIntevalForward() {
    // console.log(refInterval.current);
    clearInterval(refInterval.current);
    // release our intervalID from the variable
    refInterval.current = null;
  }

  useEffect(() => {
    if (onMouseEnter === true) {
      if (refInterval.current !== null) stopIntevalForward();
    } else {
      if (refInterval.current !== null) stopIntevalForward();
      refInterval.current = setInterval(() => intevalForward(), 3000);
    }
  }, [onMouseEnter, currentIdx, items]);

  return (
    <div
      className="swiper-container md:h-full"
      onTouchStart={onTouchStart}
      onMouseDown={onTouchStart}
      onMouseEnter={() => setOnMouseEnter(true)}
      onMouseLeave={() => setOnMouseEnter(false)}
    >
      <div
        ref={containerRef}
        className={`swiper-list ${isSwiping ? "is-swiping" : ""}`}
        style={{
          transform: `translate3d(${offsetX}px,  0px, 0px)`,
        }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx + "-image"} {...item} />
        ))}
      </div>
      <div className="flex justify-center w-full absolute -mt-[40px] z-[2]">
        <ul className=" md:flex hidden">
          {items.map((_item, idx) => (
            <li
              key={idx}
              className={`swiper-indicator-item ${
                currentIdx === idx ? "active" : ""
              }`}
              onClick={() => indicatorOnClick(idx)}
              data-testid="indicator"
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Swiper;
