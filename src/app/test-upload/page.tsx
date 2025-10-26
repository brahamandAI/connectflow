"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image as ImageIcon, CheckCircle, XCircle, Loader2, Cloud, Key, Settings } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  message: string;
}

interface CloudinaryTestResult {
  success: boolean;
  message: string;
  details?: any;
  error?: string;
}

export default function TestUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Cloudinary test states
  const [isTestingCloudinary, setIsTestingCloudinary] = useState(false);
  const [cloudinaryTestResult, setCloudinaryTestResult] = useState<CloudinaryTestResult | null>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setUploadResult(null);
    setUploadError(null);
    toast.success('File selected successfully');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadResult(null);

    try {
      console.log('🚀 Starting upload test...');
      console.log('📁 File details:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('📡 Upload response status:', response.status);
      console.log('📡 Upload response headers:', Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log('📦 Upload response data:', data);

      if (response.ok) {
        setUploadResult(data);
        toast.success('Upload successful!');
        console.log('✅ Upload successful:', data);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const resetTest = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setUploadError(null);
    setDragActive(false);
  };

  const testCloudinaryCredentials = async () => {
    setIsTestingCloudinary(true);
    setCloudinaryTestResult(null);

    try {
      console.log('🔧 Testing Cloudinary credentials...');
      
      // Test if credentials are available
      const hasCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not set';
      const hasApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'Set' : 'Not set';
      const hasApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET ? 'Set' : 'Not set';

      console.log('📋 Credential check:', {
        cloudName: hasCloudName,
        apiKey: hasApiKey,
        apiSecret: hasApiSecret
      });

      // Test with a simple API call
      const testResponse = await fetch('/api/test-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const testData = await testResponse.json();
      console.log('🧪 Cloudinary test response:', testData);

      if (testResponse.ok) {
        setCloudinaryTestResult({
          success: true,
          message: 'Cloudinary credentials are working!',
          details: testData
        });
        toast.success('Cloudinary test successful!');
      } else {
        setCloudinaryTestResult({
          success: false,
          message: 'Cloudinary test failed',
          error: testData.error || 'Unknown error',
          details: testData
        });
        toast.error('Cloudinary test failed');
      }
    } catch (error) {
      console.error('❌ Cloudinary test error:', error);
      setCloudinaryTestResult({
        success: false,
        message: 'Failed to test Cloudinary',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      toast.error('Failed to test Cloudinary');
    } finally {
      setIsTestingCloudinary(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">🖼️ Image Upload Test</h1>
        <p className="text-muted-foreground text-center">
          Test the image upload functionality with detailed logging
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Test
            </CardTitle>
            <CardDescription>
              Select an image file to test the upload API
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : selectedFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {selectedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="font-medium text-green-700">{selectedFile.name}</p>
                    <p className="text-sm text-green-600">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
                    <p className="text-gray-600">
                      Click to select or drag and drop an image
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="w-full"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </>
              )}
            </Button>

            {/* Reset Button */}
            <Button
              onClick={resetTest}
              variant="outline"
              className="w-full"
            >
              Reset Test
            </Button>
          </CardContent>
        </Card>

        {/* Cloudinary Test Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Cloudinary Test
            </CardTitle>
            <CardDescription>
              Test if your Cloudinary credentials are working
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Test Button */}
            <Button
              onClick={testCloudinaryCredentials}
              disabled={isTestingCloudinary}
              className="w-full"
              variant="outline"
            >
              {isTestingCloudinary ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Test Cloudinary
                </>
              )}
            </Button>

            {/* Test Results */}
            {cloudinaryTestResult ? (
              <div className="space-y-3">
                {cloudinaryTestResult.success ? (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium text-green-800">✅ Working</h3>
                    </div>
                    <p className="text-green-700 text-sm">{cloudinaryTestResult.message}</p>
                    {cloudinaryTestResult.details && (
                      <div className="mt-2 text-xs text-green-600">
                        <p><strong>Cloud Name:</strong> {cloudinaryTestResult.details.cloudName || 'N/A'}</p>
                        <p><strong>API Key:</strong> {cloudinaryTestResult.details.apiKey ? 'Set' : 'Not set'}</p>
                        <p><strong>Test Upload:</strong> {cloudinaryTestResult.details.testUpload ? 'Success' : 'Failed'}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium text-red-800">❌ Not Working</h3>
                    </div>
                    <p className="text-red-700 text-sm">{cloudinaryTestResult.message}</p>
                    {cloudinaryTestResult.error && (
                      <p className="text-red-600 text-xs mt-1">
                        <strong>Error:</strong> {cloudinaryTestResult.error}
                      </p>
                    )}
                  </div>
                )}

                {/* Setup Instructions */}
                <div className="text-xs text-gray-600 space-y-2">
                  <h4 className="font-medium text-gray-800">Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Get credentials from <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">cloudinary.com</a></li>
                    <li>Add to <code className="bg-gray-100 px-1 rounded">.env.local</code>:</li>
                    <li className="ml-4 font-mono text-xs">
                      CLOUDINARY_CLOUD_NAME="your-cloud-name"<br/>
                      CLOUDINARY_API_KEY="your-api-key"<br/>
                      CLOUDINARY_API_SECRET="your-api-secret"
                    </li>
                    <li>Restart your development server</li>
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Settings className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Click "Test Cloudinary" to check your credentials</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {uploadError ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : uploadResult ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <ImageIcon className="h-5 w-5" />
              )}
              Upload Results
            </CardTitle>
            <CardDescription>
              View the upload response and test image display
            </CardDescription>
          </CardHeader>
          <CardContent>
            {uploadError ? (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="font-medium text-red-800 mb-2">❌ Upload Failed</h3>
                  <p className="text-red-700">{uploadError}</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Check the browser console for detailed error information.</p>
                  <p>Common issues:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Not logged in to the application</li>
                    <li>File size too large (&gt;5MB)</li>
                    <li>Invalid file type (not an image)</li>
                    <li>Cloudinary credentials not configured</li>
                  </ul>
                </div>
              </div>
            ) : uploadResult ? (
              <div className="space-y-4">
                {/* Success Message */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">✅ Upload Successful</h3>
                  <p className="text-green-700">{uploadResult.message}</p>
                </div>

                {/* Image Preview */}
                <div className="space-y-2">
                  <h4 className="font-medium">Image Preview:</h4>
                  <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                    <Image
                      src={uploadResult.secure_url}
                      alt="Uploaded image"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', uploadResult.secure_url);
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', uploadResult.secure_url);
                      }}
                    />
                  </div>
                </div>

                {/* Upload Details */}
                <div className="space-y-2">
                  <h4 className="font-medium">Upload Details:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
                    <p><strong>URL:</strong> <span className="break-all">{uploadResult.secure_url}</span></p>
                    <p><strong>Public ID:</strong> {uploadResult.public_id}</p>
                    {uploadResult.width && <p><strong>Width:</strong> {uploadResult.width}px</p>}
                    {uploadResult.height && <p><strong>Height:</strong> {uploadResult.height}px</p>}
                    {uploadResult.format && <p><strong>Format:</strong> {uploadResult.format}</p>}
                  </div>
                </div>

                {/* Test Post Creation */}
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps:</h4>
                  <p className="text-sm text-gray-600">
                    This image is now ready to be used in posts. Go to the posts page and create a new post with this image URL.
                  </p>
                  <Button
                    onClick={() => navigator.clipboard.writeText(uploadResult.secure_url)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Copy Image URL
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload an image to see results here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Console Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">🔍 Debug Information</CardTitle>
          <CardDescription>
            Open your browser's developer console to see detailed upload logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-2">Console logs will show:</div>
            <div className="space-y-1 text-xs">
              <div>🚀 Starting upload test...</div>
              <div>📁 File details: name, size, type</div>
              <div>📡 Upload response status and headers</div>
              <div>📦 Upload response data</div>
              <div>✅ Upload successful or ❌ Upload error</div>
              <div>🖼️ Image load success/failure</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Tip:</strong> Press F12 to open developer tools, then go to the Console tab to see detailed logs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
