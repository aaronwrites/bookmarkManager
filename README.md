# MindVault

MindVault is a powerful bookmark manager that helps you save, organize, and search your bookmarks efficiently. With live link previews, quick creation shortcuts, and tag-based organization, managing bookmarks has never been easier.

## Features

- **Live Link Previews**: Automatically fetches metadata for bookmarks using web scraping powered by the Cheerio library.
- **Quick Bookmark Creation**: Simply press `Ctrl + V` to create a bookmark instantly.
- **Customizable Entries**: Add a title, TL;DR summary, and relevant tags to your bookmarks.
- **Tag-Based Organization**: Group bookmarks by tags for efficient management and retrieval.
- **Powerful Search**: Quickly find bookmarks using a robust search functionality.
- **Sharing Features**: Users can share their bookmarks with anyone around the world.

## Tech Stack

### Frontend
- React
- TypeScript
- TailwindCSS
- TanStack Query

### Backend
- Node.js
- Express.js
- MongoDB
- Cheerio

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB instance running (local or cloud-based)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/mindvault.git
   cd mindvault
   ```

2. **Install dependencies**
   For Backend:
   ```sh
   cd bookmarkManager-be
   npm install
   ```
   For Frontend:
   ```sh
   cd bookmarkManager-fe
   npm install
   ```

4. **Setup environment variables**
   In the backend folder
   Create a `.env` file in the root directory and configure the necessary environment variables such as:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

6. **Run the backend**
   ```sh
   npm run dev
   ```

7. **Run the frontend**
   ```sh
   cd bookmarkManager-fe
   npm install
   npm run dev
   ```

## Usage
- Copy a link and press `Ctrl + V` to create a new bookmark.
- Add a title, summary (TL;DR), and tags to categorize your bookmarks.
- Use the search bar to find bookmarks instantly.
- Group bookmarks by tags for better organization.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---
