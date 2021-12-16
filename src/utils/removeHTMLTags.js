export const removeHTMLTags = (str) =>
  str.replace(/(<([^>]+)>)/gi, "").replace("&nbsp;?", "");
