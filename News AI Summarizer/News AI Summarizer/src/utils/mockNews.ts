import { NewsItem, NewsCategory } from '../types';

const categories: NewsCategory[] = ['technology', 'business', 'politics', 'sports', 'entertainment', 'health', 'science', 'world', 'local'];

const mockNewsData: Omit<NewsItem, 'id' | 'publishedAt'>[] = [
  {
    title: "Revolutionary AI Breakthrough Changes Everything",
    description: "Scientists develop new AI model that can understand context better than ever before.",
    content: "In a groundbreaking development, researchers at leading tech companies have unveiled an AI system that demonstrates unprecedented understanding of human context and nuance. This breakthrough could revolutionize how we interact with artificial intelligence in our daily lives. The new model shows remarkable improvements in natural language processing, emotional intelligence, and contextual reasoning. Early tests indicate that this technology could transform industries from healthcare to education, offering more personalized and intuitive AI assistance.",
    url: "https://example.com/ai-breakthrough",
    imageUrl: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "TechNews Daily",
    author: "Dr. Sarah Chen",
    category: 'technology',
    trending: true
  },
  {
    title: "Global Markets Surge on Economic Recovery Signs",
    description: "Stock markets worldwide show strong gains as economic indicators point to sustained recovery.",
    content: "Financial markets across the globe experienced significant gains today as key economic indicators suggested a robust and sustained recovery. The positive momentum was driven by strong employment data, increased consumer spending, and optimistic corporate earnings forecasts. Analysts are cautiously optimistic about the trajectory, noting that while challenges remain, the fundamentals appear solid. This surge has been particularly pronounced in technology and renewable energy sectors, reflecting investor confidence in future growth areas.",
    url: "https://example.com/market-surge",
    imageUrl: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Financial Times",
    author: "Michael Rodriguez",
    category: 'business'
  },
  {
    title: "Climate Summit Reaches Historic Agreement",
    description: "World leaders unite on ambitious climate action plan with binding commitments.",
    content: "In an unprecedented show of global cooperation, world leaders at the International Climate Summit have reached a historic agreement on climate action. The comprehensive plan includes binding commitments to reduce carbon emissions by 50% within the next decade, massive investments in renewable energy infrastructure, and support for developing nations in their transition to clean energy. Environmental groups have praised the agreement as a crucial step forward, while acknowledging that implementation will be the real test of its effectiveness.",
    url: "https://example.com/climate-agreement",
    imageUrl: "https://images.pexels.com/photos/9324336/pexels-photo-9324336.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Global News Network",
    author: "Emma Thompson",
    category: 'world',
    trending: true
  },
  {
    title: "Championship Finals Set Record Viewership",
    description: "Sports fans worldwide tune in for the most-watched championship game in history.",
    content: "The championship finals broke all previous viewership records, with over 2 billion people worldwide tuning in to watch the thrilling match. The game lived up to its hype, featuring incredible performances, dramatic moments, and a nail-biting finish that kept viewers on the edge of their seats until the final whistle. Social media platforms saw unprecedented engagement, with millions of posts, comments, and reactions flooding timelines. The economic impact of the event is estimated to be in the billions, benefiting host cities, broadcasters, and sponsors alike.",
    url: "https://example.com/championship-finals",
    imageUrl: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Sports Central",
    author: "Jake Morrison",
    category: 'sports'
  },
  {
    title: "Breakthrough Medical Treatment Shows Promise",
    description: "New gene therapy treatment demonstrates remarkable success in clinical trials.",
    content: "A revolutionary gene therapy treatment has shown extraordinary promise in Phase III clinical trials, offering hope to millions of patients worldwide. The treatment, which targets previously incurable genetic disorders, has demonstrated a 95% success rate in early trials. Researchers are optimistic that this breakthrough could pave the way for treating a wide range of genetic conditions that have long been considered untreatable. The therapy works by correcting defective genes at the cellular level, potentially offering permanent cures rather than just symptom management.",
    url: "https://example.com/medical-breakthrough",
    imageUrl: "https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Medical Journal Today",
    author: "Dr. Lisa Park",
    category: 'health'
  },
  {
    title: "Space Mission Discovers New Exoplanet",
    description: "Astronomers identify potentially habitable planet in nearby star system.",
    content: "In an exciting development for space exploration, astronomers have discovered a potentially habitable exoplanet in a nearby star system. The planet, located just 22 light-years away, shows signs of having liquid water and an atmosphere that could support life. Advanced telescopes and AI-powered analysis techniques were crucial in making this discovery possible. Scientists are now planning follow-up observations to learn more about the planet's composition and potential for harboring life, marking a significant step forward in our search for extraterrestrial life.",
    url: "https://example.com/exoplanet-discovery",
    imageUrl: "https://images.pexels.com/photos/87009/earth-soil-creep-moon-87009.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Space Exploration News",
    author: "Dr. Robert Kim",
    category: 'science',
    trending: true
  },
  {
    title: "Local Community Garden Initiative Flourishes",
    description: "Neighborhood project brings residents together while promoting sustainable living.",
    content: "A grassroots community garden initiative has transformed an abandoned lot into a thriving green space that brings neighbors together while promoting sustainable living practices. The project, started by local residents six months ago, now features over 50 individual plots where families grow their own vegetables and herbs. Beyond food production, the garden has become a hub for community events, educational workshops, and intergenerational connections. The success has inspired similar projects in neighboring areas, demonstrating the power of community-driven environmental initiatives.",
    url: "https://example.com/community-garden",
    imageUrl: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Local Community News",
    author: "Maria Gonzalez",
    category: 'local'
  },
  {
    title: "Streaming Platform Announces Original Series",
    description: "Major entertainment company invests billions in exclusive content creation.",
    content: "A leading streaming platform has announced a massive investment in original content, with plans to produce over 100 new series and films in the coming year. The ambitious slate includes projects from renowned directors, emerging talent, and international creators, reflecting the platform's commitment to diverse storytelling. Industry analysts see this as a strategic move to compete in the increasingly crowded streaming market. The announcement has generated significant excitement among entertainment industry professionals and audiences alike, with several high-profile projects already generating buzz.",
    url: "https://example.com/streaming-announcement",
    imageUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
    source: "Entertainment Weekly",
    author: "Alex Johnson",
    category: 'entertainment'
  }
];

export const generateMockNews = (): NewsItem[] => {
  return mockNewsData.map((item, index) => ({
    ...item,
    id: `news-${index + 1}`,
    publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) // Random time within last 24 hours
  }));
};