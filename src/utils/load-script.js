/**
 * 创建一个script标签添加到head标签中
 * @param {string} url 脚本地址
 * @param {function} callBack 回调函数
 */
export function createScriptTag(url, loadCallBack, errorCallBack) {
  const Tag = document.createElement("script");
  Tag.type = "text/javascript";
  Tag.src = url;
  if (loadCallBack) {
    Tag.onload = loadCallBack;
  }
  if (errorCallBack) {
    Tag.onerror = errorCallBack;
  }
  document.head.appendChild(Tag);
}
