interface RatingStarsProps {
  rating: number;
  reviews?: number;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={filled ? 'rating-row__star is-filled' : 'rating-row__star'}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 3.2 2.7 5.4 6 0.9-4.4 4.2 1 5.9L12 16.8 6.7 19.6l1-5.9-4.4-4.2 6-0.9Z" />
    </svg>
  );
}

function RatingStars({ rating, reviews }: RatingStarsProps) {
  const filledStars = Math.round(rating);

  return (
    <div className="rating-row" aria-label={`${rating.toFixed(1)} out of 5`}>
      <div className="rating-row__stars" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < filledStars} />
        ))}
      </div>

      {typeof reviews === 'number' ? (
        <span className="rating-row__reviews">({reviews} reviews)</span>
      ) : null}
    </div>
  );
}

export default RatingStars;
