export function createParticles(W, H, count = 100) {
  const pts = []
  for (let i = 0; i < count; i++) {
    pts.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      cyan: Math.random() > 0.45,
    })
  }
  return pts
}

export function drawParticles(ctx, W, H, pts) {
  pts.forEach(p => {
    p.x += p.vx
    p.y += p.vy
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    // SaaS Particle colors: White/Cyan/Slate
    ctx.fillStyle = p.cyan
      ? `rgba(14,165,233,${Math.random()*0.5 + 0.3})`
      : `rgba(100,116,139,${Math.random()*0.3 + 0.1})`
    ctx.fill()
  })
}

export function drawConnections(ctx, pts) {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x
      const dy = pts[i].y - pts[j].y
      const dist = Math.sqrt(dx*dx + dy*dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.moveTo(pts[i].x, pts[i].y)
        ctx.lineTo(pts[j].x, pts[j].y)
        const alpha = (1 - dist/120) * 0.15
        ctx.strokeStyle = `rgba(14,165,233,${alpha})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }
  }
}
