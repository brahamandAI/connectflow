# 🖼️ Image Upload Test Page

## 📍 **Access the Test Page**

Navigate to: `http://localhost:3000/test-upload`

## 🧪 **What This Page Tests**

### **1. File Selection**
- ✅ Drag and drop functionality
- ✅ File type validation (images only)
- ✅ File size validation (5MB limit)
- ✅ Visual feedback for selected files

### **2. Upload Process**
- ✅ Authentication check
- ✅ API request to `/api/upload`
- ✅ Response handling
- ✅ Error handling and display

### **3. Image Display**
- ✅ Preview uploaded images
- ✅ Test Next.js Image component
- ✅ Error handling for image loading
- ✅ Copy image URL functionality

### **4. Cloudinary Credentials Test** 🆕
- ✅ Check if Cloudinary is configured
- ✅ Test actual Cloudinary connection
- ✅ Upload a test image to verify credentials
- ✅ Detailed error messages and setup instructions
- ✅ Automatic cleanup of test images

### **5. Debug Information**
- ✅ Console logging for all steps
- ✅ Detailed error messages
- ✅ Upload response details
- ✅ File information display

## 🎯 **How to Use**

### **Step 1: Open the Test Page**
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/test-upload`
3. Open browser developer console (F12)

### **Step 2: Test Cloudinary Credentials** 🆕
1. **Click "Test Cloudinary"** button in the middle panel
2. **View results** - will show if credentials are working
3. **Check console logs** for detailed test information
4. **Follow setup instructions** if credentials are missing

### **Step 3: Test Upload**
1. **Select an image file** (drag & drop or click to select)
2. **Click "Upload Image"** button
3. **Watch console logs** for detailed information
4. **View results** in the right panel

### **Step 4: Verify Results**
- ✅ **Cloudinary Test Success**: Shows "Working" with green checkmark
- ❌ **Cloudinary Test Failed**: Shows setup instructions
- ✅ **Upload Success**: Image preview appears, URL is generated
- ❌ **Upload Error**: Error message shows with troubleshooting tips

## 🔍 **Console Logs to Watch For**

### **Cloudinary Test Success:**
```
🔧 Testing Cloudinary credentials...
✅ Cloudinary credentials found, testing connection...
✅ Cloudinary ping successful: {status: "ok"}
✅ Test upload successful: test_1234567890
✅ Test image cleaned up
🧪 Cloudinary test response: {success: true, ...}
```

### **Cloudinary Test Failed:**
```
🔧 Testing Cloudinary credentials...
❌ Cloudinary credentials not configured
📋 Credential check: {cloudName: "Not set", apiKey: "Not set", apiSecret: "Not set"}
🧪 Cloudinary test response: {success: false, error: "Cloudinary credentials not configured"}
```

### **Successful Upload:**
```
🚀 Starting upload test...
📁 File details: {name: "image.jpg", size: 123456, type: "image/jpeg"}
📡 Upload response status: 200
📦 Upload response data: {url: "...", secure_url: "...", ...}
✅ Upload successful: https://...
🖼️ Image loaded successfully: https://...
```

### **Failed Upload:**
```
🚀 Starting upload test...
📁 File details: {name: "image.jpg", size: 123456, type: "image/jpeg"}
📡 Upload response status: 401
📦 Upload response data: {error: "Unauthorized"}
❌ Upload error: Unauthorized
```

## 🛠️ **Troubleshooting**

### **If Upload Fails:**
1. **Check console logs** for specific error messages
2. **Verify you're logged in** to the application
3. **Check file size** (must be < 5MB)
4. **Check file type** (must be an image)
5. **Check Cloudinary credentials** (if using real uploads)

### **If Image Doesn't Display:**
1. **Check image URL** in the results
2. **Verify Next.js config** allows the image domain
3. **Check console for image loading errors**
4. **Try copying the URL** and opening in new tab

### **If No Console Logs:**
1. **Open developer tools** (F12)
2. **Go to Console tab**
3. **Refresh the page** and try again
4. **Check if JavaScript is enabled**

## 🎉 **Expected Behavior**

### **With Cloudinary Setup:**
- Real image uploads to Cloudinary
- Optimized images (800x600, auto quality)
- Organized storage in `rozgarhub/posts` folder

### **With Fallback Mode:**
- Placeholder images for testing
- Mock URLs for development
- All functionality works without Cloudinary

## 📞 **Next Steps**

After successful upload test:
1. **Copy the image URL** from results
2. **Go to posts page** (`/posts`)
3. **Create a new post** with the uploaded image
4. **Verify it appears** at the top of the feed

This test page helps you verify that the entire image upload pipeline is working correctly!
