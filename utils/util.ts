import { ChangeEvent } from "react";

export const selectTableItems = (
  id: string | number,
  selectedArray: (string | number)[]
) => {
  const selectedIndex = selectedArray.indexOf(id);
  let newSelected: (string | number)[] = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedArray, id);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedArray.slice(1));
  } else if (selectedIndex === selectedArray.length - 1) {
    newSelected = newSelected.concat(selectedArray.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedArray.slice(0, selectedIndex),
      selectedArray.slice(selectedIndex + 1)
    );
  }

  return newSelected;
};

export const handleImageUpload = (
  event: ChangeEvent<HTMLInputElement>,
  setImageData: (callback: (prev: File[]) => File[]) => void,
  setImages: (callback: (prevImages: string[]) => string[]) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setImageData((prev) => [...prev, file]);
          setImages((prevImages) => [...prevImages, reader.result as string]);
        }
      };

      reader.readAsDataURL(file); // Create the preview
    } catch (error) {
      console.error("Image upload error:", error);
    }
  }
};
