let xhr = new XMLHttpRequest();
xhr.open(
  "POST",
  "arn:aws:execute-api:us-west-2:915385912796:uv990efvtf/*/POST/compare-yourself"
);
xhr.onreadystatechange = function (event) {
  console.log(event.target.response);
};
xhr.send();
