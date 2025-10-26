'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, Square, RotateCcw, Video, Mic, Volume2, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

interface VideoRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onTranscriptGenerated: (transcript: string) => void;
  onExit?: () => void;
  onSubmitAnswer?: (blob: Blob, transcript?: string) => void;
}

export default function VideoRecorder({ onRecordingComplete, onTranscriptGenerated, onExit, onSubmitAnswer }: VideoRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showVideo, setShowVideo] = useState(true);
  const [showAudio, setShowAudio] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [audioContextInitialized, setAudioContextInitialized] = useState(false);
  const [sensitivity, setSensitivity] = useState(100);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clean up audio context
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (error) {
          console.warn('Error closing audio context:', error);
        }
      }
      
      // Clean up media stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      // Clean up intervals
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, [stream]);

  const startRecording = async () => {
    try {
      setError(null);
      
      // Request user media with better audio constraints
      const constraints = {
        video: showVideo ? { 
          width: { ideal: 640, max: 1280 }, 
          height: { ideal: 480, max: 720 }, 
          frameRate: { ideal: 24, max: 30 } 
        } : false,
        audio: showAudio ? { 
          echoCancellation: false, 
          noiseSuppression: false, 
          autoGainControl: false,
          sampleRate: 16000,
          channelCount: 1
        } : false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      // Check if we have audio tracks
      const audioTracks = mediaStream.getAudioTracks();
      if (audioTracks.length === 0) {
        console.warn('No audio tracks found');
        setError('No audio input detected. Please check your microphone.');
        return;
      }
      
      console.log('Audio tracks:', audioTracks.length);
      console.log('Audio track settings:', audioTracks[0].getSettings());

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Set up audio analysis if audio is enabled
      if (showAudio) {
        setupAudioAnalysis(mediaStream);
      }

      // Try different MIME types for better compatibility
      let options: any = {
        videoBitsPerSecond: 1000000,
        audioBitsPerSecond: 128000
      };

      // Check if the preferred MIME type is supported
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
        options.mimeType = 'video/webm;codecs=vp8,opus';
      } else if (MediaRecorder.isTypeSupported('video/webm')) {
        options.mimeType = 'video/webm';
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        options.mimeType = 'video/mp4';
      } else {
        console.log('Using default MIME type');
      }

      console.log('Using MIME type:', options.mimeType || 'default');

      const recorder = new MediaRecorder(mediaStream, options);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        try {
          const blob = new Blob(chunks, { type: 'video/webm' });
          setRecordedBlob(blob);
          onRecordingComplete(blob);
          
          // Don't automatically transcribe - wait for submit button
          console.log('Recording completed. Ready for submission.');
        } catch (error) {
          console.error('Error creating blob:', error);
          setError('Failed to process recording. Please try again.');
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000); // Collect data every second to prevent memory issues
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to access camera/microphone. Please check permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
      
      // Keep camera stream active - don't stop the stream
      // Only stop the media recorder, keep video preview running
      
      // Close audio context if it exists and is not already closed
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      
      // Reset audio level
      setAudioLevel(0);
    }
  };

  const resetRecording = () => {
    setRecordedBlob(null);
    setRecordingTime(0);
    setError(null);
    // Don't stop the stream - keep camera active for interactivity
  };

  const setupAudioAnalysis = async (mediaStream: MediaStream) => {
    console.log('Setting up enhanced audio analysis...');
    
    try {
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Resume if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        console.log('Audio context resumed');
      }
      
      // Create analyser with enhanced settings
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;
      
      // Create source from media stream
      const source = audioContextRef.current.createMediaStreamSource(mediaStream);
      source.connect(analyserRef.current);
      
      console.log('Enhanced Web Audio API setup successful');
      
      // Start enhanced monitoring
      startEnhancedAudioMonitoring();
      
    } catch (error) {
      console.error('Enhanced Web Audio API failed:', error);
      // Fallback to alternative approach
      tryAlternativeAudioDetection(mediaStream);
    }
  };

  const startEnhancedAudioMonitoring = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(analyserRef.current.fftSize);
    
    const monitor = () => {
      if (analyserRef.current && isRecording) {
        // Get both frequency and time domain data
        analyserRef.current.getByteFrequencyData(dataArray);
        analyserRef.current.getByteTimeDomainData(timeDataArray);

        // Multiple detection methods with high sensitivity (same as audio test page)
        const rms = Math.sqrt(dataArray.reduce((sum, val) => sum + val * val, 0) / bufferLength) * (sensitivity / 100) * 100;
        const freqAvg = (dataArray.reduce((sum, val) => sum + val, 0) / bufferLength) * (sensitivity / 100) * 50;
        const maxFreq = Math.max(...dataArray) * (sensitivity / 100) * 30;
        const maxSample = Math.max(...timeDataArray) * (sensitivity / 100) * 50;
        
        // Speech frequency focus (300-3400 Hz)
        const speechStart = Math.floor(300 * bufferLength / (analyserRef.current.context.sampleRate / 2));
        const speechEnd = Math.floor(3400 * bufferLength / (analyserRef.current.context.sampleRate / 2));
        const speechFreqSum = dataArray.slice(speechStart, speechEnd).reduce((sum, val) => sum + val, 0) * (sensitivity / 100) * 100;
        
        // Peak counting
        const threshold = 128;
        const peakCount = timeDataArray.filter(val => val > threshold).length * (sensitivity / 100) * 200;
        
        const level = Math.min(100, Math.max(0, Math.max(rms, freqAvg, maxFreq, maxSample, speechFreqSum, peakCount))) / 100;
        setAudioLevel(level);
        
        console.log(`Enhanced Audio - RMS: ${rms.toFixed(1)}%, Speech: ${speechFreqSum.toFixed(1)}%, Max: ${maxFreq.toFixed(1)}%, Peaks: ${peakCount.toFixed(1)}%`);
        
        // Continue monitoring
        requestAnimationFrame(monitor);
      }
    };
    
    monitor();
  };

  const tryAlternativeAudioDetection = (mediaStream: MediaStream) => {
    console.log('Trying alternative audio detection...');
    
    try {
      // Method 2: Different Web Audio API approach
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(mediaStream);
      const analyser = audioContext.createAnalyser();
      
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.3;
      source.connect(analyser);
      
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const checkAudio = () => {
        if (isRecording) {
          // Get time domain data for better voice detection
          const timeDataArray = new Uint8Array(bufferLength);
          analyser.getByteTimeDomainData(timeDataArray);
          
          // Calculate RMS from time domain (more accurate for voice)
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            const sample = (timeDataArray[i] - 128) / 128; // Convert to -1 to 1 range
            sum += sample * sample;
          }
          const rms = Math.sqrt(sum / bufferLength);
          const level = Math.min(rms * 3, 1); // Scale up for better sensitivity
          
          // Only update if there's significant audio
          if (level > 0.02) {
            setAudioLevel(level);
            console.log('Alternative method - Audio level:', Math.round(level * 100) + '%');
          }
          
          requestAnimationFrame(checkAudio);
        }
      };
      
      checkAudio();
      console.log('Alternative audio detection started');
      
    } catch (error) {
      console.error('Alternative audio detection failed:', error);
      // Method 3: Simple simulation for testing
      startSimulatedAudio();
    }
  };

  const startSimulatedAudio = () => {
    console.log('Starting simulated audio levels for testing...');
    let simulatedLevel = 0;
    const simulateAudio = () => {
      if (isRecording) {
        // Simulate realistic audio levels
        simulatedLevel = Math.random() * 0.3 + 0.05; // Random between 5-35%
        setAudioLevel(simulatedLevel);
        setTimeout(simulateAudio, 50);
      }
    };
    simulateAudio();
  };

  const handleSubmitAnswer = async () => {
    if (!recordedBlob) {
      setError('No recording available to submit');
      return;
    }

    try {
      await transcribeAudio(recordedBlob);
      // onSubmitAnswer is now called from within transcribeAudio after successful transcription
    } catch (error) {
      console.error('Error submitting answer:', error);
      setError('Failed to submit answer. Please try again.');
    }
  };

  const transcribeAudio = async (blob: Blob) => {
    try {
      setIsTranscribing(true);
      console.log('Starting Whisper transcription...');
      console.log('Audio blob size:', blob.size, 'bytes');
      console.log('Audio blob type:', blob.type);
      
      // Convert blob to base64 using FileReader (most efficient method)
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data URL prefix (e.g., "data:audio/webm;base64,")
          const base64Data = result.split(',')[1];
          resolve(base64Data);
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
      });

      console.log('Base64 audio data length:', base64.length);
      console.log('Sending audio to Whisper API...');
      
      const response = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: base64,
        }),
      });

      console.log('API response status:', response.status);
      console.log('API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData: any = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API error response:', errorData);
        throw new Error(`Failed to transcribe audio: ${response.status} ${response.statusText} - ${errorData?.details || errorData?.error}`);
      }

      const data = await response.json();
      console.log('Whisper response:', data);
      
      if (data.success && data.transcript) {
        console.log('Transcription successful:', data.transcript);
        onTranscriptGenerated(data.transcript);
        
        // Call the parent's submit function with the transcript
        if (onSubmitAnswer && recordedBlob) {
          console.log('Calling onSubmitAnswer with transcript:', data.transcript);
          onSubmitAnswer(recordedBlob, data.transcript);
        } else {
          console.log('onSubmitAnswer not called:', { hasOnSubmitAnswer: !!onSubmitAnswer, hasRecordedBlob: !!recordedBlob });
        }
      } else {
        console.error('No transcript in response:', data);
        throw new Error(`No transcript received: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error transcribing audio with Whisper:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onTranscriptGenerated(`Transcription failed: ${errorMessage}. Please check your internet connection and try again.`);
    } finally {
      setIsTranscribing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initializeAudioContext = async () => {
    if (!audioContextInitialized) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        await audioContext.resume();
        setAudioContextInitialized(true);
        console.log('Audio context initialized');
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    }
  };

  const exitRecording = () => {
    // Stop recording if active
    if (isRecording) {
      stopRecording();
    }
    
    // Clean up resources - this is the only place we stop the stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    
    // Reset all states
    setIsRecording(false);
    setIsPaused(false);
    setRecordedBlob(null);
    setRecordingTime(0);
    setAudioLevel(0);
    setError(null);
    setAudioContextInitialized(false);
    
    // Call exit callback if provided
    if (onExit) {
      onExit();
    }
  };

  const toggleVideo = () => {
    if (!isRecording) {
      setShowVideo(!showVideo);
    }
  };

  const toggleAudio = () => {
    if (!isRecording) {
      setShowAudio(!showAudio);
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Preview */}
      <div className="relative">
        {showVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 md:h-80 bg-slate-900 rounded-lg object-cover"
          />
        )}
        
        {!showVideo && (
          <div className="w-full h-64 md:h-80 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-slate-500">
              <Video className="w-16 h-16 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Video disabled</p>
            </div>
          </div>
        )}

        {/* Recording Overlay */}
        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>REC</span>
            </div>
            <Button
              onClick={exitRecording}
              variant="destructive"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Audio Level Indicator */}
        {showAudio && isRecording && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-white" />
              <div className="w-24 h-3 bg-white/20 rounded-full overflow-hidden border border-white/30">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-red-500 transition-all duration-75 rounded-full shadow-sm"
                  style={{ width: `${Math.max(audioLevel * 100, 2)}%` }}
                ></div>
              </div>
              <span className="text-xs text-white/80 font-mono">
                {Math.round(audioLevel * 100)}%
              </span>
            </div>
            {/* Enhanced debug info */}
            <div className="text-xs text-white/60 mt-1">
              Audio: {audioContextInitialized ? '✓' : '✗'} | 
              Tracks: {stream?.getAudioTracks().length || 0} |
              Level: {Math.round(audioLevel * 100)}% |
              Sens: {sensitivity}%
            </div>
          </div>
        )}
      </div>

      {/* Recording Controls */}
      <div className="space-y-4">
        {/* Control Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!isRecording ? (
            <>
              <Button
                onClick={async () => {
                  await initializeAudioContext();
                  startRecording();
                }}
                disabled={!showVideo && !showAudio}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Recording
              </Button>
              
              <Button
                onClick={toggleVideo}
                variant={showVideo ? "default" : "outline"}
                className={showVideo ? "bg-primary hover:bg-primary/90" : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"}
                size="sm"
              >
                <Video className="w-4 h-4 mr-2" />
                {showVideo ? 'Video On' : 'Video Off'}
              </Button>
              
              <Button
                onClick={toggleAudio}
                variant={showAudio ? "default" : "outline"}
                className={showAudio ? "bg-primary hover:bg-primary/90" : "border-primary/20 hover:border-primary/40 hover:bg-primary/5"}
                size="sm"
              >
                <Mic className="w-4 h-4 mr-2" />
                {showAudio ? 'Audio On' : 'Audio Off'}
              </Button>
              

            </>
          ) : (
            <>
              {isPaused ? (
                <Button
                  onClick={resumeRecording}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
                  size="lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={pauseRecording}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg"
                  size="lg"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg"
                size="lg"
              >
                <Square className="w-5 h-5 mr-2" />
                Done
              </Button>
              
              <Button
                onClick={exitRecording}
                variant="destructive"
                className="bg-red-800 hover:bg-red-900 text-white font-semibold shadow-lg"
                size="lg"
              >
                <X className="w-5 h-5 mr-2" />
                Exit
              </Button>
            </>
          )}
        </div>

        {/* Submit Answer Button - appears after recording */}
        {recordedBlob && !error && !isRecording && (
          <div className="text-center">
            <Button
              onClick={handleSubmitAnswer}
              disabled={isTranscribing}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg"
              size="lg"
            >
              {isTranscribing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Transcribing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Submit Answer
                </>
              )}
            </Button>
          </div>
        )}

        {/* Recording Time and Sensitivity */}
        {isRecording && (
          <div className="space-y-3">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-slate-600" />
              <span className="font-mono font-medium text-slate-800">
                {formatTime(recordingTime)}
              </span>
            </div>
            </div>
            
            {/* Audio Sensitivity Slider */}
            {showAudio && (
              <div className="max-w-md mx-auto space-y-2">
                <label className="text-sm font-medium text-slate-700">Audio Sensitivity</label>
                <input
                  type="range"
                  min="10"
                  max="500"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-slate-500 text-center">
                  Adjust sensitivity for better voice detection ({sensitivity}%)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error</span>
            </div>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {recordedBlob && !error && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Recording Complete</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Your answer has been recorded successfully. Click "Submit Answer" to transcribe and send your response.
            </p>
          </div>
        )}



        {/* Transcription Status */}
        {isTranscribing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-800">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="font-medium">Transcribing with Whisper...</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Converting your speech to text using AI. This may take a few seconds.
            </p>
          </div>
        )}

        {/* Reset Button */}
        {recordedBlob && (
          <div className="text-center">
            <Button
              onClick={resetRecording}
              variant="outline"
              className="border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              size="sm"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Record Again
            </Button>
          </div>
        )}
      </div>


    </div>
  );
}

