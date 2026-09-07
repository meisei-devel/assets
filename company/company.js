document.addEventListener("DOMContentLoaded", function () {
  const emailNode = document.getElementById("company-email");
  const telNode = document.getElementById("company-tel");
  const faxNode = document.getElementById("company-fax");

  // 単純なHTML収集ボットに連絡先を拾われにくくするため、
  // HTMLには実値を置かず、ブラウザ側で断片から組み立てる。
  const email =
    "i" + "n" + "f" + "o" +
    "@" +
    "m" + "e" + "i" + "s" + "e" + "i" + "d" +
    "." +
    "j" + "p";

  const telRaw =
    "0" + "4" + "2" +
    "4" + "9" + "7" +
    "6" + "9" + "1" + "5";

  const telText =
    "0" + "4" + "2" +
    "-" +
    "4" + "9" + "7" +
    "-" +
    "6" + "9" + "1" + "5";

  const faxText =
    "0" + "4" + "2" +
    "-" +
    "4" + "6" + "3" +
    "-" +
    "5" + "0" + "8" + "2";

  if (emailNode) {
    const a = document.createElement("a");
    a.href = "m" + "a" + "i" + "l" + "t" + "o" + ":" + email;
    a.textContent = email;
    emailNode.replaceChildren(a);
  }

  if (telNode) {
    const a = document.createElement("a");
    a.href = "t" + "e" + "l" + ":" + telRaw;
    a.textContent = telText;
    telNode.replaceChildren(a);
  }

  if (faxNode) {
    faxNode.textContent = faxText;
  }
});
