'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Volume2, Play, Square, AlertCircle, CheckCircle, X, FileText, Code, Download } from 'lucide-react';

export default function AudioTestPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [audioTracks, setAudioTracks] = useState<MediaStreamTrack[]>([]);
  const [audioSettings, setAudioSettings] = useState<any>(null);
  const [sensitivity, setSensitivity] = useState(100);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecordingForTranscription, setIsRecordingForTranscription] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [showPythonCode, setShowPythonCode] = useState(false);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  const startAudioTest = async () => {
    try {
      setError(null);
      addLog('Requesting microphone access...');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleRate: 16000,
          channelCount: 1
        }
      });
      
      setStream(mediaStream);
      setAudioTracks(mediaStream.getAudioTracks());
      
      if (mediaStream.getAudioTracks().length > 0) {
        const track = mediaStream.getAudioTracks()[0];
        setAudioSettings(track.getSettings());
        addLog(`Audio track settings: ${JSON.stringify(track.getSettings())}`);
      }
      
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(audioCtx);
      
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
        addLog('Audio context resumed');
      }
      
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 2048;
      analyserNode.smoothingTimeConstant = 0.8;
      setAnalyser(analyserNode);
      
      const source = audioCtx.createMediaStreamSource(mediaStream);
      source.connect(analyserNode);
      
      setIsRecording(true);
      addLog('Audio test started successfully');
      
    } catch (error: any) {
      const errorMsg = `Failed to start audio test: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setError(errorMsg);
      addLog(errorMsg);
    }
  };

  const stopAudioTest = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (audioContext && audioContext.state !== 'closed') {
      try {
        audioContext.close();
      } catch (error) {
        console.warn('Error closing audio context:', error);
      }
      setAudioContext(null);
    }
    setAnalyser(null);
    setAudioTracks([]);
    setAudioSettings(null);
    setIsRecording(false);
    setAudioLevel(0);
    setTranscript('');
    setIsTranscribing(false);
    addLog('Audio test stopped');
  };

  const startRecordingForTranscription = () => {
    if (!stream) {
      addLog('No audio stream available for recording');
      return;
    }

    try {
      const chunks: Blob[] = [];
      setRecordedChunks(chunks);

      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        transcribeAudio(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecordingForTranscription(true);
      addLog('Started recording for transcription...');
    } catch (error) {
      addLog(`Failed to start recording: ${error}`);
    }
  };

  const stopRecordingForTranscription = () => {
    if (mediaRecorder && isRecordingForTranscription) {
      mediaRecorder.stop();
      setIsRecordingForTranscription(false);
      addLog('Stopped recording for transcription...');
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);
      addLog('Starting transcription...');

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
        reader.readAsDataURL(audioBlob);
      });

      const response = await fetch('/api/ai/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: base64,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to transcribe audio');
      }

      const data = await response.json();
      if (data.success && data.transcript) {
        setTranscript(data.transcript);
        addLog(`Transcription: "${data.transcript}"`);
      } else {
        throw new Error('No transcript received');
      }
    } catch (error) {
      console.error('Error transcribing audio:', error);
      addLog(`Transcription failed: ${error}`);
      setTranscript('Transcription failed. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const checkAudioLevel = () => {
    if (analyser && isRecording) {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const timeDataArray = new Uint8Array(analyser.fftSize);

      analyser.getByteFrequencyData(dataArray);
      analyser.getByteTimeDomainData(timeDataArray);

      // Multiple detection methods with high sensitivity
      const rms = Math.sqrt(dataArray.reduce((sum, val) => sum + val * val, 0) / bufferLength) * (sensitivity / 100) * 100;
      const freqAvg = (dataArray.reduce((sum, val) => sum + val, 0) / bufferLength) * (sensitivity / 100) * 50;
      const maxFreq = Math.max(...dataArray) * (sensitivity / 100) * 30;
      const maxSample = Math.max(...timeDataArray) * (sensitivity / 100) * 50;
      
      // Speech frequency focus (300-3400 Hz)
      const speechStart = Math.floor(300 * bufferLength / (analyser.context.sampleRate / 2));
      const speechEnd = Math.floor(3400 * bufferLength / (analyser.context.sampleRate / 2));
      const speechFreqSum = dataArray.slice(speechStart, speechEnd).reduce((sum, val) => sum + val, 0) * (sensitivity / 100) * 100;
      
      // Peak counting
      const threshold = 128;
      const peakCount = timeDataArray.filter(val => val > threshold).length * (sensitivity / 100) * 200;
      
      const level = Math.min(100, Math.max(0, Math.max(rms, freqAvg, maxFreq, maxSample, speechFreqSum, peakCount)));
      setAudioLevel(level);
      
      addLog(`RMS: ${rms.toFixed(1)}%, Speech: ${speechFreqSum.toFixed(1)}%, Max: ${maxFreq.toFixed(1)}%, Peaks: ${peakCount.toFixed(1)}%`);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && analyser) {
      interval = setInterval(checkAudioLevel, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, analyser, sensitivity]);

  // Cleanup effect for component unmount
  useEffect(() => {
    return () => {
      // Clean up audio context
      if (audioContext && audioContext.state !== 'closed') {
        try {
          audioContext.close();
        } catch (error) {
          console.warn('Error closing audio context:', error);
        }
      }
      
      // Clean up media stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [audioContext, stream]);

  const downloadPythonCode = () => {
    const pythonCode = `# Speech-to-Text with OpenAI Whisper
# A Python project for transcribing audio files and real-time microphone input

"""
Installation Instructions:
pip install openai-whisper sounddevice

Additional dependencies for audio file support:
pip install librosa soundfile
"""

import whisper
import sounddevice as sd
import numpy as np
import os
import sys
from pathlib import Path
import argparse
import time

class WhisperTranscriber:
    def __init__(self, model_name="small"):
        """
        Initialize the Whisper transcriber with specified model.
        
        Args:
            model_name (str): Whisper model to use. Options: tiny, base, small, medium, large
        """
        self.model_name = model_name
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the Whisper model."""
        try:
            print(f"Loading Whisper model: {self.model_name}")
            self.model = whisper.load_model(self.model_name)
            print(f"✅ Model '{self.model_name}' loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            sys.exit(1)
    
    def transcribe_file(self, audio_path):
        """
        Transcribe audio from a file.
        
        Args:
            audio_path (str): Path to the audio file
            
        Returns:
            str: Transcribed text
        """
        try:
            # Check if file exists
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")
            
            # Check file extension
            valid_extensions = ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.wma']
            file_ext = Path(audio_path).suffix.lower()
            
            if file_ext not in valid_extensions:
                print(f"⚠️  Warning: {file_ext} may not be supported. Supported formats: {valid_extensions}")
            
            print(f"🎵 Transcribing file: {audio_path}")
            print("⏳ Processing... This may take a moment.")
            
            # Transcribe the audio
            result = self.model.transcribe(audio_path)
            transcript = result["text"].strip()
            
            print(f"✅ Transcription completed!")
            return transcript
            
        except FileNotFoundError as e:
            print(f"❌ File Error: {e}")
            return None
        except Exception as e:
            print(f"❌ Transcription Error: {e}")
            return None
    
    def transcribe_microphone(self, duration=10, sample_rate=16000):
        """
        Record from microphone and transcribe in real-time.
        
        Args:
            duration (int): Recording duration in seconds
            sample_rate (int): Audio sample rate (Whisper works best with 16kHz)
            
        Returns:
            str: Transcribed text
        """
        try:
            print(f"🎤 Recording from microphone for {duration} seconds...")
            print("🔴 Recording started! Speak now...")
            
            # Record audio
            audio_data = sd.rec(
                int(duration * sample_rate), 
                samplerate=sample_rate, 
                channels=1, 
                dtype=np.float32
            )
            sd.wait()  # Wait until recording is finished
            
            print("⏹️  Recording finished!")
            print("⏳ Transcribing... This may take a moment.")
            
            # Transcribe the recorded audio
            result = self.model.transcribe(audio_data, fp16=False)
            transcript = result["text"].strip()
            
            print(f"✅ Transcription completed!")
            return transcript
            
        except PermissionError:
            print("❌ Microphone Permission Error: Please allow microphone access")
            return None
        except Exception as e:
            print(f"❌ Recording Error: {e}")
            return None
    
    def list_audio_devices(self):
        """List available audio devices."""
        print("🎧 Available Audio Devices:")
        devices = sd.query_devices()
        for i, device in enumerate(devices):
            if device['max_input_channels'] > 0:
                print(f"  {i}: {device['name']} (Input channels: {device['max_input_channels']})")
    
    def set_audio_device(self, device_id):
        """Set the audio device for recording."""
        try:
            sd.default.device = device_id
            print(f"✅ Audio device set to: {sd.query_devices(device_id)['name']}")
        except Exception as e:
            print(f"❌ Error setting audio device: {e}")

def main():
    """Main function to run the speech-to-text application."""
    parser = argparse.ArgumentParser(description="Speech-to-Text with OpenAI Whisper")
    parser.add_argument("--model", default="small", 
                       choices=["tiny", "base", "small", "medium", "large"],
                       help="Whisper model to use (default: small)")
    parser.add_argument("--file", type=str, help="Path to audio file to transcribe")
    parser.add_argument("--mic", action="store_true", help="Record from microphone")
    parser.add_argument("--duration", type=int, default=10, 
                       help="Recording duration in seconds (default: 10)")
    parser.add_argument("--list-devices", action="store_true", 
                       help="List available audio devices")
    
    args = parser.parse_args()
    
    # Initialize transcriber
    transcriber = WhisperTranscriber(model_name=args.model)
    
    # List devices if requested
    if args.list_devices:
        transcriber.list_audio_devices()
        return
    
    # Transcribe from file
    if args.file:
        transcript = transcriber.transcribe_file(args.file)
        if transcript:
            print("\\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Transcribe from microphone
    if args.mic:
        transcript = transcriber.transcribe_microphone(duration=args.duration)
        if transcript:
            print("\\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Interactive mode
    print("🎯 Speech-to-Text with OpenAI Whisper")
    print("="*40)
    
    while True:
        print("\\nChoose an option:")
        print("1. Transcribe audio file")
        print("2. Record from microphone")
        print("3. List audio devices")
        print("4. Change model")
        print("5. Exit")
        
        choice = input("\\nEnter your choice (1-5): ").strip()
        
        if choice == "1":
            file_path = input("Enter path to audio file: ").strip()
            if file_path:
                transcript = transcriber.transcribe_file(file_path)
                if transcript:
                    print("\\n" + "="*50)
                    print("📝 TRANSCRIPT:")
                    print("="*50)
                    print(transcript)
                    print("="*50)
        
        elif choice == "2":
            try:
                duration = int(input("Enter recording duration in seconds (default 10): ") or "10")
            except ValueError:
                duration = 10
            
            transcript = transcriber.transcribe_microphone(duration=duration)
            if transcript:
                print("\\n" + "="*50)
                print("📝 TRANSCRIPT:")
                print("="*50)
                print(transcript)
                print("="*50)
        
        elif choice == "3":
            transcriber.list_audio_devices()
        
        elif choice == "4":
            print("Available models: tiny, base, small, medium, large")
            new_model = input("Enter model name: ").strip()
            if new_model in ["tiny", "base", "small", "medium", "large"]:
                transcriber = WhisperTranscriber(model_name=new_model)
            else:
                print("❌ Invalid model name")
        
        elif choice == "5":
            print("👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid choice. Please enter 1-5.")

if __name__ == "__main__":
    main()`;

    const blob = new Blob([pythonCode], { type: 'text/python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'speech_to_text.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Audio Test & Speech-to-Text</h1>
          <p className="text-gray-600">Test your microphone and transcribe speech using AI</p>
        </div>

        {/* Python Code Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Python Speech-to-Text Code</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setShowPythonCode(!showPythonCode)}
                  variant="outline"
                  size="sm"
                >
                  {showPythonCode ? 'Hide' : 'Show'} Code
                </Button>
                <Button
                  onClick={downloadPythonCode}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          {showPythonCode && (
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm">
{`# Speech-to-Text with OpenAI Whisper
# A Python project for transcribing audio files and real-time microphone input

"""
Installation Instructions:
pip install openai-whisper sounddevice

Additional dependencies for audio file support:
pip install librosa soundfile
"""

import whisper
import sounddevice as sd
import numpy as np
import os
import sys
from pathlib import Path
import argparse
import time

class WhisperTranscriber:
    def __init__(self, model_name="small"):
        """
        Initialize the Whisper transcriber with specified model.
        
        Args:
            model_name (str): Whisper model to use. Options: tiny, base, small, medium, large
        """
        self.model_name = model_name
        self.model = None
        self.load_model()
    
    def load_model(self):
        """Load the Whisper model."""
        try:
            print(f"Loading Whisper model: {self.model_name}")
            self.model = whisper.load_model(self.model_name)
            print(f"✅ Model '{self.model_name}' loaded successfully!")
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            sys.exit(1)
    
    def transcribe_file(self, audio_path):
        """
        Transcribe audio from a file.
        
        Args:
            audio_path (str): Path to the audio file
            
        Returns:
            str: Transcribed text
        """
        try:
            # Check if file exists
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")
            
            # Check file extension
            valid_extensions = ['.mp3', '.wav', '.m4a', '.flac', '.ogg', '.wma']
            file_ext = Path(audio_path).suffix.lower()
            
            if file_ext not in valid_extensions:
                print(f"⚠️  Warning: {file_ext} may not be supported. Supported formats: {valid_extensions}")
            
            print(f"🎵 Transcribing file: {audio_path}")
            print("⏳ Processing... This may take a moment.")
            
            # Transcribe the audio
            result = self.model.transcribe(audio_path)
            transcript = result["text"].strip()
            
            print(f"✅ Transcription completed!")
            return transcript
            
        except FileNotFoundError as e:
            print(f"❌ File Error: {e}")
            return None
        except Exception as e:
            print(f"❌ Transcription Error: {e}")
            return None
    
    def transcribe_microphone(self, duration=10, sample_rate=16000):
        """
        Record from microphone and transcribe in real-time.
        
        Args:
            duration (int): Recording duration in seconds
            sample_rate (int): Audio sample rate (Whisper works best with 16kHz)
            
        Returns:
            str: Transcribed text
        """
        try:
            print(f"🎤 Recording from microphone for {duration} seconds...")
            print("🔴 Recording started! Speak now...")
            
            # Record audio
            audio_data = sd.rec(
                int(duration * sample_rate), 
                samplerate=sample_rate, 
                channels=1, 
                dtype=np.float32
            )
            sd.wait()  # Wait until recording is finished
            
            print("⏹️  Recording finished!")
            print("⏳ Transcribing... This may take a moment.")
            
            # Transcribe the recorded audio
            result = self.model.transcribe(audio_data, fp16=False)
            transcript = result["text"].strip()
            
            print(f"✅ Transcription completed!")
            return transcript
            
        except PermissionError:
            print("❌ Microphone Permission Error: Please allow microphone access")
            return None
        except Exception as e:
            print(f"❌ Recording Error: {e}")
            return None
    
    def list_audio_devices(self):
        """List available audio devices."""
        print("🎧 Available Audio Devices:")
        devices = sd.query_devices()
        for i, device in enumerate(devices):
            if device['max_input_channels'] > 0:
                print(f"  {i}: {device['name']} (Input channels: {device['max_input_channels']})")
    
    def set_audio_device(self, device_id):
        """Set the audio device for recording."""
        try:
            sd.default.device = device_id
            print(f"✅ Audio device set to: {sd.query_devices(device_id)['name']}")
        except Exception as e:
            print(f"❌ Error setting audio device: {e}")

def main():
    """Main function to run the speech-to-text application."""
    parser = argparse.ArgumentParser(description="Speech-to-Text with OpenAI Whisper")
    parser.add_argument("--model", default="small", 
                       choices=["tiny", "base", "small", "medium", "large"],
                       help="Whisper model to use (default: small)")
    parser.add_argument("--file", type=str, help="Path to audio file to transcribe")
    parser.add_argument("--mic", action="store_true", help="Record from microphone")
    parser.add_argument("--duration", type=int, default=10, 
                       help="Recording duration in seconds (default: 10)")
    parser.add_argument("--list-devices", action="store_true", 
                       help="List available audio devices")
    
    args = parser.parse_args()
    
    # Initialize transcriber
    transcriber = WhisperTranscriber(model_name=args.model)
    
    # List devices if requested
    if args.list_devices:
        transcriber.list_audio_devices()
        return
    
    # Transcribe from file
    if args.file:
        transcript = transcriber.transcribe_file(args.file)
        if transcript:
            print("\\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Transcribe from microphone
    if args.mic:
        transcript = transcriber.transcribe_microphone(duration=args.duration)
        if transcript:
            print("\\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Interactive mode
    print("🎯 Speech-to-Text with OpenAI Whisper")
    print("="*40)
    
    while True:
        print("\\nChoose an option:")
        print("1. Transcribe audio file")
        print("2. Record from microphone")
        print("3. List audio devices")
        print("4. Change model")
        print("5. Exit")
        
        choice = input("\\nEnter your choice (1-5): ").strip()
        
        if choice == "1":
            file_path = input("Enter path to audio file: ").strip()
            if file_path:
                transcript = transcriber.transcribe_file(file_path)
                if transcript:
                    print("\\n" + "="*50)
                    print("📝 TRANSCRIPT:")
                    print("="*50)
                    print(transcript)
                    print("="*50)
        
        elif choice == "2":
            try:
                duration = int(input("Enter recording duration in seconds (default 10): ") or "10")
            except ValueError:
                duration = 10
            
            transcript = transcriber.transcribe_microphone(duration=duration)
            if transcript:
                print("\\n" + "="*50)
                print("📝 TRANSCRIPT:")
                print("="*50)
                print(transcript)
                print("="*50)
        
        elif choice == "3":
            transcriber.list_audio_devices()
        
        elif choice == "4":
            print("Available models: tiny, base, small, medium, large")
            new_model = input("Enter model name: ").strip()
            if new_model in ["tiny", "base", "small", "medium", "large"]:
                transcriber = WhisperTranscriber(model_name=new_model)
            else:
                print("❌ Invalid model name")
        
        elif choice == "5":
            print("👋 Goodbye!")
            break
        
        else:
            print("❌ Invalid choice. Please enter 1-5.")

if __name__ == "__main__":
    main()`}
                </pre>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Audio Test Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>Audio Test</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isRecording ? (
                <Button onClick={startAudioTest} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Start Audio Test
                </Button>
              ) : (
                <Button onClick={stopAudioTest} variant="destructive" className="w-full">
                  <Square className="w-4 h-4 mr-2" />
                  Stop Audio Test
                </Button>
              )}

              {isRecording && (
                <div className="space-y-4">
                  {/* Audio Level Display */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {audioLevel.toFixed(1)}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-red-500 h-4 rounded-full transition-all duration-100"
                        style={{ width: `${Math.max(2, audioLevel)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      Audio Level: {audioLevel.toFixed(1)}% | Sensitivity: {sensitivity}%
                    </div>
                  </div>

                  {/* Sensitivity Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Audio Sensitivity</label>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      value={sensitivity}
                      onChange={(e) => setSensitivity(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500">
                      Adjust sensitivity for better voice detection
                    </div>
                  </div>

                  {/* Test Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={checkAudioLevel}
                      variant="outline"
                      className="w-full bg-blue-50 border-blue-200 hover:bg-blue-100"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Check Level
                    </Button>
                    
                    <Button
                      onClick={() => {
                        addLog('CLAP TEST: Please clap your hands or make a loud noise now!');
                        setTimeout(() => {
                          checkAudioLevel();
                          addLog('CLAP TEST: Check the audio level above - it should be much higher than 1%');
                        }, 1000);
                      }}
                      variant="outline"
                      className="w-full bg-yellow-50 border-yellow-200 hover:bg-yellow-100"
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Clap Test
                    </Button>
                  </div>
                  
                  {/* Transcription Controls */}
                  <div className="border-t pt-4">
                    <div className="text-sm font-medium mb-2">Speech-to-Text Test</div>
                    {!isRecordingForTranscription ? (
                      <Button
                        onClick={startRecordingForTranscription}
                        variant="outline"
                        className="w-full bg-blue-50 border-blue-200 hover:bg-blue-100"
                        disabled={!isRecording}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        Record & Transcribe
                      </Button>
                    ) : (
                      <Button
                        onClick={stopRecordingForTranscription}
                        variant="outline"
                        className="w-full bg-red-50 border-red-200 hover:bg-red-100"
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Stop Recording
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Error</span>
                  </div>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Audio Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Volume2 className="w-5 h-5" />
                <span>Audio Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {audioTracks.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Audio: ✓ | Tracks: {audioTracks.length} | Level: {audioLevel.toFixed(1)}%</span>
                  </div>
                  
                  {audioSettings && (
                    <div className="text-sm space-y-1">
                      <div><span className="font-medium">Sample Rate:</span> {audioSettings.sampleRate || 'N/A'}</div>
                      <div><span className="font-medium">Channels:</span> {audioSettings.channelCount || 'N/A'}</div>
                      <div><span className="font-medium">Echo Cancellation:</span> {audioSettings.echoCancellation ? 'Yes' : 'No'}</div>
                      <div><span className="font-medium">Noise Suppression:</span> {audioSettings.noiseSuppression ? 'Yes' : 'No'}</div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  Start audio test to see information
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Transcript Display */}
        {(transcript || isTranscribing) && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Speech-to-Text Result</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isTranscribing ? (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span>Transcribing your speech...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-800 leading-relaxed">
                      {transcript || 'No transcription yet. Click "Record & Transcribe" to test speech-to-text.'}
                    </p>
                  </div>
                  {transcript && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Character count:</span> {transcript.length}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Logs */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Debug Logs</span>
              <Button
                onClick={() => setLogs([])}
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
              {logs.length === 0 ? (
                <div className="text-gray-500">No logs yet. Start audio test to see debug information.</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">{log}</div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Test</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>1. Click "Start Audio Test" to begin microphone access</p>
              <p>2. Allow microphone permissions when prompted</p>
              <p>3. Speak into your microphone and watch the audio level</p>
              <p>4. Adjust the sensitivity slider for better voice detection</p>
              <p>5. Click "Record & Transcribe" to test speech-to-text</p>
              <p>6. Check the debug logs for detailed audio analysis</p>
              <p>7. Use "Clap Test" to verify microphone is working</p>
              <p>8. Download the Python code above for offline use</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

