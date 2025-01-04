# ToDo Application

A modern, feature-rich, and visually appealing ToDo application that allows users to manage their tasks efficiently. Built using **React**, **TailwindCSS**, and **Framer Motion**, the application is fully responsive, supports offline usage as a PWA, and is hosted live at [example.com](https://example.com).

---

## Features

### Core Features

- **Task Management**:
  - Create, edit, and delete tasks.
  - Categorize tasks and filter them by category.
  - Assign priorities (Low, Medium, High) to tasks.
  - Set due dates for tasks.
- **File Attachments**: Attach files (e.g., images, PDFs) to each task.
- **Search Functionality**: Quickly search tasks by title or description.

### Dashboard

- Provides an overview of:
  - Number of completed tasks.
  - Active tasks.
  - Tasks categorized as high priority.

### Settings

- Toggle between **Dark** and **Light** themes.
- All theme preferences are saved locally for future use.

### Profile

- Update your profile details (e.g., username, email).
- Change your login password.
- Profile image upload functionality.

### Offline Support

- The application is a **Progressive Web App (PWA)** and supports offline usage.
- Tasks and their data are stored locally in the browser, ensuring access even when offline.

### Notifications

- Real-time notifications using `react-toastify` for actions such as adding, editing, or deleting tasks.

### Responsive Design

- Fully optimized for devices of all screen sizes, including mobile, tablet, and desktop.

---

## How It Works

### Task Management

1. **Adding Tasks**: Click the "Add New Task" button, fill in the details, and optionally upload a file.
2. **Editing Tasks**: Click the "Edit" button on any task card to modify its details or attached file.
3. **Deleting Tasks**: Click the "Delete" button on any task card to permanently remove it.

### Dashboard

- Navigate to the **Dashboard** section to view statistics about your tasks.
- Visualize completed, active, and high-priority tasks in a graphical representation.

### Offline Functionality

- The application will remain functional even without an internet connection.
- All data is cached locally using a service worker.

### Notifications

- Whenever a new task is added or edited, a notification appears at the bottom of the screen for user feedback.

### Hosting

- The application is live and accessible at [example.com](https://example.com).

---

## Technologies Used

- **React**: For building the user interface.
- **TailwindCSS**: For styling and responsive design.
- **Framer Motion**: For animations and transitions.
- **LocalStorage**: For data persistence across sessions.
- **Service Workers**: To enable offline support as a PWA.
- **React Router**: For navigation and routing between pages.
- **React Toastify**: For notifications.
- **Chart.js**: For displaying task statistics on the dashboard.

## Contributing

Contributions are welcome! Please follow the steps below to contribute:

1. Fork this repository.
2. Create a new feature branch.
3. Commit your changes and push them to your fork.
4. Submit a pull request describing your changes.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any questions or feedback, feel free to contact me:

- **Email**: [bojan.golic@example.com](mailto:golichbojan@gmail.com)
- **GitHub**: [github.com/bojan-golic](https://github.com/bojan-golic)
- **LinkedIn**: [linkedin.com/in/bojan-golic](https://linkedin.com/in/bojan-golic)

---

Enjoy managing your tasks efficiently with **ToDo Application**!
