import deckhandPhoto from '../assets/Deckhandphoto.jpeg'
import captainInTrainingPhoto from '../assets/CaptianinTraining.jpeg'
import sayvilleFerryEmpressPhoto from '../assets/SayvilleFerryServiceFireIslandEmpress.jpeg'
import coastlineFreightSeahorsePhoto from '../assets/CoastlinefreightFireIsalndSeahorse.jpeg'
import coastlineFreightHelmPhoto from '../assets/CoastlineFreightTomWeikathelmofFireIslandSehorse.jpg'
import callOfDoodyPhoto from '../assets/CallofDoodyPumpingoutBoat.jpg'
import cubesatReflowPhoto from '../assets/CubesatReflowSolderedOresatbaord.jpg'
import cubesatSmdPastePhoto from '../assets/CubesatPlacingSMDonSolderpasteonOresatBoard.png'
import cubesatGroupPhoto from '../assets/CubesatGroupphotoatShowcase.jpg'
import cubesatFramePhoto from '../assets/Cubesat3DprintedFrame.jpg'
import fpvAssemblingPhoto from '../assets/FPVDroneassemblingelectronicstoframe.jpg'
import fpvBetaflightPhoto from '../assets/FPVDroneInstallingbetaflightfirmware.jpg'
import aresCfdPhoto from '../assets/ARESUAVCFDModel.jpg'
import aresStructurePhoto from '../assets/ARESUAVBuiltStructure.jpg'
import aresExplodedViewPhoto from '../assets/ARESUAVexplodedviewofStructure.jpg'
import saeMovingPlanePhoto from '../assets/SAEAeroMovingPlaneCompetitionday.jpg'
import saeGroupPhoto from '../assets/SAEAeroGroupPicturecompetitionday.jpg'
import saeFullGroupPhoto from '../assets/SAEAeroFullGroupphotoAfterFlight.jpg'
import locIrisDryfitAssemblyPhoto from '../assets/LocIrisDryfitAssembly.jpg'
import locIrisFinFiberglassingPhoto from '../assets/LocIrisFinFiberglassing.jpeg'
import locIrisMotorMountAssemblyPhoto from '../assets/LocIrisMotorMountAssemblyPostEpoxy.jpeg'
import robotArmCADPhoto from '../assets/RobotArmCADModel.png'
import robotArmBuildPhoto from '../assets/RobotArm.jpeg'
import robotArmControlPhoto from '../assets/RobotArmDuetBoardwithRaspberryPi.jpg'
import portfolioCoverPhoto from '../assets/PortfolioWebsiteCoverpage.jpeg'
import portfolioBackendPhoto from '../assets/PortfolioWebsiteSampleBackendscreenshotwithcodex.jpeg'
import menziMuckOverviewDrawingPhoto from '../assets/MenziMuckoverviewDrawing.jpeg'
import menziMuckClawDrawingPhoto from '../assets/MenziMuckClawDrawing.jpeg'
import gimbalFrontIsoPhoto from '../assets/Gimbal_Front_Iso.png'
import gimbalBackIsoPhoto from '../assets/Gimbal_Back_Iso.png'
import gimbalFrontSquarePhoto from '../assets/Gimbal_Front_Square.png'
import cadHandoffHomepagePhoto from '../assets/CAD-Handoff_Homepage.png'
import cadHandoffTreePhoto from '../assets/Example_Tree.png'
import ipsTunnelModelPhoto from '../assets/Tunnel_Model.png'
import ipsTunnelAnalysisPhoto from '../assets/Tunnel_Analysis.png'

export type ProjectCategory =
  | 'Defense'
  | 'UAS'
  | 'RF Design'
  | 'Mechatronics'
  | 'Manufacturing'
  | 'Computer Vision'
  | 'Software'
  | 'Mechanical Design'

export interface Person {
  name: string
  badge: string
  secondaryBadge: string
  summary: string
  citizenship: string
  location: string
}

export interface LinkItem {
  label: string
  href: string
  value: string
}

export interface SkillGroup {
  title: string
  icon: string
  items: string[]
}

export interface ExperienceItem {
  company: string
  companyUrl?: string
  image?: string
  imageAlt?: string
  role: string
  location: string
  type: string
  dates: string
  bullets: string[]
  gallery?: Array<{ src: string; alt: string }>
}

export interface ProjectItem {
  slug: string
  title: string
  role: string
  organization: string
  dates: string
  cardDates?: string
  description: string
  overview: string
  bullets: string[]
  fullDetails: string[]
  categories: ProjectCategory[]
  tags: string[]
  visual: string
  coverImage?: string
  coverAlt?: string
  coverPosition?: string
  coverFit?: 'cover' | 'contain'
  media?: Array<{ src: string; alt: string; caption: string; layout?: 'portrait' | 'landscape' }>
  mediaPlaceholders?: string[]
  subtitle?: string
  links?: Array<{ label: string; href: string; variant?: 'primary' | 'secondary' }>
  status?: string
  engineeringCaseStudy?: {
    sponsor: string
    teamSize: string
    budget: string
    phase: string
    challenge: string
    requirements: Array<{ title: string; description: string }>
    contributions: string[]
    process: Array<{ title: string; description: string }>
    concept: {
      summary: string
      elements: Array<{ title: string; description: string }>
      unresolved: string[]
    }
    tools: string[]
    currentStatus: string
    nextSteps: string[]
    finalDeliverables: string[]
    disclaimer: string
  }
  technicalCaseStudy?: {
    objective: string
    currentStatus?: string
    specifications: Array<{ label: string; value: string }>
    architecture: Array<{ title: string; description: string }>
    designSections: Array<{ title: string; items: string[] }>
    challenges: Array<{ challenge: string; response: string }>
    results: string[]
    tools: string[]
  }
  story?: {
    problem: string
    solution: string
    workflow: Array<{ title: string; description: string; tone: 'primary' | 'active' | 'merged' }>
    featureGroups: Array<{ title: string; items: string[] }>
    architecture: Array<{ title: string; description: string }>
    dataAndStorage: string[]
    security: string[]
    challenges: Array<{ challenge: string; solution: string }>
    lessons: string[]
    futureImprovements: string[]
  }
}

export interface EducationItem {
  school: string
  degree: string
  minor: string
  location: string
  dates: string
  activities: string[]
  highlights: string[]
}

export interface Credential {
  title: string
  issuer: string
  issued: string
  expires?: string
  credentialId?: string
}

export interface Award {
  title: string
  issuer: string
  date: string
}

export const person: Person = {
  name: 'Thomas Weik',
  badge: 'Mechanical Engineer',
  secondaryBadge: '',
  summary:
    'Mechanical engineering student focused on UAV systems, mechatronics, embedded hardware integration, and prototype development.',
  citizenship: 'US Citizen',
  location: 'Melbourne, Florida / Sayville, New York'
}

export const links: LinkItem[] = [
  {
    label: 'Email',
    href: 'mailto:tweik224@gmail.com',
    value: 'tweik224@gmail.com'
  },
  {
    label: 'Phone',
    href: 'tel:+16319015784',
    value: '(631) 901-5784'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomas-weik/',
    value: 'www.linkedin/in/Thomas-weik'
  }
]

export const about = {
  short:
    'Mechanical Engineering student focused on UAV systems, mechatronics, embedded hardware integration, and CAD-driven prototyping. Graduating Spring 2027.',
  long: [
    'Mechanical engineering student at Florida Institute of Technology with a Nanotechnology minor, focused on applying coursework in mechanics, controls, and systems design to hands-on engineering projects.',
    'My work spans UAV integration, embedded hardware, CAD modeling, fabrication, and testing, with a strong interest in building reliable systems from concept through prototype.'
  ]
}

export const siteContent = {
  skillsDescription:
    'Tools and methods I use for design, integration, testing, and getting hardware working.',
  experienceDescription:
    'Operational roles that sharpen systems thinking, decision-making, and accountability.',
  projectsDescription:
    'Hands-on engineering projects focused on integration, testing, and getting systems to work.',
  educationDescription: 'Academic foundation, certifications, and awards.',
  contactDescription:
    'Interested in collaborating or discussing opportunities? Feel free to reach out through any of these channels.',
  contactAvailability:
    'Available for internships, research collaborations, and engineering project opportunities.',
  focusAreas: ['UAS Systems Integration', 'Embedded Systems', 'Mechanical Design', 'Mechatronics']
}

export const skills: SkillGroup[] = [
  {
    title: 'CAD & Design',
    icon: 'cd',
    items: ['SolidWorks', 'Fusion 360', 'Creo Parametric', 'Onshape', 'Jama', 'GD&T', 'FEA', 'Lightburn']
  },
  {
    title: 'Microscopy & Characterization',
    icon: 'mc',
    items: ['STM', 'AFM', 'SEM', 'TEM', 'EDAX', 'Confocal Microscopy']
  },
  {
    title: 'Programming & Controls',
    icon: 'pc',
    items: [
      'MATLAB',
      'Simulink',
      'Arduino IDE',
      'Betaflight',
      'iNav',
      'LabVIEW',
      'Basic Python',
      'Bash'
    ]
  },
  {
    title: 'Hardware & Tools',
    icon: 'ht',
    items: [
      '3D printing slicers',
      'Laser cutting',
      'Soldering',
      'Reflow soldering',
      'Water jet',
      'Power tools',
      'Forklift',
      'Multimeter'
    ]
  },
  {
    title: 'Productivity & PM',
    icon: 'pm',
    items: [
      'Microsoft Excel',
      'Microsoft Word',
      'Microsoft Teams',
      'PowerPoint',
      'Google Workspace',
      'JIRA',
      'GitHub',
      'Six Sigma White Belt'
    ]
  },
  {
    title: 'Collaboration',
    icon: 'pm',
    items: ['Leadership', 'Communication', 'Public speaking', 'Team coordination', 'Project management']
  }
]

export const experience: ExperienceItem[] = [
  {
    company: 'Sayville Ferry Service Inc',
    companyUrl: 'https://sayvilleferry.com',
    role: 'Senior Deckhand',
    image: sayvilleFerryEmpressPhoto,
    imageAlt: 'Sayville Ferry Service vessel Fire Island Empress',
    location: 'United States',
    type: 'On-site, Seasonal',
    dates: 'Aug 2024 - Present',
    bullets: [
      'Logged 30+ helm hours running full trips with docking, undocking, radio calls, and tight channel maneuvering.',
      'Completed instrument-only bay runs using radar and GPS to validate navigation and situational awareness.',
      'Operated and verified bilge, fire, and lifesaving systems and kept procedures current.',
      'Trained new deckhands and acted as second-in-command on passenger ferries.'
    ]
  },
  {
    company: 'Sayville Ferry Service Inc',
    companyUrl: 'https://sayvilleferry.com',
    role: 'Deckhand',
    image: deckhandPhoto,
    imageAlt: 'Deckhand role photo',
    location: 'Sayville, NY',
    type: 'On-site, Seasonal',
    dates: 'May 2021 - Aug 2024',
    bullets: [
      'Managed freight logistics and coordinated safe docking at each port.',
      'Applied TSA maritime security procedures during day-to-day operations.',
      'Maintained detailed trip logs for accurate operational tracking.'
    ]
  },
  {
    company: 'Coastline Freight (Fire Island Seahorse)',
    companyUrl: 'https://coastlinefreight.com',
    role: 'Captain in Training',
    image: captainInTrainingPhoto,
    imageAlt: 'Captain in training role photo',
    location: 'Sayville, NY',
    type: 'On-site, Seasonal',
    dates: 'May 2025 - Aug 2025',
    gallery: [
      {
        src: coastlineFreightSeahorsePhoto,
        alt: 'Fire Island Seahorse freight vessel'
      }
    ],
    bullets: [
      'Trained at the helm of a 70-ft freight vessel, practicing navigation, vessel handling, and real-time decision-making.',
      'Managed trim strategy and weight distribution to improve stability and unloading efficiency.',
      'Executed precision docking in tight, high-traffic harbors under variable weather and tides.',
      'Handled lines across docking configurations and supported routine maintenance and safety checks.',
      'Monitored thrust/torque effects and vessel stability during operations.'
    ]
  },
  {
    company: 'Call of Doody',
    companyUrl: 'https://callofdoody.us',
    role: 'Captain',
    image: callOfDoodyPhoto,
    imageAlt: 'Call of Doody pump-out boat',
    location: 'Lindenhurst, NY',
    type: 'On-site, Seasonal',
    dates: 'Jun 2024 - Aug 2025',
    bullets: [
      'Operated a pump-out boat and coordinated customer interactions and scheduling.',
      'Improved close-quarters docking across varied marina conditions.',
      'Practiced wind-handling techniques using flat-bottom vessels.'
    ]
  },
  {
    company: 'Coastline Freight',
    companyUrl: 'https://coastlinefreight.com',
    role: 'Lot Maintenance',
    image: coastlineFreightHelmPhoto,
    imageAlt: 'At the helm of the Fire Island Seahorse freight vessel',
    location: 'Sayville, NY',
    type: 'On-site, Seasonal',
    dates: 'Jun 2019 - May 2025',
    bullets: ['Handled self-paced lot upkeep and facility support tasks.']
  },
]

export const leadership: ExperienceItem[] = [
  {
    company: 'Tau Kappa Epsilon - Omicron Nu Chapter',
    companyUrl: 'https://tkeon.org',
    role: 'Prytanis (President)',
    location: 'Melbourne, FL',
    type: 'On-site',
    dates: 'Nov 2024 - Nov 2025',
    bullets: [
      'Led the chapter to its first-ever Top TKE Chapter award, the highest national award a chapter can receive.',
      'Led a 44+ member organization while coordinating 7 executives and 8 committees.',
      'Raised $12,000+ total including $11,000 for St. Jude, the highest chapter fundraising ever and second-highest in Florida Tech Greek Life history.',
      'Earned 6 National Excellence Awards and 1 Honorable Mention.',
      'Planned and hosted the chapter 50th Anniversary event with 80+ alumni attendees.',
      'Managed a $30,000 budget and coordinated financial planning with the executive board.',
      'Worked with the treasurer to more than double savings and implement anti-debt measures.',
      'Reallocated budget to subsidize over 50% member attendance at the Atlanta Regional Leadership Conference.',
      'Implemented a proposal system for executive and committee ideas and collaborated with alumni to structure meetings for real-world readiness.',
      'Met bi-weekly with Scholarship Chairman and Greek Life director to monitor and improve academic outcomes.'
    ]
  },
  {
    company: 'Tau Kappa Epsilon - Omicron Nu Chapter',
    companyUrl: 'https://tkeon.org',
    role: 'Public Relations Chairman',
    location: 'Melbourne, FL',
    type: 'On-site',
    dates: 'May 2024 - Nov 2024',
    bullets: [
      'Designed flyers, managed social media content, and planned/edited recruitment and philanthropy videos.',
      'Led digital branding that earned the Florida Tech Greek Life Best Online Presence award during my term.',
      'Primary tools: Adobe Photoshop and Adobe Premiere Pro.'
    ]
  },
  {
    company: 'Tau Kappa Epsilon - Omicron Nu Chapter',
    companyUrl: 'https://tkeon.org',
    role: 'Pylortes (Sergeant at Arms / Risk Manager)',
    location: 'Melbourne, FL',
    type: 'On-site',
    dates: 'Nov 2023 - Nov 2024',
    bullets: [
      'Served as Chief Risk Officer and developed chapter alcohol-awareness programming.',
      'Created a 30-page emergency response plan and organized AED/CPR certification.',
      'Procured breathalyzer and Narcan resources as preventative safety measures.',
      'Built a new organization system for the chapter room.'
    ]
  },
  {
    company: 'Tau Kappa Epsilon - Omicron Nu Chapter',
    companyUrl: 'https://tkeon.org',
    role: 'Member',
    location: 'Melbourne, FL',
    type: 'On-site',
    dates: 'Oct 2023 - Nov 2023',
    bullets: ['Participated in chapter operations and development programming.']
  },
  {
    company: 'Lindenhurst Knights of Columbus #794 - OLPH',
    companyUrl: 'https://kofc794.org',
    role: 'Member',
    location: 'United States',
    type: 'Membership',
    dates: 'Nov 2025 - Present',
    bullets: ['Active member.']
  },
  {
    company: 'Gamma Sigma Alpha Honor Society',
    companyUrl: 'https://gammasigmaalpha.org',
    role: 'Member',
    location: 'United States',
    type: 'Membership',
    dates: 'Present',
    bullets: ['Active member.']
  }
]

export const projects: ProjectItem[] = [
  {
    slug: 'inverted-payload-system',
    title: 'Inverted Payload System',
    subtitle: 'Mechanical payload installation system for a confined tunnel environment',
    role: 'Concept Design Subteam Member',
    organization: 'Florida Institute of Technology',
    dates: '2026–2027',
    cardDates: '2026–2027 · In Development',
    status: 'In Development · Conceptual Design',
    description:
      'Developing a fully mechanical system to lift, orient, and position 20-pound payloads for overhead installation inside a confined, low-visibility tunnel.',
    overview:
      'The Inverted Payload System is a Mechanical Engineering Senior Design project sponsored by Lockheed Martin Space and the United States Navy. Our 11-student team is developing a mechanically operated device to install and remove three cube-shaped payloads, one at a time, at overhead interfaces within a confined tunnel.',
    bullets: [
      'Researching mechanical lifting, positioning, alignment, rotation, and locking mechanisms for confined-space operation.',
      'Contributing to requirements development, verification planning, literature review, risk analysis, and the Systems Requirements Review.',
      'Developing and evaluating concepts with attention to manufacturability, assembly, access, stability, and customer requirements.',
      'Created a Creo model and drawing of the tunnel envelope and prepared concept sketches and technical presentation material.'
    ],
    fullDetails: [
      'The system must maintain positive control of one 6-inch, 20-pound cube while technicians complete a multi-bolt ceiling interface.',
      'The current concept combines a stabilized floor carriage, manual lead-screw lift, spring-counterbalanced articulating arm, and cube-support fixture.',
      'All concept features remain under evaluation and have not yet been experimentally validated.'
    ],
    categories: ['Defense', 'Mechanical Design', 'Manufacturing'],
    tags: ['Mechanical Design', 'Creo', 'Systems Engineering', 'Concept Development', 'DFM/DFA'],
    visual: 'from-[#172033] via-[#324760] to-[#d8e3ec]',
    coverImage: ipsTunnelModelPhoto,
    coverAlt: 'Simplified tunnel-envelope model showing payload approach and overhead installation directions',
    coverFit: 'contain',
    media: [
      {
        src: ipsTunnelModelPhoto,
        alt: 'Simplified tunnel-envelope model showing payload approach and overhead installation directions',
        caption: 'Tunnel-envelope reference model used to communicate the confined installation problem',
        layout: 'landscape'
      },
      {
        src: ipsTunnelAnalysisPhoto,
        alt: 'Preliminary static structural analysis visualization of the tunnel-envelope reference model',
        caption: 'Preliminary tunnel-envelope analysis reference; not final IPS design validation',
        layout: 'landscape'
      }
    ],
    engineeringCaseStudy: {
      sponsor: 'Lockheed Martin Space + United States Navy',
      teamSize: '11 engineering students',
      budget: '$10,000',
      phase: 'Conceptual design',
      challenge:
        'The team must enable controlled overhead installation and removal without allowing a payload to contact the floor. The system must fit entirely inside a low-visibility tunnel with a sloped, low-friction floor, keep-out zones, limited tooling clearance, and no allowance for electrical or magnetic components or permanent tunnel modifications.',
      requirements: [
        {
          title: 'Payload control',
          description: 'Handle one 6-inch, 20-pound cube at a time, prevent floor contact or drops, and install or remove all three cubes in any sequence.'
        },
        {
          title: 'Operating envelope',
          description: 'Operate fully inside the tunnel, avoid designated keep-out zones, and preserve access for multi-bolt installation tooling.'
        },
        {
          title: 'Fully mechanical operation',
          description: 'Use no electrical or magnetic components and require no more than two operators, with one-person operation as an objective.'
        },
        {
          title: 'Safe assembly',
          description: 'Avoid permanent tunnel changes, retain removable fasteners, lock permanent fasteners, and prevent inadvertent disconnection or single-point failures.'
        },
        {
          title: 'Serviceability',
          description: 'Prefer commercial components and divide systems over 20 pounds into sub-20-pound modules that can be assembled in the tunnel.'
        },
        {
          title: 'Design basis',
          description: 'Target a 25-year service life, consider MIL-STD-1472H and MIL-STD-3034A, and use 1.5 yield and 2.0 ultimate factors of safety with nonnegative margins.'
        }
      ],
      contributions: [
        'I serve on the concept design subteam and research mechanisms for lifting, positioning, alignment, rotation, and positive locking.',
        'I investigated worm gears, Geneva mechanisms, ratchet-and-pawl systems, index plungers, rotary indexing tables, kinematic couplings, rotary actuators, lead screws, and linear guides.',
        'I contribute to system-requirements development, verification planning, the literature review, risk analysis, and Systems Requirements Review material.',
        'I develop and evaluate mechanical concepts through sketches while considering manufacturability, assembly, operator access, stability, and customer requirements.',
        'I created a Creo model and technical drawing of the tunnel envelope to support packaging and clearance studies.',
        'I prepare technical presentation content and document concept-team meetings so design decisions and open questions remain traceable.'
      ],
      process: [
        {
          title: 'Problem definition',
          description: 'Define the confined overhead-installation task, payload interfaces, human constraints, keep-out regions, and fully mechanical operating boundaries.'
        },
        {
          title: 'Requirements & risk analysis',
          description: 'Translate customer needs into measurable requirements and plan verification by inspection, analysis, measurement, or demonstration.'
        },
        {
          title: 'Mechanism research',
          description: 'Compare lift, guide, indexing, locking, counterbalance, pneumatic, anchoring, and platform-leveling approaches against the operating constraints.'
        },
        {
          title: 'Concept development',
          description: 'Combine promising mechanisms into system concepts and evaluate packaging, access, stability, assembly, and failure risks.'
        },
        {
          title: 'Design refinement',
          description: 'Advance the selected concept through detailed CAD, structural calculations, FEA, tolerance analysis, prototyping, fabrication, and testing.'
        },
        {
          title: 'Final deliverables',
          description: 'Document the design through controlled CAD, drawings, calculations, reviews, a physical prototype, test results, and a final engineering report.'
        }
      ],
      concept: {
        summary:
          'The concept design team is evaluating a compact carriage that supports a manual lift and counterbalanced reach mechanism. The arrangement below is a preliminary concept under evaluation—not a selected, fabricated, or validated final design.',
        elements: [
          {
            title: 'Temporary anchoring',
            description: 'A removable mechanical anchoring approach, potentially a vacuum-based SeaSucker-style mount if surface testing confirms compatibility.'
          },
          {
            title: 'Manual vertical lift',
            description: 'A manually driven lead screw intended to provide controlled, self-contained vertical positioning.'
          },
          {
            title: 'Counterbalanced reach',
            description: 'A spring-counterbalanced articulating arm, similar in motion to a balanced task light, intended to extend through the tunnel.'
          },
          {
            title: 'Payload interface',
            description: 'An end fixture intended to support, orient, and position the cube while retaining installation-tool access.'
          },
          {
            title: 'Mechanical position holding',
            description: 'Candidate friction locks, toothed joints, index plungers, ratchets, or mechanically braked joints to prevent arm drift.'
          }
        ],
        unresolved: [
          'Reliable anchoring on a low-friction sloped floor',
          'Stability throughout the articulating arm’s working range',
          'Joint drift prevention under a 20-pound payload',
          'Controlled in-plane cube rotation',
          'Tooling clearance around the multi-bolt interface',
          'Reach around changes in tunnel geometry',
          'Dropped-part and inadvertent-disconnection prevention',
          'Elimination or mitigation of single-point failures'
        ]
      },
      tools: [
        'Creo Parametric',
        'Mechanical concept development',
        'Requirements decomposition',
        'Verification planning',
        'Literature review',
        'Risk analysis',
        'Mechanism selection',
        'Design for assembly',
        'Design for manufacturability',
        'Technical drawing',
        'Engineering documentation',
        'Team collaboration'
      ],
      currentStatus:
        'The project is in the conceptual design phase. The team is comparing mechanisms and system architectures, refining requirements, documenting risks, and preparing for concept selection. The displayed tunnel analysis is preliminary reference work; no final IPS configuration, completed structural validation, fabricated hardware, or validated performance claim is presented here.',
      nextSteps: [
        'Complete concept evaluation and select a system architecture',
        'Develop the selected concept in detailed Creo assemblies and drawings',
        'Perform hand calculations, structural analysis, FEA, and tolerance studies',
        'Resolve anchoring, rotation, locking, stability, access, and failure-control details',
        'Prototype critical mechanisms before full-system fabrication',
        'Fabricate, assemble, and test the system against approved verification methods'
      ],
      finalDeliverables: [
        'CAD assemblies and controlled engineering drawings using ASME Y14.5 practices',
        'Design-review documentation and traceable verification planning',
        'Hand calculations supporting structural analysis and FEA',
        'A physical prototype with documented testing',
        'A final engineering report describing the design process and results'
      ],
      disclaimer:
        'Project information is limited to approved academic and publicly shareable details. Design concepts and requirements may change as development continues.'
    }
  },
  {
    slug: 'cad-handoff',
    title: 'CAD Handoff',
    subtitle: 'A visual version-control and file-handoff system for collaborative CAD development',
    role: 'Full-Stack Developer & Systems Designer',
    organization: 'LMCO–Navy Senior Design Project',
    dates: 'Senior Design Project',
    description:
      'Built a collaborative platform that helps engineering teams trace CAD revisions, review parallel work, and maintain one approved primary model.',
    overview:
      'CAD Handoff applies software version-control concepts to large binary CAD files while presenting design history in language and visuals familiar to mechanical engineers. It was created to support the LMCO–Navy Senior Design workflow; it is not an official Lockheed Martin deployment.',
    bullets: [
      'Designed a visual primary-and-branch workflow that records where revisions began, who owns each branch, and which version was promoted.',
      'Implemented private CAD storage with temporary signed downloads, anonymous Supabase sessions, and row-level access policies.',
      'Preserved traceability during offline archiving by retaining version metadata after eligible storage objects are exported and removed.',
      'Used atomic PostgreSQL functions and a partial unique index to enforce one current primary package per project.'
    ],
    fullDetails: [
      'Supports ZIP, PRT, ASM, STEP, and STP packages with numbered, non-destructive version history.',
      'Allows branches to originate from the current primary model, an earlier primary revision, or a version on another branch.',
      'Treats a merge as promotion of the latest branch package to the primary path; it does not geometrically merge CAD files.',
      'Uses a statically exported Next.js frontend on GitHub Pages with Supabase providing authentication, database, and private file storage services.'
    ],
    categories: ['Software', 'Mechanical Design'],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row Level Security', 'GitHub Actions'],
    visual: 'from-[#0f2747] via-[#164a7b] to-[#e5eef8]',
    coverImage: cadHandoffHomepagePhoto,
    coverAlt: 'CAD Handoff project selection screen with storage status and project tiles',
    media: [
      {
        src: cadHandoffHomepagePhoto,
        alt: 'CAD Handoff project selection screen with storage status and project tiles',
        caption: 'Project paths, storage status, and guided onboarding'
      },
      {
        src: cadHandoffTreePhoto,
        alt: 'CAD Handoff visual version tree showing primary, active, and merged branches',
        caption: 'Version tree showing branch origins, iterations, archived packages, and promotions'
      }
    ],
    links: [
      {
        label: 'View Live Project',
        href: 'https://thomasweik.github.io/cad-handoff/',
        variant: 'primary'
      },
      {
        label: 'View Source Code',
        href: 'https://github.com/thomasweik/cad-handoff',
        variant: 'secondary'
      }
    ],
    story: {
      problem:
        'Mechanical teams often exchange large binary assemblies across different CAD tools. Unlike source code, those files cannot be meaningfully line-merged, so parallel revisions can make it difficult to identify the approved model, understand where a change began, or reconstruct why a revision was selected.',
      solution:
        'I designed a project-and-branch model that keeps every upload as a numbered package. A visual tree makes each branch origin, iteration, owner, CAD tool, and promotion visible. When a team accepts a revision, the application promotes that package to the primary path instead of attempting a geometric file merge.',
      workflow: [
        {
          title: 'Start from primary',
          description: 'Choose the current approved package or an earlier recorded version as the revision baseline.',
          tone: 'primary'
        },
        {
          title: 'Develop on a branch',
          description: 'Record the contributor, CAD software, exact source package, and each uploaded iteration.',
          tone: 'active'
        },
        {
          title: 'Review the package',
          description: 'Team members use temporary signed links to download private files and review the revision.',
          tone: 'active'
        },
        {
          title: 'Promote to primary',
          description: 'The branch owner promotes the agreed latest version, preserving the complete path and history.',
          tone: 'merged'
        }
      ],
      featureGroups: [
        {
          title: 'Revision control',
          items: [
            'Numbered, non-destructive version history',
            'Branching from primary or branch versions',
            'Atomic Add to Primary workflow',
            'Current-primary highlighting'
          ]
        },
        {
          title: 'Visual navigation',
          items: [
            'Horizontal version tree with origin and merge connectors',
            'Primary-only view and Go to current navigation',
            'Branch collapse and expand-all controls',
            'Zoom controls for large histories'
          ]
        },
        {
          title: 'Team workflow',
          items: [
            'Project and branch ownership',
            'Per-project and per-branch CAD labels',
            'Guided example project for onboarding',
            'Confirmed deletion and readable error states'
          ]
        },
        {
          title: 'File lifecycle',
          items: [
            'Private ZIP, PRT, ASM, STEP, and STP uploads',
            'Temporary signed download URLs',
            'Storage-capacity warnings',
            'Client-side ZIP exports up to approximately 250 MB'
          ]
        }
      ],
      architecture: [
        {
          title: 'User browser',
          description: 'Responsive engineering interface and client-side archive creation'
        },
        {
          title: 'Next.js + React',
          description: 'Statically exported TypeScript frontend hosted with GitHub Pages'
        },
        {
          title: 'Supabase Authentication',
          description: 'Anonymous sessions with the entered username stored as user metadata'
        },
        {
          title: 'PostgreSQL + RLS',
          description: 'Project, branch, package, ownership, origin, promotion, and archive records'
        },
        {
          title: 'Private Supabase Storage',
          description: 'CAD packages remain private and are downloaded through temporary signed URLs'
        }
      ],
      dataAndStorage: [
        'Every branch records the exact package version from which it originated, keeping alternate concepts traceable.',
        'A partial unique database index permits only one current primary package for each project.',
        'PostgreSQL functions perform promotion and archive changes atomically so related records stay consistent.',
        'Eligible older packages can be exported to an offline ZIP. Their files are removed from online Storage only after a successful export, while their metadata remains visible as archived or offline.',
        'The current primary package and newest package on an active branch are protected from archiving.'
      ],
      security: [
        'Supabase anonymous authentication gives each visitor a session; the entered username is stored in that anonymous user’s metadata.',
        'Row-level security policies govern access to projects, branches, packages, and Storage objects.',
        'Project creators manage their projects, while branch owners manage their branches and can promote their latest version.',
        'A username-based administrator mode supports demonstrations and maintenance. It is a prototype convenience, not production-grade identity verification.'
      ],
      challenges: [
        {
          challenge: 'Binary CAD files cannot be merged like source code.',
          solution: 'Defined merge as an explicit promotion of a reviewed package while retaining the prior primary and branch history.'
        },
        {
          challenge: 'One model must remain authoritative.',
          solution: 'Combined an atomic promotion function with a database constraint that enforces one current primary package.'
        },
        {
          challenge: 'Private files still need convenient review access.',
          solution: 'Kept the bucket private and generated short-lived signed URLs only when an authorized user requests a download.'
        },
        {
          challenge: 'Limited storage should not erase design history.',
          solution: 'Separated file availability from historical metadata so offline packages remain visible and traceable after export.'
        },
        {
          challenge: 'A dynamic authenticated app needed static hosting.',
          solution: 'Exported the Next.js frontend for GitHub Pages and delegated authentication, data, and file services to Supabase.'
        }
      ],
      lessons: [
        'Modeling provenance explicitly is as important as storing the files themselves.',
        'Database constraints and atomic functions provide stronger guarantees than interface logic alone.',
        'Mechanical workflows need familiar terminology and visible relationships more than software-development jargon.',
        'Archive design must separate historical traceability from immediate online file availability.'
      ],
      futureImprovements: [
        'Verified accounts or university single sign-on',
        'Secure role-based administrator authorization',
        'Comments, review states, and formal approval checkpoints',
        'Checksums, duplicate detection, and CAD metadata extraction',
        'Presence, notifications, and configurable retention rules',
        'Server-side archive jobs as file volume grows',
        'Automated tests for access policies and promotion behavior'
      ]
    }
  },
  {
    slug: 'sae-aero-design',
    title: 'SAE Aero Design',
    role: 'Structures Subteam Member',
    organization: 'SAE Aero Design',
    dates: 'Competition Season',
    description:
      'Structural design support and hands-on fabrication for a competition aircraft, with a focus on compliance and build quality.',
    overview:
      'On the Structures Subteam, I helped drive CAD decisions and built hardware that stayed compliant, manufacturable, and test-ready.',
    bullets: [
      'Collaborated on structural CAD design to satisfy competition requirements and keep geometry manufacturable.',
      'Led hands-on assembly and fabrication, including servo testing, harness routing, carbon-fiber rod cutting, and CO2 laser-cut tail components.',
      'Validated design changes against competition rules to keep late-stage modifications compliant.'
    ],
    fullDetails: [
      'Partnered with the Structures Subteam to refine CAD layouts that balanced structural integrity with competition constraints.',
      'Assembled airframe components, tested servos, and built wiring harnesses to support reliable system integration.',
      'Produced tail-structure parts using a CO2 laser cutter and cut carbon-fiber rods to spec for final assembly.',
      'Reviewed alteration proposals and ensured updated modifications aligned with competition requirements.'
    ],
    categories: ['UAS', 'Mechanical Design', 'Manufacturing'],
    tags: ['Laser Cutting', 'Mechanical Assembly', 'Teamwork', 'CAD', 'Wiring Harnesses', 'Servo Testing'],
    visual: 'from-[#edf3ff] to-[#dfeaff]',
    coverImage: saeFullGroupPhoto,
    coverAlt: 'Full SAE Aero Design group photo after flight',
    media: [
      {
        src: saeMovingPlanePhoto,
        alt: 'SAE Aero Design aircraft in motion on competition day',
        caption: 'SAE Aero Design aircraft in motion on competition day'
      },
      {
        src: saeGroupPhoto,
        alt: 'SAE Aero Design group photo on competition day',
        caption: 'SAE Aero Design team on competition day'
      },
      {
        src: saeFullGroupPhoto,
        alt: 'Full SAE Aero Design group photo after flight',
        caption: 'Full team photo after flight'
      }
    ]
  },
  {
    slug: 'ares-muav-endurance-uav',
    title: 'ARES MUAV Endurance UAV',
    role: 'Build & Integration Team Member',
    organization: 'Florida Institute of Technology',
    dates: 'Aug 2025 - Present',
    description:
      'Build and avionics integration support for an endurance UAV in manual and autonomous modes.',
    overview:
      'Focused on servo/mechanical integration and avionics bring-up to make the platform test-ready.',
    bullets: [
      'Assembled servo systems, routed linkages, and wired servos to the flight controller and RC receiver.',
      'Supported bring-up testing by verifying servo function, continuity, and channel mapping during initial avionics tests.'
    ],
    fullDetails: [
      'Installed and tuned control-surface servo linkages for repeatable response in manual and autonomous modes.',
      'Verified wiring continuity and channel mapping to support stable command behavior during early system tests.',
      'Assisted integration reviews to ensure avionics and mechanical hardware were test-ready before field validation.'
    ],
    categories: ['UAS', 'Mechatronics'],
    tags: ['Avionics Integration', 'RC Systems', 'Servos', 'Flight Controller'],
    visual: 'from-[#eef2ff] to-[#dde9ff]',
    coverImage: aresExplodedViewPhoto,
    coverAlt: 'ARES MUAV exploded view of structure',
    coverPosition: 'object-[center_40%]',
    media: [
      {
        src: aresCfdPhoto,
        alt: 'ARES MUAV CFD model',
        caption: 'CFD model of the ARES MUAV airframe'
      },
      {
        src: aresStructurePhoto,
        alt: 'ARES MUAV built structure',
        caption: 'Built ARES MUAV structure'
      },
      {
        src: aresExplodedViewPhoto,
        alt: 'ARES MUAV exploded view of structure',
        caption: 'Exploded view of the ARES MUAV structure'
      }
    ]
  },
  {
    slug: 'fpv-drone-build',
    title: '5-Inch FPV Drone Build',
    role: 'Builder & Flight Systems Integrator',
    organization: 'Independent Personal Project',
    dates: '2026',
    description:
      'Specified, assembled, configured, and flight-tested a custom 5-inch 6S FPV quadcopter integrating propulsion, power electronics, ELRS control, analog video, and Betaflight.',
    overview:
      'I developed a custom 5-inch FPV quadcopter by selecting compatible components and integrating its mechanical, propulsion, electrical, radio-control, video, and flight-control systems.',
    bullets: [
      'Established system requirements and selected mutually compatible propulsion, control, radio, video, and power components.',
      'Assembled, soldered, configured, tested, and troubleshot the complete aircraft and its subsystems.'
    ],
    fullDetails: [
      'Integrated the airframe, propulsion system, flight controller, ELRS receiver, analog video system, and 6S power architecture.',
      'Configured Betaflight, radio endpoints, arming logic, flight modes, motor direction, and failsafe behavior.',
      'Completed continuity checks, subsystem verification, progressive ground testing, and flight testing.'
    ],
    categories: ['UAS', 'Mechatronics'],
    tags: ['FPV', 'Betaflight', 'ExpressLRS', 'Analog Video', 'Flight Testing', 'Soldering', 'Power Systems', 'LiPo Safety'],
    visual: 'from-[#e8f2ff] to-[#d8e9ff]',
    coverImage: fpvAssemblingPhoto,
    coverAlt: 'Assembling FPV drone electronics onto the frame',
    coverPosition: 'object-[center_80%]',
    technicalCaseStudy: {
      objective:
        'The objective was to build a responsive custom FPV aircraft by selecting compatible hardware and integrating the propulsion, power, radio, video, and flight-control systems around a 5-inch 6S platform. Approximately seven minutes of useful flight time was a design target, not a claimed test result.',
      specifications: [
        { label: 'Configuration', value: '5-inch quadcopter' },
        { label: 'Power system', value: '6S LiPo · 1550 mAh · 22.2 V · 34.41 Wh' },
        { label: 'Propulsion', value: 'Four 2207-class, approximately 1750 KV brushless motors' },
        { label: 'Motor control', value: 'Four-in-one ESC with five-inch propellers' },
        { label: 'Flight control', value: 'F7-class flight controller configured with Betaflight' },
        { label: 'Control link', value: 'ExpressLRS receiver + RadioMaster Pocket ELRS transmitter' },
        { label: 'Video system', value: 'Analog FPV camera + 5.8 GHz VTX + Fat Shark ECHO goggles' },
        { label: 'Integration', value: 'Custom power, motor, receiver, camera, and VTX wiring' }
      ],
      architecture: [
        {
          title: '6S power system',
          description: 'The LiPo battery supplies the four-in-one ESC and regulated aircraft electronics through the integrated power architecture.'
        },
        {
          title: 'Propulsion',
          description: 'The ESC drives four brushless motors; Betaflight commands motor output through the F7-class flight controller.'
        },
        {
          title: 'Pilot control',
          description: 'The RadioMaster transmitter communicates through ExpressLRS to the receiver and flight controller.'
        },
        {
          title: 'FPV video',
          description: 'The analog camera feeds a 5.8 GHz video transmitter viewed through Fat Shark ECHO goggles.'
        }
      ],
      designSections: [
        {
          title: 'System definition & component selection',
          items: [
            'Established requirements for battery voltage, control protocol, video transmission, flight style, flight-time target, and impact resistance.',
            'Evaluated motor KV, propeller size, ESC current capability, connector compatibility, weight, and expected current demand.',
            'Selected mutually compatible propulsion, flight-control, radio, video, and power components.'
          ]
        },
        {
          title: 'Assembly & electrical integration',
          items: [
            'Assembled the quadcopter and packaged the flight controller, ESC, receiver, VTX, camera, antennas, and wiring inside the compact frame.',
            'Soldered and routed power, motor, receiver, camera, and video-transmitter connections.',
            'Performed continuity and short-circuit checks before applying battery power and protected sensitive electronics during bring-up.'
          ]
        },
        {
          title: 'Configuration & verification',
          items: [
            'Configured Betaflight, receiver channels, radio endpoints, arming logic, flight modes, motor direction, and failsafe behavior.',
            'Set up the ExpressLRS receiver and RadioMaster transmitter and verified the analog video path.',
            'Confirmed motor order and direction before propeller installation, then completed progressive ground and flight tests.'
          ]
        }
      ],
      challenges: [
        {
          challenge: 'Multiple voltage domains and compact packaging',
          response: 'Verified component compatibility and carefully routed power and signal wiring around the stacked electronics.'
        },
        {
          challenge: 'Safe initial power-up',
          response: 'Used continuity and short-circuit checks before connecting the LiPo, then brought subsystems online progressively.'
        },
        {
          challenge: 'Firmware and motor configuration',
          response: 'Validated receiver endpoints, arming, modes, failsafe, motor order, and direction before flight testing.'
        },
        {
          challenge: 'RF and analog-video reliability',
          response: 'Troubleshot radio and video performance while refining antenna placement and retention.'
        },
        {
          challenge: 'Battery health and changing flight performance',
          response: 'Monitored LiPo cell voltage, evaluated safe landing limits, and investigated changes in power output during use.'
        },
        {
          challenge: 'Durability versus flight behavior',
          response: 'Balanced mass, component protection, flight-time goals, and maneuverability during component selection and assembly.'
        }
      ],
      results: [
        'Successfully integrated the propulsion, control, video, radio, and power systems into an operational FPV quadcopter.',
        'Completed pre-power continuity checks, subsystem verification, and iterative ground and flight testing.',
        'Established reliable ExpressLRS control and analog FPV video.',
        'Used Betaflight to configure and verify the aircraft’s control and safety behavior.',
        'Developed hands-on experience with soldering, wiring, firmware configuration, LiPo safety, RF systems, troubleshooting, and flight testing.'
      ],
      tools: [
        'FPV Systems',
        'Betaflight',
        'ExpressLRS',
        'Analog Video',
        'Flight Testing',
        'Electronics Integration',
        'Soldering',
        'Power Systems',
        'Brushless Motors',
        'LiPo Batteries',
        'Troubleshooting'
      ]
    },
    media: [
      {
        src: fpvAssemblingPhoto,
        alt: 'Assembling FPV drone electronics onto the frame',
        caption: 'Assembling the electronics stack onto the frame'
      },
      {
        src: fpvBetaflightPhoto,
        alt: 'Installing Betaflight firmware on the FPV drone',
        caption: 'Installing Betaflight firmware and configuring the build'
      }
    ]
  },
  {
    slug: 'cubesat-development',
    title: 'CubeSat Development',
    role: 'Embedded Systems Lead',
    organization: 'Florida Institute of Technology',
    dates: 'Aug 2025 - Present',
    description:
      'Flight-computer assembly and embedded bring-up for a CubeSat, from PCB build through processor configuration.',
    overview:
      'I built and validated the CubeSat flight computer, handling PCB assembly, processor bring-up, and early embedded setup for mission readiness.',
    bullets: [
      'Hand-assembled and reflow-soldered the flight computer PCB with microscope inspection and fine-pitch alignment.',
      'Integrated the Octavo OSD3358-SM-RED SiP, configured bootloaders, and validated initial AM335x bring-up using open-source tools.'
    ],
    fullDetails: [
      'Performed detailed PCB assembly with thermal paste control, flux management, and microscope verification for solder joint reliability.',
      'Integrated the OSD3358-SM-RED SiP and configured boot pathways for stable early-stage startup.',
      'Validated AM335x bring-up using open-source software workflows and structured debugging checkpoints.'
    ],
    categories: ['Software', 'Mechatronics', 'Defense'],
    tags: ['Embedded Linux', 'PCB Assembly', 'Reflow Soldering', 'AM335x', 'GitHub'],
    visual: 'from-[#f4f7ff] to-sky-100',
    coverImage: cubesatReflowPhoto,
    coverAlt: 'Reflow-soldered CubeSat flight computer PCB',
    media: [
      {
        src: cubesatReflowPhoto,
        alt: 'Reflow-soldered CubeSat flight computer PCB',
        caption: 'Reflow-soldered CubeSat flight computer PCB'
      },
      {
        src: cubesatSmdPastePhoto,
        alt: 'Placing SMD components onto solder paste on the Oresat board',
        caption: 'Placing SMD components onto solder paste on the Oresat board'
      },
      {
        src: cubesatFramePhoto,
        alt: '3D-printed CubeSat frame',
        caption: '3D-printed CubeSat frame'
      },
      {
        src: cubesatGroupPhoto,
        alt: 'CubeSat team photo at showcase',
        caption: 'CubeSat team photo at the project showcase'
      }
    ]
  },
  {
    slug: 'loc-iris-model-rocket',
    title: 'Loc Iris Model Rocket',
    role: 'Builder',
    organization: 'Personal Project',
    dates: 'Mar 2026 - Present',
    cardDates: 'Mar 2026 - Present',
    status: 'In Development · Final Assembly',
    description:
      'Built a Loc Iris model rocket to pursue NAR Level 1 high powered rocketry certification.',
    overview:
      'I assembled the rocket and reinforced the fins with fiberglass in preparation for upcoming certification launches.',
    bullets: [
      'Assembled the Loc Iris model rocket for NAR Level 1 certification preparation.',
      'Fiberglassed the fins to improve reinforcement and durability.',
      'Prepared the rocket for launch operations planned over the coming months.'
    ],
    fullDetails: [
      'Built the rocket as a certification-focused project for NAR Level 1 high powered rocketry.',
      'Applied fiberglass reinforcement to the fins to improve strength and flight durability.',
      'Project remains in progress as of March 2026, with launch and certification attempts planned in the coming months.'
    ],
    categories: ['Mechanical Design', 'Manufacturing'],
    tags: ['Model Rocketry', 'Fiberglassing', 'Assembly', 'Certification'],
    visual: 'from-[#fff2e6] to-[#ffe0c6]',
    coverImage: locIrisFinFiberglassingPhoto,
    coverAlt: 'Fiberglassing the fins on the Loc Iris model rocket',
    media: [
      {
        src: locIrisFinFiberglassingPhoto,
        alt: 'Fiberglassing the fins on the Loc Iris model rocket',
        caption: 'Fiberglass reinforcement on the fins',
        layout: 'landscape'
      },
      {
        src: locIrisDryfitAssemblyPhoto,
        alt: 'Dry fit assembly of the Loc Iris rocket',
        caption: 'Dry fit assembly of the rocket',
        layout: 'portrait'
      },
      {
        src: locIrisMotorMountAssemblyPhoto,
        alt: 'Motor mount assembly of the Loc Iris rocket post epoxy',
        caption: 'Motor mount assembly after epoxy',
        layout: 'landscape'
      }
    ]
  },
  {
    slug: 'robotic-arm-vision-pick',
    title: 'Robotic Arm Vision Pick-and-Place',
    role: 'Co-Designer & Systems Integrator',
    organization: 'Personal Project',
    dates: 'Mar 2026 - Present',
    cardDates: 'In Progress',
    description:
      'Designed and built a 3D-printed robotic arm with vision guidance for object pickup and placement.',
    overview:
      'In a two-person team, I co-designed the arm in Onshape, animated the assembly motion, and integrated the vision and control stack for AprilTag-guided pickup.',
    bullets: [
      'Modeled the arm in Onshape, animated joint motion in the assembly, and 3D-printed all components for final assembly.',
      'Integrated a wrist-mounted camera and AprilTag recognition on a Raspberry Pi to detect targets.',
      'Wired the robot and developed software to coordinate the Raspberry Pi vision pipeline with a Duet3D motion controller.'
    ],
    fullDetails: [
      'Co-designed the full arm in Onshape, validating joint ranges and motion sequencing through assembly animations.',
      'Built and assembled 3D-printed components, mounting a wrist camera for close-range target detection.',
      'Implemented AprilTag-based detection on a Raspberry Pi and linked it with Duet3D motion control to drive pick-and-place moves.',
      'Project remains in progress as of March 2026 while I continue refining integration and automation behavior.'
    ],
    categories: ['Mechatronics', 'Computer Vision', 'Mechanical Design', 'Software'],
    tags: ['Onshape', '3D Printing', 'Raspberry Pi', 'AprilTag', 'Duet3D', 'Motion Control'],
    visual: 'from-[#eef7ff] to-[#d9ecff]',
    coverImage: robotArmCADPhoto,
    coverAlt: 'Robot arm CAD model',
    coverFit: 'contain',
    media: [
      {
        src: robotArmCADPhoto,
        alt: 'Robot arm CAD model',
        caption: 'CAD model of the robotic arm',
        layout: 'landscape'
      },
      {
        src: robotArmBuildPhoto,
        alt: 'Robot arm assembled build',
        caption: 'In progress assembly',
        layout: 'landscape'
      },
      {
        src: robotArmControlPhoto,
        alt: 'Duet board with Raspberry Pi for the robot arm',
        caption: 'Raspberry Pi connected to Duet board In housing',
        layout: 'landscape'
      }
    ]
  },
  {
    slug: '3-axis-camera-tracking-gimbal',
    title: '3-Axis Tracking and Stabilization Gimbal',
    role: 'Mechanical & Controls Designer',
    organization: 'Independent Personal Project',
    dates: 'May 2026 - Present',
    cardDates: '2026 - Present',
    status: 'In Development · Design Revisions',
    description:
      'Designed and built a low-cost camera gimbal combining inertial stabilization with computer-vision target tracking using custom printed structures, an Arduino, an Orange Pi, and a BNO055 IMU.',
    overview:
      'This personal project integrates mechanical design, embedded controls, and computer vision into a compact pan, tilt, and roll camera platform. Pan-and-tilt stabilization has been built and demonstrated; roll integration and final control tuning remain in progress.',
    bullets: [
      'Designed a custom 3-axis pan, tilt, and roll mechanism around compact servo actuators and bearing-supported rotating joints.',
      'Integrated BNO055 orientation feedback for real-time yaw, pitch, and roll stabilization.',
      'Developed OpenCV-based vision tracking to detect a target and generate pan/tilt corrections from camera position error.',
      'Implemented serial communication between an Orange Pi vision computer and Arduino-based servo controller.',
      'Iteratively refined the mechanical structure and actuator interfaces to reduce loading, improve stiffness, and minimize servo jitter.'
    ],
    fullDetails: [
      'Created the gimbal structure in Onshape and manufactured iterative prototypes using FDM 3D printing, refining geometry for stiffness, compact packaging, bearing support, servo mounting, and reduced rotational inertia.',
      'Engineered the mechanical architecture around the torque limitations of low-cost micro servos, using bearing-supported axes, controlled load paths, reduced moment arms, and lightweight structures to minimize radial loading and actuator torque requirements.',
      'Developed a compact mechanical interface between servo outputs and bearing-supported gimbal axes, allowing structural loads to be carried by the frame and bearings rather than relying entirely on the servo output shafts.',
      'Integrated a BNO055 9-DOF IMU over I2C and established the physical-to-sensor axis mapping required to convert measured orientation into yaw, pitch, and roll compensation commands.',
      'Built an embedded control architecture using an Arduino Uno for servo actuation and an Orange Pi 4 Pro for OpenCV image processing, connected through serial communication.',
      'Implemented camera-based target detection and proportional position correction using image-space error relative to the center of the video frame.'
    ],
    categories: ['Mechatronics', 'Computer Vision', 'Mechanical Design', 'Software'],
    tags: ['Onshape', 'OpenCV', 'Arduino', 'Orange Pi', 'BNO055', 'Controls', 'FDM Printing', 'Prototyping'],
    visual: 'bg-[linear-gradient(135deg,#111827_0%,#1e3a5f_50%,#0f766e_100%)]',
    coverImage: gimbalFrontIsoPhoto,
    coverAlt: 'Custom three-axis camera gimbal with pan, tilt, and roll stabilization hardware',
    coverFit: 'contain',
    technicalCaseStudy: {
      objective:
        'The objective is to develop a compact three-axis camera platform that can stabilize a camera and track a visible target while demonstrating mechanical design, controls, embedded-system integration, computer vision, and iterative prototyping within the torque and precision limits of inexpensive hobby servos.',
      currentStatus:
        'Pan and tilt have been physically built and tested in a stabilization proof test. The vision and serial-control architecture is established. Final smoothing, full tracking integration, tuning, and the roll axis remain in progress; the design is not production-ready or fully optimized.',
      specifications: [
        { label: 'Motion architecture', value: 'Pan, tilt, and roll; pan and tilt currently built' },
        { label: 'Real-time controller', value: 'Arduino Uno for BNO055 processing and servo commands' },
        { label: 'Vision computer', value: 'Orange Pi 4 Pro, 6 GB' },
        { label: 'Orientation sensor', value: 'BNO055 9-DOF absolute orientation IMU' },
        { label: 'Actuation', value: 'Three low-cost MS18-class micro servos' },
        { label: 'Camera', value: 'Arducam Camera Module 3 · 12 MP Sony IMX708 · autofocus' },
        { label: 'Servo power', value: 'XL4015 buck converter' },
        { label: 'Communication', value: 'USB serial between Orange Pi and Arduino' }
      ],
      architecture: [
        {
          title: 'Camera + OpenCV',
          description: 'The Orange Pi processes the camera image, detects a green target, and calculates image-space pointing corrections.'
        },
        {
          title: 'USB serial link',
          description: 'Desired pointing corrections move from the Orange Pi vision process to the Arduino controller.'
        },
        {
          title: 'Arduino + BNO055',
          description: 'The Arduino reads orientation feedback, applies axis mapping, and generates conservative servo commands.'
        },
        {
          title: 'Servo-driven gimbal',
          description: 'Bearing-supported pan, tilt, and planned roll axes position the camera while limiting direct structural load on servo shafts.'
        }
      ],
      designSections: [
        {
          title: 'Mechanical design & prototyping',
          items: [
            'Modeled the gimbal, servo mounts, camera supports, rotating frames, shafts, and bearing interfaces in Onshape.',
            'Manufactured iterative FDM prototypes and redesigned interfaces that were difficult to assemble or required excessive plastic welding.',
            'Used bearing-supported joints so servo shafts do not directly carry the full structural load.',
            'Removed unnecessary printed material and moved servo interfaces closer to applied loads to reduce mass and moment arms.',
            'Iterated load paths and interfaces to improve stiffness and reduce wobble, slipping, deflection, and servo loading.'
          ]
        },
        {
          title: 'Electrical & computing integration',
          items: [
            'Integrated an Arduino Uno, Orange Pi 4 Pro, BNO055 IMU, MS18-class servos, Arducam IMX708 camera, and XL4015 power regulator.',
            'Separated high-current servo power from the breadboard after testing showed lower jitter when the buck converter powered the servos directly.',
            'Established USB serial communication between the Linux vision computer and the Arduino controller.',
            'Earlier development evaluated a Raspberry Pi Zero W and Logitech C270 before moving to the newer Orange Pi and Arducam architecture.'
          ]
        },
        {
          title: 'Software & controls',
          items: [
            'Used Python and OpenCV to detect a green target and compute proportional pan-and-tilt corrections from its offset to frame center.',
            'Developed Arduino firmware to read BNO055 orientation data and command the servos.',
            'Mapped physical pan, tilt, and roll motion to IMU yaw, pitch, and roll axes and corrected reversed-axis behavior during development.',
            'Implemented conservative software travel limits to keep the mechanism away from physical stops.',
            'Balanced tracking responsiveness against oscillation and overshoot during controller tuning.'
          ]
        }
      ],
      challenges: [
        {
          challenge: 'Servo jitter and unstable power delivery',
          response: 'Traced jitter to voltage drop, distribution losses, and electrical noise; direct regulated power from the buck converter performed better than breadboard routing.'
        },
        {
          challenge: 'Excessive actuator loading',
          response: 'Reduced moment arms, removed unnecessary mass, improved load paths, and transferred structural loads through bearings and shafts.'
        },
        {
          challenge: 'Printed-part wobble and difficult assembly',
          response: 'Revised compliant and slip-prone interfaces after early builds depended too heavily on plastic welding.'
        },
        {
          challenge: 'IMU axis and direction errors',
          response: 'Validated the sensor-to-mechanism mapping and corrected reversed yaw and pitch behavior in firmware.'
        },
        {
          challenge: 'Controller communication',
          response: 'Troubleshot Arduino pins, USB serial behavior, and Linux serial-driver conflicts to establish the split-compute architecture.'
        },
        {
          challenge: 'Tracking response versus oscillation',
          response: 'Used conservative limits and iterative proportional-control tuning while integrating mechanical, electrical, and vision subsystems.'
        }
      ],
      results: [
        'Demonstrated BNO055-based pan-and-tilt stabilization in a hardware proof test.',
        'Demonstrated independent pan-and-tilt servo motion with conservative software limits.',
        'Established the computer-vision and serial-control architecture.',
        'Developed green-target detection and image-space pointing logic.',
        'Improved stiffness and reduced servo loading through multiple printed design revisions.',
        'Final smoothing, tuning, full tracking integration, and roll-axis implementation remain ongoing.'
      ],
      tools: [
        'Onshape',
        'Mechanical Design',
        'FDM Printing',
        'Arduino',
        'Orange Pi',
        'BNO055',
        'Python',
        'OpenCV',
        'Computer Vision',
        'Controls',
        'Serial Communication',
        'Mechatronics',
        'Prototyping'
      ]
    },
    media: [
      {
        src: gimbalFrontIsoPhoto,
        alt: 'Front isometric view of the custom three-axis camera gimbal',
        caption: 'Front isometric view of the gimbal',
        layout: 'landscape'
      },
      {
        src: gimbalBackIsoPhoto,
        alt: 'Back isometric view of the custom three-axis camera gimbal',
        caption: 'Back isometric view of the gimbal',
        layout: 'landscape'
      },
      {
        src: gimbalFrontSquarePhoto,
        alt: 'Front square view of the custom three-axis camera gimbal',
        caption: 'Front square view of the gimbal',
        layout: 'landscape'
      }
    ]
  },
  {
    slug: 'portfolio-website',
    title: 'Portfolio Website',
    role: 'Designer & Developer',
    organization: 'Personal Project',
    dates: '2026',
    description:
      'Built and deployed a personal engineering portfolio website with reusable React components and structured content.',
    overview:
      'I designed and implemented this portfolio as a single-page React app focused on clear technical communication.',
    bullets: [
      'Developed the site using React, Vite, and Tailwind CSS with reusable components for easy updates.',
      'Used Codex to iterate quickly and deployed the site through GitHub.'
    ],
    fullDetails: [
      'Structured all profile content in centralized data models to simplify updates across sections.',
      'Implemented responsive layouts, filtering, and interaction patterns for desktop and mobile.',
      'Deployed the production build with GitHub-based hosting for a shareable, version-controlled portfolio.'
    ],
    categories: ['Software'],
    tags: ['React', 'Vite', 'Tailwind CSS', 'Visual Studio Code', 'Codex', 'GitHub'],
    visual: 'from-[#eaf4ff] to-[#dcecff]',
    coverImage: portfolioCoverPhoto,
    coverAlt: 'Portfolio website cover page',
    media: [
      {
        src: portfolioCoverPhoto,
        alt: 'Portfolio website cover page',
        caption: 'Portfolio homepage cover'
      },
      {
        src: portfolioBackendPhoto,
        alt: 'Portfolio website backend screenshot with Codex',
        caption: 'Building the portfolio with Codex support'
      }
    ]
  },
  {
    slug: 'menzi-muck-m220x-reverse-engineering',
    title: 'Menzi Muck M220x Reverse Engineering',
    role: 'CAD Modeling & Documentation',
    organization: 'Academic Project',
    dates: 'Course Project',
    description:
      'Reverse-engineered a scale CAD model of the Menzi Muck M220x using technical documentation and subsystem references.',
    overview:
      'Focused on deriving accurate geometry, motion behavior, and subsystem relationships to build a complete scaled CAD model.',
    bullets: [
      'Generated subsystem models and assembly drawings directly from technical documentation.',
      'Documented mechanical interfaces and motion constraints to preserve realistic articulation and fit-up behavior.',
      'Built a scaled CAD model based on available technical documentation.'
    ],
    fullDetails: [
      'Translated specifications into structured subsystem models with consistent dimensional assumptions.',
      'Created assembly-level drawings to communicate component relationships and support design review.',
      'Mapped key interfaces and kinematic constraints so model movement aligned with documented behavior.'
    ],
    categories: ['Mechanical Design', 'Manufacturing'],
    tags: ['Reverse Engineering', 'CAD', 'Assembly Drawings', 'Mechanical Interfaces', 'Motion Constraints'],
    visual: 'from-[#edf5ff] to-[#dbe9ff]',
    coverImage: menziMuckOverviewDrawingPhoto,
    coverAlt: 'Menzi Muck overview drawing',
    coverFit: 'contain',
    media: [
      {
        src: menziMuckOverviewDrawingPhoto,
        alt: 'Menzi Muck overview drawing',
        caption: 'Overview drawing of the Menzi Muck M220x',
        layout: 'landscape'
      },
      {
        src: menziMuckClawDrawingPhoto,
        alt: 'Menzi Muck claw drawing',
        caption: 'Claw subsystem drawing for the Menzi Muck M220x',
        layout: 'landscape'
      }
    ]
  }
]

export const education: EducationItem[] = [
  {
    school: 'Florida Institute of Technology',
    degree: 'B.S. Mechanical Engineering',
    minor: 'Nanotechnology',
    location: 'Melbourne, Florida',
    dates: 'Aug 2023 - May 2027 (Expected)',
    activities: [
      'Tau Kappa Epsilon',
      'AIAA',
      'ARES',
      'Motorsports Club',
      'Council of Presidents',
      "Dean's List",
      'Gamma Sigma Alpha Honor Society'
    ],
    highlights: [
      "Dean's List Scholar",
      'Member: AIAA, ARES, Gamma Sigma Alpha Honor Society'
    ]
  }
]

export const coursework: string[] = [
  'Control Systems',
  'Design Machine Elements',
  'Design Methodologies',
  'Dynamics',
  'Electric and Electronic Circuits',
  'Engineering Thermodynamics I',
  'Engineering Thermodynamics II',
  'Fluid Mechanics',
  'Fluid Mechanics Laboratory',
  'Heat Transfer',
  'Mechanics of Materials',
  'Modeling Dynamic Systems',
  'Materials Science and Engineering',
  'Nano-Science/Technology Laboratory',
  'Intro to Partial Differential Equations and Applications',
  'Intro to Software Development with C++',
  'Solids Modeling',
  'Scientific and Technical Communication'
]

export const certifications: Credential[] = [
  {
    title: 'Lean Six Sigma White Belt',
    issuer: 'Council for Six Sigma Certification',
    issued: 'Oct 2025'
  },
  {
    title: 'Commercial Assistance Towing Endorsement',
    issuer: 'U.S. Coast Guard',
    issued: 'Jul 2025'
  },
  {
    title: 'Master of 100 GRT Inland License',
    issuer: 'U.S. Coast Guard',
    issued: 'Jul 2025',
    expires: 'Jul 2030'
  },
  {
    title: 'TWIC',
    issuer: 'TSA',
    issued: 'Feb 2023'
  },
  {
    title: 'Forklift Certification',
    issuer: 'Liftoff Certifications',
    issued: 'Jan 2025',
    expires: 'Jan 2028',
    credentialId: '450111247'
  },
  {
    title: 'Stop the Bleed',
    issuer: 'American College of Surgeons',
    issued: 'Feb 2024',
    expires: 'Feb 2026'
  },
  {
    title: 'CPR & AED',
    issuer: 'HSI',
    issued: 'Feb 2024',
    expires: 'Feb 2026',
    credentialId: '5584174'
  }
]

export const awards: Award[] = [
  {
    title: 'Fraternity Man of the Year',
    issuer: 'Florida Tech Office of Greek Life',
    date: 'Dec 2025'
  },
  {
    title: '2025 Gamma Sigma Alpha Academic Scholarship',
    issuer: 'Gamma Sigma Alpha',
    date: 'Aug 2025'
  },
  {
    title: 'TKE Omicron Nu Chapter Scholarship',
    issuer: 'Tau Kappa Epsilon',
    date: 'Apr 2025'
  },
  {
    title: 'Fraternal Order of Police Scholarship',
    issuer: 'Fraternal Order of Police',
    date: 'Jun 2023'
  },
  {
    title: 'VFW Post #433 Scholarship',
    issuer: 'VFW Post #433',
    date: 'Jun 2023'
  },
  {
    title: 'Eagle Scout',
    issuer: 'Boy Scouts of America',
    date: 'Dec 2022'
  }
]

export const projectCategories: Array<'All' | ProjectCategory> = [
  'All',
  'UAS',
  'RF Design',
  'Mechatronics',
  'Manufacturing',
  'Computer Vision',
  'Software',
  'Mechanical Design'
]
