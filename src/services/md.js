async function getMd(postId){
  const file = await import(`../posts/md/${postId}.md`);
  const result = await fetch(file.default);
  const mdText = await result.text();
  return mdText;
}

export default getMd;
