function ElectionTimeline(timeline) {
  return `
    <div class="timeline-container" style="margin-top: 2rem; position: relative; padding-left: 2rem; border-left: 2px solid var(--border);">
      ${timeline.map((item, idx) => `
        <div class="timeline-item" style="margin-bottom: 2rem; position: relative;">
          <div class="timeline-dot" style="position: absolute; left: -2.45rem; top: 0.25rem; width: 12px; height: 12px; background: ${idx === 0 ? 'var(--accent)' : 'var(--primary)'}; border-radius: 50%; border: 3px solid white; box-shadow: var(--shadow);"></div>
          <div class="timeline-date" style="font-size: 0.875rem; font-weight: 700; color: var(--secondary);">${item.date}</div>
          <div class="timeline-event" style="font-weight: 600; color: var(--text-main); margin-top: 0.25rem;">${item.event}</div>
        </div>
      `).join('')}
    </div>
  `;
}
