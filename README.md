# Transcript Audio App

## Installation

You can clone this repo and use a client app like PostMan or insomnia
Install the dependencies and devDependencies and start the server.

## Endpoint

```
Method post
http://localhost:8000/upload
structured as Multipart Form with:
    - sampleFile: must be an audio file
    - word: the word to search in the transcript
```

# Note: The API used for the transcription is slow, so be patient with it