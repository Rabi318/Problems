// // //User->Cache->db
// // const cache: Map<string, string[]> = new Map();

// // async function queryDb(userId: string): Promise<string[]> {
// //   console.log("Quering db");
// //   return [`post1`, `post2`];
// // }

// // async function getUeer(userId: string): Promise<string[]> {
// //   if (cache.has(userId)) {
// //     console.log("cache return;");
// //     return cache.get(userId)!;
// //   }
// //   console.log("Cache is missing");
// //   const feed = await queryDb(userId);
// //   cache.set(userId, feed);
// //   return feed;
// // }

// //https://www.instagra.com/some-post-id -> https://www.shortly.com/abc123

// //key value pair -> logon url-> short url

// const chars = '0-9a-zA-Z';
// let idCounter = 1000;

// const db: Record<string, string> = {};
// const cache: Map<string,string> = new Map();
// function encodedBase62(num: number): string{
//   let enc = ""
//   while(num > 0){
//     enc = chars[num % 62] + enc;
//     num = Math.floor(num/62);
//   }
//   return enc || "0";
// }

// function shortUrl(longUrl: string): string{
//   const shortCode = encodedBase62(idCounter++);
//   db[shortCode] = longUrl;
//   return shortCode;
// }

// function redirectUrl(shortCode: string): string | null {
//   //check cache
//   if(cache.has(shortCode)){
//     console.log("cache found")
//     return cache.get(shortCode);
//   }
//   const longUrl = db[shortCode];
//   if(longUrl){
//     cache.set(shortCode, longUrl);
//     return longUrl;
//   }
//   return null;

// }
