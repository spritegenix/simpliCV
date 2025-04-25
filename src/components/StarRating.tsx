"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export const StarRating = ({
  rating = 3.5,
  totalStars = 5,
  className,
}: {
  rating?: number;
  totalStars?: number;
  className?: string;
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const filled = i <= Math.floor(rating); // Full stars for integer part
      const partial = i === Math.ceil(rating); // Partial star for decimal part
      stars.push(
        <React.Fragment key={i}>
          {filled ? <FaStar /> : partial ? <FaStarHalfAlt /> : <CiStar />}
        </React.Fragment>,
      );
    }
    return stars;
  };

  return <span className={cn("flex", className)}>{renderStars()}</span>;
};

interface RatingInputProps {
  totalStars?: number;
  initialRating?: number;
  onRate?: (rating: number) => void; // Callback for when the user submits a rating
  className?: string;
  disabled?: boolean;
}

interface RatingInputProps {
  totalStars?: number;
  initialRating?: number;
  onRate?: (rating: number) => void;
  className?: string;
  disabled?: boolean;
}

export const RatingInput = ({
  totalStars = 5,
  initialRating = 0,
  onRate,
  className,
  disabled = false,
}: RatingInputProps) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);

  const handleMouseEnter = (star: number) => {
    if (!disabled) setHoveredStar(star);
  };

  const handleMouseLeave = () => {
    if (!disabled) setHoveredStar(null);
  };

  const handleClick = (star: number) => {
    if (!disabled) {
      setSelectedRating(star);
      if (onRate) {
        onRate(star);
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      const isActive = hoveredStar ? i <= hoveredStar : i <= selectedRating;
      stars.push(
        <span
          key={i}
          className={`cursor-pointer ${
            isActive ? "text-yellow-500" : "text-gray-400"
          } ${disabled ? "cursor-not-allowed text-gray-300" : ""}`}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          <FaStar />
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {renderStars()}
      {selectedRating > 0 && (
        <span
          className={`text-sm ${disabled ? "text-gray-400" : "text-gray-500"}`}
        >{`Rated: ${selectedRating} / ${totalStars}`}</span>
      )}
    </div>
  );
};
