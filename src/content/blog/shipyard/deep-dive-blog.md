---
title: "Building Deep Dive"
description: "How I built this underwater-themed blog with Astro, bioluminescent effects, and interactive fish."
pubDate: 2026-02-01
category: shipyard
tags: ["astro", "web", "javascript", "design"]
featured: true
draft: false
---

This blog started as a simple idea: what if a personal website felt like diving into the deep ocean?

## The Vision

I wanted something different from the typical dark-mode blog. Not just dark backgrounds, but a living environment. Fish that swim with natural flocking behavior. Light rays filtering down from the surface. Bioluminescent particles when you interact with the page.

## Tech Stack

The foundation is **Astro**, which handles static site generation beautifully. Here's the basic project structure:

```
src/
├── content/blog/          # Markdown posts
│   ├── logbook/           # Journals, essays
│   └── shipyard/          # Projects, tutorials
├── components/
│   └── SeaCreatures.astro # All the magic
├── layouts/
│   └── BaseLayout.astro
└── styles/
    └── global.css
```

## Design Tokens

The color palette was carefully chosen to evoke deep ocean depths:

```css
:root {
  /* Deep sea colors */
  --color-background: #0B1221;
  --color-background-deep: #070C16;

  /* Bioluminescent accents */
  --color-accent: #F97316;
  --color-logbook-accent: #22D3EE;
  --color-shipyard-accent: #F59E0B;

  /* Organic, warm text */
  --color-text: #FAF6F1;
  --color-text-muted: #C9B8A8;

  /* Typography */
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;
}
```

## The Fish System

The fish use a simplified boid algorithm. Each fish is an object with position, velocity, and behavior:

```javascript
class Fish {
  constructor(x, y) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    this.maxSpeed = 2;
    this.perceptionRadius = 50;
  }

  update(flock, food) {
    // Apply flocking rules
    const separation = this.separate(flock);
    const alignment = this.align(flock);
    const cohesion = this.cohere(flock);

    // Weight the behaviors
    this.applyForce(separation, 1.5);
    this.applyForce(alignment, 1.0);
    this.applyForce(cohesion, 1.0);

    // Chase food if nearby
    if (food.length > 0) {
      const chase = this.seek(this.closestFood(food));
      this.applyForce(chase, 2.0);
    }

    this.velocity = this.limit(this.velocity, this.maxSpeed);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
```

The three flocking rules create emergent behavior:

```javascript
// Separation: steer away from neighbors
separate(flock) {
  let steer = { x: 0, y: 0 };
  let count = 0;

  for (const other of flock) {
    const d = this.distance(this.position, other.position);
    if (d > 0 && d < this.perceptionRadius / 2) {
      const diff = this.subtract(this.position, other.position);
      steer = this.add(steer, this.divide(diff, d));
      count++;
    }
  }

  return count > 0 ? this.divide(steer, count) : steer;
}

// Alignment: match velocity of neighbors
align(flock) {
  let avg = { x: 0, y: 0 };
  let count = 0;

  for (const other of flock) {
    const d = this.distance(this.position, other.position);
    if (d > 0 && d < this.perceptionRadius) {
      avg = this.add(avg, other.velocity);
      count++;
    }
  }

  return count > 0 ? this.divide(avg, count) : avg;
}

// Cohesion: steer toward center of neighbors
cohere(flock) {
  let center = { x: 0, y: 0 };
  let count = 0;

  for (const other of flock) {
    const d = this.distance(this.position, other.position);
    if (d > 0 && d < this.perceptionRadius) {
      center = this.add(center, other.position);
      count++;
    }
  }

  if (count > 0) {
    center = this.divide(center, count);
    return this.seek(center);
  }
  return center;
}
```

## Bioluminescent Charging

The charging orb uses a radial gradient that grows over time:

```javascript
function drawChargingOrb(ctx, x, y, progress) {
  const maxRadius = 80;
  const radius = maxRadius * progress;

  // Outer glow
  const gradient = ctx.createRadialGradient(
    x, y, 0,
    x, y, radius
  );

  gradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)');
  gradient.addColorStop(0.4, 'rgba(34, 211, 238, 0.3)');
  gradient.addColorStop(0.7, 'rgba(34, 211, 238, 0.1)');
  gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Inner core
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fill();
}
```

## Food Particle System

When released, the orb explodes into particles:

```typescript
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

function createExplosion(x: number, y: number, count: number): Particle[] {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const speed = 2 + Math.random() * 4;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      maxLife: 1.0,
      size: 3 + Math.random() * 3
    });
  }

  return particles;
}
```

## Rendering with Canvas

The animation loop runs at 60fps using `requestAnimationFrame`:

```javascript
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw fish
  for (const fish of flock) {
    fish.update(flock, foodParticles);
    fish.draw(ctx);
  }

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // gravity
    p.life -= 0.02;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(249, 115, 22, ${p.life})`;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}
```

## What's Next

I'm considering adding:

- More sea creature types (jellyfish, small sharks)
- Depth zones with different lighting
- Seasonal themes (bioluminescent blooms, deep sea vents)

The code lives on GitHub if you want to explore how it works. This is an ongoing project—the workshop never really closes.
