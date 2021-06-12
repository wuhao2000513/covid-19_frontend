export default function(data){
  let mapping = Object.create(null);
  // 先分出父级组和子组
  let parentGroup = [];
  data.forEach(row => {
    mapping[row.id] = row;
  });
  for (const key in mapping) {
    const item = mapping[key];
    //如果有父级
    if (item.pid) {
      const parent = mapping[item.pid];
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    } else {
      //没有父级就是一级目录
      parentGroup.push(item);
    }
  }
  return parentGroup
}