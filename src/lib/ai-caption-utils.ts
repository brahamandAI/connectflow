export function detectPostContext(content: string, imageUrl?: string): string {
  // Detect context based on content and image
  const contextKeywords = {
    'networking': ['meet', 'connect', 'network', 'event', 'conference', 'gathering', 'summit'],
    'job': ['hiring', 'job', 'career', 'resume', 'interview', 'position', 'opportunity', 'recruiting'],
    'project': ['project', 'build', 'develop', 'create', 'launch', 'coding', 'development', 'app'],
    'achievement': ['proud', 'excited', 'achieved', 'completed', 'success', 'milestone', 'accomplished'],
    'learning': ['learn', 'course', 'study', 'skill', 'training', 'education', 'certification', 'workshop'],
    'work': ['work', 'office', 'team', 'meeting', 'presentation', 'collaboration', 'workplace'],
    'personal': ['personal', 'life', 'family', 'friends', 'hobby', 'passion', 'interest']
  };

  const lowerContent = content.toLowerCase();
  
  for (const [context, keywords] of Object.entries(contextKeywords)) {
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return context;
    }
  }
  
  return 'general';
}

export function getToneForContext(context: string): string {
  const toneMap: Record<string, string> = {
    'networking': 'professional',
    'job': 'enthusiastic',
    'project': 'casual',
    'achievement': 'proud',
    'learning': 'motivated',
    'work': 'professional',
    'personal': 'casual',
    'general': 'professional'
  };
  
  return toneMap[context] || 'professional';
}

export function getSuggestedHashtags(context: string, postType: string): string[] {
  const hashtagMap: Record<string, string[]> = {
    'networking': ['#networking', '#professional', '#community', '#connections'],
    'job': ['#hiring', '#career', '#opportunity', '#jobs'],
    'project': ['#project', '#development', '#tech', '#innovation'],
    'achievement': ['#achievement', '#success', '#milestone', '#proud'],
    'learning': ['#learning', '#education', '#skills', '#growth'],
    'work': ['#work', '#team', '#collaboration', '#professional'],
    'personal': ['#personal', '#life', '#passion', '#hobby'],
    'general': ['#sharing', '#thoughts', '#community', '#professional']
  };

  const baseHashtags = hashtagMap[context] || hashtagMap['general'];
  
  // Add post type specific hashtags
  const postTypeHashtags: Record<string, string[]> = {
    'event': ['#event', '#networking'],
    'announcement': ['#announcement', '#news'],
    'general': ['#sharing']
  };

  const additionalHashtags = postTypeHashtags[postType] || [];
  
  return [...baseHashtags, ...additionalHashtags].slice(0, 4);
}

export function formatCaption(caption: {
  text: string;
  emoji: string;
  hashtags: string[];
}): string {
  return `${caption.emoji} ${caption.text} ${caption.hashtags.join(' ')}`;
}

export function validateCaption(caption: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (caption.length < 10) {
    errors.push('Caption is too short (minimum 10 characters)');
  }
  
  if (caption.length > 500) {
    errors.push('Caption is too long (maximum 500 characters)');
  }
  
  const emojiCount = (caption.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
  if (emojiCount > 5) {
    errors.push('Too many emojis (maximum 5 recommended)');
  }
  
  const hashtagCount = (caption.match(/#\w+/g) || []).length;
  if (hashtagCount > 10) {
    errors.push('Too many hashtags (maximum 10 recommended)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getQuickSuggestions(context: string): string[] {
  const suggestions: Record<string, string[]> = {
    'networking': [
      "Great connecting with amazing people today!",
      "Excited to be part of this networking event",
      "Met some incredible professionals at the event"
    ],
    'job': [
      "Excited to announce my new role!",
      "Proud to share this career milestone",
      "Thrilled about this new opportunity"
    ],
    'project': [
      "Just launched my latest project!",
      "Excited to share what I've been working on",
      "Proud to present this new creation"
    ],
    'achievement': [
      "Proud to share this achievement!",
      "Excited about reaching this milestone",
      "Grateful for this amazing opportunity"
    ],
    'learning': [
      "Just completed an amazing course!",
      "Excited to share what I learned today",
      "Always learning and growing in my field"
    ],
    'work': [
      "Great day at work with an amazing team!",
      "Excited about our latest project progress",
      "Proud to be part of this incredible team"
    ],
    'personal': [
      "Excited to share this personal milestone!",
      "Grateful for this amazing experience",
      "Proud to share this special moment"
    ],
    'general': [
      "Excited to share this with my network!",
      "Proud to be part of this community",
      "Grateful for this amazing opportunity"
    ]
  };

  return suggestions[context] || suggestions['general'];
}
