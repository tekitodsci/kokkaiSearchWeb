export const downloadChartImage = (keywords: string[]) => {
  const svgElement = document.querySelector('.recharts-wrapper svg');
  if (!svgElement) return;

  // Create a clone of the SVG to modify
  const svgClone = svgElement.cloneNode(true) as SVGElement;
  
  // Add title with keywords
  const titleText = keywords.filter(k => k !== '').join('、');
  if (titleText) {
    const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    titleElement.setAttribute('x', '50%');
    titleElement.setAttribute('y', '20');
    titleElement.setAttribute('text-anchor', 'middle');
    titleElement.setAttribute('font-size', '14');
    titleElement.setAttribute('font-family', 'sans-serif');
    titleElement.textContent = `キーワード：${titleText}`;
    svgClone.appendChild(titleElement);
  }

  const svgData = new XMLSerializer().serializeToString(svgClone);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  // Set canvas size to match SVG
  const svgRect = svgElement.getBoundingClientRect();
  canvas.width = svgRect.width;
  canvas.height = svgRect.height;

  img.onload = () => {
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    
    const link = document.createElement('a');
    link.download = `kokkai_chart_${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
};