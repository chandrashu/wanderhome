document.addEventListener("DOMContentLoaded", () => {

   // TAGS

   const reviewTags =
      document.querySelectorAll(".review-tags span");

   reviewTags.forEach(tag => {

      tag.addEventListener("mouseenter", () => {

         tag.style.transform =
            "translateY(-3px) scale(1.03)";
      });

      tag.addEventListener("mouseleave", () => {

         tag.style.transform =
            "translateY(0) scale(1)";
      });

   });

   // RATING COUNTER

   const ratingNumber =
      document.querySelector(".circle-content h2");

   if(ratingNumber){

      let start = 0;

      let end = 4.9;

      let duration = 1500;

      let increment = end / (duration / 20);

      let counter = setInterval(() => {

         start += increment;

         if(start >= end){

            start = end;

            clearInterval(counter);
         }

         ratingNumber.innerText =
            start.toFixed(1);

      },20);
   }

});