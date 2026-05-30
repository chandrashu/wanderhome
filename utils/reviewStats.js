const average = (reviews, field) => {
  const scores = (reviews || [])
    .map((review) => Number(review[field]))
    .filter((score) => Number.isFinite(score) && score > 0);

  if (!scores.length) {
    return "0.0";
  }

  const total = scores.reduce((sum, score) => sum + score, 0);
  return (total / scores.length).toFixed(1);
};

const getTagCounts = (reviews) => {
  const counts = new Map();

  (reviews || []).forEach((review) => {
    (review.tags || []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 6);
};

module.exports = (reviews) => {
  return {
    count: (reviews || []).length,
    overall: average(reviews, "rating"),
    cleanliness: average(reviews, "cleanlinessRating"),
    location: average(reviews, "locationRating"),
    value: average(reviews, "valueRating"),
    helpfulTags: getTagCounts(reviews),
  };
};
