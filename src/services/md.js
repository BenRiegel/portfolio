async function getPost(postId){
  const file = await import(`../assets/posts/md/${postId}.md`); //not sure what this is doing exactly
  const result = await fetch(file.default);
  const mdText = await result.text();
  return mdText;
}

async function getPage(pageId){
  const file = await import(`../assets/pages/${pageId}.md`);
  const result = await fetch(file.default);
  const mdText = await result.text();
  return mdText;
}

export { getPost, getPage };
