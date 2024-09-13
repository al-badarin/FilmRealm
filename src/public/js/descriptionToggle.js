function toggleDescription(id) {
    // Get the elements by their IDs
    const truncatedDesc = document.getElementById('desc-' + id);
    const fullDesc = document.getElementById('full-desc-' + id);
    const readMore = document.getElementById('read-more-' + id);
    const readLess = document.getElementById('read-less-' + id);
  
    // Toggle the visibility of the descriptions and the "Read More"/"Read Less" links
    if (truncatedDesc.classList.contains('hidden')) {
      truncatedDesc.classList.remove('hidden');
      fullDesc.classList.add('hidden');
      readMore.classList.remove('hidden');
      readLess.classList.add('hidden');
    } else {
      truncatedDesc.classList.add('hidden');
      fullDesc.classList.remove('hidden');
      readMore.classList.add('hidden');
      readLess.classList.remove('hidden');
    }
  }
  