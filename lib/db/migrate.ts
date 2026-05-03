import { prisma } from './prisma';
import candidates from '../../data/candidates.json';
import elections from '../../data/elections.json';
import issues from '../../data/issues.json';

async function main() {
  console.log('Starting migration...');

  // 1. Migrate Issues
  for (const issue of issues) {
    await prisma.issue.upsert({
      where: { id: issue.id },
      update: {},
      create: {
        id: issue.id,
        title: issue.title,
        summary: issue.summary,
        description: issue.description,
        perspectives: issue.perspectives
      }
    });
  }

  // 2. Migrate Candidates
  for (const c of candidates) {
    await prisma.candidate.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        party: c.party,
        role: c.role,
        bio: c.bio,
        image: c.image,
        education: c.education,
        career: c.career,
        issueStances: c.issueStances,
        metrics: c.metrics
      }
    });
  }

  // 3. Migrate Elections
  for (const e of elections) {
    await prisma.election.upsert({
      where: { id: e.id },
      update: {},
      create: {
        id: e.id,
        title: e.title,
        type: e.type,
        status: e.status,
        date: new Date(e.date),
        description: e.description,
        timeline: e.timeline,
        results: e.results || null
      }
    });
  }

  console.log('Migration completed successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
