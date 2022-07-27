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
## Answer

The response should be like:
```
{
	"text": "Hi. This is a test. One, two, three.",
	"counterWordFounded": 3,
	"timeStampFoundedWord": 1472,
	"status": "completed",
	"wordsCounter": 8,
	"confidence": 0.851495
}
```

where text is the transcripted sentence, counterWordFounded is the number of times that the word appears, timeStampFoundedWord is the time where the word was used, wordsCounter is the number of words.
# Note: The API used for the transcription is slow, so be patient with it