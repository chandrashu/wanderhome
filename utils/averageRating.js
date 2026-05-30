module.exports = (reviews) => {

   if(!reviews.length) return 0;

   let total = 0;

   for(let review of reviews){

      total += review.rating;
   }

   return (
      total / reviews.length
   ).toFixed(1);
};