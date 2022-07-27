const fs = require("fs");
const fetch = require("node-fetch");

module.exports = class TranscriptionService {
  constructor() {}

  upload(filePath, bodyData) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, async (err, data) => {
        if (err) {
          reject(err);
        }
        const params = {
          headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "Transfer-Encoding": "chunked",
          },
          body: data,
          method: "POST",
        };

        const headers = {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          "content-type": "application/json",
        };

        const res1 = await fetch(process.env.URL_ASSEMBLYAPI, params);
        const uploadFile = await res1.json();
        const res2 = await fetch(
          process.env.URL_TRANSCRIPT, 
          {
          headers,
          body: JSON.stringify({ audio_url: uploadFile["upload_url"] }),
          method: "POST",
        });
        const transcriptedData = await res2.json();
        const res3 = await fetch(
          `${process.env.URL_TRANSCRIPT}/${transcriptedData.id}`,
          {
            headers,
            method: "GET",
          }
        );
        let finalResult = await res3.json();
        while (finalResult.status === "processing") {
          const res3 = await fetch(
            `${process.env.URL_TRANSCRIPT}/${transcriptedData.id}`,
            {
              headers,
              method: "GET",
            }
          );
          finalResult = await res3.json();
          if (finalResult.status !== "processing") {
            const regex = new RegExp(bodyData.word.toUpperCase(), "g");
            resolve({
              text: finalResult.text,
              counterWordFounded: (finalResult.text.toUpperCase().match(regex) || [])
                .length,
              timeStampFoundedWord: finalResult.words.find((word) =>
                word.text.toUpperCase().startsWith(bodyData.word.toUpperCase())
              )?.start,
              status: finalResult.status,
              wordsCounter: finalResult.words.length,
              confidence: finalResult.confidence,
            });
          }
        }
      });
    });
  }
};
