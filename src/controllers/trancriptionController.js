const TranscriptionService = require('../services/transcriptionService');

const transcriptionService = new TranscriptionService();

const processFile = async (req, res) => {
    let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/static/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    transcriptionService.upload(uploadPath, req.body).then(data => {
      return res.status(200).send(data);
    // res.send('File uploaded!');
    })
  });
}
module.exports = {
    processFile}