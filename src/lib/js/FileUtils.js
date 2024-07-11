function saveObjectToJsonFile(object, fileName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  const a = document.createElement("a");
  a.href = dataStr;
  a.download = fileName || "download.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function loadObjectFromFile(file) {
  var reader = new FileReader();

  reader.readAsText(file, "UTF-8");

  let getData = () => {
    return new Promise((resolve) => {
      reader.onload = function (evt) {
        resolve(reader.result);
      };
      reader.onerror = function (evt) {};
    });
  };
  return getData();
}
export { saveObjectToJsonFile, loadObjectFromFile };
