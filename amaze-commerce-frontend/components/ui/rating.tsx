interface ProductProps {
  product: {
    rating: number | 1; // Rating can be a decimal (e.g., 4.6)
  };
}

const RatingComponent = ({ product }: ProductProps) => {
  const totalStars = 5;
  const rating = Math.min(Math.max(product?.rating, 0), totalStars); // Clamp rating between 0 and totalStars
  const fullStars = Math.floor(rating) + (rating % 1 >= 0.6 ? 1 : 0); // Number of fully filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = Math.max(totalStars - Math.ceil(rating), 0); // Remaining empty stars, ensure it's not negative

  return (
    <div className="rating rating-sm">
      {product && [...Array(fullStars)].map((_, index) => (
        <input
          key={`full-${index}`}
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-orange-400"
          defaultChecked
        />
      ))}
      {hasHalfStar && (
        <input
          key="half"
          type="radio"
          name="rating-5"
          className="mask mask-star-2 bg-gray-400" // Gray color for the half-star
          defaultChecked
        />
      )}

      {[...Array(emptyStars)].map((_, index) => (
        <input
          key={`empty-${index}`}
          type="radio"
          name="rating-5"
          className="mask mask-star-2" // Gray color for empty stars
        />
      ))}
    </div>
  );
};

export default RatingComponent;
