async function getPost(postId){
  const file = await import(`../assets/posts/md/${postId}.md`);
  const result = await fetch(file.default);
  const mdText = await result.text();
  return mdText;
}

export { getPost };
