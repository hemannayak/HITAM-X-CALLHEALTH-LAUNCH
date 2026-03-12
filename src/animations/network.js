// network.js — Organized Biological Cells with Premium SaaS Styling

export const PROJECT_NODES = [
  // 1. Anchors (Prominently Highlighted with Logos)
  { id: 'hitam',       label: 'HITAM',       color: '#0f172a', partner: true,  side: 'left' },
  { id: 'callhealth',  label: 'CallHealth',  color: '#0f172a', partner: true,  side: 'right' },
  
  // 2. Core Modules (Internal) -> Displayed as clean cellular nodes
  { id: 'abdm',        label: 'ABDM',        icon: 'ID',  color: '#0ea5e9' },
  { id: 'mirth',       label: 'Mirth',       icon: '⇄',  color: '#0ea5e9' },
  { id: 'fhir',        label: 'FHIR',        icon: '{}',  color: '#0ea5e9' },
  
  // 3. Technologies
  { id: 'ocr',         label: 'OCR',         icon: '◰',   color: '#0ea5e9' },
  { id: 'digiyatra',   label: 'DigiYatra',   icon: '◎',   color: '#0ea5e9' },
  { id: 'chatbot',     label: 'Chatbot',     icon: '💬',  color: '#0ea5e9' },
  
  // 4. Outcomes & Endpoints
  { id: 'hospitals',   label: 'Hospitals',   icon: '+ ',  color: '#64748b' },
  { id: 'patients',    label: 'Patients',    icon: '👤',  color: '#64748b' },
  { id: 'usecases',    label: 'Use Cases',   icon: '⚡',  color: '#64748b' },
]

export const EDGES = [
  // HITAM connecting to tech modules
  ['hitam', 'ocr'], ['hitam', 'chatbot'], ['hitam', 'digiyatra'],
  
  // Data Flow mapping through core
  ['ocr', 'mirth'], ['chatbot', 'fhir'], ['digiyatra', 'abdm'],
  ['mirth', 'fhir'], ['fhir', 'abdm'],
  
  // Endpoints connecting to core
  ['mirth', 'hospitals'], ['abdm', 'patients'], ['fhir', 'usecases'],
  ['usecases', 'hospitals'], ['usecases', 'patients'],
  
  // CallHealth connecting to core systems
  ['callhealth', 'mirth'], ['callhealth', 'fhir'], ['callhealth', 'abdm'],
  ['callhealth', 'hospitals'], ['callhealth', 'patients'],
]

// Highly Organized Biological Structure
function computePositions(W, H) {
  const cx = W / 2, cy = H / 2
  const positions = {}
  
  // Anchors: fixed left and right, nicely spaced
  const anchorY = cy
  positions['hitam']      = { x: W * 0.18, y: anchorY }
  positions['callhealth'] = { x: W * 0.82, y: anchorY }
  
  // Internal nodes spread organically but structured in vertical columns
  const ySp = Math.min(H * 0.22, 160)
  
  // Column 1: Tech
  positions['ocr']        = { x: W * 0.36, y: cy - ySp }
  positions['chatbot']    = { x: W * 0.36, y: cy }
  positions['digiyatra']  = { x: W * 0.36, y: cy + ySp }
  
  // Column 2: Core Routing
  positions['mirth']      = { x: W * 0.50, y: cy - ySp * 0.6 }
  positions['fhir']       = { x: W * 0.50, y: cy + ySp * 0.8 }
  positions['abdm']       = { x: W * 0.64, y: cy } // Push ABDM closer to CallHealth side
  
  // Column 3: Endpoints
  positions['hospitals']  = { x: W * 0.66, y: cy - ySp * 1.2 }
  positions['usecases']   = { x: W * 0.72, y: cy - ySp * 0.4 }
  positions['patients']   = { x: W * 0.66, y: cy + ySp * 1.2 }

  return positions
}

export function drawNetwork(ctx, W, H, { nodeProgress, pulsePhase, pulseActive, activationPct, images }) {
  ctx.clearRect(0, 0, W, H)
  const pos = computePositions(W, H)

  // Calculate which edges should be drawn based on node progress
  const drawnEdges = []
  EDGES.forEach(([a, b], i) => {
    const ai = PROJECT_NODES.findIndex(n => n.id === a)
    const bi = PROJECT_NODES.findIndex(n => n.id === b)
    if (ai < nodeProgress && bi < nodeProgress) {
      drawnEdges.push([a, b, i])
    }
  })

  // 1. Draw Edges (SaaS biological bezier strings)
  drawnEdges.forEach(([a, b, i]) => {
    const pa = pos[a], pb = pos[b]
    
    ctx.beginPath()
    ctx.moveTo(pa.x, pa.y)
    
    // Smooth bezier curve for biological feel
    const dist = Math.abs(pa.x - pb.x)
    ctx.bezierCurveTo(pa.x + dist*0.3, pa.y, pb.x - dist*0.3, pb.y, pb.x, pb.y)
    
    // Base edge style (clean slate)
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)'
    ctx.lineWidth = 1.5
    ctx.stroke()
    
    // Pulse Animation (Phase 4 Sequence)
    if (pulseActive && activationPct > 0) {
      const t = (activationPct * 1.5 + i * 0.04) % 1
      if (t > 0 && t < 1) {
        const getPt = (p0, p1, p2, p3, t) => {
          const u = 1 - t; const tt = t*t; const uu = u*u; const uuu = uu * u; const ttt = tt * t;
          let p = uuu * p0; p += 3 * uu * t * p1; p += 3 * u * tt * p2; p += ttt * p3; return p;
        }
        
        const px = getPt(pa.x, pa.x + dist*0.3, pb.x - dist*0.3, pb.x, t)
        const py = getPt(pa.y, pa.y, pb.y, pb.y, t)
        
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fillStyle = '#0ea5e9' // SaaS Blue Pulse
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(px, py, 14, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(14, 165, 233, 0.2)'
        ctx.fill()
      }
    }
  })

  // 2. Draw Nodes
  PROJECT_NODES.forEach((node, i) => {
    if (i >= nodeProgress) return
    const p = pos[node.id]
    
    const isAnchor = node.partner
    // Anchors revert back to their original prominent size (balanced)
    const r = isAnchor ? 60 : 28
    
    // Outer shadow / glow
    const pulseAmt = Math.sin(pulsePhase + i) * 0.3 + 0.3
    const finalIntensity = pulseActive && activationPct > 0.4 ? 0.8 : (isAnchor ? pulseAmt + 0.2 : pulseAmt * 0.5)

    ctx.beginPath()
    ctx.arc(p.x, p.y, r + (finalIntensity * 16), 0, Math.PI * 2)
    ctx.fillStyle = isAnchor 
      ? `rgba(${node.id === 'hitam' ? '34, 197, 94' : '14, 165, 233'}, ${finalIntensity * 0.15})`
      : `rgba(100, 116, 139, ${finalIntensity * 0.08})`
    ctx.fill()
    
    // Solid Node Base (Clean White SaaS)
    ctx.beginPath()
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    
    // Node Border
    ctx.beginPath()
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
    ctx.strokeStyle = isAnchor 
      ? (node.id === 'hitam' ? 'rgba(34,197,94,0.4)' : 'rgba(14,165,233,0.4)') 
      : 'rgba(203, 213, 225, 0.8)' // Slate border for small cells
    ctx.lineWidth = isAnchor ? 3 : 1.5
    ctx.stroke()
    
    // Draw Text / Icon / Image
    if (isAnchor && images && images[node.id]) {
      // Draw actual logo image inside the highlighted anchor cell
      const img = images[node.id]
      ctx.save()
      ctx.beginPath()
      // Slightly larger clip to ensure background fits
      ctx.arc(p.x, p.y, r - 2, 0, Math.PI * 2) 
      ctx.clip()
      
      // Both logos get a pristine white background to ensure no bleed-through
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(p.x - r, p.y - r, r*2, r*2)
      
      // Calculate perfect 'contain' dimensions adding padding so no cropping occurs
      const padding = 12
      const avail = (r * 2) - (padding * 2)
      
      // Maintain aspect ratio while fitting into the available square inside the circle
      const scale = Math.min(avail / img.width, avail / img.height)
      const imgW = img.width * scale
      const imgH = img.height * scale
      
      ctx.drawImage(img, p.x - imgW/2, p.y - imgH/2, imgW, imgH)
      ctx.restore()
    } else {
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      if (isAnchor) {
        ctx.font = `600 ${Math.round(r * 0.25)}px Inter, sans-serif`
        ctx.fillStyle = node.color
        ctx.fillText(node.label, p.x, p.y)
      } else {
        ctx.font = `500 ${Math.round(r * 0.5)}px system-ui`
        ctx.fillStyle = node.color
        ctx.fillText(node.icon, p.x, p.y)
      }
    }
    
    // External Label for clarity
    if (!isAnchor) {
      ctx.font = `500 12px Inter, sans-serif`
      ctx.fillStyle = '#64748b' // Slate text
      ctx.fillText(node.label, p.x, p.y + r + 20)
    } else {
      ctx.font = `600 14px Inter, sans-serif`
      ctx.fillStyle = '#0f172a' // Dark slate for anchor text
      ctx.fillText(node.label, p.x, p.y + r + 26)
    }
  })
}
