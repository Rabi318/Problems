# 🧠 Daily Quote Generator — React + Tailwind

A simple React app that fetches and displays inspirational quotes every 30 seconds using the **ZenQuotes API**, with the option to fetch a new quote manually. It also features a loading spinner while the quote is being fetched.

---

## 🚀 Features

- 🕒 Auto-refreshes quote every 30 seconds using `useEffect`
- 🔘 Manual refresh button ("Get New Quote")
- 📜 Displays quote and author
- ⏳ Loading spinner while fetching
- 🎨 Styled using **Tailwind CSS**

---

## 🔗 API Used

**ZenQuotes API**  
`https://zenquotes.io/api/random`

### ⚠️ CORS Notice

ZenQuotes does **not** include proper CORS headers by default.

To avoid `CORS` errors during local development, install a Chrome extension like:

🔗 [Allow CORS: Access-Control-Allow-Origin (Chrome Web Store)](https://chrome.google.com/webstore/detail/allow-cors-access-control/hnmpcagpplmpfojmgmnngilcnanddlhb)

> Make sure to enable it while testing the app in your local browser.  
> For production, you'd need to use a proxy server or backend middleware.

---

## 🧠 How It Works

- Fetches a random quote from ZenQuotes on initial load
- Uses `setInterval()` inside `useEffect` to auto-refresh every 30 seconds
- A "Get New Quote" button lets users refresh manually
- Quote content and author are updated dynamically

---
