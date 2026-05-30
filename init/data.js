const sampleListings = [
  {
    title: "Heritage Haveli Stay",
    description: "Royal Rajasthani haveli with traditional decor.",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3200,
    location: "Jaipur",
    country: "India",
    category: "Heritage",
  },
  {
    title: "Modern City Apartment",
    description: "Comfortable apartment near business hub.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2800,
    location: "Delhi",
    country: "India",
    category: "Rooms",
  },
  {
    title: "Beachside Villa",
    description: "Relaxing villa close to the sea.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    price: 5200,
    location: "Goa",
    country: "India",
    category: "Beach",
  },
  {
    title: "Hill View Cottage",
    description: "Cozy cottage surrounded by mountains.",
    image: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2600,
    location: "Manali",
    country: "India",
    category: "Mountains",
  },
  {
    title: "Lakefront Palace Stay",
    description: "Peaceful stay overlooking the lake.",
    image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3100,
    location: "Udaipur",
    country: "India",
    category: "Heritage",
  },
  {
    title: "Tech City Studio",
    description: "Smart studio apartment near IT parks.",
    image: "https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2300,
    location: "Bengaluru",
    country: "India",
    category: "Rooms",
  },
  {
    title: "Tea Estate Bungalow",
    description: "Stay inside lush green tea plantations.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 4200,
    location: "Munnar",
    country: "India",
    category: "Nature",
  },
  {
    title: "Riverside Retreat",
    description: "Calm riverside stay near Ganga.",
    image: "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2400,
    location: "Rishikesh",
    country: "India",
    category: "Spiritual",
  },
  {
    title: "Desert Luxury Camp",
    description: "Premium tent stay in Thar Desert.",
    image: "https://unsplash.com/photos/a-group-of-blue-tents-sitting-in-the-middle-of-a-desert-vEWXUHvHNWg",
    price: 4800,
    location: "Jaisalmer",
    country: "India",
    category: "Camping",
  },
  {
    title: "Skyline City Flat",
    description: "High-rise apartment with city view.",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3600,
    location: "Mumbai",
    country: "India",
    category: "Rooms",
  },

  {
    title: "Snow View Cabin",
    description: "Wooden cabin with snow mountains.",
    image: "https://unsplash.com/photos/snowy-village-nestled-among-snow-covered-mountains-and-pine-trees-LxrL92AstjM",
    price: 3800,
    location: "Gulmarg",
    country: "India",
    category: "Mountains",
  },
  {
    title: "Forest Treehouse",
    description: "Unique treehouse stay inside forest.",
    image: "https://images.pexels.com/photos/167682/pexels-photo-167682.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4600,
    location: "Wayanad",
    country: "India",
    category: "Nature",
  },
  {
    title: "Colonial Bungalow",
    description: "Old British-era bungalow.",
    image: "http://unsplash.com/photos/a-house-with-a-fence-around-it-H_8qQ69v3AA",
    price: 3100,
    location: "Shimla",
    country: "India",
    category: "Mountains",
  },
  {
    title: "Backwater Villa",
    description: "Traditional Kerala backwater house.",
    image: "https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Alleppey",
    country: "India",
    category: "Nature",
  },
  {
    title: "Royal Palace Stay",
    description: "Live like royalty in palace home.",
    image: "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window-LLFwrcOVJNM",
    price: 6500,
    location: "Jodhpur",
    country: "India",
    category: "Heritage",
  },
  {
    title: "City View Penthouse",
    description: "Luxury penthouse with skyline view.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 7000,
    location: "Hyderabad",
    country: "India",
    category: "City",
  },
  {
    title: "Farm Stay Retreat",
    description: "Experience peaceful village life.",
    image: "https://unsplash.com/photos/stone-buildings-line-a-cobblestone-path-with-a-bench-ObYA6PhABU8",
    price: 2000,
    location: "Nashik",
    country: "India",
    category: "Nature",
  },
  {
    title: "Hill Resort Stay",
    description: "Luxury resort in hill station.",
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 5500,
    location: "Ooty",
    country: "India",
    category: "Mountains",
  },
  {
    title: "Minimal City Room",
    description: "Affordable stylish private room.",
    image: "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Pune",
    country: "India",
    category: "City",
  },
  {
    title: "Cliffside Beach Cottage",
    description: "Stay near dramatic beach cliffs.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 4800,
    location: "Varkala",
    country: "India",
    category: "Beach",
  },

  {
    title: "Wooden Hill Cabin",
    description: "Cabin with valley views.",
    image: "https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3400,
    location: "Mussoorie",
    country: "India",
    category: "Mountains",
  },
  {
    title: "City Center Flat",
    description: "Close to restaurants and shopping.",
    image: "http://unsplash.com/photos/a-building-with-many-balconies-on-the-top-of-it-AZrkXZO9VDM",
    price: 2600,
    location: "Chennai",
    country: "India",
    category: "City",
  },
  {
    title: "Temple View Stay",
    description: "Peaceful stay near ghats.",
    image: "https://images.pexels.com/photos/356366/pexels-photo-356366.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2300,
    location: "Varanasi",
    country: "India",
    category: "Spiritual",
  },
  {
    title: "Luxury Desert Villa",
    description: "Modern villa in desert city.",
    image: "https://unsplash.com/photos/a-desert-house-with-a-lantern-in-front-of-it-mHmSRqe0yek",
    price: 5200,
    location: "Bikaner",
    country: "India",
    category: "Heritage",
  },
  {
    title: "Green Valley Homestay",
    description: "Lush green valley homestay.",
    image: "https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2400,
    location: "Coorg",
    country: "India",
    category: "Nature",
  },
  {
    title: "Budget City Flat",
    description: "Comfortable flat at low price.",
    image: "https://cdn.pixabay.com/photo/2014/07/10/17/17/bedroom-389254_1280.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1700,
    location: "Indore",
    country: "India",
    category: "City",
  },
  {
    title: "Skyline Luxury Room",
    description: "Premium room with skyline view.",
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4200,
    location: "Noida",
    country: "India",
    category: "City",
  },
  {
    title: "Countryside Retreat",
    description: "Silent countryside escape.",
    image: "https://unsplash.com/photos/river-flows-through-a-town-with-green-hills-IqScPCT7fo8",
    price: 2100,
    location: "Amritsar",
    country: "India",
    category: "Nature",
  },
  {
    title: "Premium Hill Villa",
    description: "Luxury hilltop villa stay.",
    image: "https://images.pexels.com/photos/32870/pexels-photo.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 6000,
    location: "Nainital",
    country: "India",
    category: "Mountains",
  },


  {
    title: "Ski-In/Ski-Out Chalet",
    description:"Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Beach"
    
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:"Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Mountains"
  },
  {
    title: "Historic Canal House",
    description:"Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "City"
  },
  {
    title: "Private Island Retreat",
    description:"Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Beach"
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description:"Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farm"
  },
  {
    title: "Historic Brownstone in Boston",
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "City"
  },
  {
    title: "Beachfront Bungalow in Bali",
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Beach"
  },
  {
    title: "Mountain View Cabin in Banff",
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "Mountains"
  },
  {
    title: "Art Deco Apartment in Miami",
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "City"
  },
  {
    title: "Tropical Villa in Phuket",
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "Pools"
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Trending"
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Pools"
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Montana",
    country: "United States",
    category: "Mountains"
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "Beach"
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Camping"
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: "Farm"
  },
  {
    title: "Modern Apartment in Tokyo",
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "City"
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: "Camping"
  },
  {
    title: "Luxury Villa in the Maldives",
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "Pools"
  },
  {
    title: "Ski Chalet in Aspen",
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Aspen",
    country: "United States",
    category: "Mountains"
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Beach"
  },
];
module.exports = { data: sampleListings };