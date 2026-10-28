import type { InteractiveContent } from '../types/content.ts'

const site = 'https://codesapiens.in'
const meetups = 'https://codesapiens.in/events.html'
const college = 'https://college.codesapiens.in/'
const github = 'https://github.com/CodeSapiens-in/CollegeSapien'
const freshers = 'https://luma.com/of5ipkhg'

export const mockContent: readonly InteractiveContent[] = [
  {
    id: 'building-plaza',
    title: 'CodeSapiens',
    description:
      'The only non-profit inter-college students community. By the students, for the students — collaborate, share, and grow past a single campus.',
    tags: ['home', 'codesapiens', 'plaza', 'students'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'building-events',
    title: 'Meetups',
    description:
      'The north wing keeps a building for each meetup of 2026, from January at YUNIQ to the June alumni meetup at M2P. This hall opens the full calendar.',
    tags: ['meetups', 'events', 'alumni', 'summer fest'],
    action: { label: 'View meetups', href: meetups },
  },
  {
    id: 'building-lab',
    title: 'CollegeSapien',
    description:
      'The open-source student companion: syllabus and notes, attendance, timetable, GPA, and college events in one app. Built in the open by students.',
    tags: ['collegesapien', 'lab', 'app', 'syllabus', 'gpa'],
    action: { label: 'Get started', href: college },
  },
  {
    id: 'building-hub',
    title: 'Community',
    description:
      'Network beyond your campus and explore knowledge you will not find in a classroom. 3000+ members across 50+ colleges.',
    tags: ['community', 'hub', 'members', 'colleges'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'building-quest',
    title: 'Engineer',
    description:
      'Build real projects and showcase what you create. CollegeSapien is MIT-licensed and open to contributors at every experience level.',
    tags: ['engineer', 'quests', 'github', 'contribute', 'build'],
    action: { label: 'Contribute on GitHub', href: github },
  },
  {
    id: 'fountain-plaza',
    title: 'The crossroads',
    description:
      'Paths leave this court in four directions: Meetups to the north, CollegeSapien to the west, Community to the east, and Engineer to the south.',
    tags: ['plaza', 'fountain', 'codesapiens'],
  },
  {
    id: 'sign-plaza',
    title: 'Explore. Evelve. Engineer.',
    description: 'You are on the CodeSapiens grounds. The three words on the homepage are the four wings around this court, plus home.',
    tags: ['home', 'explore', 'evelve', 'engineer', 'sign'],
  },
  {
    id: 'sign-events',
    title: 'Meetups',
    description: 'Six rooms line this wing: January through June 2026. Each door opens that meetup.',
    tags: ['meetups', 'sign'],
  },
  {
    id: 'sign-lab',
    title: 'CollegeSapien',
    description: 'The west wing is the app: syllabus, attendance, timetable, and GPA, maintained by the community.',
    tags: ['collegesapien', 'sign', 'study'],
  },
  {
    id: 'sign-hub',
    title: 'Community',
    description: 'The east wing is where students from different colleges actually meet.',
    tags: ['community', 'sign'],
  },
  {
    id: 'sign-quest',
    title: 'Engineer',
    description: 'The south wing is for people who want to build. Issues and pull requests live on GitHub.',
    tags: ['engineer', 'sign', 'build'],
  },
  {
    id: 'poster-plaza',
    title: 'Students community',
    description: 'A non-profit run by students. The minimap matches the site: Home, Meetups, CollegeSapien, Community, Engineer.',
    tags: ['home', 'poster', 'map'],
    action: { label: 'Open the site', href: site },
  },
  {
    id: 'building-meetup-jan',
    title: 'January Meetup',
    description: 'The first gathering of 2026, at YUNIQ.',
    tags: ['meetups', 'january', 'yuniq', '2026'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'building-meetup-feb',
    title: 'February Meetup',
    description: 'Free and open source at YUNIQ. The day opened on screen with Vanakkam Sapiens.',
    tags: ['meetups', 'february', 'yuniq', 'open source'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'building-meetup-mar',
    title: 'March Meetup',
    description: 'SheBuilds collaboration at Mako IT Labs.',
    tags: ['meetups', 'march', 'shebuilds', 'mako'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'building-meetup-apr',
    title: 'TamilPreneur',
    description: 'April 2026. CodeSapiens and TamilPreneur gathered in person at ONE M2P.',
    tags: ['meetups', 'april', 'tamilpreneur', 'm2p'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'building-meetup-may',
    title: 'Summer Fest',
    description: 'Summer Fest 2026, with Namma Flutter, Nexora, and Google Student Ambassadors.',
    tags: ['meetups', 'may', 'summer fest', 'flutter'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'building-meetup-jun',
    title: 'Alumni Meetup',
    description: 'Alumni and students together for the June 2026 Alumni Meetup at M2P.',
    tags: ['meetups', 'june', 'alumni', 'm2p'],
    action: { label: 'See the meetup', href: meetups },
  },
  {
    id: 'poster-lab',
    title: 'Syllabus, attendance, GPA',
    description: 'CollegeSapien keeps the college-life tools that usually live in five different chats.',
    tags: ['collegesapien', 'poster', 'syllabus'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'poster-hub',
    title: '3000+ members',
    description: 'Twenty-plus events and fifty-plus colleges, counted the way the homepage counts them.',
    tags: ['community', 'poster', 'members'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'poster-quest-help',
    title: 'Contribute',
    description: 'CollegeSapien is MIT-licensed. The repo takes contributors who are new and contributors who are not.',
    tags: ['engineer', 'github', 'poster'],
    action: { label: 'Open the repo', href: github },
  },
  {
    id: 'poster-quest-walk',
    title: 'Walk the grounds',
    description: 'Visit Home, Meetups, CollegeSapien, Community, and Engineer. Each building opens the matching page.',
    tags: ['engineer', 'walk', 'poster'],
  },
  {
    id: 'monkey-mascot',
    title: 'Monkey Mascot',
    description:
      'The signature black-and-white monkey with glasses welcomes visitors into the SapiensCampus pixel world.',
    tags: ['home', 'mascot', 'monkey', 'sapienscampus'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'class-101',
    title: 'Class 101 Meetup',
    description:
      'The first-year welcome initiative was designed to help freshers connect and discover their campus community.',
    tags: ['home', 'class 101', 'freshers', 'meetup'],
    action: { label: 'Open the meetup', href: freshers },
  },
  {
    id: 'meetup-freshers',
    title: 'First-Year Meetup',
    description:
      'The SapiensCampus freshers meetup was scheduled for 18 October 2026 to welcome students and build connections.',
    tags: ['meetups', 'freshers', 'first year'],
    action: { label: 'Open the meetup', href: freshers },
  },
  {
    id: 'meetup-agenda',
    title: 'Meetup Agenda',
    description: 'A dedicated spot for the meetup agenda, activities, and event highlights, with final details to be confirmed.',
    tags: ['meetups', 'agenda'],
    action: { label: 'Open the meetup', href: freshers },
  },
  {
    id: 'gooei-dough',
    title: 'Gooei Dough',
    description: 'Gooei Dough was featured as the cookie sponsor for the SapiensCampus freshers welcome campaign.',
    tags: ['meetups', 'gooei', 'sponsor', 'cookie'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'peer-learning',
    title: 'Peer Learning',
    description: 'A learning corner for students to share knowledge, explore interests, and learn from one another.',
    tags: ['collegesapien', 'learn', 'peers'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'mentorship',
    title: 'Mentorship',
    description: 'A campus hub for students to seek guidance and learn from experienced peers and mentors.',
    tags: ['collegesapien', 'mentor'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'workshops',
    title: 'Workshops',
    description: 'SapiensCampus aims to run practical workshops that help students build skills through shared experiences.',
    tags: ['collegesapien', 'workshop'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'student-community',
    title: 'Student Community',
    description: 'A gathering place for students to meet people, make friends, and feel part of a welcoming community.',
    tags: ['community', 'connect', 'students'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'ai-speaks',
    title: 'AI Speaks',
    description:
      'A social content identity used for SapiensCampus event promotion and Tanglish-style Instagram captions.',
    tags: ['community', 'socials', 'captions'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'cookie-sponsor',
    title: 'Cookie Sponsor',
    description: "This spot celebrates Gooei Dough's support of the freshers campaign with cookies and mascot-led creative.",
    tags: ['community', 'sponsor', 'gooei'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'codesapiens-origin',
    title: 'CodeSapiens',
    description: 'The original CodeSapiens identity is the starting point for the broader SapiensCampus community vision.',
    tags: ['engineer', 'codesapiens', 'origin'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'campus-app',
    title: 'Campus App',
    description:
      'A proposed digital experience could bring event discovery, registration, mentorship, and community updates together.',
    tags: ['engineer', 'app', 'build'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'real-projects',
    title: 'Real Projects',
    description:
      "A space for students to showcase practical projects and collaborate, aligned with the community's learning and building goals.",
    tags: ['engineer', 'projects', 'build'],
    action: { label: 'Contribute on GitHub', href: github },
  },
  {
    id: 'qr-desk',
    title: 'QR desk',
    description: 'The freshers meetup asked people to register with a QR code before they came through the door.',
    tags: ['meetups', 'qr', 'registration'],
    action: { label: 'Open the meetup', href: freshers },
  },
  {
    id: 'welcome-desk',
    title: 'Welcome desk',
    description: 'The first stop on the grounds. New students start here before they pick a wing.',
    tags: ['home', 'welcome', 'desk'],
    action: { label: 'Visit codesapiens.in', href: site },
  },
  {
    id: 'alumni-yard',
    title: 'Alumni yard',
    description: 'Graduates come back through this yard. The June alumni meetup at M2P is the one on the calendar.',
    tags: ['home', 'alumni', 'm2p'],
    action: { label: 'View meetups', href: meetups },
  },
  {
    id: 'members-yard',
    title: 'Members yard',
    description: 'A headcount board for the community: 3000+ members across 50+ colleges.',
    tags: ['home', 'members', 'colleges'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'notes-stall',
    title: 'Notes stall',
    description: 'Syllabus notes, question papers, and subject resources, kept next to the course they belong to.',
    tags: ['collegesapien', 'notes', 'syllabus'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'gpa-stall',
    title: 'GPA stall',
    description: 'Grades and credits go in here. The stall estimates semester GPA and cumulative CGPA.',
    tags: ['collegesapien', 'gpa', 'cgpa'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'attend-stall',
    title: 'Attendance stall',
    description: 'Log absences, watch the percentage, and see the alert before it drops under the college line.',
    tags: ['collegesapien', 'attendance'],
    action: { label: 'Open CollegeSapien', href: college },
  },
  {
    id: 'colleges-stall',
    title: 'Fifty colleges',
    description: 'Students from more than fifty colleges share this wing. The point is to leave your own campus for a while.',
    tags: ['community', 'colleges'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'events-booth',
    title: 'Events booth',
    description: 'Twenty-plus events, counted the way the homepage counts them, with the next one posted on the board.',
    tags: ['community', 'events'],
    action: { label: 'View meetups', href: meetups },
  },
  {
    id: 'network-yard',
    title: 'Network yard',
    description: 'The yard for introductions: find someone from another college and leave with a collaborator.',
    tags: ['community', 'network'],
    action: { label: 'Meet the community', href: `${site}/#community` },
  },
  {
    id: 'github-stall',
    title: 'GitHub stall',
    description: 'CollegeSapien is built in the open. This stall is the door to the repo.',
    tags: ['engineer', 'github'],
    action: { label: 'Open the repo', href: github },
  },
  {
    id: 'issues-stall',
    title: 'Issues stall',
    description: 'Bugs and ideas land here first. New contributors can start from an open issue.',
    tags: ['engineer', 'issues', 'github'],
    action: { label: 'Open the repo', href: github },
  },
  {
    id: 'help-stall',
    title: 'Help stall',
    description: 'A desk for people who want to contribute and are not sure which file to open.',
    tags: ['engineer', 'help', 'contribute'],
    action: { label: 'Open the repo', href: github },
  },
  {
    id: 'mit-stall',
    title: 'MIT license',
    description: 'CollegeSapien is MIT-licensed. Read it, use it, and send the work back.',
    tags: ['engineer', 'mit', 'license'],
    action: { label: 'Open the repo', href: github },
  },
]

export const mockContentById = new Map(mockContent.map((entry) => [entry.id, entry]))
