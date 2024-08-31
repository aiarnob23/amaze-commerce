"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({ rating }: { rating: number }) {
  const [value, setValue] = React.useState<number | null>(rating);

  return (
    <Box sx={{ "& > legend": { mt: 2 } }}>
      <Rating name="half-rating-read" value={value} precision={0.5} readOnly max={5} />
    </Box>
  );
}
