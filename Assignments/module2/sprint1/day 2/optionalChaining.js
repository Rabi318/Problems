const getUser = (user) => {
  const id = user?.id || "Information not available";
  const name = user?.profile?.name || "Information not available";
  const city = user?.profile?.address?.city || "Information not available";
  const zipcode =
    user?.profile?.address?.zipcode || "Information not available";

  return `User ${name} (ID: ${id}) lives in ${city}, (ZIP: ${zipcode})`;
};

const user1 = { id: 123, profile: { name: "John Doe" } };
const user2 = {
  id: 304,
  profile: {
    name: "Baby Boy",
    address: { city: "Los Angeles", zipcode: "90001" },
  },
};

console.log(getUser(user1));
console.log(getUser(user2));
