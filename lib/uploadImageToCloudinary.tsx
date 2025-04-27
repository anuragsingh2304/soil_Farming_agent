// /lib/uploadImageToCloudinary.ts

export const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "soil_uploads"); // 👈 Important!
    
    const response = await fetch(`https://api.cloudinary.com/v1_1/drl0jljy4/image/upload`, {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error("Image upload failed");
    }
  
    const data = await response.json();
    return data.secure_url; // ✅ This is the image URL you can save in MongoDB
  };