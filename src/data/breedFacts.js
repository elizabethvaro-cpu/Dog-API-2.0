const FACTS_BY_BREED = {
  'affenpinscher': [
    'Nicknamed the “Monkey Dog” for its expressive face.',
    'Bred to be a small but fearless rat-catcher.',
    'Often bonds closely with family and loves attention.'
  ],
  'afghan hound': [
    'Famous for its long, silky coat and elegant appearance.',
    'Originally bred for hunting in the mountains of Afghanistan.',
    'Independent by nature, but affectionate with trusted people.'
  ],
  'akita': [
    'Originated in Japan and was bred for guarding and hunting.',
    'Known for loyalty and strong attachment to its family.',
    'Thick double coat helps it handle cold climates.'
  ],
  'beagle': [
    'A scent hound with an exceptional nose and tracking drive.',
    'Typically friendly, curious, and great with families.',
    'Can be vocal—bay and howl are part of their charm.'
  ],
  'bernese mountain dog': [
    'A Swiss working breed built for pulling carts and farm work.',
    'Known for a gentle temperament and striking tri-color coat.',
    'Enjoys cold weather and being close to its people.'
  ],
  'border collie': [
    'Often considered one of the most intelligent dog breeds.',
    'Bred for herding and thrives with jobs and mental challenges.',
    'Fast, agile, and loves learning new tasks.'
  ],
  'boxer': [
    'Playful, energetic, and famously “wiggly.”',
    'Originally bred in Germany as a working and guard dog.',
    'Strong bond with family and typically great with kids.'
  ],
  'bulldog': [
    'Distinctive wrinkled face and sturdy, low-slung build.',
    'Usually calm, affectionate, and people-oriented.',
    'Enjoys moderate activity and lots of relaxation.'
  ],
  'chihuahua': [
    'One of the smallest dog breeds with a big-dog attitude.',
    'Often forms a tight bond with one primary person.',
    'Alert and lively—makes a surprisingly good watchdog.'
  ],
  'cocker spaniel': [
    'Known for soft eyes, long ears, and a cheerful personality.',
    'Bred to flush game birds, so it often loves sniffing and exploring.',
    'Generally social and enjoys being part of family activities.'
  ],
  'dachshund': [
    'Bred to hunt badgers—its long body helped it go underground.',
    'Brave and curious with a strong sense of smell.',
    'Comes in smooth, wire, and long-haired coat varieties.'
  ],
  'dalmatian': [
    'Famous for its spotted coat and athletic endurance.',
    'Historically ran alongside carriages as a coaching dog.',
    'Puppies are born white—spots appear as they grow.'
  ],
  'doberman pinscher': [
    'Developed as a protective companion with high trainability.',
    'Athletic, focused, and thrives with structured activity.',
    'Often deeply loyal and responsive to its handler.'
  ],
  'german shepherd': [
    'Highly trainable and widely used in police and service work.',
    'Bred for herding and known for confidence and intelligence.',
    'Needs both physical exercise and mental engagement.'
  ],
  'golden retriever': [
    'Friendly, gentle, and eager to please.',
    'Bred to retrieve game—often loves carrying toys or objects.',
    'Commonly excels in therapy, assistance, and family roles.'
  ],
  'great dane': [
    'A giant breed often called the “Apollo of dogs.”',
    'Can be surprisingly mellow and affectionate at home.',
    'Despite size, they typically prefer soft couches to long marathons.'
  ],
  'husky': [
    'Bred for pulling sleds and built for endurance in cold climates.',
    'Known for expressive eyes and a talkative personality.',
    'Enjoys running—secure fences are a must.'
  ],
  'labrador retriever': [
    'One of the most popular family dogs worldwide.',
    'Bred to retrieve—often loves water and swimming.',
    'Food-motivated and typically easy to train with consistency.'
  ],
  'pomeranian': [
    'A small spitz breed with a fluffy double coat.',
    'Descended from much larger sled-type dogs.',
    'Bright and confident—often forgets it’s tiny.'
  ],
  'poodle': [
    'Extremely intelligent and known for athletic ability.',
    'Originally a water retriever; the coat can be styled for function.',
    'Comes in standard, miniature, and toy sizes.'
  ],
  'pug': [
    'Bred to be a companion—loves human attention.',
    'Known for a charming, mischievous personality.',
    'Short muzzle means it does best in moderate temperatures.'
  ],
  'rottweiler': [
    'A powerful working breed with a calm, confident presence.',
    'Historically helped drive cattle and pull carts.',
    'Thrives with early training and positive structure.'
  ],
  'shiba inu': [
    'A Japanese breed known for its fox-like appearance.',
    'Independent, clean, and often cat-like in habits.',
    'Can be reserved with strangers but loyal to family.'
  ]
};

const GENERIC_FACTS = [
  'Many dogs in this breed group were shaped by their original “job” (hunting, herding, guarding, or companionship).',
  'Like all dogs, consistent routines and positive training help them thrive.',
  'Mental enrichment (sniffing, puzzles, learning tricks) can be just as tiring as exercise.'
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function getFactsForBreed(breedKey, breedLabel) {
  const specific = FACTS_BY_BREED[breedKey];
  if (specific && specific.length >= 3) return specific.slice(0, 3);

  const h = hashString(`${breedKey}|${breedLabel}`);
  const a = GENERIC_FACTS[h % GENERIC_FACTS.length];
  const b = GENERIC_FACTS[(h + 1) % GENERIC_FACTS.length];
  const c = GENERIC_FACTS[(h + 2) % GENERIC_FACTS.length];
  return [
    `${breedLabel} is a great breed to explore—here are a few general dog facts while we gather more breed-specific ones.`,
    a,
    `${b} ${c}`
  ];
}

