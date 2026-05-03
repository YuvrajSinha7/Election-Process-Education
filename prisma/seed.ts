import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Candidates
  const c1 = await prisma.candidate.upsert({
    where: { id: 'c1' },
    update: {},
    create: {
      id: 'c1',
      name: 'Arjun Sharma',
      party: 'Progressive Alliance',
      role: 'Minister of State',
      bio: 'Arjun Sharma is a seasoned politician with over 20 years of experience in public service. He focuses on economic reform and sustainable urban development.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
      education: 'Masters in Economics, Delhi School of Economics',
      career: ['Economic Advisor (2005-2010)', 'Member of Parliament (2012-Present)'],
      issueStances: {
        economy: 'Supports controlled privatization and tech-driven job creation.',
        healthcare: 'Advocates for universal healthcare insurance models.',
        education: 'Promotes digital literacy in rural schools.'
      },
      metrics: {
        approval: 68,
        turnout_contribution: '15%',
        total_votes_last_election: '2.4M'
      }
    }
  })

  const c2 = await prisma.candidate.upsert({
    where: { id: 'c2' },
    update: {},
    create: {
      id: 'c2',
      name: 'Sarah Williams',
      party: 'Green Liberty Party',
      role: 'Environmental Advocate',
      bio: 'Sarah Williams has led numerous grassroots campaigns for environmental protection and social equity. She is a strong voice for climate action.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
      education: 'B.S. in Environmental Science, Yale University',
      career: ['Environmental Consultant (2010-2015)', 'State Senator (2016-Present)'],
      issueStances: {
        economy: "Proposes a 'Green New Deal' for renewable energy jobs.",
        healthcare: 'Supports public-funded mental health initiatives.',
        education: 'Focuses on vocational training in sustainable technologies.'
      },
      metrics: {
        approval: 72,
        turnout_contribution: '22%',
        total_votes_last_election: '1.8M'
      }
    }
  })

  // Seed Elections
  await prisma.election.upsert({
    where: { id: 'e1' },
    update: {},
    create: {
      id: 'e1',
      title: 'General Election 2026',
      type: 'National',
      status: 'upcoming',
      date: new Date('2026-11-05'),
      description: 'The upcoming national general election to decide the next parliamentary leadership.',
      timeline: [
        { date: '2026-06-01', event: 'Voter Registration Opens' },
        { date: '2026-09-15', event: 'Candidate Nominations' },
        { date: '2026-11-05', event: 'Election Day' }
      ]
    }
  })

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
