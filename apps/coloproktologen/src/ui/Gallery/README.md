# Gallery Component

A flexible gallery component that uses `react-image-gallery` to display images with Gatsby integration. Supports both horizontal slider and mosaic grid layouts.

## Features

- **Two Display Modes**: Horizontal slider or mosaic grid view
- **Gatsby Integration**: Works seamlessly with `GatsbyImage` and `useFindImages` hook
- **Responsive**: Adapts to different screen sizes
- **Interactive**: Click on images in mosaic mode to open fullscreen gallery
- **Customizable**: Numerous options for thumbnails, autoplay, fullscreen, etc.
- **Accessible**: Includes keyboard navigation and ARIA attributes

## Installation

The Gallery component requires `react-image-gallery` as a peer dependency. Make sure it's installed in your Gatsby app:

```bash
npm install react-image-gallery
```

## Usage

### Basic Example

```typescript
import { Gallery } from "@repo/ui";
import { useFindImages } from "@provider";

function MyGalleryPage() {
	const { findImage } = useFindImages();
	const imageIds = ["image-id-1", "image-id-2", "image-id-3"];

	return (
		<Gallery
			imageIds={imageIds}
			findImage={findImage}
			displayMode="horizontal"
		/>
	);
}
```

### Mosaic View

```typescript
import { Gallery } from "@repo/ui";
import { useFindImages } from "@provider";

function MyMosaicGallery() {
	const { findImage } = useFindImages();
	const imageIds = ["image-id-1", "image-id-2", "image-id-3", "image-id-4"];

	return (
		<Gallery
			imageIds={imageIds}
			findImage={findImage}
			displayMode="mosaic"
		/>
	);
}
```

### With Custom Alt Text

```typescript
import { Gallery } from "@repo/ui";
import { useFindImages } from "@provider";

function MyGalleryWithAltText() {
	const { findImage } = useFindImages();
	const imageData = [
		{ id: "image-1", title: "Sunset over mountains" },
		{ id: "image-2", title: "Ocean waves" },
		{ id: "image-3", title: "Forest trail" }
	];

	const getAltText = (imageId: string, index: number) => {
		const data = imageData.find((img) => img.id === imageId);
		return data?.title || `Image ${index + 1}`;
	};

	return (
		<Gallery
			imageIds={imageData.map((img) => img.id)}
			findImage={findImage}
			getAltText={getAltText}
			displayMode="horizontal"
			showThumbnails={true}
			autoPlay={false}
		/>
	);
}
```

### With Autoplay

```typescript
import { Gallery } from "@repo/ui";
import { useFindImages } from "@provider";

function MyAutoplayGallery() {
	const { findImage } = useFindImages();
	const imageIds = ["image-id-1", "image-id-2", "image-id-3"];

	return (
		<Gallery
			imageIds={imageIds}
			findImage={findImage}
			displayMode="horizontal"
			autoPlay={true}
			slideInterval={4000}
			showPlayButton={true}
		/>
	);
}
```

## Props

| Prop                    | Type                                           | Default        | Description                                                        |
| ----------------------- | ---------------------------------------------- | -------------- | ------------------------------------------------------------------ |
| `imageIds`              | `string[]`                                     | **Required**   | Array of image IDs to display in the gallery                      |
| `findImage`             | `(id: string) => IGatsbyImageData`             | **Required**   | Function to resolve image IDs to Gatsby image data                 |
| `displayMode`           | `"horizontal" \| "mosaic"`                     | `"horizontal"` | Display mode for the gallery                                       |
| `getAltText`            | `(imageId: string, index: number) => string`   | -              | Optional function to generate alt text for images                  |
| `showThumbnails`        | `boolean`                                      | `true`         | Show thumbnails in horizontal mode                                 |
| `showFullscreenButton`  | `boolean`                                      | `true`         | Show fullscreen button                                             |
| `showPlayButton`        | `boolean`                                      | `false`        | Show play button for autoplay                                      |
| `autoPlay`              | `boolean`                                      | `false`        | Auto play the gallery                                              |
| `slideInterval`         | `number`                                       | `3000`         | Slide interval in milliseconds when auto playing                   |
| `containerStyle`        | `React.CSSProperties`                          | -              | Custom container style                                             |

## Display Modes

### Horizontal Mode

The horizontal mode displays images in a traditional gallery slider with navigation arrows, thumbnails, and optional autoplay.

Features:

- Previous/Next navigation
- Thumbnail strip (optional)
- Fullscreen mode
- Autoplay with configurable interval
- Keyboard navigation

### Mosaic Mode

The mosaic mode displays images in a responsive grid layout. Clicking any image opens a fullscreen gallery at that position.

Features:

- Responsive grid layout
- Hover effects
- Click to open fullscreen gallery
- Modal overlay with full navigation
- Keyboard accessible (Enter/Space to open, Escape to close)

## Styling

The component comes with pre-defined styles, but you can override them using the `containerStyle` prop:

```typescript
<Gallery
	imageIds={imageIds}
	findImage={findImage}
	containerStyle={{
		maxWidth: "1200px",
		margin: "0 auto",
		padding: "20px"
	}}
/>
```

## CSS Import

The component automatically imports the required `react-image-gallery` CSS. If you need to customize the gallery styles further, you can override the CSS classes provided by `react-image-gallery`.

## Accessibility

The Gallery component follows accessibility best practices:

- Proper ARIA attributes for modal dialogs
- Keyboard navigation support
- Focus management in modal mode
- Semantic HTML structure
- Alt text support for images

## Browser Support

The Gallery component supports all modern browsers. Make sure your Gatsby build configuration includes the necessary polyfills for older browsers if needed.

## Notes

- The `findImage` function should come from your app's `useFindImages` hook (or similar)
- Invalid image IDs (where `findImage` returns null/undefined) are automatically filtered out
- The component requires Gatsby's `gatsby-plugin-image` to be properly configured in your app
- CSS from `react-image-gallery` is automatically imported

## Related Components

- [GoogleMaps](../GoogleMaps/README.md) - Map component with consent management

