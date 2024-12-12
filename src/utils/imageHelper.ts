import { COLORS } from '../components/ResultChart';

export const downloadChartImage = (keywords: string[]) => {
  const svgElement = document.querySelector('.recharts-wrapper svg');
  if (!svgElement) return;

  // Create a clone of the SVG
  const svgClone = svgElement.cloneNode(true) as SVGElement;
  
  // キーワードと色の組み合わせを表示
  const filteredKeywords = keywords.filter(k => k !== '');
  if (filteredKeywords.length > 0) {
    const legendGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    legendGroup.setAttribute('transform', 'translate(50, 20)');

    filteredKeywords.forEach((keyword, index) => {
      const color = COLORS[index];
      
      // キーワードごとのグループ
      const itemGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      itemGroup.setAttribute('transform', `translate(${index * 200}, 0)`);
      
      // 色のマーカー
      const marker = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      marker.setAttribute('x1', '0');
      marker.setAttribute('y1', '0');
      marker.setAttribute('x2', '20');
      marker.setAttribute('y2', '0');
      marker.setAttribute('stroke', color);
      marker.setAttribute('stroke-width', '2');
      
      // キーワードテキスト
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '30');
      text.setAttribute('y', '0');
      text.setAttribute('dy', '0.32em');
      text.setAttribute('font-size', '12');
      text.setAttribute('font-family', 'sans-serif');
      text.setAttribute('fill', color);
      text.textContent = keyword;
      
      itemGroup.appendChild(marker);
      itemGroup.appendChild(text);
      legendGroup.appendChild(itemGroup);
    });

    svgClone.appendChild(legendGroup);
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