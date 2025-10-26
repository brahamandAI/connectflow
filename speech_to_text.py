# Speech-to-Text with OpenAI Whisper
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
            print("\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Transcribe from microphone
    if args.mic:
        transcript = transcriber.transcribe_microphone(duration=args.duration)
        if transcript:
            print("\n" + "="*50)
            print("📝 TRANSCRIPT:")
            print("="*50)
            print(transcript)
            print("="*50)
        return
    
    # Interactive mode
    print("🎯 Speech-to-Text with OpenAI Whisper")
    print("="*40)
    
    while True:
        print("\nChoose an option:")
        print("1. Transcribe audio file")
        print("2. Record from microphone")
        print("3. List audio devices")
        print("4. Change model")
        print("5. Exit")
        
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == "1":
            file_path = input("Enter path to audio file: ").strip()
            if file_path:
                transcript = transcriber.transcribe_file(file_path)
                if transcript:
                    print("\n" + "="*50)
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
                print("\n" + "="*50)
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
    main()

