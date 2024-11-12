# Pet Care Tips & Stories

## Project Overview

"Pet Care Tips & Stories" is a comprehensive web application developed with Next.js that offers pet owners practical advice and heartwarming stories about their pets. It provides essential tips on proper nutrition, exercise, grooming, and regular veterinary visits, combined with inspiring adoption and rescue tales. This project aims to create a platform for pet lovers to share knowledge and foster community engagement.

## Features

### 1. **User Authentication**

- **Registration**: Users can sign up using their email and password, with other relevant details.
- **Password Recovery**: Users can reset forgotten passwords and update their credentials.

### 2. **User Profile Management**

- **Profile Updates**: Users can update personal details, including profile pictures.
- **My Profile Section**: Displays user posts, followers, and following.

### 3. **Pet Stories Creation & Sharing**

- **Rich Text Editor/Markdown**: Users can write and format pet care tips and stories.
- **Image Attachments**: Users can enhance their posts with images.
- **Content Categorization**: Posts are categorized as either "Tip" or "Story."

### 4. **Upvote & Downvote System**

- Users can upvote or downvote posts.
- Posts can be sorted by upvotes to show the most popular content.

### 5. **Commenting System**

- **Commenting**: Users can comment on posts and edit/delete their comments.
- **Reply Feature**: Users can reply to other comments (optional).

### 6. **Payment Integration**

- **Stripe or Aamarpay Integration**: Secure payments for unlocking premium content.
- Premium posts are highlighted with a badge, with previews available before payment.

### 7. **News Feed**

- **Post Creation**: A simple interface for creating posts quickly.
- **Dynamic Content**: Real-time updates showcasing the latest tips and stories.
- **Infinite Scroll**: Content is continuously loaded as users scroll down the page.
- **Search & Filter**: Advanced search functionality with filtering and sorting by category or upvotes.

### 8. **Following System**

- **Follow/Unfollow**: Users can follow or unfollow other pet owners.

### 9. **Admin Features**

- **Content Management**: Admins can manage posts, users, and payment history.
- **Publish/Unpublish**: Admins can control content visibility.

### 10. **PDF Generation (Bonus Feature)**

- Users can generate a PDF nutrition chart based on a pet’s age and weight using a built-in calculator.

### 11. **Debouncing Mechanism**

- Optimized search experience with debouncing to reduce unnecessary searches and improve performance.

### 12. **Responsive Design**

- The website is mobile-friendly, with responsive layouts for an optimal user experience across various devices.

## Pages

### 1. **Login/Registration Page**

- Forms for user sign-up and login with JWT-based authentication.

### 2. **User Dashboard**

- Displays user-specific content, such as posts, followers, and followed users.

### 3. **Admin Dashboard**

- Admin panel for managing content, users, and payment history.

### 4. **Profile Page**

- A section for users to view and edit their profiles, with a list of their posts, followers, and followed users.

### 5. **News Feed**

- A page listing all pet-related posts with filtering options for category, popularity, and more.

### 6. **About Us Page**

- Information about the team or organization behind the project.

### 7. **Contact Us Page**

- A contact form for user inquiries and support.

## Technologies Used

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Shadcn
- **Payments**: Stripe
- **Rich Text Editor**: Markdown for creating and editing content

## Setup

1. **Clone the repository**

```bash
  git clone https://github.com/IsaT10/pet-story-client-2
```

2. **Install Dependencies**

```bash
  npm install
```

3. **Run the development server**

```bash
  npm run dev
```


