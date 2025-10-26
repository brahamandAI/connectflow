import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Configure Cloudinary if credentials are available
const hasCloudinaryConfig = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
                           process.env.CLOUDINARY_API_KEY && 
                           process.env.CLOUDINARY_API_SECRET;

if (hasCloudinaryConfig) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary configured successfully');
} else {
  console.warn('⚠️ Cloudinary credentials not found. Using fallback upload system.');
}

// POST /api/upload - Upload image files to Cloudinary or fallback
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size should be less than 5MB' },
        { status: 400 }
      );
    }

    console.log('📁 File upload attempt:', {
      name: file.name,
      size: file.size,
      type: file.type,
      hasCloudinary: hasCloudinaryConfig
    });

    // If Cloudinary is configured, use it
    if (hasCloudinaryConfig) {
      // Convert file to buffer first
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<Response>((resolve) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'rozgarhub/posts',
            public_id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            transformation: [
              { width: 800, height: 600, crop: 'limit', quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) {
              console.error('❌ Cloudinary upload error:', error);
              resolve(NextResponse.json(
                { error: 'Failed to upload to Cloudinary', details: error instanceof Error ? error.message : 'Unknown error' },
                { status: 500 }
              ));
            } else {
              console.log('✅ Cloudinary upload successful:', result?.secure_url);
              resolve(NextResponse.json({
                url: result?.secure_url,
                secure_url: result?.secure_url,
                public_id: result?.public_id,
                width: result?.width,
                height: result?.height,
                format: result?.format,
                message: 'Upload successful'
              }));
            }
          }
        ).end(buffer);
      });
    } else {
      // Fallback: Return a mock URL for development
      console.log('🔄 Using fallback upload system');
      const mockUrl = `https://via.placeholder.com/800x600/4F46E5/FFFFFF?text=${encodeURIComponent(file.name)}`;
      
      return Promise.resolve<Response>(NextResponse.json({
        url: mockUrl,
        secure_url: mockUrl,
        public_id: `mock_${Date.now()}`,
        width: 800,
        height: 600,
        format: 'png',
        message: 'Upload successful (fallback mode - add Cloudinary credentials for real uploads)'
      }));
    }

  } catch (error) {
    console.error('❌ Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}