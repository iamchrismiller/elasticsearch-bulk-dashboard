/**
 * Convert Bytes to Human Readable
 * @param number bytes
 * @return object
 */
module.exports.bytesToHuman = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let result = {
    value: 0,
    magnitude: sizes[0]
  };

  if (bytes === 0) return result;

  const exponent = parseInt(~~(Math.log(bytes) / Math.log(1024)));
  result.value = (bytes / Math.pow(1024, exponent)).toFixed(1);
  result.magnitude = sizes[exponent];
  return result;
};
