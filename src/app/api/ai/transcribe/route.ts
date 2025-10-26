import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { transcribeAudio } from '@/lib/ai-utils';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { audio } = await request.json();

    if (!audio) {
      return NextResponse.json({ error: 'Audio data is required' }, { status: 400 });
    }

    console.log('Transcription request received, audio data length:', audio.length);

    // Call OpenAI Whisper API for transcription
    const transcription = await transcribeAudio(audio);
    
    if (!transcription) {
      return NextResponse.json({ 
        error: 'Failed to transcribe audio - no speech detected. Please ensure the audio contains clear speech and try again.' 
      }, { status: 400 });
    }

    console.log('Transcription completed successfully');
    return NextResponse.json({ 
      success: true, 
      transcript: transcription
    });

  } catch (error) {
    console.error('Error transcribing audio:', error);
    
    // Return more specific error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Determine appropriate status code based on error type
    let statusCode = 500;
    if (errorMessage.includes('No speech detected') || errorMessage.includes('audio quality')) {
      statusCode = 400; // Bad request for audio quality issues
    } else if (errorMessage.includes('Unauthorized') || errorMessage.includes('API key')) {
      statusCode = 401; // Unauthorized for API key issues
    }
    
    return NextResponse.json({ 
      error: 'Transcription failed', 
      details: errorMessage,
      success: false 
    }, { status: statusCode });
  }
}



