# Image Processing API

This Node.js API allows you to resize images, generate placeholder images, and serve original images. Built with Express and Sharp, it also caches resized images for faster future access.

## Table of Contents
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
  - [Resize Existing Image](#resize-existing-image)
  - [Generate Placeholder Image](#generate-placeholder-image)
  - [Access Original Image](#access-original-image)
- [Usage](#usage)
- [Testing](#testing)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/image-processing-api.git
   cd image-processing-api

2. **Install dependencies**:
    npm install

3. **Run the server**:
    npm start

## Project Structure
.
├── src
│   ├── index.ts            # Main server file
│   ├── assets              # Original images
│   ├── cache               # Cache for resized images
├── tests                   # Unit and integration tests
├── README.md               # Documentation
└── package.json            # Project dependencies and scripts

## Endpoints

1. **Resize Existing IMmage**:

Resizes an existing image and caches it for future requests.

URL: /resize
Method: GET
Query Parameters:
width: Width of the resized image.
height: Height of the resized image.
imageName: Name of the image file (e.g., fjord.jpg).
Example: http://localhost:3000/resize?width=200&height=300&imageName=fjord.jpg

2. **Generate Placeholder Image**:

Creates a placeholder image with the specified dimensions.

URL: /placeholder/:width(\\d+)x:height(\\d+)
Method: GET
Path Parameters:
width: Width of the placeholder image.
height: Height of the placeholder image.
Example: http://localhost:3000/placeholder/400x300

3. **Access Original Image**:

Access any original image stored in the assets/images directory.

URL: /assets/images/:imageName
Method: GET
Example: http://localhost:3000/assets/images/fjord.jpg

## Usage

Resize an Image: Make a GET request to /resize with valid width, height, and imageName query parameters. The resized image is returned and cached.

Generate a Placeholder: Make a GET request to /placeholder/:width(\\d+)x:height(\\d+), replacing width and height with the desired dimensions.

## Testing

npm test

## Dependencies

- express: Web framework.
- sharp: Image processing library.
- supertest: HTTP assertions for testing.
- jest: Testing framework.

## License